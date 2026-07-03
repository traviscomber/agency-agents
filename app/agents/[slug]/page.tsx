import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { getAgentBySlug, SEED_AGENTS } from '@/lib/data/seed-agents'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { PlanBadge } from '@/components/shared/PlanBadge'
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react'

export async function generateStaticParams() {
  return SEED_AGENTS.map((a) => ({ slug: a.slug }))
}

export default async function PublicAgentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const agent = getAgentBySlug(slug)
  if (!agent) notFound()

  const relatedAgents = SEED_AGENTS.filter(
    (a) => a.id !== agent.id && (a.division === agent.division || a.suggestedPrompts.some(() => true))
  ).slice(0, 3)

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_30%),linear-gradient(to_bottom,_#f8fafc,_#ffffff_24%,_#f8fafc_100%)]">
      <PublicNavbar />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <nav className="mb-6 flex items-center gap-1 text-xs text-slate-600">
          <Link href="/agents" className="transition-colors hover:text-foreground">
            Agents
          </Link>
          <ChevronRight size={12} />
          <span className="text-foreground">{agent.name}</span>
        </nav>

        <section className="mb-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#ffffff_40%,#eef2ff_100%)] shadow-[0_18px_60px_-44px_rgba(15,23,42,0.45)]">
          <div className="grid gap-8 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <DivisionBadge division={agent.division} />
                <PlanBadge plan={agent.planRequired} />
              </div>
              <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
                {agent.name}
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
                {agent.longDescription}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/signup">
                    Run this specialist <ArrowRight size={14} className="ml-1.5" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/pricing">Compare plans</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ['Role', agent.role],
                ['Mission', agent.mission],
                ['Best use', agent.whenToUse],
                ['Output style', 'Structured deliverables with clear sections and next steps.'],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-4 shadow-[0_12px_36px_-32px_rgba(15,23,42,0.5)]"
                >
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-600">{title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
              <h2 className="text-sm font-semibold text-foreground">Input requirements</h2>
              <ul className="mt-4 space-y-3">
                {agent.inputRequirements.map((req) => (
                  <li key={req} className="flex items-start gap-2 text-sm leading-relaxed text-slate-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {req}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
              <h2 className="text-sm font-semibold text-foreground">Output format</h2>
              <ul className="mt-4 space-y-3">
                {agent.outputFormat.map((fmt) => (
                  <li key={fmt} className="flex items-start gap-2 text-sm leading-relaxed text-slate-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-700" />
                    {fmt}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
              <h2 className="text-sm font-semibold text-foreground">Example tasks</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {agent.exampleTasks.map((task) => (
                  <Link
                    key={task}
                    href="/signup"
                    className="rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-foreground transition-colors hover:border-primary/25 hover:bg-slate-50"
                  >
                    {task}
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
              <h2 className="text-sm font-semibold text-foreground">Suggested prompts</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {agent.suggestedPrompts.map((prompt) => (
                  <Link
                    key={prompt}
                    href="/signup"
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 transition-colors hover:border-primary/25 hover:bg-slate-50 hover:text-slate-950"
                  >
                    {prompt}
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-5">
            <div className="sticky top-24 rounded-2xl border border-slate-900/10 bg-[linear-gradient(135deg,#0f172a,#111827_55%,#334155)] p-6 text-white shadow-[0_20px_80px_rgba(15,23,42,0.18)]">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-medium text-slate-100">
                <Sparkles size={12} />
                Ready to run
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-200">
                Sign up to run this specialist and receive a structured deliverable saved to your workspace.
              </p>
              <div className="mt-5 rounded-2xl border border-white/14 bg-white/12 p-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-300">Required plan</p>
                <div className="mt-3">
                  <PlanBadge plan={agent.planRequired} />
                </div>
              </div>
              <div className="mt-5 space-y-2">
                <Button className="w-full bg-white text-slate-950 hover:bg-slate-100" asChild>
                  <Link href="/signup">
                    Run this agent <ArrowRight size={14} className="ml-1.5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-white/24 bg-white/12 text-white hover:bg-white/18 hover:text-white"
                  asChild
                >
                  <Link href="/signup">Sign in</Link>
                </Button>
              </div>
            </div>

            {relatedAgents.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  Related agents
                </h3>
                <div className="mt-4 space-y-3">
                  {relatedAgents.map((related) => (
                    <Link
                      key={related.id}
                      href={`/agents/${related.slug}`}
                      className="group flex items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition-colors hover:border-primary/25 hover:bg-slate-50"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground group-hover:text-primary">
                          {related.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-600">{related.division}</p>
                      </div>
                      <ArrowRight size={12} className="mt-1 shrink-0 text-slate-600" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  )
}
