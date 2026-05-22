import type { Tool } from "../tools";

const quotes = [
  {
    frase: "El dolor que sientes hoy será la fuerza que sentirás mañana.",
    autor: "Arnold Schwarzenegger",
  },
  {
    frase: "No cuentes los días, haz que los días cuenten.",
    autor: "Muhammad Ali",
  },
  {
    frase:
      "Tu cuerpo puede soportar casi cualquier cosa. Es tu mente la que necesitas convencer.",
    autor: "Anónimo",
  },
  {
    frase:
      "El éxito no se logra solo con cualidades especiales. Es sobre todo un trabajo de constancia, de método y de organización.",
    autor: "Victor Hugo",
  },
  {
    frase: "Levántate y entrena. Nadie lo va a hacer por ti.",
    autor: "Anónimo",
  },
  {
    frase:
      "Los campeones no son hechos en gimnasios. Los campeones son hechos de algo que tienen dentro: un deseo, un sueño, una visión.",
    autor: "Muhammad Ali",
  },
  {
    frase: "Cada entrenamiento te acerca un paso más a donde quieres estar.",
    autor: "Anónimo",
  },
  {
    frase:
      "La disciplina es hacer lo que necesitas hacer aunque no tengas ganas.",
    autor: "Anónimo",
  },
];

export const MotivationalQuoteTool: Tool = {
  name: "MotivationalQuoteTool",
  description:
    "Proporciona una frase motivacional para animar al usuario. Úsala cuando el usuario esté desmotivado, necesite ánimo, pida inspiración o una frase motivadora para entrenar.",
  execute: async () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    return {
      frase: quote.frase,
      autor: quote.autor,
      mensaje: "¡Tú puedes! Cada repetición cuenta.",
    };
  },
};
