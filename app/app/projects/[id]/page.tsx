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
  buildProjectOverlay,
  getMergedProjects,
  getProjectOverlay,
  mergeProjectBrief,
  mergeProjectMemory,
  mergeProjectRuns,
  mergeProjectSavedOutputs,
  mergeProjectWorkflow,
  persistProjectOperatingState,
  updateProjectBrief,
} from '@/lib/project-memory'
import type { ProjectMemoryEntry, ProjectOperatingBrief, ProjectOverlayState, ProjectWorkflowStep } from '@/lib/types'

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

  const projectOverlay = overlay ?? buildProjectOverlay(project)
  const operatingBrief = mergeProjectBrief(project, projectOverlay)
  const runs = mergeProjectRuns(MOCK_RUNS.filter((r) => r.projectId === id), projectOverlay)
  const saved = mergeProjectSavedOutputs(MOCK_SAVED_OUTPUTS.filter((s) => s.projectId === id), projectOverlay)
  const memory = mergeProjectMemory(project, projectOverlay)
  const workflow = mergeProjectWorkflow(project, projectOverlay)

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
    const nextOverlay = await updateProjectBrief(project, nextBrief)
    setOverlay(nextOverlay)
    setProjects((prev) =>
      prev.map((item) =>
        item.id === project.id
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
      project,
      ...nextArgs,
    })

    if (!nextOverlay) return

    const updatedAt = nextArgs.memoryEntry?.createdAt ?? new Date().toISOString()
    setOverlay(nextOverlay)
    setProjects((prev) =>
      prev.map((item) =>
        item.id === project.id
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
    const activeIndex = workflow.findIndex((step) => step.status === 'active')
    const nextIndex = activeIndex >= 0 ? activeIndex : workflow.findIndex((step) => step.status === 'next')
    if (nextIndex < 0) return

    const createdAt = new Date().toISOString()
    const nextWorkflow = workflow.map((step, index) => {
      if (index === nextIndex) {
        return {
          ...step,
          status: 'done' as const,
          linkedRunLabel: step.linkedRunLabel ?? 'Manual progression',
          completedAt: step.completedAt ?? createdAt,
        }
      }

      if (index === nextIndex + 1 && step.status === 'next') {
        return {
          ...step,
          status: 'active' as const,
        }
      }

      return step
    })

    await saveOperatingUpdate({
      workflow: nextWorkflow,
      memoryEntry: {
        id: `mem-${Date.now()}`,
        title: 'Workflow advanced manually',
        note: `Marked "${workflow[nextIndex]?.name}" as done and moved the project forward without creating a new run.`,
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
      workflow: nextWorkflow,
      memoryEntry: {
        id: `mem-${Date.now()}`,
        title: 'Workflow specialist updated',
        note: step
          ? `Assigned "${selectedAgent?.name ?? 'no specialist'}" as the recommended agent for workflow step "${step.name}".`
          : 'Updated the recommended specialist for a workflow step.',
        source: 'decision',
        createdAt,
      },
    })
  }

  const activeStep = workflow.find((step) => step.status === 'active') ?? workflow.find((step) => step.status === 'next')
  const nextStep = activeStep ? workflow[workflow.findIndex((step) => step.id === activeStep.id) + 1] : undefined
  const recommendedAgentSlug = resolveRecommendedAgentSlug(activeStep)
  const recommendedAgent = recommendedAgentSlug ? getAgentBySlug(recommendedAgentSlug) : null
  const selectableAgents = SEED_AGENTS.filter((agent) => agent.isActive)
  const latestMemory = memory[0]
  const latestDeliverable = saved[0]
  const handoffNote = operatingBrief && activeStep
    ? [
        `Objective: ${operatingBrief.objective}`,
        `Current step: ${activeStep.name} owned by ${activeStep.owner}.`,
        `Step detail: ${activeStep.detail}`,
        latestMemory ? `Latest memory: ${latestMemory.note}` : 'Latest memory: no explicit memory captured yet.',
        latestDeliverable ? `Latest deliverable: ${latestDeliverable.title}.` : 'Latest deliverable: no deliverables saved yet.',
        nextStep ? `Next step after this: ${nextStep.name}.` : 'Next step after this: no further step defined.',
      ].join('\n')
    : null
  const recommendedRunHref = useMemo(() => {
    if (!recommendedAgent || !activeStep || !handoffNote) return null

    const params = new URLSearchParams({
      task: `${activeStep.name}: ${activeStep.detail}`,
      context: handoffNote,
      desiredOutput: 'plan',
      detailLevel: 'deep',
      projectId: project.id,
    })

    return `/app/run/${recommendedAgent.slug}?${params.toString()}`
  }, [activeStep, handoffNote, project.id, recommendedAgent])
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

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <Link
        href="/app/projects"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 transition-colors hover:text-foreground"
      >
        <ArrowLeft size={13} /> Back to projects
      </Link>

      <section className="mt-5 overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#ffffff_48%,#f8fafc_100%)] shadow-[0_18px_60px_-44px_rgba(15,23,42,0.45)]">
        <div className="grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-700">
              <Sparkles size={12} className="text-primary" />
              Project operating record
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{project.name}</h1>
            {project.description && (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-700 sm:text-base">{project.description}</p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-700">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5">
                <Bot size={11} /> {runs.length} runs
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5">
                <Bookmark size={11} /> {saved.length} deliverables
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5">
                <Calendar size={11} /> Updated {formatDate(project.updatedAt)}
              </span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[1.25rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_18px_40px_-24px_rgba(15,23,42,0.9)]">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">Status</p>
              <p className="mt-3 text-2xl font-semibold capitalize">{project.status}</p>
              <p className="mt-1 text-sm text-white/70">A working record for brief, memory, workflow, and deliverables.</p>
            </div>
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-700">Last updated</p>
              <p className="mt-3 text-2xl font-semibold text-foreground">{formatDate(project.updatedAt)}</p>
              <p className="mt-1 text-sm text-slate-700">See the brief, workflow, run history, and deliverables for this initiative.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)] sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-700">Operating cockpit</p>
              <h2 className="mt-2 text-xl font-semibold text-foreground">Move the project forward without leaving the record</h2>
            </div>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-700">
              {activeStep ? activeStep.status : 'no step'}
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.25rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">Active step</p>
              <p className="mt-2 text-sm font-semibold text-foreground">{activeStep?.name || 'No active step'}</p>
              <p className="mt-1 text-xs leading-5 text-slate-700">{activeStep?.owner || 'Unassigned'}</p>
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

          <div className="mt-5 flex flex-wrap gap-3">
            <Button size="sm" onClick={advanceWorkflowManually} disabled={!activeStep}>
              Advance workflow
            </Button>
            {recommendedRunHref ? (
              <Button size="sm" asChild>
                <Link href={recommendedRunHref}>Run recommended specialist</Link>
              </Button>
            ) : null}
            <Button variant="outline" size="sm" asChild>
              <Link href="/app/agents">Run next specialist</Link>
            </Button>
          </div>
        </article>

        <article className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)] sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-700">Handoff package</p>
              <h2 className="mt-2 text-xl font-semibold text-foreground">Generated from the live project state</h2>
            </div>
            {handoffNote ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => void navigator.clipboard.writeText(handoffNote)}
              >
                Copy handoff
              </Button>
            ) : null}
          </div>
          <div className="mt-5 rounded-[1.25rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-4">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-6 text-slate-700">
              {handoffNote || 'Add an operating brief and activate a workflow step to generate a reusable handoff.'}
            </pre>
          </div>
          {recommendedAgent ? (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-[1.25rem] border border-slate-200 bg-white p-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">Recommended specialist</p>
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

      {isEditingBrief && briefDraft ? (
        <section className="mt-6 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)] sm:p-6">
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

      <div className="mt-6 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)] sm:p-6">
        <Tabs defaultValue="brief">
          <TabsList className="grid w-full grid-cols-4 rounded-2xl bg-slate-50 p-1">
            <TabsTrigger value="brief" className="rounded-xl text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Brief
            </TabsTrigger>
            <TabsTrigger value="workflow" className="rounded-xl text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Workflow
            </TabsTrigger>
            <TabsTrigger value="runs" className="rounded-xl text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Runs ({runs.length})
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
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
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
                  <article
                    key={step.id}
                    className="rounded-[1.35rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-700">Step {index + 1}</p>
                      <span
                        className={cn(
                          'rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]',
                          step.status === 'done'
                            ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                            : step.status === 'active'
                              ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200'
                              : 'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
                        )}
                      >
                        {step.status}
                      </span>
                    </div>
                    <h3 className="mt-3 text-base font-semibold text-foreground">{step.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-700">{step.owner}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-700">{step.detail}</p>
                    {resolveRecommendedAgentSlug(step) ? (
                      <p className="mt-3 text-xs font-medium text-slate-700">
                        Recommended specialist: {getAgentBySlug(resolveRecommendedAgentSlug(step) ?? '')?.name ?? 'Mapped specialist'}
                      </p>
                    ) : null}
                    <div className="mt-4">
                      <Label className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700">
                        Recommended specialist
                      </Label>
                      <Select
                        value={step.recommendedAgentSlug ?? 'none'}
                        onValueChange={(value) => void updateWorkflowRecommendedAgent(step.id, value)}
                      >
                        <SelectTrigger className="mt-2 h-9 rounded-xl border-slate-200 bg-white text-xs">
                          <SelectValue placeholder="Select specialist" />
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
                    {step.linkedRunLabel ? <p className="mt-4 text-xs text-slate-700">Linked run: {step.linkedRunLabel}</p> : null}
                  </article>
                ))}
              </div>
            ) : null}
          </TabsContent>

          <TabsContent value="runs" className="mt-6">
            {runs.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-slate-200 bg-gradient-to-b from-slate-50 to-white p-12 text-center">
                <Bot size={28} className="mx-auto text-slate-700" />
                <p className="mt-4 text-sm text-slate-700">No runs captured yet.</p>
                <Button size="sm" asChild className="mt-6">
                  <Link href="/app/agents">Start a run</Link>
                </Button>
              </div>
            ) : (
              <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
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
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
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

      <section className="mt-6 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)] sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-700">Operational timeline</p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">Brief, memory, runs, and deliverables in one sequence</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">
              This is the project thread the next specialist should be able to recover in seconds.
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
                    'flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold uppercase',
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
        <article className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)] sm:p-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-700">Quick capture</p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">Turn decisions into reusable memory</h2>
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
                placeholder="Capture the decision, handoff context, or research finding that the next specialist should inherit."
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
          <p className="text-sm text-slate-700">No project memory captured yet.</p>
          <p className="mt-2 text-xs text-slate-700">Use quick capture to preserve decisions, handoffs, and research context for the next run.</p>
        </section>
      )}
      </section>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild size="sm">
          <Link href="/app/agents">
            <Bot size={13} className="mr-1.5" /> Run specialist
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href="/app/history">
            <ArrowRight size={13} className="mr-1.5" /> View all runs
          </Link>
        </Button>
      </div>
    </div>
  )
}
