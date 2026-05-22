import type { Tool, ToolInput } from "../tools";

const exerciseDatabase: Record<string, object> = {
  sentadilla: {
    nombre: "Sentadilla",
    grupo_muscular: "Cuádriceps, glúteos, isquiotibiales",
    ejecucion: [
      "Párate con los pies a la anchura de los hombros",
      "Mantén la espalda recta y el pecho erguido",
      "Baja doblando las rodillas hasta que los muslos estén paralelos al suelo",
      "Empuja con los talones para volver a la posición inicial",
    ],
    errores_comunes: [
      "Rodillas hacia adentro",
      "Levantar los talones",
      "Redondear la espalda",
    ],
    variantes: [
      "Sentadilla sumo",
      "Sentadilla búlgara",
      "Sentadilla una pierna",
    ],
  },
  flexion: {
    nombre: "Flexión (Push-up)",
    grupo_muscular: "Pecho, tríceps, hombros, core",
    ejecucion: [
      "Colócate boca abajo con las manos a la anchura de los hombros",
      "Mantén el cuerpo recto de cabeza a talones",
      "Baja el pecho hasta casi tocar el suelo",
      "Empuja hasta extender los brazos completamente",
    ],
    errores_comunes: [
      "Caderas arriba o abajo",
      "Codos muy abiertos",
      "No bajar completamente",
    ],
    variantes: ["Flexión en rodillas", "Flexión diamante", "Flexión archer"],
  },
  plancha: {
    nombre: "Plancha (Plank)",
    grupo_muscular: "Core, hombros, glúteos",
    ejecucion: [
      "Apóyate en antebrazos y puntillas",
      "Mantén el cuerpo en línea recta",
      "Aprieta el abdomen y glúteos",
      "Mantén la posición el tiempo indicado",
    ],
    errores_comunes: [
      "Caderas arriba o abajo",
      "Contener la respiración",
      "Cuello en tensión",
    ],
    variantes: [
      "Plancha lateral",
      "Plancha dinámica",
      "Plancha con elevación de pierna",
    ],
  },
};

export const ExerciseDetailTool: Tool = {
  name: "ExerciseDetailTool",
  description:
    "Explica cómo ejecutar correctamente un ejercicio: músculos trabajados, pasos, errores comunes y variantes. Úsala cuando el usuario pregunte cómo hacer un ejercicio específico.",
  execute: async (input: ToolInput) => {
    const exercise = ((input.exercise as string) || "").toLowerCase().trim();

    const key = Object.keys(exerciseDatabase).find((k) => exercise.includes(k));

    if (key) {
      return exerciseDatabase[key];
    }

    return {
      ejercicio: input.exercise || "desconocido",
      nota: "No tengo detalles específicos de este ejercicio en mi base de datos, pero puedo explicarlo de forma general.",
      consejo_general:
        "Mantén siempre la espalda recta, respira de forma controlada y prioriza la técnica sobre el peso.",
    };
  },
};
