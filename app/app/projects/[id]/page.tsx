'use client'

import { use, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SEED_AGENTS, getAgentBySlug } from '@/lib/data/seed-agents'
import { MOCK_PROJECTS, MOCK_RUNS, MOCK_SAVED_OUTPUTS } from '@/lib/data/mock-store'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { ArrowLeft, ArrowRight, Bot, Bookmark, Calendar, Sparkles } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import {
  buildProjectHandoffPacket,
  buildProjectHandoffText,
  buildProjectOverlay,
  getProjectCurrentWorkflowStep,
  getWorkflowStatusMeta,
  buildProjectRunHrefForStep,
  buildProjectRunPresetForStep,
  buildProjectRunHref,
  getMergedProjects,
  getProjectOverlay,
  getProjectTypeLabel,
  mergeProjectBrief,
  mergeProjectMemory,
  mergeProjectRuns,
  mergeProjectSavedOutputs,
  mergeProjectWorkflow,
  persistProjectOperatingState,
  updateProjectBrief,
} from '@/lib/project-memory'
import type { ProjectMemoryEntry, ProjectOperatingBrief, ProjectOverlayState, ProjectWorkflowStatus, ProjectWorkflowStep } from '@/lib/types'

interface Props {
  params: Promise<{ id: string }>
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

function formatDateTime(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

function getReplacementBand(score: number) {
  if (score >= 80) return 'Autonomous lane'
  if (score >= 70) return 'Managed replacement'
  return 'Assistive support'
}

function getSupervisionGuidance(level: 'low' | 'medium' | 'high') {
  if (level === 'low') return 'Light operator review and spot checks are enough for most routine execution.'
  if (level === 'medium') return 'A human should stay in the loop before higher-impact decisions or external actions.'
  return 'This lane should remain under explicit human approval before the twin executes sensitive work.'
}

function resolveRecommendedAgentSlug(step?: ProjectWorkflowStep) {
  if (!step) return null
  if (step.recommendedAgentSlug) return step.recommendedAgentSlug

  const ownerMap: Record<string, string> = {
    Strategy: 'product-strategist',
    Operations: 'operations-strategist',
    Lead: 'proposal-strategist',
    Product: 'product-strategist',
    Marketing: 'technical-writer',
    Research: 'ux-researcher',
    Growth: 'sales-strategist',
    Sales: 'proposal-strategist',
  }

  return ownerMap[step.owner] ?? null
}

function extractDiagnosisField(note: string, label: string, nextLabel?: string) {
  const start = `${label}: `
  const startIndex = note.indexOf(start)
  if (startIndex === -1) return null
  const valueStart = startIndex + start.length
  const valueEnd = nextLabel ? note.indexOf(` ${nextLabel}:`, valueStart) : -1
  const rawValue = note.slice(valueStart, valueEnd === -1 ? undefined : valueEnd)
  return rawValue.replace(/\.$/, '').trim()
}

export default function ProjectDetailPage({ params }: Props) {
  const { id } = use(params)
  const [projects, setProjects] = useState(MOCK_PROJECTS)
  const project = projects.find((p) => p.id === id)
  const [overlay, setOverlay] = useState<ProjectOverlayState | null>(null)
  const [isEditingBrief, setIsEditingBrief] = useState(false)
  const [briefDraft, setBriefDraft] = useState<ProjectOperatingBrief | null>(null)
  const [memoryTitle, setMemoryTitle] = useState('')
  const [memoryNote, setMemoryNote] = useState('')
  const [memorySource, setMemorySource] = useState<ProjectMemoryEntry['source']>('decision')

  useEffect(() => {
    void (async () => {
      setProjects(await getMergedProjects(MOCK_PROJECTS))
    })()
  }, [])

  useEffect(() => {
    if (!project) return
    void (async () => {
      setOverlay(await getProjectOverlay(project))
    })()
  }, [project])

  if (!project) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <p className="text-sm text-slate-700">Project not found.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/app/projects">Back to projects</Link>
        </Button>
      </div>
    )
  }

  const activeProject = project

  const projectOverlay = overlay ?? buildProjectOverlay(activeProject)
  const operatingBrief = mergeProjectBrief(activeProject, projectOverlay)
  const runs = mergeProjectRuns(MOCK_RUNS.filter((r) => r.projectId === id), projectOverlay)
  const saved = mergeProjectSavedOutputs(MOCK_SAVED_OUTPUTS.filter((s) => s.projectId === id), projectOverlay)
  const memory = mergeProjectMemory(activeProject, projectOverlay)
  const workflow = mergeProjectWorkflow(activeProject, projectOverlay)

  function startBriefEdit() {
    if (!operatingBrief) return
    setBriefDraft({
      ...operatingBrief,
      constraints: [...operatingBrief.constraints],
    })
    setIsEditingBrief(true)
  }

  async function saveBrief() {
    if (!briefDraft) return
    const nextBrief = {
      ...briefDraft,
      constraints: briefDraft.constraints.map((item) => item.trim()).filter(Boolean),
    }
    const nextOverlay = await updateProjectBrief(activeProject, nextBrief)
    setOverlay(nextOverlay)
    setProjects((prev) =>
      prev.map((item) =>
        item.id === activeProject.id
          ? {
              ...item,
              operatingBrief: nextBrief,
              updatedAt: new Date().toISOString(),
            }
          : item,
      ),
    )
    setIsEditingBrief(false)
  }

  async function saveOperatingUpdate(nextArgs: {
    memoryEntry?: ProjectMemoryEntry
    workflow?: ProjectWorkflowStep[]
  }) {
    const nextOverlay = await persistProjectOperatingState({
      project: activeProject,
      ...nextArgs,
    })

    if (!nextOverlay) return

    const updatedAt = nextArgs.memoryEntry?.createdAt ?? new Date().toISOString()
    setOverlay(nextOverlay)
    setProjects((prev) =>
      prev.map((item) =>
        item.id === activeProject.id
          ? {
              ...item,
              updatedAt,
            }
          : item,
      ),
    )
  }

  async function captureManualMemory() {
    if (!memoryTitle.trim() || !memoryNote.trim()) return

    const createdAt = new Date().toISOString()
    await saveOperatingUpdate({
      memoryEntry: {
        id: `mem-${Date.now()}`,
        title: memoryTitle.trim(),
        note: memoryNote.trim(),
        source: memorySource,
        createdAt,
      },
    })

    setMemoryTitle('')
    setMemoryNote('')
    setMemorySource('decision')
  }

  async function advanceWorkflowManually() {
    const currentStep = getProjectCurrentWorkflowStep(workflow)
    const nextIndex = currentStep ? workflow.findIndex((step) => step.id === currentStep.id) : -1
    if (nextIndex < 0) return

    const createdAt = new Date().toISOString()
    const nextWorkflow = workflow.map((step, index) => {
      if (index === nextIndex) {
        return {
          ...step,
          status: 'done' as const,
          statusSource: 'manual' as const,
          linkedRunLabel: step.linkedRunLabel ?? 'Manual progression',
          completedAt: step.completedAt ?? createdAt,
        }
      }

      if (index === nextIndex + 1 && step.status !== 'done') {
        return {
          ...step,
          status: 'active' as const,
          statusSource: 'manual' as const,
        }
      }

      return step
    })

    await saveOperatingUpdate({
      workflow: nextWorkflow,
      memoryEntry: {
        id: `mem-${Date.now()}`,
        title: 'Program routine advanced manually',
        note: `Marked "${workflow[nextIndex]?.name}" as done and moved the operating program forward without creating a new twin execution.`,
        source: 'handoff',
        createdAt,
      },
    })
  }

  async function updateWorkflowRecommendedAgent(stepId: string, nextAgentSlug: string) {
    const nextWorkflow = workflow.map((step) =>
      step.id === stepId
        ? {
            ...step,
            recommendedAgentSlug: nextAgentSlug === 'none' ? undefined : nextAgentSlug,
          }
        : step,
    )

    const step = workflow.find((item) => item.id === stepId)
    const selectedAgent = nextAgentSlug === 'none' ? null : getAgentBySlug(nextAgentSlug)
    const createdAt = new Date().toISOString()

    await saveOperatingUpdate({
      workflow: nextWorkflow as ProjectWorkflowStep[],
      memoryEntry: {
        id: `mem-${Date.now()}`,
        title: 'Program role twin updated',
        note: step
          ? `Assigned "${selectedAgent?.name ?? 'no role twin'}" as the recommended twin for program routine "${step.name}".`
          : 'Updated the recommended role twin for a program routine.',
        source: 'decision',
        createdAt,
      },
    })
  }

  async function updateWorkflowStatus(stepId: string, nextStatus: ProjectWorkflowStatus) {
    const nextWorkflow = workflow.map((step) =>
      step.id === stepId
        ? {
            ...step,
            status: nextStatus,
            statusReason: `Status manually set to ${getWorkflowStatusMeta(nextStatus).label.toLowerCase()} by the operator.`,
            statusSource: 'manual',
            completedAt: nextStatus === 'done' ? step.completedAt ?? new Date().toISOString() : undefined,
          }
        : step,
    )

    const step = workflow.find((item) => item.id === stepId)
    const createdAt = new Date().toISOString()

    await saveOperatingUpdate({
      workflow: nextWorkflow as ProjectWorkflowStep[],
      memoryEntry: {
        id: `mem-${Date.now()}`,
        title: 'Program routine status updated',
        note: step
          ? `Marked program routine "${step.name}" as ${getWorkflowStatusMeta(nextStatus).label.toLowerCase()}.`
          : 'Updated the program routine status.',
        source: 'decision',
        createdAt,
      },
    })
  }

  const activeStep = getProjectCurrentWorkflowStep(workflow)
  const nextStep = activeStep ? workflow[workflow.findIndex((step) => step.id === activeStep.id) + 1] : undefined
  const recommendedAgentSlug = resolveRecommendedAgentSlug(activeStep ?? undefined)
  const recommendedAgent = recommendedAgentSlug ? getAgentBySlug(recommendedAgentSlug) : null
  const selectableAgents = SEED_AGENTS.filter((agent) => agent.isActive)
  const latestMemory = memory[0]
  const latestDeliverable = saved[0]
  const projectTypeLabel = getProjectTypeLabel(activeProject.projectType)
  const activeStepMeta = activeStep ? getWorkflowStatusMeta(activeStep.status) : null
  const recommendedTwinProfile = recommendedAgent?.twinProfile ?? null
  const programReplacementScore = recommendedTwinProfile?.operationalReplacementScore ?? null
  const programSupervision = recommendedTwinProfile?.supervisionLevel ?? null
  const diagnosisMemory = memory.find((entry) => entry.title === 'Diagnosis recommendation') ?? null
  const diagnosisBlueprint = diagnosisMemory
    ? [
        ['Gemelo recomendado', extractDiagnosisField(diagnosisMemory.note, 'Recommended gemelo digital', 'Supervision') ?? recommendedAgent?.name ?? 'Gemelo digital asignado'],
        ['Supervision diagnosticada', extractDiagnosisField(diagnosisMemory.note, 'Supervision', 'Recoverable hours') ?? programSupervision ?? 'medium'],
        ['Horas recuperables', extractDiagnosisField(diagnosisMemory.note, 'Recoverable hours', 'Estimated monthly savings') ?? 'Pendiente'],
        ['ROI mensual estimado', extractDiagnosisField(diagnosisMemory.note, 'Estimated monthly savings', 'Next step') ?? 'Pendiente'],
        ['Datos para cargar', extractDiagnosisField(diagnosisMemory.note, 'Next step') ?? activeStep?.detail ?? 'Definir contexto operativo inicial'],
        ['Control humano', programSupervision ? getSupervisionGuidance(programSupervision) : 'Mantener aprobacion humana explicita antes de acciones sensibles.'],
      ]
    : []
  const operatingHealth = activeStep
    ? activeStep.status === 'blocked'
      ? 'Blocked pending unblock action'
      : activeStep.status === 'at-risk'
        ? 'Execution at risk'
        : activeStep.status === 'awaiting-decision'
          ? 'Waiting on explicit decision'
          : recommendedAgent
            ? 'Ready for the next twin'
            : 'Needs twin assignment'
    : 'Needs workflow definition'
  const handoffPacket = useMemo(
    () => buildProjectHandoffPacket(activeProject, latestDeliverable),
    [latestDeliverable, activeProject],
  )
  const handoffText = useMemo(
    () => (handoffPacket ? buildProjectHandoffText(handoffPacket) : null),
    [handoffPacket],
  )
  const recommendedRunHref = useMemo(() => buildProjectRunHref(activeProject), [activeProject])
  const timelineItems = useMemo(() => {
    const items: Array<{
      id: string
      type: 'brief' | 'memory' | 'run' | 'deliverable'
      date: string
      title: string
      detail: string
      href?: string
      label?: string
    }> = []

    if (operatingBrief) {
      items.push({
        id: `brief-${project.id}`,
        type: 'brief',
        date: project.updatedAt,
        title: 'Operating brief is active',
        detail: operatingBrief.objective,
      })
    }

    for (const entry of memory) {
      items.push({
        id: `memory-${entry.id}`,
        type: 'memory',
        date: entry.createdAt,
        title: entry.title,
        detail: entry.note,
        label: entry.source,
      })
    }

    for (const run of runs) {
      items.push({
        id: `run-${run.id}`,
        type: 'run',
        date: run.createdAt,
        title: `${run.agentName} executed`,
        detail: run.task,
        href: `/app/history/${run.id}`,
        label: run.status,
      })
    }

    for (const item of saved) {
      items.push({
        id: `deliverable-${item.id}`,
        type: 'deliverable',
        date: item.updatedAt,
        title: item.title,
        detail: item.content,
        href: `/app/saved?selected=${item.id}`,
        label: item.agentName,
      })
    }

    return items
      .sort((left, right) => right.date.localeCompare(left.date))
      .slice(0, 12)
  }, [memory, operatingBrief, project.id, project.updatedAt, runs, saved])
  const continuitySignals = [
    {
      label: 'Continuity depth',
      value: `${memory.length + saved.length + runs.length}`,
      note: 'combined memory, deliverables, and twin executions linked to this program',
    },
    {
      label: 'Packet readiness',
      value: handoffPacket ? 'Ready' : 'Missing',
      note: handoffPacket ? 'the next operator can inherit a generated packet now' : 'define brief and active workflow to create a packet',
    },
    {
      label: 'Timeline coverage',
      value: `${timelineItems.length}`,
      note: 'recent operating events available for recovery',
    },
  ]
  const twinSignals = recommendedTwinProfile
    ? [
        {
          label: 'Replacement capacity',
          value: `${programReplacementScore ?? 0}%`,
          note: recommendedTwinProfile.replacementScope,
        },
        {
          label: 'Supervision model',
          value: programSupervision ?? 'medium',
          note: 'Defines how much human review stays mandatory before the twin can move.',
        },
        {
          label: 'Twin fit',
          value: recommendedTwinProfile.roleLabel,
          note: `${recommendedTwinProfile.seniority} coverage tuned for ${recommendedTwinProfile.geography}.`,
        },
      ]
    : []
  const twinMandate = recommendedTwinProfile
    ? [
        {
          label: 'Market fit',
          value: recommendedTwinProfile.targetCompanies,
        },
        {
          label: 'Key KPIs',
          value: recommendedTwinProfile.keyKPIs.join(' · '),
        },
        {
          label: 'Core routines',
          value: recommendedTwinProfile.coreRoutines.join(' · '),
        },
      ]
    : []

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <Link
        href="/app/projects"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 transition-colors hover:text-foreground"
      >
        <ArrowLeft size={13} /> Back to programs
      </Link>

      <section className="n3-panel-soft mt-5 overflow-hidden shadow-[0_18px_60px_-44px_rgba(15,23,42,0.45)]">
        <div className="grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="n3-chip">
                <Sparkles size={12} className="text-primary" />
                Program operating record
              </div>
              <div className="n3-chip-soft">
                {projectTypeLabel}
              </div>
              {programReplacementScore !== null ? (
                <div className="n3-chip-soft">
                  {getReplacementBand(programReplacementScore)}
                </div>
              ) : null}
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{project.name}</h1>
            {project.description && (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-700 sm:text-base">{project.description}</p>
            )}
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-700">
              This should behave like a Twin OS operating record: the program brief, the twin assigned to the current stage, the supervision load,
              and the recoverable execution history should all stay visible in one surface.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-700">
              <span className="inline-flex items-center gap-1.5 border border-slate-200 bg-white px-3 py-1.5">
                <Bot size={11} /> {runs.length} twin executions
              </span>
              <span className="inline-flex items-center gap-1.5 border border-slate-200 bg-white px-3 py-1.5">
                <Bookmark size={11} /> {saved.length} deliverables
              </span>
              <span className="inline-flex items-center gap-1.5 border border-slate-200 bg-white px-3 py-1.5">
                <Calendar size={11} /> Updated {formatDate(project.updatedAt)}
              </span>
              {programReplacementScore !== null ? (
                <span className="inline-flex items-center gap-1.5 border border-[#d8e5e2] bg-[#eef5f2] px-3 py-1.5 text-[#173634]">
                  Replacement {programReplacementScore}%
                </span>
              ) : null}
              {programSupervision ? (
                <span className="inline-flex items-center gap-1.5 border border-[#d8e5e2] bg-[#eef5f2] px-3 py-1.5 capitalize text-[#173634]">
                  {programSupervision} supervision
                </span>
              ) : null}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="n3-dark-panel p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">Operating health</p>
              <p className="mt-3 text-2xl font-semibold">{operatingHealth}</p>
              <p className="mt-1 text-sm text-white/70">The next move should remain explicit so the program never drops back into ad hoc execution.</p>
            </div>
            <div className="n3-subpanel p-5 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-700">Program status</p>
              <p className="mt-3 text-2xl font-semibold capitalize text-foreground">{project.status}</p>
              <p className="mt-1 text-sm text-slate-700">Last updated {formatDate(project.updatedAt)} with brief, routines, twin executions, and saved state attached.</p>
            </div>
            <div className="n3-subpanel p-5 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-700">Twin program</p>
              <p className="mt-3 text-lg font-semibold text-foreground">{recommendedTwinProfile?.roleLabel || 'No twin mapped yet'}</p>
              <p className="mt-1 text-sm text-slate-700">
                {recommendedTwinProfile
                  ? `${programReplacementScore ?? 0}% replacement with ${programSupervision ?? 'medium'} supervision for the current phase.`
                  : 'Map a gemelo digital to the active workflow step to expose replacement and supervision guidance.'}
              </p>
              {programSupervision ? (
                <p className="mt-3 text-xs leading-6 text-slate-600">{getSupervisionGuidance(programSupervision)}</p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {diagnosisBlueprint.length ? (
        <section className="mt-6 overflow-hidden border border-[#8fb2aa]/50 bg-[#edf6f3] shadow-[0_18px_60px_-48px_rgba(15,23,42,0.35)]">
          <div className="grid gap-px bg-[#cfe1dc] lg:grid-cols-[0.82fr_1.18fr]">
            <div className="bg-[#edf6f3] p-5 sm:p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#527b73]">Blueprint del diagnostico</p>
              <h2 className="mt-3 text-2xl font-light tracking-[-0.03em] text-[#173634]">
                Este programa conserva la promesa comercial del primer gemelo digital.
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#52605d]">
                El diagnostico no queda perdido en el signup: ROI, supervision, datos requeridos y siguiente rutina quedan dentro del registro operativo del programa.
              </p>
            </div>
            <div className="grid gap-px bg-[#d8e5e2] sm:grid-cols-2 lg:grid-cols-3">
              {diagnosisBlueprint.map(([label, value]) => (
                <div key={label} className="bg-white p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#789b96]">{label}</p>
                  <p className="mt-2 text-sm leading-6 text-[#52605d]">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="mt-6 grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <article className="n3-panel p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-700">Operating cockpit</p>
              <h2 className="mt-2 text-xl font-semibold text-foreground">Advance the initiative without leaving the operating record</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">
                The operator should be able to see what matters now, which context to inherit, and who should run next without switching screens.
              </p>
            </div>
            {activeStepMeta ? (
              <div className="flex flex-wrap items-center gap-2">
                <span className={cn('rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]', activeStepMeta.tone)}>
                  {activeStepMeta.label}
                </span>
                {activeStep?.statusSource ? (
                  <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                    {activeStep.statusSource === 'auto' ? 'Auto inferred' : activeStep.statusSource === 'manual' ? 'Manual' : 'Default'}
                  </span>
                ) : null}
              </div>
            ) : (
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-700">
                No step
              </span>
            )}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.25rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">Active step</p>
              <p className="mt-2 text-sm font-semibold text-foreground">{activeStep?.name || 'No active step'}</p>
              <p className="mt-1 text-xs leading-5 text-slate-700">{activeStep?.owner || 'Unassigned'}</p>
              <p className="mt-2 text-[11px] leading-5 text-slate-600">{activeStep?.statusReason || activeStepMeta?.description || 'Define the workflow so this project has a visible next move.'}</p>
              <p className="mt-2 text-xs leading-5 text-slate-700">{activeStep?.detail || 'Define the workflow so this project has a visible next move.'}</p>
            </div>
            <div className="rounded-[1.25rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">Latest memory</p>
              <p className="mt-2 text-sm font-semibold text-foreground">{latestMemory?.title || 'No memory yet'}</p>
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-700">{latestMemory?.note || 'Capture a decision, handoff, or research insight.'}</p>
            </div>
            <div className="rounded-[1.25rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">Latest deliverable</p>
              <p className="mt-2 text-sm font-semibold text-foreground">{latestDeliverable?.title || 'No deliverable yet'}</p>
              <p className="mt-1 text-xs leading-5 text-slate-700">{latestDeliverable ? formatDate(latestDeliverable.createdAt) : 'Save a run result to build continuity.'}</p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.25rem] border border-slate-200 bg-[#f8fafc] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">Next operator</p>
              <p className="mt-2 text-sm font-semibold text-foreground">{recommendedAgent?.name || 'No gemelo mapped yet'}</p>
              <p className="mt-1 text-xs leading-5 text-slate-700">
                {recommendedAgent?.shortDescription || 'Assign a recommended gemelo so the next run can inherit the right context.'}
              </p>
              {recommendedTwinProfile ? (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Replacement</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{programReplacementScore ?? 0}%</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Supervision</p>
                    <p className="mt-1 text-sm font-semibold capitalize text-foreground">{programSupervision ?? 'medium'}</p>
                  </div>
                </div>
              ) : null}
              {programSupervision ? (
                <p className="mt-3 text-xs leading-5 text-slate-600">{getSupervisionGuidance(programSupervision)}</p>
              ) : null}
            </div>
            <div className="rounded-[1.25rem] border border-slate-200 bg-[#f8fafc] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">Next step after this</p>
              <p className="mt-2 text-sm font-semibold text-foreground">{nextStep?.name || 'No later step defined'}</p>
              <p className="mt-1 text-xs leading-5 text-slate-700">
                {nextStep?.detail || 'Add or refine workflow steps so the project can continue without improvising the next phase.'}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button size="sm" onClick={advanceWorkflowManually} disabled={!activeStep}>
              Advance workflow
            </Button>
            {recommendedRunHref ? (
              <Button size="sm" asChild>
                <Link href={recommendedRunHref}>Run recommended gemelo</Link>
              </Button>
            ) : null}
            <Button variant="outline" size="sm" asChild>
              <Link href="/app/agents">Run next gemelo</Link>
            </Button>
          </div>
        </article>

        <article className="n3-panel p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-700">Handoff package</p>
              <h2 className="mt-2 text-xl font-semibold text-foreground">Generated from the live operating state</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">
                This package should let the next gemelo or human operator continue the work without asking what happened before.
              </p>
            </div>
            {handoffText ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => void navigator.clipboard.writeText(handoffText)}
              >
                Copy handoff
              </Button>
            ) : null}
          </div>
          {handoffPacket ? (
            <div className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-[1.4rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="n3-chip-soft">{handoffPacket.projectTypeLabel}</div>
                  <div className="n3-chip-soft">{handoffPacket.executionMode}</div>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{handoffPacket.summary}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">{handoffPacket.outputExpectation}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="n3-subpanel">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">Objective</p>
                    <p className="mt-2 text-sm leading-6 text-slate-800">{handoffPacket.objective}</p>
                  </div>
                  <div className="n3-subpanel">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">Current operator state</p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">{handoffPacket.currentStep}</p>
                    <p className="mt-1 text-xs text-slate-700">{handoffPacket.currentStepOwner}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{handoffPacket.currentStepDetail}</p>
                  </div>
                  <div className="n3-subpanel">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">Latest inherited memory</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {handoffPacket.latestMemory || 'No explicit memory captured yet.'}
                    </p>
                  </div>
                  <div className="n3-subpanel">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">Latest deliverable</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {handoffPacket.latestDeliverable || 'No deliverables saved yet.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="n3-subpanel">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">Next movement</p>
                  <div className="mt-3 flex items-start gap-3">
                    <div className="mt-0.5 bg-primary/10 p-2 text-primary">
                      <ArrowRight size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{handoffPacket.nextStep || 'No further step defined yet'}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-700">{handoffPacket.riskNote}</p>
                    </div>
                  </div>
                </div>

                <div className="n3-subpanel">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">Handoff checklist</p>
                  <div className="mt-3 space-y-2">
                    {handoffPacket.handoffChecklist.map((item) => (
                      <div key={item} className="flex items-start gap-32xl border border-white/70 bg-white/85 px-3 py-2.5">
                        <Bookmark size={14} className="mt-0.5 text-primary" />
                        <p className="text-sm leading-6 text-slate-700">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-5 border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-4">
              <p className="text-sm leading-6 text-slate-700">
                Add an operating brief and activate a workflow step to generate a reusable handoff.
              </p>
            </div>
          )}
          {recommendedAgent ? (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border border-slate-200 bg-white p-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">Recommended gemelo</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{recommendedAgent.name}</p>
                <p className="mt-1 text-xs leading-5 text-slate-700">{recommendedAgent.shortDescription}</p>
              </div>
              {recommendedRunHref ? (
                <Button size="sm" asChild>
                  <Link href={recommendedRunHref}>Open prefilled run</Link>
                </Button>
              ) : null}
            </div>
          ) : null}
        </article>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {continuitySignals.map((item) => (
          <article key={item.label} className="rounded-[1.35rem] border border-slate-200 bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.35)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground">{item.value}</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{item.note}</p>
          </article>
        ))}
      </section>

      {twinSignals.length ? (
        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {twinSignals.map((item) => (
            <article key={item.label} className="rounded-[1.35rem] border border-[#d8e5e2] bg-[#eef5f2] p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.2)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#52605d]">{item.label}</p>
              <p className="mt-3 text-3xl font-semibold capitalize tracking-[-0.04em] text-[#173634]">{item.value}</p>
              <p className="mt-2 text-sm leading-6 text-[#52605d]">{item.note}</p>
            </article>
          ))}
        </section>
      ) : null}

      {twinMandate.length ? (
        <section className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="n3-panel p-5 sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-700">Twin mandate</p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">What this program is actually designed to replace</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              A differentiated twin product needs more than an agent name. It should expose where the twin fits, which throughput it owns, and how operators should supervise it.
            </p>
            <div className="mt-5 space-y-4">
              {twinMandate.map((item) => (
                <div key={item.label} className="rounded-[1.2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">{item.label}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{item.value}</p>
                </div>
              ))}
            </div>
          </article>
          <article className="n3-panel p-5 sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-700">Supervision protocol</p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">Human control stays explicit instead of implied</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              The product becomes more credible when each program declares its automation ceiling and review model instead of pretending every twin can run fully autonomous.
            </p>
            <div className="mt-5 border border-[#d8e5e2] bg-[#eef5f2] p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#52605d]">Current guidance</p>
              <p className="mt-3 text-2xl font-semibold capitalize text-[#173634]">{programSupervision ?? 'medium'} supervision</p>
              <p className="mt-2 text-sm leading-6 text-[#52605d]">
                {programSupervision ? getSupervisionGuidance(programSupervision) : 'No supervision protocol is available until a twin is mapped to the active step.'}
              </p>
            </div>
            {recommendedTwinProfile ? (
              <p className="mt-4 text-xs leading-6 text-slate-600">
                Industries: {recommendedTwinProfile.industries.join(' · ')}
              </p>
            ) : null}
          </article>
        </section>
      ) : null}

      {isEditingBrief && briefDraft ? (
        <section className="mt-6 border border-slate-200 bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)] sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-700">Edit operating brief</p>
              <h2 className="mt-2 text-xl font-semibold text-foreground">Update the reusable project context</h2>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsEditingBrief(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={saveBrief}>
                Save brief
              </Button>
            </div>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label>Objective</Label>
              <Textarea
                value={briefDraft.objective}
                onChange={(e) => setBriefDraft((prev) => (prev ? { ...prev, objective: e.target.value } : prev))}
                className="mt-2"
                rows={3}
              />
            </div>
            <div>
              <Label>Audience</Label>
              <Input
                value={briefDraft.audience}
                onChange={(e) => setBriefDraft((prev) => (prev ? { ...prev, audience: e.target.value } : prev))}
                className="mt-2"
              />
            </div>
            <div>
              <Label>Tone</Label>
              <Input
                value={briefDraft.tone}
                onChange={(e) => setBriefDraft((prev) => (prev ? { ...prev, tone: e.target.value } : prev))}
                className="mt-2"
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Success definition</Label>
              <Textarea
                value={briefDraft.successDefinition}
                onChange={(e) => setBriefDraft((prev) => (prev ? { ...prev, successDefinition: e.target.value } : prev))}
                className="mt-2"
                rows={3}
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Constraints</Label>
              <Textarea
                value={briefDraft.constraints.join('\n')}
                onChange={(e) =>
                  setBriefDraft((prev) =>
                    prev
                      ? {
                          ...prev,
                          constraints: e.target.value.split('\n'),
                        }
                      : prev,
                  )
                }
                className="mt-2"
                rows={4}
              />
            </div>
          </div>
        </section>
      ) : null}

      <div className="mt-6 border border-slate-200 bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)] sm:p-6">
        <Tabs defaultValue="brief">
          <TabsList className="grid w-full grid-cols-42xl bg-slate-50 p-1">
            <TabsTrigger value="brief" className="rounded-xl text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Brief
            </TabsTrigger>
            <TabsTrigger value="workflow" className="rounded-xl text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Workflow
            </TabsTrigger>
            <TabsTrigger value="runs" className="rounded-xl text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Twin ledger ({runs.length})
            </TabsTrigger>
            <TabsTrigger value="saved" className="rounded-xl text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Deliverables ({saved.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="brief" className="mt-6">
            {operatingBrief ? (
              <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                <article className="rounded-[1.5rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-700">Operating brief</p>
                      <h2 className="mt-3 text-xl font-semibold text-foreground">{operatingBrief.objective}</h2>
                    </div>
                    <Button variant="outline" size="sm" onClick={startBriefEdit}>
                      Edit brief
                    </Button>
                  </div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-700">Audience</p>
                      <p className="mt-2 text-sm leading-6 text-slate-700">{operatingBrief.audience}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-700">Tone</p>
                      <p className="mt-2 text-sm leading-6 text-slate-700">{operatingBrief.tone}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-700">Success definition</p>
                      <p className="mt-2 text-sm leading-6 text-slate-700">{operatingBrief.successDefinition}</p>
                    </div>
                  </div>
                </article>
                <article className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-700">Constraints</p>
                  <ul className="mt-4 space-y-3">
                    {operatingBrief.constraints.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-slate-700">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            ) : null}
          </TabsContent>

          <TabsContent value="workflow" className="mt-6">
            {workflow.length ? (
              <div className="grid gap-4 md:grid-cols-3">
                {workflow.map((step, index) => (
                  (() => {
                    const stepAgentSlug = resolveRecommendedAgentSlug(step)
                    const stepAgent = stepAgentSlug ? getAgentBySlug(stepAgentSlug) : null
                    const stepTwinProfile = stepAgent?.twinProfile ?? null

                    return (
                      <article
                        key={step.id}
                        className="rounded-[1.35rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-700">Step {index + 1}</p>
                          <span className={cn('rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]', getWorkflowStatusMeta(step.status).tone)}>
                            {getWorkflowStatusMeta(step.status).label}
                          </span>
                        </div>
                        <h3 className="mt-3 text-base font-semibold text-foreground">{step.name}</h3>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-700">{step.owner}</p>
                        <p className="mt-2 text-[11px] leading-5 text-slate-600">{getWorkflowStatusMeta(step.status).description}</p>
                        {step.statusSource ? <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">{step.statusSource === 'auto' ? 'Auto inferred' : step.statusSource === 'manual' ? 'Manual override' : 'Default state'}</p> : null}
                        {step.statusReason ? <p className="mt-2 text-[11px] leading-5 text-slate-600">{step.statusReason}</p> : null}
                        <p className="mt-3 text-sm leading-6 text-slate-700">{step.detail}</p>
                        {stepTwinProfile ? (
                          <div className="mt-4 grid grid-cols-2 gap-2">
                            <div className="rounded-[1rem] border border-[#d8e5e2] bg-[#eef5f2] px-3 py-3">
                              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#52605d]">Replacement</p>
                              <p className="mt-1 text-lg font-semibold text-[#173634]">{stepTwinProfile.operationalReplacementScore ?? 0}%</p>
                              <p className="mt-1 text-[11px] leading-5 text-[#52605d]">{getReplacementBand(stepTwinProfile.operationalReplacementScore ?? 0)}</p>
                            </div>
                            <div className="rounded-[1rem] border border-[#d8e5e2] bg-[#eef5f2] px-3 py-3">
                              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#52605d]">Supervision</p>
                              <p className="mt-1 text-lg font-semibold capitalize text-[#173634]">{stepTwinProfile.supervisionLevel ?? 'medium'}</p>
                              <p className="mt-1 text-[11px] leading-5 text-[#52605d]">{stepAgent?.name}</p>
                            </div>
                          </div>
                        ) : null}
                        {stepTwinProfile ? (
                          <p className="mt-3 text-xs leading-5 text-slate-600">
                            {getSupervisionGuidance(stepTwinProfile.supervisionLevel ?? 'medium')}
                          </p>
                        ) : null}
                        {(() => {
                          const workflowProject = {
                            ...project,
                            operatingBrief,
                            memory,
                            workflow,
                          }
                          const preset = buildProjectRunPresetForStep(
                            workflowProject,
                            step,
                          )
                          const presetHref = buildProjectRunHrefForStep(workflowProject, step)

                          return preset ? (
                            <div className="mt-4 border border-slate-200 bg-white p-4">
                              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">Twin execution preview</p>
                              <p className="mt-2 text-sm font-semibold text-foreground">
                                {getAgentBySlug(preset.agentSlug)?.name ?? 'Mapped gemelo'}
                              </p>
                              <p className="mt-1 text-xs leading-5 text-slate-700">
                                Deliverable: {preset.desiredOutput} · Depth: {preset.detailLevel}
                              </p>
                              <p className="mt-2 text-xs leading-5 text-slate-700">{preset.rationale}</p>
                              {presetHref ? (
                                <div className="mt-3">
                                  <Link
                                    href={presetHref}
                                    className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700 hover:text-foreground"
                                  >
                                    Open supervised execution <ArrowRight size={11} />
                                  </Link>
                                </div>
                              ) : null}
                            </div>
                          ) : null
                        })()}
                        <div className="mt-4">
                          <Label className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700">
                            Operating status
                          </Label>
                          <Select
                            value={step.status}
                            onValueChange={(value) => void updateWorkflowStatus(step.id, value as ProjectWorkflowStatus)}
                          >
                            <SelectTrigger className="mt-2 h-9 border-slate-200 bg-white text-xs">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ready">Ready</SelectItem>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="awaiting-decision">Awaiting decision</SelectItem>
                              <SelectItem value="at-risk">At risk</SelectItem>
                              <SelectItem value="blocked">Blocked</SelectItem>
                              <SelectItem value="done">Done</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="mt-4">
                          <Label className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700">
                            Recommended gemelo
                          </Label>
                          <Select
                            value={step.recommendedAgentSlug ?? 'none'}
                            onValueChange={(value) => void updateWorkflowRecommendedAgent(step.id, value ?? 'none')}
                          >
                            <SelectTrigger className="mt-2 h-9 border-slate-200 bg-white text-xs">
                              <SelectValue placeholder="Select gemelo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">No recommendation</SelectItem>
                              {selectableAgents.map((agent) => (
                                <SelectItem key={agent.id} value={agent.slug}>
                                  {agent.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        {step.linkedRunLabel ? <p className="mt-4 text-xs text-slate-700">Linked twin execution: {step.linkedRunLabel}</p> : null}
                      </article>
                    )
                  })()
                ))}
              </div>
            ) : null}
          </TabsContent>

          <TabsContent value="runs" className="mt-6">
            {runs.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-slate-200 bg-gradient-to-b from-slate-50 to-white p-12 text-center">
                <Bot size={28} className="mx-auto text-slate-700" />
                <p className="mt-4 text-sm text-slate-700">No twin executions captured yet.</p>
                <Button size="sm" asChild className="mt-6">
                  <Link href="/app/agents">Start supervised execution</Link>
                </Button>
              </div>
            ) : (
              <div className="overflow-hidden border border-slate-200 bg-white">
                {runs.map((run, index) => {
                  return (
                  <Link
                    key={run.id}
                    href={`/app/history/${run.id}`}
                    className={cn(
                      'group flex items-start gap-3 p-4 transition-colors hover:bg-slate-50/70',
                      index < runs.length - 1 && 'border-b border-slate-200'
                    )}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center2xl bg-slate-950 text-white">
                      <Bot size={15} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">{run.agentName}</p>
                        <DivisionBadge division={run.agentDivision} size="sm" />
                        <span
                          className={cn(
                            'rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]',
                            run.status === 'completed'
                              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                              : 'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
                          )}
                        >
                          {run.status}
                        </span>
                        <span className="ml-auto text-xs text-slate-700">{formatDate(run.createdAt)}</span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-700">{run.task}</p>
                    </div>
                    <span className="mt-2 text-slate-700 transition-colors group-hover:text-foreground">
                      <ArrowRight size={13} />
                    </span>
                  </Link>
                )})}
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved" className="mt-6">
            {saved.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-slate-200 bg-gradient-to-b from-slate-50 to-white p-12 text-center">
                <p className="text-sm text-slate-700">No saved deliverables in this project yet.</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {saved.map((item) => (
                  <Link
                    key={item.id}
                    href={`/app/saved?selected=${item.id}`}
                    className="rounded-[1.35rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                        <p className="mt-1 text-xs text-slate-700">
                          {item.agentName} - {formatDate(item.createdAt)}
                        </p>
                      </div>
                      <Bookmark size={14} className="shrink-0 text-slate-700" />
                    </div>
                    <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-700">{item.content}</p>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <section className="n3-panel mt-6 p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-700">Operational timeline</p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">Brief, memory, execution, and artifacts in one sequence</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">
              This should read like a recoverable project thread so the next operator can re-enter the work in seconds.
            </p>
          </div>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-700">
            {timelineItems.length} recent events
          </span>
        </div>

        <div className="mt-6 space-y-4">
          {timelineItems.map((item, index) => (
            <div key={item.id} className="grid gap-4 md:grid-cols-[28px_1fr]">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    'flex h-7 w-7 items-center justify-center text-[10px] font-semibold uppercase',
                    item.type === 'brief' && 'bg-slate-950 text-white',
                    item.type === 'memory' && 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
                    item.type === 'run' && 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
                    item.type === 'deliverable' && 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
                  )}
                >
                  {item.type === 'brief' ? 'B' : item.type === 'memory' ? 'M' : item.type === 'run' ? 'R' : 'D'}
                </span>
                {index < timelineItems.length - 1 ? <span className="mt-2 h-full w-px bg-slate-200" /> : null}
              </div>

              <article className="rounded-[1.25rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    {item.label ? (
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">
                        {item.label}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-xs text-slate-700">{formatDateTime(item.date)}</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  {item.type === 'deliverable' && item.detail.length > 220 ? `${item.detail.slice(0, 220)}...` : item.detail}
                </p>
                {item.href ? (
                  <div className="mt-4">
                    <Link href={item.href} className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700 hover:text-foreground">
                      Open artifact <ArrowRight size={11} />
                    </Link>
                  </div>
                ) : null}
              </article>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="n3-panel p-5 sm:p-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-700">Quick capture</p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">Turn decisions into reusable memory</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Use this when something important happened outside a run but still needs to shape the next execution, review, or handoff.
            </p>
          </div>
          <div className="mt-5 space-y-4">
            <div>
              <Label>Entry title</Label>
              <Input value={memoryTitle} onChange={(e) => setMemoryTitle(e.target.value)} className="mt-2" placeholder="e.g. Positioning decision" />
            </div>
            <div>
              <Label>Entry note</Label>
              <Textarea
                value={memoryNote}
                onChange={(e) => setMemoryNote(e.target.value)}
                className="mt-2"
                rows={5}
                placeholder="Capture the decision, handoff context, or research finding that the next gemelo should inherit."
              />
            </div>
            <div>
              <Label>Source</Label>
              <Select value={memorySource} onValueChange={(value) => setMemorySource(value as ProjectMemoryEntry['source'])}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="decision">Decision</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="handoff">Handoff</SelectItem>
                  <SelectItem value="run">Run</SelectItem>
                  <SelectItem value="deliverable">Deliverable</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={captureManualMemory} disabled={!memoryTitle.trim() || !memoryNote.trim()}>
              Save memory entry
            </Button>
          </div>
        </article>

        {memory.length ? (
        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)] sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-700">Project memory</p>
              <h2 className="mt-2 text-xl font-semibold text-foreground">Decisions and reusable context</h2>
            </div>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-700">
              {memory.length} entries
            </span>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {memory.map((entry) => (
              <article key={entry.id} className="rounded-[1.25rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-foreground">{entry.title}</p>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">
                    {entry.source}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-700">{entry.note}</p>
                <p className="mt-4 text-xs text-slate-700">Captured {formatDate(entry.createdAt)}</p>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <section className="rounded-[1.75rem] border border-dashed border-slate-200 bg-gradient-to-b from-slate-50 to-white p-12 text-center">
          <p className="text-sm text-slate-700">No program memory captured yet.</p>
          <p className="mt-2 text-xs text-slate-700">Use quick capture to preserve decisions, handoffs, and research context for the next twin execution.</p>
        </section>
      )}
      </section>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild size="sm">
          <Link href="/app/agents">
            <Bot size={13} className="mr-1.5" /> Run gemelo
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href="/app/history">
            <ArrowRight size={13} className="mr-1.5" /> View twin ledger
          </Link>
        </Button>
      </div>
    </div>
  )
}
