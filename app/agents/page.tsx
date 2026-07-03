'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { SEED_AGENTS, DIVISIONS } from '@/lib/data/seed-agents'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { PlanBadge } from '@/components/shared/PlanBadge'
import { ArrowRight, Lock, Search } from 'lucide-react'
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
    <div style={{ backgroundColor: '#fbfbfa' }} className="min-h-screen">
      <PublicNavbar />

      <main>
        {/* ── Header dark ── */}
        <section className="border-b border-[#1e3431] pt-[4.75rem]" style={{ backgroundColor: '#060a10' }}>
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#789b96]">Agent library</p>
            <h1 className="mt-4 text-4xl font-semibold leading-[0.96] tracking-[-0.02em] text-[#f5fbfa] text-balance md:text-6xl">
              Find the right<br />
              <span className="font-light text-[#789b96]">specialist for the job.</span>
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-7 text-[#9db7b1]">
              {SEED_AGENTS.filter(a => a.isActive).length} specialist agents across {DIVISIONS.length} divisions. Browse, filter, and inspect each agent before signing up.
            </p>
          </div>
        </section>

        {/* ── Filter bar ── */}
        <section className="sticky top-[4.75rem] z-30 border-b border-[#d8e5e2] bg-[#fbfbfa]/90 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center">
              {/* Search */}
              <div className="relative w-full max-w-xs">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#789b96]" />
                <input
                  type="text"
                  placeholder="Search agents..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-9 w-full border border-[#d8e5e2] bg-[#f1f6f4] pl-8 pr-4 text-sm text-[#173634] outline-none placeholder:text-[#a7b9b4] focus:border-[#8fb2aa]"
                />
              </div>

              {/* Division chips */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveDivision(null)}
                  className={cn(
                    'px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] border transition-colors',
                    !activeDivision
                      ? 'border-[#173634] bg-[#173634] text-[#f5fbfa]'
                      : 'border-[#d8e5e2] bg-[#f1f6f4] text-[#65706d] hover:border-[#8fb2aa]/40 hover:bg-[#edf4f1] hover:text-[#173634]'
                  )}
                >
                  All
                </button>
                {DIVISIONS.map((division) => (
                  <button
                    key={division}
                    onClick={() => setActiveDivision(activeDivision === division ? null : division)}
                    className={cn(
                      'px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] border transition-colors',
                      activeDivision === division
                        ? 'border-[#173634] bg-[#173634] text-[#f5fbfa]'
                        : 'border-[#d8e5e2] bg-[#f1f6f4] text-[#65706d] hover:border-[#8fb2aa]/40 hover:bg-[#edf4f1] hover:text-[#173634]'
                    )}
                  >
                    {division}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Agents grid ── */}
        <section style={{ backgroundColor: '#f1f6f4' }} className="border-b border-[#d8e5e2]">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
            {filtered.length === 0 ? (
              <div className="border border-[#d8e5e2] bg-[#fbfbfa] py-24 text-center">
                <p className="text-sm text-[#65706d]">No agents match your search.</p>
              </div>
            ) : (
              <div className="border border-[#d8e5e2] bg-[#d8e5e2]">
                <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((agent) => {
                    const hasAccess = canAccessAgent(MOCK_USER.plan, agent.planRequired)
                    return (
                      <article key={agent.id} className="n3-card relative flex flex-col bg-[#fbfbfa] p-6 transition-colors hover:bg-[#f1f6f4]">
                        {!hasAccess && (
                          <div className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center bg-[#173634] text-[#d9e3e0]">
                            <Lock size={11} />
                          </div>
                        )}
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <DivisionBadge division={agent.division} size="sm" />
                          <PlanBadge plan={agent.planRequired} size="sm" />
                        </div>
                        <h2 className="text-sm font-semibold text-[#173634]">{agent.name}</h2>
                        <p className="mt-2 text-sm leading-7 text-[#65706d]">{agent.shortDescription}</p>

                        <div className="mt-4">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a7b9b4]">Best for</p>
                          <p className="mt-1.5 text-sm leading-6 text-[#52605d]">{agent.whenToUse}</p>
                        </div>

                        <div className="mt-6 flex items-center gap-2">
                          {hasAccess ? (
                            <>
                              <Link
                                href={`/agents/${agent.slug}`}
                                className="flex-1 border border-[#d8e5e2] bg-[#f1f6f4] px-3 py-2 text-center text-xs font-semibold text-[#52605d] transition-colors hover:border-[#8fb2aa]/40 hover:bg-[#edf4f1] hover:text-[#173634]"
                              >
                                Details
                              </Link>
                              <Link
                                href={`/app/run/${agent.slug}`}
                                className="flex flex-1 items-center justify-center gap-1 bg-[#173634] px-3 py-2 text-xs font-semibold text-[#f5fbfa] transition-colors hover:bg-[#0d1f1d]"
                              >
                                Run <ArrowRight size={11} />
                              </Link>
                            </>
                          ) : (
                            <Link
                              href="/app/billing"
                              className="flex w-full items-center justify-center gap-1.5 border border-[#d8e5e2] bg-[#f1f6f4] px-3 py-2 text-xs font-semibold text-[#65706d] transition-colors hover:border-[#8fb2aa]/40 hover:bg-[#edf4f1] hover:text-[#173634]"
                            >
                              Upgrade to unlock <ArrowRight size={11} />
                            </Link>
                          )}
                        </div>
                      </article>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
