export type ToolInput = Record<string, unknown>;

export interface Tool {
  name: string;
  description: string;
  execute: (input: ToolInput) => Promise<unknown>;
}
