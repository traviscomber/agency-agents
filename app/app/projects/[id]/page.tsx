import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { MOCK_PROJECTS, MOCK_RUNS, MOCK_SAVED_OUTPUTS } from '@/lib/data/mock-store'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { ArrowLeft, ArrowRight, Bot, Bookmark, Calendar, FolderOpen, Sparkles } from 'lucide-react'
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
        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={13} /> Back to projects
      </Link>

      <section className="mt-5 overflow-hidden rounded-[2rem] border border-border/70 bg-gradient-to-br from-white via-white to-muted/30 shadow-[0_18px_60px_-44px_rgba(15,23,42,0.45)]">
        <div className="grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              <Sparkles size={12} className="text-primary" />
              Project workspace
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {project.name}
            </h1>
            {project.description && (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {project.description}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5">
                <Bot size={11} /> {runs.length} runs
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5">
                <Bookmark size={11} /> {saved.length} saved
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5">
                <Calendar size={11} /> Updated {formatDate(project.updatedAt)}
              </span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[1.25rem] border border-border bg-slate-950 p-5 text-white shadow-[0_18px_40px_-24px_rgba(15,23,42,0.9)]">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">Status</p>
              <p className="mt-3 text-2xl font-semibold capitalize">{project.status}</p>
              <p className="mt-1 text-sm text-white/70">A project frame for run coordination and output review.</p>
            </div>
            <div className="rounded-[1.25rem] border border-border bg-white p-5 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Last updated</p>
              <p className="mt-3 text-2xl font-semibold text-foreground">{formatDate(project.updatedAt)}</p>
              <p className="mt-1 text-sm text-muted-foreground">Tracking work at a glance.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 rounded-[1.75rem] border border-border bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)] sm:p-6">
        <Tabs defaultValue="runs">
          <TabsList className="grid w-full grid-cols-2 rounded-2xl bg-muted/40 p-1">
            <TabsTrigger value="runs" className="rounded-xl text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Runs ({runs.length})
            </TabsTrigger>
            <TabsTrigger value="saved" className="rounded-xl text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Saved ({saved.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="runs" className="mt-6">
            {runs.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-border bg-muted/20 p-12 text-center">
                <Bot size={28} className="mx-auto text-muted-foreground/60" />
                <p className="mt-4 text-sm text-muted-foreground">No runs in this project yet.</p>
                <Button size="sm" asChild className="mt-6">
                  <Link href="/app/agents">Run an agent</Link>
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-border overflow-hidden rounded-[1.5rem] border border-border bg-white">
                {runs.map((run) => (
                  <Link
                    key={run.id}
                    href={`/app/run/${run.agentId}`}
                    className="group flex items-start gap-3 p-4 transition-colors hover:bg-slate-50/80"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-muted/60">
                      <Bot size={15} className="text-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">{run.agentName}</p>
                        <DivisionBadge division={run.agentDivision} size="sm" />
                        <span
                          className={cn(
                            'rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]',
                            run.status === 'completed'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-muted text-muted-foreground'
                          )}
                        >
                          {run.status}
                        </span>
                        <span className="ml-auto text-xs text-muted-foreground">{formatDate(run.createdAt)}</span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{run.task}</p>
                    </div>
                    <span className="mt-2 text-muted-foreground transition-colors group-hover:text-foreground">
                      <ArrowRight size={13} />
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved" className="mt-6">
            {saved.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-border bg-muted/20 p-12 text-center">
                <p className="text-sm text-muted-foreground">No saved outputs in this project yet.</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {saved.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-[1.35rem] border border-border bg-gradient-to-br from-slate-50 to-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {item.agentName} · {formatDate(item.createdAt)}
                        </p>
                      </div>
                      <Bookmark size={14} className="shrink-0 text-muted-foreground" />
                    </div>
                    <p className="mt-4 line-clamp-4 text-sm leading-6 text-muted-foreground">{item.content}</p>
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
            <Bot size={13} className="mr-1.5" /> Run agent
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
