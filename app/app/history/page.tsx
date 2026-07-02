import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MOCK_RUNS } from '@/lib/data/mock-store'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { ArrowRight, Bot, Calendar, FolderOpen, Sparkles } from 'lucide-react'

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export default function HistoryPage() {
  const completedRuns = MOCK_RUNS.filter((run) => run.status === 'completed').length
  const failedRuns = MOCK_RUNS.filter((run) => run.status === 'failed').length

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-white via-white to-slate-50 p-6 sm:p-8 shadow-[0_18px_60px_-44px_rgba(15,23,42,0.45)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-600">
              <Sparkles size={12} className="text-primary" />
              Brandbook aligned
            </div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-600">
              Activity
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              Run history with enough context to understand what happened.
            </h1>
            <p className="mt-3 max-w-xl text-sm text-slate-600 sm:text-base">
              Every agent execution, result, and project link in one chronological view.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:min-w-[360px]">
            <div className="rounded-2xl border border-slate-200 bg-white p-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-600">Total</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">{MOCK_RUNS.length}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-600">Done</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">{completedRuns}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-600">Failed</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">{failedRuns}</p>
            </div>
          </div>
        </div>
      </div>

      {MOCK_RUNS.length === 0 ? (
        <div className="mt-6 rounded-[28px] border border-slate-200 bg-white p-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
            <Bot size={26} className="text-slate-600" />
          </div>
          <h3 className="text-base font-semibold text-foreground">No runs yet</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
            Run an agent to populate this timeline with execution details and outcomes.
          </p>
          <Button size="sm" asChild className="mt-6">
            <Link href="/app/agents">Browse agents</Link>
          </Button>
        </div>
      ) : (
          <div className="mt-6 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-sm font-semibold text-foreground">Timeline</h2>
                <p className="mt-1 text-xs text-slate-600">Most recent execution first.</p>
                </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/app/agents">
                  Start run <ArrowRight size={12} className="ml-1" />
                </Link>
              </Button>
            </div>

            <div className="divide-y divide-slate-200">
              {MOCK_RUNS.map((run) => (
                <article key={run.id} className="py-5 first:pt-0 last:pb-0">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-foreground">
                        <Bot size={18} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-semibold text-foreground">{run.agentName}</h3>
                          <DivisionBadge division={run.agentDivision} size="sm" />
                          <span
                            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                              run.status === 'completed'
                                ? 'bg-emerald-50 text-emerald-700'
                                : run.status === 'failed'
                                  ? 'bg-rose-100 text-rose-800'
                                  : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {run.status}
                          </span>
                        </div>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                          {run.task}
                        </p>
                        {run.projectName && (
                          <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-600">
                            <FolderOpen size={11} />
                            {run.projectName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2 text-xs text-slate-600">
                      <Calendar size={11} />
                      {formatDate(run.createdAt)}
                    </div>
                  </div>

                  {run.status === 'completed' && (
                    <div className="mt-4">
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" asChild>
                        <Link href={`/app/run/${run.agentId}`}>
                          Re-run <ArrowRight size={12} className="ml-1" />
                        </Link>
                      </Button>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[28px] border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">Signals</p>
              <div className="mt-4 space-y-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs text-slate-600">Completion rate</p>
                  <p className="mt-1 text-2xl font-semibold text-foreground">
                    {MOCK_RUNS.length === 0 ? '0%' : `${Math.round((completedRuns / MOCK_RUNS.length) * 100)}%`}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs text-slate-600">Failure rate</p>
                  <p className="mt-1 text-2xl font-semibold text-foreground">
                    {MOCK_RUNS.length === 0 ? '0%' : `${Math.round((failedRuns / MOCK_RUNS.length) * 100)}%`}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">Next step</p>
              <h3 className="mt-2 text-sm font-semibold text-foreground">Review the agents that are getting the most reuse.</h3>
              <p className="mt-2 text-sm text-slate-600">
                The history view pairs well with the agent catalog when you want to compare usage and patterns.
              </p>
              <Button size="sm" className="mt-4" asChild>
                <Link href="/app/agents">
                  Browse agents <ArrowRight size={12} className="ml-1" />
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
