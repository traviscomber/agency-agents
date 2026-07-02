import { MOCK_RUNS } from '@/lib/data/mock-store'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { Bot, Calendar, Clock3, FolderOpen } from 'lucide-react'

export default function AdminRunsPage() {
  const completed = MOCK_RUNS.filter((run) => run.status === 'completed').length
  const failed = MOCK_RUNS.filter((run) => run.status === 'failed').length
  const running = MOCK_RUNS.filter((run) => run.status === 'running').length

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-white to-slate-50 shadow-[0_18px_60px_-44px_rgba(15,23,42,0.45)]">
        <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:p-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-600">
              <Clock3 size={12} className="text-primary" />
              Run monitor
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Execution log with the status signal surfaced first.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Track completed work, failed runs, and live jobs without burying the operational state in low-contrast chrome.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-[1.25rem] border border-slate-200 bg-slate-950 p-4 text-white shadow-[0_18px_40px_-24px_rgba(15,23,42,0.9)]">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">Total</p>
              <p className="mt-3 text-3xl font-semibold">{MOCK_RUNS.length}</p>
            </div>
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Completed</p>
              <p className="mt-3 text-3xl font-semibold text-emerald-600">{completed}</p>
            </div>
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Running</p>
              <p className="mt-3 text-3xl font-semibold text-sky-600">{running}</p>
            </div>
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Failed</p>
              <p className="mt-3 text-3xl font-semibold text-rose-600">{failed}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
        <div className="grid grid-cols-[auto_2fr_1fr_1fr_auto] gap-4 border-b border-slate-200 bg-slate-50 px-4 py-3">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Agent</span>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Task</span>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Division</span>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Date</span>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Status</span>
        </div>

        {MOCK_RUNS.map((run, i) => (
          <div
            key={run.id}
            className={`grid grid-cols-[auto_2fr_1fr_1fr_auto] items-start gap-4 px-4 py-3.5 ${
              i < MOCK_RUNS.length - 1 ? 'border-b border-slate-200' : ''
            }`}
          >
            <div className="flex min-w-0 items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-white">
                <Bot size={12} />
              </div>
              <p className="truncate text-sm font-medium text-foreground">{run.agentName}</p>
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm text-foreground">{run.task}</p>
              {run.projectName && (
                <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-600">
                  <FolderOpen size={9} />
                  {run.projectName}
                </p>
              )}
            </div>

            <DivisionBadge division={run.agentDivision} size="sm" />

            <p className="flex items-center gap-1 text-xs text-slate-600">
              <Calendar size={10} />
              {new Date(run.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </p>

            <span
              className={`inline-flex items-center rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                run.status === 'completed'
                  ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                  : run.status === 'failed'
                    ? 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'
                    : run.status === 'running'
                      ? 'bg-sky-50 text-sky-700 ring-1 ring-sky-200'
                      : 'bg-slate-100 text-slate-600 ring-1 ring-slate-200'
              }`}
            >
              {run.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
