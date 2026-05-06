import { Compass, FileSpreadsheet, Server } from "lucide-react";
import { ToolExplorer } from "@/components/ToolExplorer";
import { getFields, getLevels, getTools } from "@/lib/tools";

export default function Home() {
  const tools = getTools();
  const averageScore = Math.round(tools.reduce((sum, tool) => sum + tool.score, 0) / tools.length);
  const topLevelCount = tools.filter((tool) => tool.level === "L3-夯爆了").length;

  return (
    <main>
      <section className="mx-auto flex min-h-[56vh] w-full max-w-7xl flex-col justify-between px-5 pb-8 pt-8 sm:px-8 lg:pt-12">
        <nav className="flex items-center justify-between border-b border-[#e8e5df] pb-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-[3px] border border-[#202124] bg-white text-[#202124] shadow-[0_8px_18px_rgba(32,33,36,0.08)]">
              <Compass aria-hidden="true" size={20} />
            </span>
            <div>
              <p className="text-sm font-semibold">AI Compass</p>
              <p className="text-xs text-[#74777d]">美术工具索引</p>
            </div>
          </div>
          <p className="hidden text-sm text-[#74777d] sm:block">每周数据文件更新</p>
        </nav>

        <div className="grid gap-10 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="mb-5 inline-flex rounded-[2px] border border-[#e8e5df] bg-white px-3 py-1 text-xs font-medium text-[#9f2f24] shadow-[0_8px_20px_rgba(32,33,36,0.05)]">
              内部 AI 工具目录
            </p>
            <h1 className="max-w-4xl font-display text-[4.2rem] font-semibold leading-[1.02] text-[#202124] sm:text-[6.7rem] lg:text-[8rem]">
              AI 工具罗盘
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-[#55585d] sm:text-lg">
              给美术部门使用的 AI 工具排行榜，集中记录工具成熟度、适用场景、使用方式和实践案例。
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <StatCard icon={<FileSpreadsheet aria-hidden="true" size={18} />} label="收录工具" value={tools.length.toString()} />
            <StatCard icon={<Compass aria-hidden="true" size={18} />} label="平均分" value={averageScore.toString()} />
            <StatCard icon={<Server aria-hidden="true" size={18} />} label="L3 工具" value={topLevelCount.toString()} />
          </div>
        </div>
      </section>

      <ToolExplorer tools={tools} fields={getFields()} levels={getLevels()} />
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-[4px] border border-[#e8e5df] bg-white p-4 shadow-card">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-[3px] bg-[#f5f4f1] text-[#202124]">{icon}</span>
        <span className="text-sm text-[#74777d]">{label}</span>
      </div>
      <strong className="font-display text-4xl font-semibold leading-none">{value}</strong>
    </div>
  );
}
