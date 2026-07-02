'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { SEED_AGENTS, DIVISIONS } from '@/lib/data/seed-agents'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { PlanBadge } from '@/components/shared/PlanBadge'
import { ArrowRight, Lock, Search, Sparkles } from 'lucide-react'
import { canAccessAgent } from '@/lib/types'
import { MOCK_USER } from '@/lib/data/mock-store'
import { cn } from '@/lib/utils'

export default function PublicAgentsPage() {
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_30%),linear-gradient(to_bottom,_#f8fafc,_#ffffff_22%,_#f8fafc_100%)]">
      <PublicNavbar />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <section className="mb-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#ffffff_52%,#f8fafc_100%)] shadow-[0_18px_60px_-44px_rgba(15,23,42,0.45)]">
          <div className="grid gap-8 p-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:p-8">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                <Sparkles size={12} className="text-primary" />
                Public agent library
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
                Find the right specialist for the job.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                {SEED_AGENTS.length} specialized agents across {DIVISIONS.length} divisions. Browse, filter, and inspect
                the work style of each agent before you sign up.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/signup">
                    Start free <ArrowRight size={14} className="ml-1.5" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/pricing">View pricing</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ['Specialists', 'Agents are organized by real discipline, not by generic chatbot labels.'],
                ['Structured output', 'Each agent is designed to produce a deliverable with a clear format.'],
                ['Access model', 'Plan badges make the gating model obvious before you commit.'],
                ['Fast scanning', 'Division chips and summaries help users compare options quickly.'],
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
                placeholder="Search by agent, division, or use case..."
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
                          <Link href={`/agents/${agent.slug}`}>Details</Link>
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
      </main>
    </div>
  )
}
