import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { MOCK_USER, MOCK_RUNS } from '@/lib/data/mock-store'
import { getPlanById } from '@/lib/data/plans'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { Bot, ArrowRight } from 'lucide-react'

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
    acc[run.agentId].count++
    return acc
  }, {})

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground mb-1">Usage</h1>
        <p className="text-sm text-muted-foreground">
          Your usage for the current billing period.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {/* Plan */}
        <div className="col-span-full lg:col-span-1 rounded-lg border border-border bg-white p-5">
          <p className="text-xs text-muted-foreground mb-1">Current plan</p>
          <p className="text-2xl font-semibold text-foreground capitalize mb-3">{plan?.name}</p>
          <p className="text-xs text-muted-foreground mb-4">
            {plan?.price === null
              ? 'Custom pricing'
              : plan?.price === 0
              ? 'Free forever'
              : `$${plan?.price}/month`}
          </p>
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link href="/app/billing">Manage billing <ArrowRight size={12} className="ml-1" /></Link>
          </Button>
        </div>

        {/* Runs */}
        <div className="rounded-lg border border-border bg-white p-5">
          <p className="text-xs text-muted-foreground mb-1">Runs this period</p>
          <p className="text-2xl font-semibold text-foreground mb-1">
            {runsUsed} <span className="text-sm font-normal text-muted-foreground">/ {runsLimit}</span>
          </p>
          <Progress value={usagePercent} className="h-1.5 mb-2" />
          <p className="text-xs text-muted-foreground">
            {runsLimit - runsUsed > 0
              ? `${runsLimit - runsUsed} runs remaining`
              : 'Limit reached — upgrade to continue'}
          </p>
        </div>

        {/* Period */}
        <div className="rounded-lg border border-border bg-white p-5">
          <p className="text-xs text-muted-foreground mb-1">Billing period</p>
          <p className="text-sm font-medium text-foreground mb-0.5">Jan 1 – Jan 31, 2024</p>
          <p className="text-xs text-muted-foreground">Resets in 11 days</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* By division */}
        <div className="rounded-lg border border-border bg-white p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Runs by division</h2>
          {Object.keys(runsByDivision).length === 0 ? (
            <p className="text-xs text-muted-foreground">No runs yet.</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(runsByDivision)
                .sort(([, a], [, b]) => b - a)
                .map(([division, count]) => (
                  <div key={division} className="flex items-center justify-between">
                    <DivisionBadge division={division} />
                    <div className="flex items-center gap-3 flex-1 ml-3">
                      <Progress
                        value={(count / runsUsed) * 100}
                        className="h-1.5 flex-1"
                      />
                      <span className="text-xs font-medium text-foreground w-4 text-right shrink-0">
                        {count}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* By agent */}
        <div className="rounded-lg border border-border bg-white p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Runs by agent</h2>
          {Object.keys(runsByAgent).length === 0 ? (
            <p className="text-xs text-muted-foreground">No runs yet.</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(runsByAgent)
                .sort(([, a], [, b]) => b.count - a.count)
                .map(([agentId, info]) => (
                  <div key={agentId} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <Bot size={13} className="text-muted-foreground shrink-0" />
                      <p className="text-xs font-medium text-foreground truncate">{info.name}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-1 ml-2">
                      <Progress
                        value={(info.count / runsUsed) * 100}
                        className="h-1.5 flex-1"
                      />
                      <span className="text-xs font-medium text-foreground w-4 text-right shrink-0">
                        {info.count}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Upgrade nudge */}
      {(usagePercent >= 60 && MOCK_USER.plan !== 'enterprise') && (
        <div className="mt-6 rounded-lg border border-border bg-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-0.5">
              You have used {Math.round(usagePercent)}% of your runs
            </h3>
            <p className="text-xs text-muted-foreground">
              Upgrade to get more runs and unlock all agents.
            </p>
          </div>
          <Button size="sm" asChild>
            <Link href="/app/billing">Upgrade plan</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
