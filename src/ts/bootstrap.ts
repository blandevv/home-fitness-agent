import { HomeFitnessAgent } from "./agent";
import { CoolDownTool } from "./tools/coolDownTool";
import { DailyRoutineTool } from "./tools/dailyRoutineTool";
import { ExerciseDetailTool } from "./tools/exerciseDetailTool";
import { MotivationalQuoteTool } from "./tools/motivationalQuoteTool";
import { NutritionTipTool } from "./tools/nutritionTipTool";
import { ProgressLogTool } from "./tools/progressLogTool";
import { WarmUpTool } from "./tools/warmUpTool";
import { WeeklyPlanTool } from "./tools/weeklyPlanTool";

export const agent = new HomeFitnessAgent([
  DailyRoutineTool,
  WeeklyPlanTool,
  ExerciseDetailTool,
  NutritionTipTool,
  WarmUpTool,
  CoolDownTool,
  ProgressLogTool,
  MotivationalQuoteTool,
]);
