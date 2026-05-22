import type { Tool, ToolInput } from "../tools";

export const DailyRoutineTool: Tool = {
  name: "DailyRoutineTool",
  description:
    "Genera una rutina de entrenamiento en casa para un día. Úsala cuando el usuario pida ejercicios para hoy, una rutina diaria o quiera entrenar un grupo muscular específico.",
  execute: async (input: ToolInput) => {
    const level = (input.level as string) || "intermedio";
    const goal = (input.goal as string) || "tonificar";
    const duration = (input.duration as number) || 30;
    const muscleGroup = (input.muscleGroup as string) || "cuerpo completo";

    return {
      nivel: level,
      objetivo: goal,
      grupo_muscular: muscleGroup,
      duracion_minutos: duration,
      ejercicios: [
        { nombre: "Sentadillas", series: 3, repeticiones: 15, descanso: "45s" },
        { nombre: "Flexiones", series: 3, repeticiones: 12, descanso: "45s" },
        {
          nombre: "Zancadas alternadas",
          series: 3,
          repeticiones: "10 por pierna",
          descanso: "45s",
        },
        { nombre: "Plancha", series: 3, duracion: "30s", descanso: "30s" },
        {
          nombre: "Saltos de tijera",
          series: 2,
          repeticiones: 20,
          descanso: "30s",
        },
        {
          nombre: "Abdominales bicicleta",
          series: 3,
          repeticiones: "15 por lado",
          descanso: "30s",
        },
      ],
    };
  },
};
