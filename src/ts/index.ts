import readline from "readline";
import { agent } from "./bootstrap";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function bucleChat() {
  rl.question("\n👤 Tú: ", async (input) => {
    const trimmed = input.trim();

    if (!trimmed) {
      bucleChat();
      return;
    }

    if (trimmed.toLowerCase() === "salir") {
      console.log("\n¡Hasta pronto! Sigue entrenando 💪");
      rl.close();
      return;
    }

    try {
      const respuesta = await agent.handleUserMessage(trimmed);
      console.log("\n🤖 Coach:", respuesta);
    } catch (error) {
      console.error("\n❌ Error:", error);
    }

    bucleChat();
  });
}

bucleChat();
