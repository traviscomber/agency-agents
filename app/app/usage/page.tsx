import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { MOCK_USER, MOCK_RUNS } from '@/lib/data/mock-store'
import { getPlanById } from '@/lib/data/plans'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { ArrowRight, BarChart3, Bot, Calendar } from 'lucide-react'

export default function UsagePage() {
  const plan = getPlanById(MOCK_USER.plan)
  const runsUsed = MOCK_RUNS.length
  const runsLimit = plan?.monthlyRunLimit || 5
  const usagePercent = Math.min((runsUsed / runsLimit) * 100, 100)

  const runsByDivision = MOCK_RUNS.reduce<Record<string, number>>((acc, run) => {
    acc[run.agentDivision] = (acc[run.agentDivision] || 0) + 1
    return acc
  }, {})

  const runsByAgent = MOCK_RUNS.reduce<Record<string, { name: string; division: string; count: number }>>((acc, run) => {
    if (!acc[run.agentId]) {
      acc[run.agentId] = { name: run.agentName, division: run.agentDivision, count: 0 }
    }
    acc[run.agentId].count += 1
    return acc
  }, {})

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-white via-white to-slate-50 p-6 sm:p-8 shadow-[0_18px_60px_-44px_rgba(15,23,42,0.45)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-600">
              <BarChart3 size={12} className="text-primary" />
              Brandbook aligned usage
            </div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
              Usage
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              A clean view of run consumption and plan pressure.
            </h1>
            <p className="mt-3 max-w-xl text-sm text-slate-600 sm:text-base">
              Track how many runs are left, which divisions are driving usage, and when to upgrade.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:min-w-[360px]">
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Plan</p>
              <p className="mt-1 text-2xl font-semibold text-foreground capitalize">{plan?.name}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Used</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">{runsUsed}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Limit</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">{runsLimit}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[0.95fr_1.05fr] xl:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[28px] border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Current status</p>
              <h2 className="mt-2 text-lg font-semibold text-foreground">
                {plan?.price === null ? 'Custom plan' : plan?.price === 0 ? 'Free tier' : 'Paid plan'}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                {plan?.price === null
                  ? 'Custom pricing'
                  : plan?.price === 0
                    ? 'Free forever'
                    : `$${plan?.price}/month`}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-foreground">
              <Calendar size={18} />
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Monthly usage
              </span>
              <span className="text-xs text-slate-500">{Math.round(usagePercent)}%</span>
            </div>
            <Progress value={usagePercent} className="mt-3 h-2" />
            <p className="mt-3 text-sm text-slate-600">
              {runsLimit - runsUsed > 0
                ? `${runsLimit - runsUsed} runs remaining this period`
                : 'Limit reached - upgrade to continue'}
            </p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs text-slate-500">Billing period</p>
              <p className="mt-1 text-sm font-semibold text-foreground">Jan 1 - Jan 31, 2024</p>
              <p className="mt-1 text-xs text-slate-500">Resets in 11 days</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs text-slate-500">Plan density</p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {runsUsed === 0 ? 'No usage' : `${Math.round((runsUsed / runsLimit) * 10) / 10} runs per slot`}
              </p>
              <p className="mt-1 text-xs text-slate-500">Simple read on consumption pace.</p>
            </div>
          </div>

          <Button variant="outline" size="sm" className="mt-6 w-full" asChild>
            <Link href="/app/billing">
              Manage billing <ArrowRight size={12} className="ml-1" />
            </Link>
          </Button>
        </section>

        <section className="grid gap-4">
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Runs by division</h2>
                <p className="mt-1 text-xs text-slate-600">Distribution across the workspace map.</p>
              </div>
            </div>

            {Object.keys(runsByDivision).length === 0 ? (
              <p className="mt-4 text-sm text-slate-600">No runs yet.</p>
            ) : (
              <div className="mt-4 space-y-3">
                {Object.entries(runsByDivision)
                  .sort(([, a], [, b]) => b - a)
                  .map(([division, count]) => (
                    <div key={division} className="flex items-center gap-3">
                      <DivisionBadge division={division} />
                      <div className="flex flex-1 items-center gap-3">
                        <Progress value={(count / runsUsed) * 100} className="h-2 flex-1" />
                        <span className="w-6 shrink-0 text-right text-xs font-semibold text-foreground">
                          {count}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Runs by agent</h2>
                <p className="mt-1 text-xs text-slate-600">What the active agents are doing most often.</p>
              </div>
            </div>

            {Object.keys(runsByAgent).length === 0 ? (
              <p className="mt-4 text-sm text-slate-600">No runs yet.</p>
            ) : (
              <div className="mt-4 space-y-3">
                {Object.entries(runsByAgent)
                  .sort(([, a], [, b]) => b.count - a.count)
                  .map(([agentId, info]) => (
                    <div key={agentId} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <Bot size={13} className="shrink-0 text-slate-600" />
                            <p className="truncate text-sm font-semibold text-foreground">{info.name}</p>
                          </div>
                          <p className="mt-1 text-xs text-slate-500">Agent traffic grouped by execution count.</p>
                        </div>
                        <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-foreground">
                          {info.count}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center gap-3">
                        <DivisionBadge division={info.division} size="sm" />
                        <Progress value={(info.count / runsUsed) * 100} className="h-2 flex-1" />
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {(usagePercent >= 60 && MOCK_USER.plan !== 'enterprise') && (
        <div className="mt-6 flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Upgrade nudge</p>
            <h3 className="mt-1 text-sm font-semibold text-foreground">
              You have used {Math.round(usagePercent)}% of your runs.
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Upgrade to get more runs and unlock all agents.
            </p>
          </div>
          <Button size="sm" asChild>
            <Link href="/pricing">
              Compare plans <ArrowRight size={12} className="ml-1" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
