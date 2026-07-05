'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { SEED_AGENTS, DIVISIONS } from '@/lib/data/seed-agents'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { PlanBadge } from '@/components/shared/PlanBadge'
import { ArrowRight, Lock, Search, ShieldCheck, Workflow, Layers3 } from 'lucide-react'
import { canAccessAgent } from '@/lib/types'
import { MOCK_USER } from '@/lib/data/mock-store'
import { cn } from '@/lib/utils'
import { agentsPageCopy, type MarketingLocale } from '@/lib/marketing-i18n'
import { PublicNavbar } from '@/components/public/PublicNavbar'

const CURATION_ICONS = [Workflow, ShieldCheck, Layers3]

export function LocalizedAgentsPage({ locale }: { locale: MarketingLocale }) {
  const [search, setSearch] = useState('')
  const [activeDivision, setActiveDivision] = useState<string | null>(null)
  const copy = agentsPageCopy[locale]

  const filtered = useMemo(() => {
    return SEED_AGENTS.filter((agent) => {
      const matchSearch =
        !search ||
        agent.name.toLowerCase().includes(search.toLowerCase()) ||
        agent.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
        agent.division.toLowerCase().includes(search.toLowerCase()) ||
        agent.marketFocus?.toLowerCase().includes(search.toLowerCase()) ||
        agent.twinProfile?.industries.some((industry) => industry.toLowerCase().includes(search.toLowerCase()))
      const matchDivision = !activeDivision || agent.division === activeDivision
      return matchSearch && matchDivision && agent.isActive
    })
  }, [search, activeDivision])

  const visibleSummary = copy.summary
    .replace('profilesCount', String(SEED_AGENTS.filter((agent) => agent.isActive).length))
    .replace('divisionsCount', String(DIVISIONS.length))

  return (
    <div className="min-h-screen bg-[#fbfbfa]">
      <PublicNavbar />
      <main>
        <section className="relative overflow-hidden border-b border-[#1e3431] pt-[4.75rem]" style={{ backgroundColor: '#060a10' }}>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(143,178,170,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(143,178,170,0.04) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
          <div className="pointer-events-none absolute left-0 top-0 h-[560px] w-[560px]" style={{ background: 'radial-gradient(circle, rgba(143,178,170,0.14) 0%, transparent 62%)' }} />
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-end">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#789b96]">{copy.eyebrow}</p>
                <h1 className="mt-4 text-4xl font-semibold leading-[0.96] tracking-[-0.03em] text-[#f5fbfa] md:text-6xl">
                  {copy.title}
                </h1>
                <p className="mt-5 max-w-xl text-sm leading-7 text-[#9db7b1]">{visibleSummary}</p>
              </div>

              <div className="grid gap-3">
                {copy.curationSignals.map(([title, desc], index) => {
                  const Icon = CURATION_ICONS[index]
                  return (
                    <div key={title} className="border border-[#1e3431] bg-[#0d1917] p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center bg-[#142522] text-[#8fb2aa]">
                          <Icon size={15} />
                        </div>
                        <p className="text-sm font-semibold text-white">{title}</p>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-[#d9e3e0]">{desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="sticky top-[4.75rem] z-30 border-b border-[#d8e5e2] bg-[#fbfbfa]/90 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col gap-3 py-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="relative w-full max-w-sm">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#789b96]" />
                  <input
                    type="text"
                    placeholder={copy.searchPlaceholder}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-10 w-full border border-[#d8e5e2] bg-[#f1f6f4] pl-9 pr-4 text-sm text-[#173634] outline-none placeholder:text-[#a7b9b4] focus:border-[#8fb2aa]"
                  />
                </div>

                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#789b96]">
                  {filtered.length} {copy.visibleProfiles}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveDivision(null)}
                  className={cn(
                    'rounded-full px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] border transition-colors',
                    !activeDivision
                      ? 'border-[#173634] bg-[#173634] text-[#f5fbfa]'
                      : 'border-[#d8e5e2] bg-[#f1f6f4] text-[#65706d] hover:border-[#8fb2aa]/40 hover:bg-[#edf4f1] hover:text-[#173634]'
                  )}
                >
                  {copy.all}
                </button>
                {DIVISIONS.map((division) => (
                  <button
                    key={division}
                    onClick={() => setActiveDivision(activeDivision === division ? null : division)}
                    className={cn(
                      'rounded-full px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] border transition-colors',
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

        <section className="border-b border-[#d8e5e2] bg-[#f1f6f4]">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
            {filtered.length === 0 ? (
              <div className="border border-[#d8e5e2] bg-[#fbfbfa] py-24 text-center">
                <p className="text-sm text-[#65706d]">{copy.noResults}</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((agent) => {
                  const hasAccess = canAccessAgent(MOCK_USER.plan, agent.planRequired)

                  return (
                    <article key={agent.id} className="relative flex flex-col border border-[#d8e5e2] bg-white p-6 shadow-[0_18px_42px_-34px_rgba(15,23,42,0.35)] transition-transform hover:-translate-y-1">
                      {!hasAccess && (
                        <div className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center bg-[#173634] text-[#d9e3e0]">
                          <Lock size={11} />
                        </div>
                      )}

                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div className="flex flex-wrap gap-2">
                          <DivisionBadge division={agent.division} size="sm" />
                          {agent.roleMode === 'digital-twin' ? <span className="n3-chip-soft">{copy.digitalTwin}</span> : null}
                          {agent.marketFocus ? <span className="n3-chip-soft">{agent.marketFocus}</span> : null}
                        </div>
                        <PlanBadge plan={agent.planRequired} size="sm" />
                      </div>

                      <h2 className="text-lg font-semibold text-[#173634]">{agent.name}</h2>
                      <p className="mt-2 text-sm leading-7 text-[#65706d]">{agent.shortDescription}</p>

                      <div className="mt-4 border border-[#d8e5e2] bg-[#f8fbfa] p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8fb2aa]">{copy.bestUsedWhen}</p>
                        <p className="mt-1.5 text-sm leading-6 text-[#52605d]">{agent.whenToUse}</p>
                      </div>

                      {agent.twinProfile ? (
                        <div className="mt-4 border border-[#d8e5e2] bg-white p-4">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8fb2aa]">{copy.twinFit}</p>
                          <p className="mt-1.5 text-sm font-medium text-[#173634]">{agent.twinProfile.roleLabel} · {agent.twinProfile.geography}</p>
                          <p className="mt-1.5 text-sm leading-6 text-[#52605d]">{agent.twinProfile.replacementScope}</p>
                          <div className="mt-3 grid gap-2 sm:grid-cols-2">
                            <div className="rounded-xl border border-[#d8e5e2] bg-[#f8fbfa] px-3 py-2">
                              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">{copy.replacement}</p>
                              <p className="mt-1 text-sm font-medium text-[#173634]">{agent.twinProfile.operationalReplacementScore ?? 0}%</p>
                            </div>
                            <div className="rounded-xl border border-[#d8e5e2] bg-[#f8fbfa] px-3 py-2">
                              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">{copy.supervision}</p>
                              <p className="mt-1 text-sm font-medium capitalize text-[#173634]">{agent.twinProfile.supervisionLevel ?? 'medium'}</p>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      <div className="mt-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8fb2aa]">{copy.primaryOutput}</p>
                        <p className="mt-2 text-sm text-[#173634]">{agent.outputFormat[0]}</p>
                      </div>

                      <div className="mt-6 flex items-center gap-2">
                        {hasAccess ? (
                          <>
                            <Link
                              href={`/agents/${agent.slug}`}
                              className="flex-1 border border-[#d8e5e2] bg-[#f1f6f4] px-3 py-2.5 text-center text-xs font-semibold text-[#52605d] transition-colors hover:border-[#8fb2aa]/40 hover:bg-[#edf4f1] hover:text-[#173634]"
                            >
                              {copy.inspect}
                            </Link>
                            <Link
                              href={`/app/run/${agent.slug}`}
                              className="flex flex-1 items-center justify-center gap-1 bg-[#173634] px-3 py-2.5 text-xs font-semibold text-[#f5fbfa] transition-colors hover:bg-[#0d1f1d]"
                            >
                              {copy.openRun} <ArrowRight size={11} />
                            </Link>
                          </>
                        ) : (
                          <Link
                            href="/app/billing"
                            className="flex w-full items-center justify-center gap-1.5 border border-[#d8e5e2] bg-[#f1f6f4] px-3 py-2.5 text-xs font-semibold text-[#65706d] transition-colors hover:border-[#8fb2aa]/40 hover:bg-[#edf4f1] hover:text-[#173634]"
                          >
                            {copy.upgrade} <ArrowRight size={11} />
                          </Link>
                        )}
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
