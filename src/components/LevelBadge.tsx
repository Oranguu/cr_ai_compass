import type { ToolLevel } from "@/types/tool";

const badgeClass: Record<ToolLevel, string> = {
  "L3-夯爆了": "border-[#9f2f24] bg-white text-[#9f2f24]",
  "L2-人上人": "border-[#202124] bg-white text-[#202124]",
  "L1-NPC": "border-[#cbc6bd] bg-white text-[#74777d]",
};

export function LevelBadge({ level }: { level: ToolLevel }) {
  return (
    <span className={`inline-flex items-center rounded-[2px] border px-2.5 py-1 text-xs font-medium shadow-[0_1px_0_rgba(32,33,36,0.05)] ${badgeClass[level]}`}>
      {level}
    </span>
  );
}
