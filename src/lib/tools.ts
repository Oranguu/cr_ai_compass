import toolsData from "@/data/tools.json";
import type { AiTool, ToolLevel } from "@/types/tool";

export const tools = toolsData as AiTool[];

export const levelOrder: Record<ToolLevel, number> = {
  "L3-夯爆了": 3,
  "L2-人上人": 2,
  "L1-NPC": 1,
};

export function getTools() {
  return [...tools].sort((a, b) => {
    const levelDiff = levelOrder[b.level] - levelOrder[a.level];
    return levelDiff || b.score - a.score;
  });
}

export function getToolById(id: string) {
  return tools.find((tool) => tool.id === id);
}

export function getFields() {
  return Array.from(new Set(tools.map((tool) => tool.field))).sort();
}

export function getLevels() {
  return Array.from(new Set(tools.map((tool) => tool.level))).sort(
    (a, b) => levelOrder[b] - levelOrder[a],
  );
}
