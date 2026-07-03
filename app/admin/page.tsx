import { SEED_AGENTS } from '@/lib/data/seed-agents'
import { MOCK_RUNS, MOCK_PROJECTS, MOCK_SAVED_OUTPUTS } from '@/lib/data/mock-store'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { Bot, Bookmark, FolderOpen, History, TrendingUp, Users } from 'lucide-react'

const MOCK_USERS_COUNT = 128
const MOCK_MRR = 2847

export default function AdminDashboard() {
  const completedRuns = MOCK_RUNS.filter((run) => run.status === 'completed').length
  const activeAgents = SEED_AGENTS.filter((agent) => agent.isActive).length

  const runsByDivision = MOCK_RUNS.reduce<Record<string, number>>((acc, run) => {
    acc[run.agentDivision] = (acc[run.agentDivision] || 0) + 1
    return acc
  }, {})

  const stats = [
    { label: 'Total users', value: MOCK_USERS_COUNT, icon: Users },
    { label: 'Total runs', value: MOCK_RUNS.length, icon: History },
    { label: 'Active agents', value: activeAgents, icon: Bot },
    { label: 'Projects', value: MOCK_PROJECTS.length, icon: FolderOpen },
    { label: 'Saved outputs', value: MOCK_SAVED_OUTPUTS.length, icon: Bookmark },
    { label: 'MRR (mock)', value: `$${MOCK_MRR.toLocaleString()}`, icon: TrendingUp },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#ffffff_48%,#eef2ff_100%)] p-6 shadow-[0_18px_60px_-44px_rgba(15,23,42,0.45)] sm:p-8">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Admin dashboard</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-700">Platform overview and key metrics.</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-4 shadow-[0_12px_36px_-32px_rgba(15,23,42,0.45)]">
              <div className="mb-2 flex items-center gap-2">
                <Icon size={14} className="text-slate-700" />
                <p className="text-xs font-medium text-slate-700">{label}</p>
              </div>
              <p className="text-2xl font-semibold text-foreground">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Recent runs</h2>
          <div className="space-y-3">
            {MOCK_RUNS.map((run) => (
              <div key={run.id} className="flex items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-950 text-white">
                  <Bot size={12} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-foreground">{run.agentName}</p>
                  <p className="truncate text-[11px] text-slate-700">{run.task}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                    run.status === 'completed'
                      ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                      : 'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
                  }`}
                >
                  {run.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Runs by division</h2>
          <div className="space-y-3">
            {Object.entries(runsByDivision)
              .sort(([, a], [, b]) => b - a)
              .map(([division, count]) => (
                <div key={division} className="flex items-center justify-between gap-3">
                  <DivisionBadge division={division} />
                  <div className="ml-2 flex flex-1 items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-slate-950"
                        style={{ width: `${(count / MOCK_RUNS.length) * 100}%` }}
                      />
                    </div>
                    <span className="w-4 text-right text-xs font-medium text-foreground">{count}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
