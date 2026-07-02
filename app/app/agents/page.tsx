'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SEED_AGENTS, DIVISIONS } from '@/lib/data/seed-agents'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { PlanBadge } from '@/components/shared/PlanBadge'
import { MOCK_USER } from '@/lib/data/mock-store'
import { canAccessAgent } from '@/lib/types'
import { ArrowRight, Lock, Search, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AppAgentsPage() {
  const [search, setSearch] = useState('')
  const [activeDivision, setActiveDivision] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return SEED_AGENTS.filter((agent) => {
      const matchSearch =
        !search ||
        agent.name.toLowerCase().includes(search.toLowerCase()) ||
        agent.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
        agent.division.toLowerCase().includes(search.toLowerCase())
      const matchDivision = !activeDivision || agent.division === activeDivision
      return matchSearch && matchDivision && agent.isActive
    })
  }, [search, activeDivision])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <section className="mb-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-white to-slate-50 shadow-[0_18px_60px_-44px_rgba(15,23,42,0.45)]">
        <div className="grid gap-6 p-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:p-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-600">
              <Sparkles size={12} className="text-primary" />
              Agent library
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Agents, organized as a workbench.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              {SEED_AGENTS.length} specialists available. You are on the{' '}
              <span className="font-medium text-foreground capitalize">{MOCK_USER.plan}</span> plan.
              Filter by division or search for a task-shaped fit.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ['Access model', 'Locked agents are clearly marked with their required plan.'],
              ['Fast path', 'The primary CTA is always to run the current agent or upgrade.'],
              ['Task clarity', 'Each card shows when to use the specialist and what it produces.'],
              ['Workspace fit', 'The grid density matches the rest of the product dashboard.'],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-6 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)] sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative w-full max-w-md">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <Input
              placeholder="Search agents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 rounded-2xl border-slate-200 bg-slate-50 pl-9 text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveDivision(null)}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-xs transition-colors',
                  !activeDivision
                    ? 'border-slate-950 bg-slate-950 text-white'
                    : 'border-slate-200 bg-white text-slate-600 hover:text-slate-950'
                )}
              >
                All
            </button>
            {DIVISIONS.map((division) => (
              <button
                key={division}
                onClick={() => setActiveDivision(activeDivision === division ? null : division)}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-xs transition-colors',
                    activeDivision === division
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-slate-200 bg-white text-slate-600 hover:text-slate-950'
                  )}
                >
                  {division}
                </button>
            ))}
          </div>
        </div>
      </section>

      {filtered.length === 0 ? (
        <div className="rounded-[1.5rem] border border-slate-200 bg-white py-20 text-center shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
          <p className="text-sm text-slate-600">No agents match your search.</p>
        </div>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((agent) => {
            const hasAccess = canAccessAgent(MOCK_USER.plan, agent.planRequired)
            return (
              <article
                key={agent.id}
                className={cn(
                  'group relative flex flex-col overflow-hidden rounded-[1.35rem] border bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_44px_-34px_rgba(15,23,42,0.6)]',
                  hasAccess ? 'border-slate-200 hover:border-primary/25' : 'border-slate-200/80 opacity-95'
                )}
              >
                {!hasAccess && (
                  <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                    <Lock size={12} />
                  </div>
                )}
                <div className="mb-3 flex items-start justify-between gap-3">
                  <DivisionBadge division={agent.division} size="sm" />
                  <PlanBadge plan={agent.planRequired} size="sm" />
                </div>
                <h2 className="text-sm font-semibold tracking-tight text-foreground">{agent.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{agent.shortDescription}</p>

                <div className="mt-4 space-y-2">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">Best for</p>
                  <p className="text-sm leading-relaxed text-foreground/90">{agent.whenToUse}</p>
                </div>

                <div className="mt-5 flex items-center gap-2">
                  {hasAccess ? (
                    <>
                      <Button variant="outline" size="sm" asChild className="flex-1 text-xs">
                        <Link href={`/app/agents/${agent.slug}`}>Details</Link>
                      </Button>
                      <Button size="sm" asChild className="flex-1 text-xs">
                        <Link href={`/app/run/${agent.slug}`}>
                          Run <ArrowRight size={11} className="ml-1" />
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" size="sm" asChild className="w-full text-xs">
                      <Link href="/app/billing">
                        Upgrade to unlock <ArrowRight size={11} className="ml-1" />
                      </Link>
                    </Button>
                  )}
                </div>
              </article>
            )
          })}
        </section>
      )}
    </div>
  )
}
