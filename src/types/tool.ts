export type ToolLevel = "L3-夯爆了" | "L2-人上人" | "L1-NPC";

export type AiTool = {
  id: string;
  field: string;
  name: string;
  summary: string;
  url: string;
  usage: string;
  level: ToolLevel;
  score: number;
  cases: string[];
  notes: string;
};
