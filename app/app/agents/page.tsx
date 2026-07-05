'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { SEED_AGENTS, DIVISIONS } from '@/lib/data/seed-agents'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { PlanBadge } from '@/components/shared/PlanBadge'
import { MOCK_USER } from '@/lib/data/mock-store'
import { canAccessAgent } from '@/lib/types'
import { ArrowRight, Lock, Search } from 'lucide-react'
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
        agent.division.toLowerCase().includes(search.toLowerCase()) ||
        agent.marketFocus?.toLowerCase().includes(search.toLowerCase()) ||
        agent.twinProfile?.industries.some((industry) => industry.toLowerCase().includes(search.toLowerCase()))
      const matchDivision = !activeDivision || agent.division === activeDivision
      return matchSearch && matchDivision && agent.isActive
    })
  }, [search, activeDivision])

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-10 border-b border-[#d8e5e2] pb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Twin Library</p>
        <h1 className="mt-2 text-3xl font-light tracking-tight text-[#173634]">
          {SEED_AGENTS.length} operators, twins and specialists organized by division.
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[#173634]/60">
          You are on the <span className="font-medium text-[#173634] capitalize">{MOCK_USER.plan}</span> plan.
          Locked profiles are clearly marked.
        </p>
      </header>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8fb2aa]" />
          <Input
            placeholder="Search twins, roles or industries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 border-[#d8e5e2] bg-[#fbfbfa] pl-9 text-sm text-[#173634] placeholder:text-[#173634]/35 focus-visible:ring-[#8fb2aa]"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveDivision(null)}
            className={cn(
              'border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors',
              !activeDivision
                ? 'border-[#173634] bg-[#173634] text-white'
                : 'border-[#d8e5e2] bg-[#fbfbfa] text-[#173634]/50 hover:border-[#173634] hover:text-[#173634]'
            )}
          >
            All
          </button>
          {DIVISIONS.map((div) => (
            <button
              key={div}
              onClick={() => setActiveDivision(div === activeDivision ? null : div)}
              className={cn(
                'border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors',
                activeDivision === div
                  ? 'border-[#173634] bg-[#173634] text-white'
                  : 'border-[#d8e5e2] bg-[#fbfbfa] text-[#173634]/50 hover:border-[#173634] hover:text-[#173634]'
              )}
            >
              {div}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-4 text-[11px] text-[#173634]/38">
        {filtered.length} profile{filtered.length !== 1 ? 's' : ''}
        {activeDivision ? ` in ${activeDivision}` : ' across all divisions'}
      </p>

      {filtered.length === 0 ? (
        <div className="border border-[#d8e5e2] px-8 py-16 text-center">
          <p className="text-sm font-medium text-[#173634]">No profiles found</p>
          <p className="mt-1 text-xs text-[#173634]/45">Try a different search or clear the division filter.</p>
        </div>
      ) : (
        <div className="grid gap-px border border-[#d8e5e2] bg-[#d8e5e2] sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((agent) => {
            const accessible = canAccessAgent(MOCK_USER.plan, agent.planRequired)
            return (
              <div
                key={agent.id}
                className={cn(
                  'group flex flex-col bg-[#fbfbfa] p-5',
                  accessible ? 'hover:bg-[#f1f6f4]' : 'opacity-55'
                )}
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    <DivisionBadge division={agent.division} size="sm" />
                    {agent.roleMode === 'digital-twin' ? <span className="n3-chip-soft">Digital twin</span> : null}
                  </div>
                  <PlanBadge plan={agent.planRequired} size="sm" />
                </div>
                <p className="text-sm font-medium text-[#173634]">{agent.name}</p>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-[#173634]/55">{agent.shortDescription}</p>
                {agent.twinProfile ? (
                  <div className="mt-3 border border-[#d8e5e2] bg-[#f8fbfa] px-3 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">{agent.twinProfile.roleLabel} · {agent.twinProfile.geography}</p>
                    <p className="mt-1 text-xs leading-5 text-[#52605d]">{agent.twinProfile.replacementScope}</p>
                    <div className="mt-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#52605d]">
                      <span>{agent.twinProfile.operationalReplacementScore ?? 0}% replacement</span>
                      <span>·</span>
                      <span className="capitalize">{agent.twinProfile.supervisionLevel ?? 'medium'} supervision</span>
                    </div>
                  </div>
                ) : null}
                <div className="mt-4 border-t border-[#d8e5e2] pt-3">
                  {accessible ? (
                    <Link
                      href={`/app/run/${agent.slug}`}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8fb2aa] transition-colors group-hover:text-[#173634]"
                    >
                      Run twin <ArrowRight size={10} className="ml-0.5" />
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#173634]/35">
                      <Lock size={10} /> Upgrade to access
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
