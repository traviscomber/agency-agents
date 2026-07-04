'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MOCK_RUNS } from '@/lib/data/mock-store'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { ArrowRight, Bookmark, FolderOpen, Search, Sparkles } from 'lucide-react'
import type { AgentRun } from '@/lib/types'
import { getAllRuns, getWorkflowStatusMeta } from '@/lib/project-memory'
import { cn } from '@/lib/utils'

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date))
}

function formatTime(date: string) {
  return new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(new Date(date))
}

export default function HistoryPage() {
  const [runs, setRuns] = useState<AgentRun[]>(MOCK_RUNS)
  const [search, setSearch] = useState('')

  useEffect(() => {
    void (async () => {
      setRuns(await getAllRuns(MOCK_RUNS))
    })()
  }, [])

  const completedRuns = runs.filter((run) => run.status === 'completed').length
  const failedRuns = runs.filter((run) => run.status === 'failed').length
  const activeProjects = new Set(runs.map((run) => run.projectId).filter(Boolean)).size

  const filteredRuns = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return runs

    return runs.filter((run) =>
      run.agentName.toLowerCase().includes(query) ||
      run.task.toLowerCase().includes(query) ||
      run.projectName?.toLowerCase().includes(query),
    )
  }, [runs, search])

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <header className="n3-panel overflow-hidden">
        <div className="grid gap-px bg-[#d8e5e2] lg:grid-cols-[1.15fr_0.85fr]">
          <div className="bg-[linear-gradient(135deg,_rgba(23,54,52,0.05),_rgba(143,178,170,0.02))] px-6 py-8 sm:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Execution ledger</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-light tracking-[-0.04em] text-[#173634]">
              Every run should read like a traceable production event.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#52605d]">
              This view should help you audit output quality, inspect project linkage, and re-open the right run without
              scanning a generic activity list.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="h-10 rounded-none bg-[#173634] px-5 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-[#1e3431]">
                <Link href="/app/agents">Run specialist</Link>
              </Button>
              <Button asChild variant="outline" className="h-10 rounded-none border-[#d8e5e2] px-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#173634] hover:bg-[#f1f6f4]">
                <Link href="/app/projects">Open project ledger</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-px bg-[#d8e5e2] sm:grid-cols-3 lg:grid-cols-1">
            {[
              { label: 'Total runs', value: runs.length, note: 'persisted executions' },
              { label: 'Completed', value: completedRuns, note: 'successful outputs' },
              { label: 'Projects linked', value: activeProjects, note: 'active workstreams' },
            ].map(({ label, value, note }) => (
              <div key={label} className="bg-[#f1f6f4] px-5 py-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">{label}</p>
                <p className="mt-2 text-3xl font-light tracking-[-0.04em] text-[#173634]">{value}</p>
                <p className="mt-1 text-xs text-[#52605d]">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="n3-panel mt-8">
        <div className="flex flex-col gap-4 border-b border-[#d8e5e2] bg-[#f1f6f4] px-5 py-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="n3-eyebrow">Run index</p>
            <p className="mt-1 text-sm text-[#52605d]">Search by specialist, task, or linked project.</p>
          </div>
          <div className="relative w-full max-w-md">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8fb2aa]" />
            <Input
              placeholder="Search execution history..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 rounded-none border-[#d8e5e2] bg-[#fbfbfa] pl-9 text-sm text-[#173634] placeholder:text-[#173634]/35 focus-visible:ring-[#8fb2aa]"
            />
          </div>
        </div>

        {filteredRuns.length === 0 ? (
          <div className="px-8 py-16 text-center">
            <p className="text-sm font-medium text-[#173634]">{search ? 'No matching runs' : 'No runs yet'}</p>
            <p className="mt-1 text-xs text-[#52605d]">
              {search ? 'Try a different search term.' : 'Run an agent to populate this timeline.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#d8e5e2]">
            {filteredRuns.map((run, index) => (
              <Link
                key={run.id}
                href={`/app/history/${run.id}`}
                className="n3-card grid gap-4 px-5 py-5 transition-colors hover:bg-[#f1f6f4] lg:grid-cols-[42px_1fr_auto] lg:items-start"
              >
                <div className="flex h-10 w-10 items-center justify-center border border-[#d8e5e2] bg-[#f1f6f4] text-[11px] font-semibold text-[#8fb2aa]">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-[#173634]">{run.agentName}</p>
                    <DivisionBadge division={run.agentDivision} size="sm" />
                    {run.status === 'completed' && (
                      <span className="n3-chip-soft inline-flex items-center gap-1">
                        <Sparkles size={10} />
                        Output ready
                      </span>
                    )}
                    {run.presetStepName ? (
                      <span className="n3-chip inline-flex items-center gap-1">
                        <Sparkles size={10} />
                        Workflow preset
                      </span>
                    ) : null}
                    {run.handoffPacket ? (
                      <span className="n3-chip-soft inline-flex items-center gap-1">
                        <Bookmark size={10} />
                        Operating packet
                      </span>
                    ) : null}
                    {run.handoffPacket ? (
                      <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]', getWorkflowStatusMeta(run.handoffPacket.currentStepStatus).tone)}>
                        {getWorkflowStatusMeta(run.handoffPacket.currentStepStatus).label}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-[#52605d]">{run.task}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] text-[#52605d]">
                    <span>{formatDate(run.createdAt)} at {formatTime(run.createdAt)}</span>
                    {run.projectName && (
                      <span className="n3-chip">
                        <FolderOpen size={10} />
                        {run.projectName}
                      </span>
                    )}
                    {run.presetStepName ? <span>Step: {run.presetStepName}</span> : null}
                    {run.handoffPacket ? <span>Mode: {run.handoffPacket.executionMode}</span> : null}
                  </div>
                </div>

                <div className="flex items-center gap-3 lg:flex-col lg:items-end">
                  <span className={`inline-flex border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${
                    run.status === 'completed'
                      ? 'border-[#d8e5e2] bg-[#f1f6f4] text-[#8fb2aa]'
                      : run.status === 'failed'
                      ? 'border-red-200 bg-red-50 text-red-500'
                      : 'border-amber-200 bg-amber-50 text-amber-600'
                  }`}>
                    {run.status}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">
                    Inspect <ArrowRight size={11} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
