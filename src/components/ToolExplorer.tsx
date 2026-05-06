"use client";

import Link from "next/link";
import { ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { LevelBadge } from "@/components/LevelBadge";
import type { AiTool, ToolLevel } from "@/types/tool";

type ToolExplorerProps = {
  tools: AiTool[];
  fields: string[];
  levels: ToolLevel[];
};

export function ToolExplorer({ tools, fields, levels }: ToolExplorerProps) {
  const [field, setField] = useState("全部领域");
  const [level, setLevel] = useState("全部评级");
  const [keyword, setKeyword] = useState("");

  const filteredTools = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return tools.filter((tool) => {
      const matchField = field === "全部领域" || tool.field === field;
      const matchLevel = level === "全部评级" || tool.level === level;
      const matchKeyword =
        normalizedKeyword.length === 0 ||
        [tool.name, tool.summary, tool.field, tool.notes]
          .join(" ")
          .toLowerCase()
          .includes(normalizedKeyword);

      return matchField && matchLevel && matchKeyword;
    });
  }, [field, keyword, level, tools]);

  return (
    <section className="mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8">
      <div className="mb-7 grid gap-3 rounded-[5px] border border-[#e8e5df] bg-white p-3 shadow-panel lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <label className="flex min-h-12 items-center gap-3 rounded-[3px] border border-[#f1eee8] bg-[#fbfbfa] px-4 text-[#74777d]">
          <Search aria-hidden="true" size={18} />
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="搜索工具、场景或备注"
            className="w-full bg-transparent text-sm text-[#202124] outline-none placeholder:text-[#999b9f]"
          />
        </label>

        <label className="flex min-h-12 items-center gap-3 rounded-[3px] border border-[#f1eee8] bg-[#fbfbfa] px-4 text-[#74777d]">
          <SlidersHorizontal aria-hidden="true" size={18} />
          <select
            value={field}
            onChange={(event) => setField(event.target.value)}
            className="w-full bg-transparent text-sm text-[#202124] outline-none"
          >
            <option>全部领域</option>
            {fields.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label className="flex min-h-12 items-center gap-3 rounded-[3px] border border-[#f1eee8] bg-[#fbfbfa] px-4 text-[#74777d]">
          <SlidersHorizontal aria-hidden="true" size={18} />
          <select
            value={level}
            onChange={(event) => setLevel(event.target.value)}
            className="w-full bg-transparent text-sm text-[#202124] outline-none"
          >
            <option>全部评级</option>
            {levels.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-[#9f2f24]">工具清单</p>
          <h2 className="mt-1 text-2xl font-semibold">当前收录 {filteredTools.length} 个工具</h2>
        </div>
        <p className="hidden text-sm text-[#74777d] sm:block">按评级与分数排序</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredTools.map((tool, index) => (
          <Link
            href={`/tools/${tool.id}`}
            key={tool.id}
            className="group relative flex min-h-[310px] flex-col rounded-[5px] border border-[#e8e5df] bg-white p-6 shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-panel"
          >
            <span className="absolute right-6 top-0 h-7 w-px bg-[#e8e5df]" aria-hidden="true" />
            <span className="absolute right-[18px] top-7 h-2 w-4 rounded-b-full border-x border-b border-[#e8e5df] bg-[#fbfbfa]" aria-hidden="true" />

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-5xl font-semibold leading-none text-[#c9c5bd]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 text-sm font-medium text-[#9f2f24]">{tool.field}</p>
              </div>
              <LevelBadge level={tool.level} />
            </div>

            <div className="mt-8 flex-1">
              <h3 className="text-2xl font-semibold leading-tight text-[#202124]">{tool.name}</h3>
              <p className="mt-4 text-sm leading-7 text-[#55585d]">{tool.summary}</p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[#f1eee8] pt-4">
              <div>
                <p className="text-xs text-[#74777d]">综合分</p>
                <p className="font-display text-4xl font-semibold leading-none">{tool.score}</p>
              </div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e8e5df] bg-white text-[#202124] shadow-[0_8px_18px_rgba(32,33,36,0.06)] transition group-hover:border-[#202124]">
                <ArrowUpRight aria-hidden="true" size={19} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
