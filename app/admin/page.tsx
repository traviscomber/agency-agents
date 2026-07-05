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
    { label: 'Saved deliverables', value: MOCK_SAVED_OUTPUTS.length, icon: Bookmark },
    { label: 'MRR (mock)', value: `$${MOCK_MRR.toLocaleString()}`, icon: TrendingUp },
  ]

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      {/* Header */}
      <section className="mb-8">
        <h1 className="text-4xl font-light tracking-[-0.02em] text-[#173634]">Platform Dashboard</h1>
        <p className="mt-2 text-base text-[#555a56]">Overview and key metrics.</p>
      </section>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="space-y-3 border border-[#d8e5e2] bg-white px-5 py-4">
            <div className="flex items-center gap-2">
              <Icon size={16} className="text-[#8fb2aa]" />
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#555a56]">{label}</p>
            </div>
            <p className="text-3xl font-semibold text-[#173634]">{value}</p>
          </div>
        ))}
      </div>

      {/* Sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent runs */}
        <div className="space-y-3 border border-[#d8e5e2] bg-white p-5">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#555a56]">Recent runs</h2>
          <div className="space-y-2">
            {MOCK_RUNS.slice(0, 6).map((run) => (
              <div key={run.id} className="flex items-center justify-between gap-3 border-t border-[#d8e5e2] pt-2 first:border-0 first:pt-0">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-[#173634]">{run.agentName}</p>
                  <p className="truncate text-xs text-[#555a56]">{run.task}</p>
                </div>
                <span
                  className={`shrink-0 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${
                    run.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-[#f1f6f4] text-[#555a56]'
                  }`}
                >
                  {run.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Runs by division */}
        <div className="space-y-3 border border-[#d8e5e2] bg-white p-5">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#555a56]">Runs by division</h2>
          <div className="space-y-3">
            {Object.entries(runsByDivision)
              .sort(([, a], [, b]) => b - a)
              .map(([division, count]) => (
                <div key={division} className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <DivisionBadge division={division} />
                    <span className="text-xs font-semibold text-[#173634]">{count}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden bg-[#e8ede9]">
                    <div
                      className="h-full bg-[#8fb2aa]"
                      style={{ width: `${(count / MOCK_RUNS.length) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
