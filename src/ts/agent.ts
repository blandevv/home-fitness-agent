import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { Tool } from "./tools";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HISTORY_PATH = path.resolve(__dirname, "../../src/data/chat-history.json");

interface HistoryData {
  system: string;
  messages: { role: string; content: string }[];
  params: { temperature: number; top_p: number; max_output_tokens: number };
}

type GeminiDecision =
  | { needs_tool: true; tool: string; params: Record<string, unknown>; response: null }
  | { needs_tool: false; tool: null; params: Record<string, unknown>; response: string };

export class HomeFitnessAgent {
  private tools: Map<string, Tool>;
  private model: ReturnType<
    InstanceType<typeof GoogleGenerativeAI>["getGenerativeModel"]
  >;

  constructor(tools: Tool[]) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY is required");

    this.tools = new Map(tools.map((t) => [t.name, t]));
    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({
      model: process.env.MODEL || "gemini-2.0-flash",
    });
  }

  private async loadHistory(): Promise<HistoryData> {
    const raw = await fs.promises.readFile(HISTORY_PATH, "utf-8");
    return JSON.parse(raw) as HistoryData;
  }

  private async saveHistory(data: HistoryData): Promise<void> {
    await fs.promises.writeFile(HISTORY_PATH, JSON.stringify(data, null, 2));
  }

  async handleUserMessage(message: string): Promise<string> {
    const data = await this.loadHistory();

    const toolList = Array.from(this.tools.values())
      .map((t) => `- ${t.name}: ${t.description}`)
      .join("\n");

    const history = data.messages.map((m) => ({
      role: m.role === "assistant" || m.role === "model" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const systemPrompt = `${data.system}

Herramientas disponibles:
${toolList}

INSTRUCCIONES DE RESPUESTA:
Responde SIEMPRE con un JSON válido (sin markdown, sin bloques de código) con este formato exacto:

Si NO necesitas herramienta:
{ "needs_tool": false, "tool": null, "params": {}, "response": "<tu respuesta completa y natural al usuario>" }

Si SÍ necesitas herramienta primero:
{ "needs_tool": true, "tool": "<nombre exacto de la herramienta>", "params": { <parámetros extraídos del mensaje> }, "response": null }`;

    const generationConfig = {
      temperature: process.env.TEMPERATURE
        ? parseFloat(process.env.TEMPERATURE)
        : data.params.temperature,
      topP: process.env.TOP_P
        ? parseFloat(process.env.TOP_P)
        : data.params.top_p,
      maxOutputTokens: process.env.MAX_OUTPUT_TOKENS
        ? parseInt(process.env.MAX_OUTPUT_TOKENS)
        : data.params.max_output_tokens,
    };

    const chatSession = this.model.startChat({
      history,
      systemInstruction: { role: "user", parts: [{ text: systemPrompt }] },
      generationConfig,
    });

    const firstResult = await chatSession.sendMessage(message);
    const firstText = firstResult.response.text().trim();

    let decision: GeminiDecision = {
      needs_tool: false,
      tool: null,
      params: {},
      response: firstText,
    };

    const jsonMatch = firstText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        decision = JSON.parse(jsonMatch[0]) as GeminiDecision;
      } catch (e) {
        console.error("[agent] Failed to parse Gemini JSON response:", e);
      }
    }

    let finalResponse: string;

    if (decision.needs_tool && this.tools.has(decision.tool)) {
      const tool = this.tools.get(decision.tool)!;
      console.log(`\n✅ [HERRAMIENTA EJECUTADA]: ${tool.name}`);
      const toolResult = await tool.execute(decision.params || {});
      console.log(`   Resultado:`, JSON.stringify(toolResult, null, 2));

      const toolMessage = `[Resultado de la herramienta ${tool.name}]: ${JSON.stringify(toolResult, null, 2)}\n\nAhora responde al usuario de forma natural y conversacional, sin JSON, usando los datos anteriores.`;
      const secondResult = await chatSession.sendMessage(toolMessage);
      finalResponse = secondResult.response.text();
    } else {
      finalResponse = decision.response ?? firstText;
    }

    data.messages.push(
      { role: "user", content: message },
      { role: "model", content: finalResponse },
    );
    await this.saveHistory(data);

    return finalResponse;
  }
}
