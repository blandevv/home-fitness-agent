import type { Tool, ToolInput } from "../tools";

export const CoolDownTool: Tool = {
  name: "CoolDownTool",
  description:
    "Genera una rutina de enfriamiento y estiramientos post-entrenamiento. Úsala cuando el usuario termine de entrenar y quiera estirar, pida un cool-down o quiera recuperarse mejor.",
  execute: async (input: ToolInput) => {
    const duration = (input.duration as number) || 10;

    return {
      duracion_minutos: duration,
      proposito:
        "Reducir gradualmente la frecuencia cardíaca, prevenir lesiones y mejorar la flexibilidad",
      secuencia: [
        {
          ejercicio: "Caminata lenta",
          duracion: "2 min",
          descripcion: "Reduce gradualmente el ritmo",
        },
        {
          ejercicio: "Estiramiento de cuádriceps",
          duracion: "1 min",
          descripcion: "30s cada pierna, de pie sujetando el tobillo",
        },
        {
          ejercicio: "Estiramiento de isquiotibiales",
          duracion: "1 min",
          descripcion: "Sentado, alcanza los pies con las manos",
        },
        {
          ejercicio: "Estiramiento de pecho",
          duracion: "1 min",
          descripcion: "Entrelaza las manos detrás y abre el pecho",
        },
        {
          ejercicio: "Estiramiento de espalda baja",
          duracion: "1 min",
          descripcion: "Posición fetal, rodillas al pecho",
        },
        {
          ejercicio: "Estiramiento de hombros",
          duracion: "1 min",
          descripcion: "Pasa el brazo por el pecho y mantén 30s cada lado",
        },
        {
          ejercicio: "Respiración profunda",
          duracion: "3 min",
          descripcion: "Inhala 4s, mantén 4s, exhala 6s",
        },
      ],
      consejo:
        "Mantén cada estiramiento estático entre 20-30 segundos. No hagas rebotes ni fuerces el rango de movimiento.",
    };
  },
};
