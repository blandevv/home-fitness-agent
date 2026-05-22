import type { Tool, ToolInput } from "../tools";

export const NutritionTipTool: Tool = {
  name: "NutritionTipTool",
  description:
    "Proporciona consejos de nutrición y alimentación según el objetivo del usuario. Úsala cuando el usuario pregunte sobre dieta, alimentación, qué comer, macronutrientes o nutrición para su meta fitness.",
  execute: async (input: ToolInput) => {
    const goal = ((input.goal as string) || "tonificar").toLowerCase();

    const tips: Record<string, object> = {
      "perder grasa": {
        objetivo: "Pérdida de grasa",
        calorias:
          "Déficit calórico del 10-15% (aprox. 300-500 kcal menos que tu mantenimiento)",
        macronutrientes: {
          proteina: "1.8-2.2g por kg de peso",
          carbohidratos: "Moderados, preferir integrales",
          grasas: "20-30% de las calorías totales",
        },
        alimentos_recomendados: [
          "Pollo a la plancha",
          "Verduras de hoja verde",
          "Avena",
          "Huevos",
          "Legumbres",
        ],
        evitar: [
          "Azúcares procesados",
          "Frituras",
          "Bebidas azucaradas",
          "Harinas refinadas",
        ],
        hidratacion: "Mínimo 2.5L de agua al día",
      },
      "ganar musculo": {
        objetivo: "Ganancia muscular",
        calorias:
          "Superávit calórico del 5-10% (aprox. 200-300 kcal más que tu mantenimiento)",
        macronutrientes: {
          proteina: "2.0-2.5g por kg de peso",
          carbohidratos: "Altos para energía y recuperación",
          grasas: "20-25% de las calorías totales",
        },
        alimentos_recomendados: [
          "Carne magra",
          "Arroz integral",
          "Batata",
          "Huevos",
          "Lácteos bajos en grasa",
        ],
        evitar: [
          "Alcohol",
          "Exceso de grasas saturadas",
          "Alimentos ultraprocesados",
        ],
        hidratacion: "Mínimo 3L de agua al día",
      },
      tonificar: {
        objetivo: "Tonificación",
        calorias: "Mantenimiento o ligero déficit (100-200 kcal)",
        macronutrientes: {
          proteina: "1.8-2.0g por kg de peso",
          carbohidratos: "Moderados, ciclados según actividad",
          grasas: "25-30% de las calorías totales",
        },
        alimentos_recomendados: [
          "Proteínas magras",
          "Verduras variadas",
          "Frutas",
          "Granos enteros",
          "Nueces",
        ],
        evitar: ["Azúcares simples en exceso", "Alcohol", "Comida rápida"],
        hidratacion: "Mínimo 2L de agua al día",
      },
    };

    const matchedKey =
      Object.keys(tips).find((k) => goal.includes(k)) || "tonificar";
    return tips[matchedKey];
  },
};
