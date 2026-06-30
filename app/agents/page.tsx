'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { SEED_AGENTS, DIVISIONS } from '@/lib/data/seed-agents'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { PlanBadge } from '@/components/shared/PlanBadge'
import { Search, ArrowRight, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PublicAgentsPage() {
  const [search, setSearch] = useState('')
  const [activeDivision, setActiveDivision] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return SEED_AGENTS.filter((a) => {
      const matchSearch =
        !search ||
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
        a.division.toLowerCase().includes(search.toLowerCase())
      const matchDivision = !activeDivision || a.division === activeDivision
      return matchSearch && matchDivision && a.isActive
    })
  }, [search, activeDivision])

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-foreground mb-2">Agent library</h1>
          <p className="text-muted-foreground text-sm">
            {SEED_AGENTS.length} specialized agents across {DIVISIONS.length} divisions.
            <Link href="/signup" className="ml-1 text-primary hover:underline">
              Sign up to run them.
            </Link>
          </p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search agents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveDivision(null)}
              className={cn(
                'px-3 py-1 text-xs rounded border transition-colors',
                !activeDivision
                  ? 'bg-foreground text-background border-foreground'
                  : 'border-border bg-white text-muted-foreground hover:text-foreground'
              )}
            >
              All
            </button>
            {DIVISIONS.map((div) => (
              <button
                key={div}
                onClick={() => setActiveDivision(activeDivision === div ? null : div)}
                className={cn(
                  'px-3 py-1 text-xs rounded border transition-colors',
                  activeDivision === div
                    ? 'bg-foreground text-background border-foreground'
                    : 'border-border bg-white text-muted-foreground hover:text-foreground'
                )}
              >
                {div}
              </button>
            ))}
          </div>
        </div>

        {/* Agent grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm text-muted-foreground">No agents match your search.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((agent) => {
              const isPremium = agent.planRequired !== 'free'
              return (
                <div
                  key={agent.id}
                  className="relative flex flex-col p-5 rounded-lg border border-border bg-white hover:border-primary/30 hover:shadow-sm transition-all group"
                >
                  {isPremium && (
                    <div className="absolute top-4 right-4 text-muted-foreground/40">
                      <Lock size={13} />
                    </div>
                  )}
                  <div className="flex items-start gap-2 mb-3">
                    <DivisionBadge division={agent.division} size="sm" />
                    <PlanBadge plan={agent.planRequired} size="sm" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1.5">{agent.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-4">
                    {agent.shortDescription}
                  </p>
                  <div className="flex items-center gap-2 mt-auto">
                    <Button variant="outline" size="sm" asChild className="flex-1 text-xs h-7">
                      <Link href={`/agents/${agent.slug}`}>View details</Link>
                    </Button>
                    <Button size="sm" asChild className="flex-1 text-xs h-7">
                      <Link href="/signup">
                        Run <ArrowRight size={11} className="ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* CTA */}
        <div className="mt-14 pt-10 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Ready to run your first agent?</h3>
            <p className="text-xs text-muted-foreground">Free plan includes 5 runs per month. No credit card required.</p>
          </div>
          <Button size="sm" asChild>
            <Link href="/signup">
              Start free <ArrowRight size={13} className="ml-1.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
