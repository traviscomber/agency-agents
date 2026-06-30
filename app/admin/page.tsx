import { SEED_AGENTS } from '@/lib/data/seed-agents'
import { MOCK_RUNS, MOCK_PROJECTS, MOCK_SAVED_OUTPUTS } from '@/lib/data/mock-store'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { Bot, Users, History, FolderOpen, Bookmark, TrendingUp } from 'lucide-react'

const MOCK_USERS_COUNT = 128
const MOCK_MRR = 2847

export default function AdminDashboard() {
  const completedRuns = MOCK_RUNS.filter((r) => r.status === 'completed').length
  const activeAgents = SEED_AGENTS.filter((a) => a.isActive).length

  const runsByDivision = MOCK_RUNS.reduce<Record<string, number>>((acc, run) => {
    acc[run.agentDivision] = (acc[run.agentDivision] || 0) + 1
    return acc
  }, {})

  const STATS = [
    { label: 'Total users', value: MOCK_USERS_COUNT, icon: Users },
    { label: 'Total runs', value: MOCK_RUNS.length, icon: History },
    { label: 'Active agents', value: activeAgents, icon: Bot },
    { label: 'Projects', value: MOCK_PROJECTS.length, icon: FolderOpen },
    { label: 'Saved outputs', value: MOCK_SAVED_OUTPUTS.length, icon: Bookmark },
    { label: 'MRR (mock)', value: `$${MOCK_MRR.toLocaleString()}`, icon: TrendingUp },
  ]

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground mb-1">Admin dashboard</h1>
        <p className="text-sm text-muted-foreground">Platform overview and key metrics.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {STATS.map(({ label, value, icon: Icon }) => (
          <div key={label} className="p-4 rounded-lg border border-border bg-white">
            <div className="flex items-center gap-2 mb-2">
              <Icon size={14} className="text-muted-foreground" />
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
            <p className="text-2xl font-semibold text-foreground">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent runs */}
        <div className="rounded-lg border border-border bg-white p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Recent runs</h2>
          <div className="space-y-3">
            {MOCK_RUNS.map((run) => (
              <div key={run.id} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded bg-muted flex items-center justify-center shrink-0">
                  <Bot size={12} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{run.agentName}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{run.task}</p>
                </div>
                <span
                  className={`text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0 ${
                    run.status === 'completed'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {run.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Usage by division */}
        <div className="rounded-lg border border-border bg-white p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Runs by division</h2>
          <div className="space-y-3">
            {Object.entries(runsByDivision)
              .sort(([, a], [, b]) => b - a)
              .map(([division, count]) => (
                <div key={division} className="flex items-center justify-between gap-3">
                  <DivisionBadge division={division} />
                  <div className="flex items-center gap-2 flex-1 ml-2">
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${(count / MOCK_RUNS.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-foreground w-4 text-right">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
