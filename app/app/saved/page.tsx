'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { MOCK_PROJECTS, MOCK_RUNS, MOCK_SAVED_OUTPUTS } from '@/lib/data/mock-store'
import type { AgentRun, Project, ProjectHandoffPacket, SavedOutput } from '@/lib/types'
import { ArrowRight, Bookmark, FolderOpen, Search, Sparkles, Workflow, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buildProjectHandoffPacket, getAllRuns, getAllSavedOutputs, getMergedProjects, getWorkflowStatusMeta } from '@/lib/project-memory'

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date))
}

function formatShortDate(date: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(date))
}

interface SavedGroup {
  id: string
  label: string
  project?: Project
  packet?: ProjectHandoffPacket | null
  outputs: SavedOutput[]
}

function resolveOutputPacket(output: SavedOutput, runsById: Map<string, AgentRun>, projectsById: Map<string, Project>) {
  const sourceRun = runsById.get(output.agentRunId)
  if (sourceRun?.handoffPacket) return sourceRun.handoffPacket
  if (output.projectId) {
    const project = projectsById.get(output.projectId)
    if (project) return buildProjectHandoffPacket(project, output)
  }
  return null
}

function SavedPageContent() {
  const searchParams = useSearchParams()
  const [savedOutputs, setSavedOutputs] = useState<SavedOutput[]>(MOCK_SAVED_OUTPUTS)
  const [runs, setRuns] = useState<AgentRun[]>(MOCK_RUNS)
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<SavedOutput | null>(null)

  useEffect(() => {
    void (async () => {
      const [allSavedOutputs, allRuns, mergedProjects] = await Promise.all([
        getAllSavedOutputs(MOCK_SAVED_OUTPUTS),
        getAllRuns(MOCK_RUNS),
        getMergedProjects(MOCK_PROJECTS),
      ])

      setSavedOutputs(allSavedOutputs)
      setRuns(allRuns)
      setProjects(mergedProjects)

      const selectedId = searchParams.get('selected')
      if (selectedId) {
        setSelected(allSavedOutputs.find((item) => item.id === selectedId) ?? null)
      }
    })()
  }, [searchParams])

  const runsById = useMemo(() => new Map(runs.map((run) => [run.id, run])), [runs])
  const projectsById = useMemo(() => new Map(projects.map((project) => [project.id, project])), [projects])

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return savedOutputs

    return savedOutputs.filter((item) => {
      const sourceRun = runsById.get(item.agentRunId)
      const packet = resolveOutputPacket(item, runsById, projectsById)

      return (
        item.title.toLowerCase().includes(query) ||
        item.agentName.toLowerCase().includes(query) ||
        item.projectName?.toLowerCase().includes(query) ||
        sourceRun?.presetStepName?.toLowerCase().includes(query) ||
        packet?.executionMode.toLowerCase().includes(query) ||
        packet?.currentStep.toLowerCase().includes(query)
      )
    })
  }, [projectsById, runsById, savedOutputs, search])

  const groups = useMemo(() => {
    const grouped = new Map<string, SavedGroup>()

    for (const output of filtered) {
      const groupId = output.projectId ?? `standalone-${output.agentName}`
      const project = output.projectId ? projectsById.get(output.projectId) : undefined
      const packet = resolveOutputPacket(output, runsById, projectsById)
      const label = project?.name ?? `Twin-run · ${output.agentName}`
      const existing = grouped.get(groupId)

      if (existing) {
        existing.outputs.push(output)
        if (!existing.packet && packet) existing.packet = packet
        continue
      }

      grouped.set(groupId, {
        id: groupId,
        label,
        project,
        packet,
        outputs: [output],
      })
    }

    return Array.from(grouped.values())
      .map((group) => ({
        ...group,
        outputs: group.outputs.sort((left, right) => right.updatedAt.localeCompare(left.updatedAt)),
      }))
      .sort((left, right) => (right.outputs[0]?.updatedAt || '').localeCompare(left.outputs[0]?.updatedAt || ''))
  }, [filtered, projectsById, runsById])

  const active = selected && filtered.some((item) => item.id === selected.id) ? selected : filtered[0] ?? null
  const activeRun = active ? runsById.get(active.agentRunId) ?? null : null
  const activeProject = active?.projectId ? projectsById.get(active.projectId) ?? null : null
  const activePacket = active ? resolveOutputPacket(active, runsById, projectsById) : null
  const relatedOutputs = active
    ? savedOutputs
        .filter((item) => item.id !== active.id && ((active.projectId && item.projectId === active.projectId) || item.agentRunId === active.agentRunId))
        .slice(0, 4)
    : []
  const activeTrace = active
    ? [
        {
          label: 'Twin run',
          value: activeRun?.agentName || 'Unknown run',
          note: activeRun?.task || 'This deliverable has no recoverable twin task attached.',
        },
        {
          label: 'Workflow origin',
          value: activeRun?.presetStepName || activePacket?.currentStep || 'Unassigned deliverable',
          note: activePacket?.executionMode || 'No operating routine attached.',
        },
        {
          label: 'Reuse path',
          value: relatedOutputs.length ? `${relatedOutputs.length} related deliverable${relatedOutputs.length === 1 ? '' : 's'}` : 'First deliverable in chain',
          note: activeProject ? `Attached to ${activeProject.name}` : 'Not yet linked to an operating program.',
        },
      ]
    : []

  const projectLinked = savedOutputs.filter((item) => item.projectId).length
  const packetBacked = savedOutputs.filter((item) => resolveOutputPacket(item, runsById, projectsById)).length

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <header className="n3-panel overflow-hidden">
        <div className="grid gap-px bg-[#d8e5e2] lg:grid-cols-[1.15fr_0.85fr]">
          <div className="bg-[linear-gradient(135deg,_rgba(23,54,52,0.05),_rgba(143,178,170,0.02))] px-6 py-8 sm:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Reusable deliverable memory</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-light tracking-[-0.04em] text-[#173634]">
              Deliverables should stay attached to the operating logic that produced them.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#52605d]">
              This surface should read like operating memory: program-linked deliverables, inherited packets, and twin runs grouped so the next operator can recover context without hunting across screens.
            </p>
          </div>

          <div className="grid gap-px bg-[#d8e5e2] sm:grid-cols-3 lg:grid-cols-1">
            {[
              { label: 'Saved deliverables', value: savedOutputs.length, note: 'retained operating memory' },
              { label: 'Program-linked', value: projectLinked, note: 'owned by active programs' },
              { label: 'Packet-backed', value: packetBacked, note: 'carry operating context' },
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

      <section className="mt-8 n3-panel overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-[#d8e5e2] bg-[#f1f6f4] px-5 py-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">Operating archive</p>
            <p className="mt-1 text-sm text-[#52605d]">Find deliverables by program, packet stage, role twin, or source run.</p>
          </div>
          <div className="relative w-full max-w-md">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8fb2aa]" />
            <Input
              placeholder="Search by deliverable, program, twin, or stage..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 border-[#d8e5e2] bg-[#fbfbfa] pl-9 text-sm text-[#173634] placeholder:text-[#173634]/35 focus-visible:ring-[#8fb2aa]"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="px-8 py-16 text-center">
            <p className="text-sm font-medium text-[#173634]">{search ? 'No matching deliverables' : 'No deliverables saved yet'}</p>
            <p className="mt-1 text-xs text-[#52605d]">
              {search ? 'Try a different search term.' : 'Save a deliverable from any completed run.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-px bg-[#d8e5e2] xl:grid-cols-[360px_1fr]">
            <div className="divide-y divide-[#d8e5e2] bg-[#fbfbfa]">
              {groups.map((group) => (
                <div key={group.id} className="p-4">
                  <div className="rounded-[1.2rem] border border-[#d8e5e2] bg-[#f8faf9] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8fb2aa]">
                          {group.project ? 'Program cluster' : 'Twin-run cluster'}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[#173634]">{group.label}</p>
                      </div>
                      {group.packet ? <span className="n3-chip-soft">{group.packet.executionMode}</span> : null}
                    </div>
                    <p className="mt-3 text-xs leading-5 text-[#52605d]">
                      {group.packet?.summary || 'Deliverables without a full program packet still stay grouped by twin-run context.'}
                    </p>
                    <div className="mt-4 space-y-2">
                      {group.outputs.map((item) => {
                        const isActive = active?.id === item.id
                        const sourceRun = runsById.get(item.agentRunId)

                        return (
                          <button
                            key={item.id}
                            onClick={() => setSelected(item)}
                            className={cn(
                              'w-full border px-3 py-3 text-left transition-colors hover:bg-[#f1f6f4]',
                              isActive ? 'border-[#8fb2aa] bg-[#eef5f2]' : 'border-[#d8e5e2] bg-white',
                            )}
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#d8e5e2] bg-[#fbfbfa] text-[#8fb2aa]">
                                <Bookmark size={13} />
                              </div>
                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <p className="truncate text-sm font-medium text-[#173634]">{item.title}</p>
                                  {isActive ? (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">
                                      <Sparkles size={10} />
                                      Active
                                    </span>
                                  ) : null}
                                </div>
                                <p className="mt-1 truncate text-[11px] text-[#52605d]">{item.agentName}</p>
                                <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-[#52605d]">
                                  <span>{formatShortDate(item.createdAt)}</span>
                                  {sourceRun?.presetStepName ? <span>Step: {sourceRun.presetStepName}</span> : null}
                                </div>
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {active ? (
              <div className="min-w-0 bg-[#fbfbfa] p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">Selected deliverable</p>
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#52605d]">{active.agentName}</p>
                    <h2 className="mt-1 text-2xl font-light tracking-[-0.03em] text-[#173634]">{active.title}</h2>
                  </div>
                  <button onClick={() => setSelected(null)} className="shrink-0 text-[#8fb2aa] transition-colors hover:text-[#173634]">
                    <X size={16} />
                  </button>
                </div>

                <div className="mt-5 grid gap-px border border-[#d8e5e2] bg-[#d8e5e2] sm:grid-cols-3">
                  <div className="bg-[#f1f6f4] px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8fb2aa]">Saved on</p>
                    <p className="mt-1 text-sm text-[#173634]">{formatDate(active.createdAt)}</p>
                  </div>
                  <div className="bg-[#f1f6f4] px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8fb2aa]">Format</p>
                    <p className="mt-1 text-sm capitalize text-[#173634]">{active.format}</p>
                  </div>
                  <div className="bg-[#f1f6f4] px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8fb2aa]">Program</p>
                    <p className="mt-1 text-sm text-[#173634]">{active.projectName || 'Unassigned'}</p>
                  </div>
                </div>

                {activePacket ? (
                  <div className="mt-5 border border-[#d8e5e2] bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="n3-chip-soft">{activePacket.projectTypeLabel}</span>
                      <span className="n3-chip-soft">{activePacket.executionMode}</span>
                      <span className={cn('rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]', getWorkflowStatusMeta(activePacket.currentStepStatus).tone)}>
                        {getWorkflowStatusMeta(activePacket.currentStepStatus).label}
                      </span>
                      {activePacket.currentStepStatusSource ? (
                        <span className="rounded-full border border-[#d8e5e2] bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#52605d]">
                          {activePacket.currentStepStatusSource === 'auto' ? 'Auto inferred' : activePacket.currentStepStatusSource === 'manual' ? 'Manual' : 'Default'}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-3 text-sm font-semibold text-[#173634]">{activePacket.summary}</p>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div className="n3-subpanel">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">Current step</p>
                        <p className="mt-1 text-sm font-medium text-[#173634]">{activePacket.currentStep}</p>
                        <p className="mt-1 text-[11px] leading-5 text-[#52605d]">{getWorkflowStatusMeta(activePacket.currentStepStatus).description}</p>
                        <p className="mt-1 text-xs leading-5 text-[#52605d]">{activePacket.currentStepDetail}</p>
                      </div>
                      <div className="n3-subpanel">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">Expected deliverable</p>
                        <p className="mt-1 text-sm leading-6 text-[#52605d]">{activePacket.outputExpectation}</p>
                      </div>
                    </div>
                    {activePacket.currentStepStatusReason ? (
                      <div className="mt-4 border border-[#d8e5e2] bg-white px-4 py-3">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">Why this state</p>
                        <p className="mt-1 text-sm leading-6 text-[#52605d]">{activePacket.currentStepStatusReason}</p>
                      </div>
                    ) : null}
                    <div className="mt-4 border border-[#d8e5e2] bg-white px-4 py-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">Risk note</p>
                      <p className="mt-1 text-sm leading-6 text-[#52605d]">{activePacket.riskNote}</p>
                    </div>
                  </div>
                ) : null}

                <div className="mt-5 flex flex-wrap items-center gap-4 border-y border-[#d8e5e2] py-3 text-[11px] text-[#52605d]">
                  {active.projectName ? (
                    <span className="inline-flex items-center gap-1">
                      <FolderOpen size={10} />
                      {active.projectName}
                    </span>
                  ) : null}
                  {activeRun?.presetStepName ? (
                    <span className="inline-flex items-center gap-1">
                      <Workflow size={10} />
                      {activeRun.presetStepName}
                    </span>
                  ) : null}
                  <Link href={`/app/history/${active.agentRunId}`} className="inline-flex items-center gap-1 font-semibold uppercase tracking-[0.16em] text-[#8fb2aa] transition-colors hover:text-[#173634]">
                    Twin run <ArrowRight size={10} />
                  </Link>
                  {activeProject ? (
                    <Link href={`/app/projects/${activeProject.id}`} className="inline-flex items-center gap-1 font-semibold uppercase tracking-[0.16em] text-[#8fb2aa] transition-colors hover:text-[#173634]">
                      Program record <ArrowRight size={10} />
                    </Link>
                  ) : null}
                </div>

                <div className="mt-6 whitespace-pre-wrap text-sm leading-7 text-[#173634]/78">
                  {active.content}
                </div>

                {activeTrace.length ? (
                  <div className="mt-8 grid gap-3 md:grid-cols-3">
                    {activeTrace.map((item) => (
                      <div key={item.label} className="rounded-[1rem] border border-[#d8e5e2] bg-[#f8faf9] px-4 py-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">{item.label}</p>
                        <p className="mt-2 text-sm font-medium text-[#173634]">{item.value}</p>
                        <p className="mt-2 text-xs leading-5 text-[#52605d]">{item.note}</p>
                      </div>
                    ))}
                  </div>
                ) : null}

                {relatedOutputs.length ? (
                  <div className="mt-8">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">Related deliverables</p>
                    <div className="mt-3 grid gap-3">
                      {relatedOutputs.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelected(item)}
                          className="flex items-center justify-between gap-3 border border-[#d8e5e2] bg-white px-4 py-3 text-left transition-colors hover:bg-[#f1f6f4]"
                        >
                          <div>
                            <p className="text-sm font-medium text-[#173634]">{item.title}</p>
                            <p className="mt-1 text-[11px] text-[#52605d]">{item.agentName} · {formatShortDate(item.updatedAt)}</p>
                          </div>
                          <ArrowRight size={12} className="shrink-0 text-[#8fb2aa]" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        )}
      </section>
    </div>
  )
}

export default function SavedPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="border border-[#d8e5e2] bg-[#fbfbfa] px-6 py-12 text-sm text-[#52605d]">
            Loading saved deliverables...
          </div>
        </div>
      }
    >
      <SavedPageContent />
    </Suspense>
  )
}
