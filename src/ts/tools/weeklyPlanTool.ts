import type { Tool, ToolInput } from "../tools";

export const WeeklyPlanTool: Tool = {
  name: "WeeklyPlanTool",
  description:
    "Genera un plan de entrenamiento semanal estructurado por días. Úsala cuando el usuario pida una rutina para la semana, un plan semanal o quiera organizar sus entrenamientos semanales.",
  execute: async (input: ToolInput) => {
    const level = (input.level as string) || "intermedio";
    const daysPerWeek = (input.daysPerWeek as number) || 4;
    const goal = (input.goal as string) || "tonificar";

    const allDays = [
      {
        dia: "Lunes",
        enfoque: "Pecho y Tríceps",
        ejercicios: ["Flexiones", "Fondos de tríceps", "Flexiones diamante"],
      },
      {
        dia: "Martes",
        enfoque: "Piernas y Glúteos",
        ejercicios: ["Sentadillas", "Zancadas", "Puente de glúteos"],
      },
      {
        dia: "Miércoles",
        enfoque: "Descanso activo",
        ejercicios: ["Yoga", "Caminata 30 min"],
      },
      {
        dia: "Jueves",
        enfoque: "Espalda y Bíceps",
        ejercicios: ["Superman", "Remo con botella", "Curl de bíceps"],
      },
      {
        dia: "Viernes",
        enfoque: "Hombros y Core",
        ejercicios: ["Pike push-ups", "Plancha", "Russian twist"],
      },
      {
        dia: "Sábado",
        enfoque: "Cardio HIIT",
        ejercicios: ["Burpees", "Saltos de tijera", "Mountain climbers"],
      },
      {
        dia: "Domingo",
        enfoque: "Descanso completo",
        ejercicios: ["Estiramientos suaves"],
      },
    ];

    return {
      nivel: level,
      objetivo: goal,
      dias_entrenamiento: daysPerWeek,
      plan: allDays.slice(0, 7),
    };
  },
};
