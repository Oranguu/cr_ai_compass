import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { LevelBadge } from "@/components/LevelBadge";
import { getToolById, getTools } from "@/lib/tools";

export function generateStaticParams() {
  return getTools().map((tool) => ({
    id: tool.id,
  }));
}

export default async function ToolDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tool = getToolById(id);

  if (!tool) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-5 py-8 sm:px-8">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 rounded-[3px] border border-[#e8e5df] bg-white px-4 py-2 text-sm font-medium shadow-[0_8px_20px_rgba(32,33,36,0.05)] transition hover:border-[#202124]"
      >
        <ArrowLeft aria-hidden="true" size={17} />
        返回排行榜
      </Link>

      <section className="rounded-[6px] border border-[#e8e5df] bg-white shadow-panel">
        <div className="grid gap-0 lg:grid-cols-[1fr_280px]">
          <div className="p-6 sm:p-8">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-[2px] border border-[#e8e5df] bg-white px-3 py-1 text-sm font-medium text-[#9f2f24] shadow-[0_1px_0_rgba(32,33,36,0.05)]">
                {tool.field}
              </span>
              <LevelBadge level={tool.level} />
            </div>
            <h1 className="font-display text-6xl font-semibold leading-tight sm:text-8xl">{tool.name}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#55585d]">{tool.summary}</p>
          </div>

          <aside className="border-t border-[#e8e5df] bg-[#fbfbfa] p-6 lg:border-l lg:border-t-0">
            <p className="text-sm text-[#74777d]">综合分</p>
            <p className="font-display text-8xl font-semibold leading-none text-[#9f2f24]">{tool.score}</p>
            <a
              href={tool.url}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-[3px] border border-[#202124] bg-white px-4 py-3 text-sm font-medium text-[#202124] transition hover:bg-[#202124] hover:text-white"
            >
              打开工具
              <ExternalLink aria-hidden="true" size={16} />
            </a>
          </aside>
        </div>
      </section>

      <section className="grid gap-4 py-6 lg:grid-cols-[1fr_1fr]">
        <InfoBlock title="使用说明 / 接入方式">
          <p>{tool.usage}</p>
        </InfoBlock>

        <InfoBlock title="维护备注">
          <p>{tool.notes}</p>
        </InfoBlock>
      </section>

      <section className="border-y border-[#e8e5df] py-6">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-xs font-medium text-[#9f2f24]">实践记录</p>
            <h2 className="mt-1 text-2xl font-semibold">运用案例</h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {tool.cases.map((item, index) => (
            <article key={item} className="rounded-[5px] border border-[#e8e5df] bg-white p-5 shadow-card">
              <p className="mb-5 font-display text-4xl font-semibold leading-none text-[#c9c5bd]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="leading-7 text-[#55585d]">{item}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="rounded-[5px] border border-[#e8e5df] bg-white p-5 shadow-card">
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>
      <div className="text-sm leading-7 text-[#55585d]">{children}</div>
    </article>
  );
}
