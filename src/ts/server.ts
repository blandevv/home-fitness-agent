import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { agent } from "./bootstrap";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "..")));

app.post("/api/chat", async (req, res) => {
  const { message } = req.body as { message: string };
  if (!message?.trim()) {
    res.status(400).json({ error: "Mensaje vacío" });
    return;
  }
  try {
    const reply = await agent.handleUserMessage(message.trim());
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno del agente" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `\n🏋️  Fitness Coach Agent corriendo en http://localhost:${PORT}\n`,
  );
});
