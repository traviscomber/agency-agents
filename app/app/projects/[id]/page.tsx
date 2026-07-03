import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { MOCK_PROJECTS, MOCK_RUNS, MOCK_SAVED_OUTPUTS } from '@/lib/data/mock-store'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { ArrowLeft, ArrowRight, Bot, Bookmark, Calendar, Sparkles } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

interface Props {
  params: Promise<{ id: string }>
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params
  const project = MOCK_PROJECTS.find((p) => p.id === id)
  if (!project) notFound()

  const runs = MOCK_RUNS.filter((r) => r.projectId === id)
  const saved = MOCK_SAVED_OUTPUTS.filter((s) => s.projectId === id)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <Link
        href="/app/projects"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 transition-colors hover:text-foreground"
      >
        <ArrowLeft size={13} /> Back to projects
      </Link>

      <section className="mt-5 overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#ffffff_48%,#f8fafc_100%)] shadow-[0_18px_60px_-44px_rgba(15,23,42,0.45)]">
        <div className="grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-700">
              <Sparkles size={12} className="text-primary" />
              Project workspace
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{project.name}</h1>
            {project.description && (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-700 sm:text-base">{project.description}</p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-700">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5">
                <Bot size={11} /> {runs.length} runs
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5">
                <Bookmark size={11} /> {saved.length} saved
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5">
                <Calendar size={11} /> Updated {formatDate(project.updatedAt)}
              </span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[1.25rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_18px_40px_-24px_rgba(15,23,42,0.9)]">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">Status</p>
              <p className="mt-3 text-2xl font-semibold capitalize">{project.status}</p>
              <p className="mt-1 text-sm text-white/70">A project frame for run coordination and output review.</p>
            </div>
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-700">Last updated</p>
              <p className="mt-3 text-2xl font-semibold text-foreground">{formatDate(project.updatedAt)}</p>
              <p className="mt-1 text-sm text-slate-700">See the run history and saved outputs for this initiative.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)] sm:p-6">
        <Tabs defaultValue="runs">
          <TabsList className="grid w-full grid-cols-2 rounded-2xl bg-slate-50 p-1">
            <TabsTrigger value="runs" className="rounded-xl text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Runs ({runs.length})
            </TabsTrigger>
            <TabsTrigger value="saved" className="rounded-xl text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Saved ({saved.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="runs" className="mt-6">
            {runs.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-slate-200 bg-gradient-to-b from-slate-50 to-white p-12 text-center">
                <Bot size={28} className="mx-auto text-slate-700" />
                <p className="mt-4 text-sm text-slate-700">No runs captured yet.</p>
                <Button size="sm" asChild className="mt-6">
                  <Link href="/app/agents">Start a run</Link>
                </Button>
              </div>
            ) : (
              <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
                {runs.map((run, index) => (
                  <Link
                    key={run.id}
                    href={`/app/run/${run.agentId}`}
                    className={cn(
                      'group flex items-start gap-3 p-4 transition-colors hover:bg-slate-50/70',
                      index < runs.length - 1 && 'border-b border-slate-200'
                    )}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
                      <Bot size={15} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">{run.agentName}</p>
                        <DivisionBadge division={run.agentDivision} size="sm" />
                        <span
                          className={cn(
                            'rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]',
                            run.status === 'completed'
                              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                              : 'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
                          )}
                        >
                          {run.status}
                        </span>
                        <span className="ml-auto text-xs text-slate-700">{formatDate(run.createdAt)}</span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-700">{run.task}</p>
                    </div>
                    <span className="mt-2 text-slate-700 transition-colors group-hover:text-foreground">
                      <ArrowRight size={13} />
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved" className="mt-6">
            {saved.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-slate-200 bg-gradient-to-b from-slate-50 to-white p-12 text-center">
                <p className="text-sm text-slate-700">No saved deliverables in this project yet.</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {saved.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-[1.35rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                        <p className="mt-1 text-xs text-slate-700">
                          {item.agentName} · {formatDate(item.createdAt)}
                        </p>
                      </div>
                      <Bookmark size={14} className="shrink-0 text-slate-700" />
                    </div>
                    <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-700">{item.content}</p>
                  </article>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild size="sm">
          <Link href="/app/agents">
            <Bot size={13} className="mr-1.5" /> Run specialist
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href="/app/history">
            <ArrowRight size={13} className="mr-1.5" /> View all runs
          </Link>
        </Button>
      </div>
    </div>
  )
}
