import type { Tool, ToolInput } from "../tools";

export const WarmUpTool: Tool = {
  name: "WarmUpTool",
  description:
    "Genera una rutina de calentamiento antes del entrenamiento. Úsala cuando el usuario pregunte cómo calentar, pida un warm-up o quiera preparar su cuerpo antes de ejercitarse.",
  execute: async (input: ToolInput) => {
    const duration = (input.duration as number) || 10;

    return {
      duracion_minutos: duration,
      proposito:
        "Elevar la temperatura corporal, activar articulaciones y preparar el sistema cardiovascular",
      secuencia: [
        {
          ejercicio: "Marcha en sitio",
          duracion: "2 min",
          descripcion: "Levanta las rodillas al ritmo de tu respiración",
        },
        {
          ejercicio: "Rotación de brazos",
          duracion: "1 min",
          descripcion: "Círculos hacia adelante y hacia atrás",
        },
        {
          ejercicio: "Rotación de caderas",
          duracion: "1 min",
          descripcion: "Círculos amplios con las manos en la cintura",
        },
        {
          ejercicio: "Sentadillas lentas",
          duracion: "1 min",
          descripcion: "Sin peso, enfocándote en la movilidad",
        },
        {
          ejercicio: "Jumping jacks suaves",
          duracion: "2 min",
          descripcion: "Mantén un ritmo cómodo",
        },
        {
          ejercicio: "Movilidad de tobillo y muñeca",
          duracion: "1 min",
          descripcion: "Rotaciones suaves de cada articulación",
        },
        {
          ejercicio: "Estocadas lentas",
          duracion: "2 min",
          descripcion: "Alternando piernas, sin rebote",
        },
      ],
      consejo:
        "El calentamiento debe dejarte ligeramente sudado pero sin fatiga. ¡No te saltes este paso!",
    };
  },
};
