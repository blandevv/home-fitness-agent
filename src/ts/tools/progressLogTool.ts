import type { Tool, ToolInput } from "../tools";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOG_PATH = path.resolve(__dirname, "../../../src/data/progress-log.json");

export const ProgressLogTool: Tool = {
  name: "ProgressLogTool",
  description:
    "Registra el progreso del usuario (ejercicios realizados, series, repeticiones). Úsala cuando el usuario quiera guardar su entrenamiento de hoy, registrar su progreso o ver su historial de entrenamientos.",
  execute: async (input: ToolInput) => {
    let log: { registros: object[] } = { registros: [] };

    try {
      const raw = await fs.promises.readFile(LOG_PATH, "utf-8");
      log = JSON.parse(raw);
    } catch {
      // File doesn't exist yet — start with empty log
    }

    const newEntry = {
      fecha: new Date().toLocaleDateString("es-CO"),
      hora: new Date().toLocaleTimeString("es-CO"),
      ejercicio: input.exercise || "Entrenamiento general",
      series: input.sets || 0,
      repeticiones: input.reps || 0,
      peso_kg: input.weight || null,
      notas: input.notes || "",
    };

    log.registros.push(newEntry);
    await fs.promises.writeFile(LOG_PATH, JSON.stringify(log, null, 2));

    return {
      mensaje: "Progreso guardado exitosamente",
      entrada_guardada: newEntry,
      total_registros: log.registros.length,
    };
  },
};
