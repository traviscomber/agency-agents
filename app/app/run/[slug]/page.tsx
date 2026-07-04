'use client'

import { useEffect, useState, use, type ReactNode } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { PlanBadge } from '@/components/shared/PlanBadge'
import { getAgentBySlug } from '@/lib/data/seed-agents'
import { MOCK_USER, MOCK_PROJECTS } from '@/lib/data/mock-store'
import {
  advanceWorkflowAfterRun,
  buildProjectContext,
  captureDeliverableMemory,
  getMergedProjects,
  persistRun,
  persistProjectRunResult,
  persistSavedOutput,
} from '@/lib/project-memory'
import { canAccessAgent } from '@/lib/types'
import type { AgentOutput, AgentRun, SavedOutput } from '@/lib/types'
import {
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  Bookmark,
  CheckCircle2,
  Loader2,
  Lock,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string }>
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border border-[#d8e5e2] bg-[#fbfbfa]">
      <div className="border-b border-[#d8e5e2] bg-[#f1f6f4] px-5 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">{title}</p>
      </div>
      <div className="px-5 py-5 text-sm leading-7 text-[#173634]/80">{children}</div>
    </div>
  )
}

function RunAgentPageContent({ params }: Props) {
  const { slug } = use(params)
  const searchParams = useSearchParams()

  const agent = getAgentBySlug(slug)
  const hasAccess = agent ? canAccessAgent(MOCK_USER.plan, agent.planRequired) : false

  const [task, setTask] = useState(searchParams.get('task') || '')
  const [context, setContext] = useState(searchParams.get('context') || '')
  const [desiredOutput, setDesiredOutput] = useState(searchParams.get('desiredOutput') || 'analysis')
  const [detailLevel, setDetailLevel] = useState(searchParams.get('detailLevel') || 'standard')
  const [projectId, setProjectId] = useState(searchParams.get('projectId') || 'unassigned')
  const [status, setStatus] = useState<'idle' | 'running' | 'done' | 'error'>('idle')
  const [output, setOutput] = useState<AgentOutput | null>(null)
  const [latestRun, setLatestRun] = useState<AgentRun | null>(null)
  const [saved, setSaved] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [prefilledProjectId, setPrefilledProjectId] = useState('')
  const [projects, setProjects] = useState(MOCK_PROJECTS)

  useEffect(() => {
    if (searchParams.get('context') || searchParams.get('desiredOutput') || searchParams.get('detailLevel') || searchParams.get('projectId')) {
      setContext(searchParams.get('context') || '')
      setDesiredOutput(searchParams.get('desiredOutput') || 'analysis')
      setDetailLevel(searchParams.get('detailLevel') || 'standard')
      setProjectId(searchParams.get('projectId') || 'unassigned')
    }

    if (searchParams.get('task')) {
      setTask(searchParams.get('task') || '')
    }
  }, [searchParams])

  useEffect(() => {
    void (async () => {
      const mergedProjects = await getMergedProjects(MOCK_PROJECTS)
      setProjects(mergedProjects)
    })()
  }, [])

  const selectedProject = projectId === 'unassigned' ? undefined : projects.find((project) => project.id === projectId)

  useEffect(() => {
    if (!selectedProject) {
      if (prefilledProjectId) {
        setContext('')
        setPrefilledProjectId('')
      }
      return
    }

    setContext(buildProjectContext(selectedProject))
    setPrefilledProjectId(selectedProject.id)
  }, [prefilledProjectId, selectedProject])

  if (!agent) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <p className="text-sm text-[#173634]/55">Agent not found.</p>
        <Button asChild variant="outline" className="mt-4 h-9 rounded-none border-[#d8e5e2] text-xs font-semibold uppercase tracking-[0.14em]">
          <Link href="/app/agents">Back to agents</Link>
        </Button>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-[#d8e5e2] bg-[#f1f6f4] text-[#173634]">
          <Lock size={18} />
        </div>
        <h2 className="text-xl font-light text-[#173634]">Upgrade required</h2>
        <p className="mt-2 text-sm text-[#173634]/55">
          {agent.name} requires the <span className="font-medium capitalize">{agent.planRequired}</span> plan.
        </p>
        <Button asChild className="mt-6 h-9 rounded-none bg-[#173634] px-5 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#1e3431]">
          <Link href="/app/billing">Upgrade plan</Link>
        </Button>
      </div>
    )
  }

  async function handleRun() {
    if (!task.trim()) return
    setStatus('running')
    setOutput(null)
    setLatestRun(null)
    setErrorMsg('')
    setSaved(false)

    try {
      const response = await fetch('/api/agent-runs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agentSlug: agent.slug,
          task,
          context,
          desiredOutput,
          detailLevel,
          userPlan: MOCK_USER.plan,
        }),
      })

      const payload = await response.json()
      if (!response.ok || !payload.success) {
        if (payload.error === 'upgrade_required' && payload.requiredPlan) {
          throw new Error(`This specialist requires the ${payload.requiredPlan} plan.`)
        }

        throw new Error(payload.error || 'Agent execution failed')
      }

      const createdAt = new Date().toISOString()
      const runRecord: AgentRun = {
        id: `run-${Date.now()}`,
        userId: MOCK_USER.id,
        agentId: payload.agentId,
        agentName: payload.agentName,
        agentDivision: payload.agentDivision,
        projectId: selectedProject?.id,
        projectName: selectedProject?.name,
        task,
        context,
        desiredOutput,
        detailLevel,
        status: 'completed',
        outputSummary: payload.output.summary,
        creditsUsed: payload.creditsUsed,
        createdAt,
      }

      await persistRun(runRecord, selectedProject)

      if (selectedProject) {
        setProjects((prev) =>
          prev.map((project) =>
            project.id === selectedProject.id
              ? {
                  ...project,
                  runCount: Math.max(project.runCount ?? 0, 0) + 1,
                  updatedAt: createdAt,
                }
              : project,
          ),
        )
      }

      setLatestRun(runRecord)
      setOutput(payload.output)
      setStatus('done')
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  async function handleSaveDeliverable() {
    if (!output || !latestRun) return

    if (!selectedProject) {
      const savedOutput: SavedOutput = {
        id: `saved-${Date.now()}`,
        userId: MOCK_USER.id,
        agentRunId: latestRun.id,
        agentName: agent.name,
        title: `${agent.name} deliverable`,
        content: output.mainResult,
        format: 'text',
        createdAt: latestRun.createdAt,
        updatedAt: latestRun.createdAt,
      }

      await persistSavedOutput(savedOutput)
      setSaved(true)
      return
    }

    const runLabel = `${agent.name}: ${task.slice(0, 48)}`
    const nextWorkflow = advanceWorkflowAfterRun(selectedProject.workflow ?? [], latestRun.id, runLabel, latestRun.createdAt)

    const savedOutput: SavedOutput = {
      id: `saved-${Date.now()}`,
      userId: MOCK_USER.id,
      projectId: selectedProject.id,
      projectName: selectedProject.name,
      agentRunId: latestRun.id,
      agentName: agent.name,
      title: `${agent.name} deliverable`,
      content: output.mainResult,
      format: 'text',
      createdAt: latestRun.createdAt,
      updatedAt: latestRun.createdAt,
    }

    const memoryEntry = captureDeliverableMemory(agent.name, task, output.summary, latestRun.createdAt)

    await persistProjectRunResult({
      project: {
        ...selectedProject,
        workflow: nextWorkflow,
      },
      run: {
        ...latestRun,
        projectId: selectedProject.id,
        projectName: selectedProject.name,
      },
      savedOutput,
      memoryEntry,
      workflow: nextWorkflow,
    })

    setProjects((prev) =>
      prev.map((project) =>
        project.id === selectedProject.id
          ? {
              ...project,
              workflow: nextWorkflow,
              memory: [memoryEntry, ...(project.memory ?? [])],
              savedCount: (project.savedCount ?? 0) + 1,
              updatedAt: latestRun.createdAt,
            }
          : project,
      ),
    )
    setSaved(true)
  }

  const stateLabel = status === 'idle' ? 'Ready' : status === 'running' ? 'Running' : status === 'done' ? 'Complete' : 'Error'

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <Link href={`/app/agents/${slug}`} className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa] hover:text-[#173634]">
        <ArrowLeft size={12} /> Back to specialist profile
      </Link>

      <section className="mt-4 overflow-hidden border border-[#1e3431] bg-[#173634] text-[#f5fbfa]">
        <div className="grid gap-px bg-[#28413d] lg:grid-cols-[1.15fr_0.85fr]">
          <div className="bg-[radial-gradient(circle_at_top_left,_rgba(143,178,170,0.22),_transparent_42%),linear-gradient(135deg,_#173634,_#102826)] px-6 py-8 sm:px-8">
            <div className="flex flex-wrap items-center gap-2">
              <DivisionBadge division={agent.division} size="sm" />
              <PlanBadge plan={agent.planRequired} />
            </div>
            <h1 className="mt-4 text-4xl font-light tracking-[-0.04em] text-white">{agent.name}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#d9e3e0]">{agent.shortDescription}</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#c3d3cf]">
              Frame one precise objective, inherit project context when needed, then save the deliverable back into the
              operating record instead of leaving it as an isolated prompt result.
            </p>
          </div>

          <div className="grid gap-px bg-[#28413d] sm:grid-cols-3 lg:grid-cols-1">
            {[
              { label: 'Plan', value: MOCK_USER.plan, cap: true },
              { label: 'Project', value: selectedProject?.name || 'Unassigned' },
              { label: 'State', value: stateLabel },
            ].map(({ label, value, cap }) => (
              <div key={label} className="bg-[#102826] px-5 py-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9db7b1]">{label}</p>
                <p className={cn('mt-2 text-2xl font-light tracking-[-0.04em] text-white', cap && 'capitalize')}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <section className="border border-[#d8e5e2] bg-[#fbfbfa]">
            <div className="border-b border-[#d8e5e2] bg-[#f1f6f4] px-5 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">Execution brief</p>
            </div>
            <div className="space-y-5 p-5">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-[0.16em] text-[#173634]/55">
                  Objective <span className="text-red-400">*</span>
                </Label>
                <Textarea
                  placeholder={`e.g. ${agent.suggestedPrompts[0]}`}
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  rows={4}
                  disabled={status === 'running'}
                  className="resize-none rounded-none border-[#d8e5e2] bg-[#fbfbfa] text-sm text-[#173634] focus-visible:ring-[#8fb2aa]"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-[0.16em] text-[#173634]/55">
                  Context <span className="font-normal normal-case text-[#173634]/30">(optional)</span>
                </Label>
                <Textarea
                  placeholder="Add background, constraints, source links, or prior decisions."
                  value={context}
                  onChange={(e) => {
                    setContext(e.target.value)
                    if (selectedProject && prefilledProjectId === selectedProject.id) setPrefilledProjectId('')
                  }}
                  rows={4}
                  disabled={status === 'running'}
                  className="resize-none rounded-none border-[#d8e5e2] bg-[#fbfbfa] text-sm text-[#173634] focus-visible:ring-[#8fb2aa]"
                />
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-[0.16em] text-[#173634]/55">Output shape</Label>
                  <Select value={desiredOutput} onValueChange={setDesiredOutput} disabled={status === 'running'}>
                    <SelectTrigger className="h-10 rounded-none border-[#d8e5e2] bg-[#fbfbfa] text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {['analysis', 'draft', 'plan', 'summary'].map((value) => (
                        <SelectItem key={value} value={value} className="capitalize">{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-[0.16em] text-[#173634]/55">Depth</Label>
                  <Select value={detailLevel} onValueChange={setDetailLevel} disabled={status === 'running'}>
                    <SelectTrigger className="h-10 rounded-none border-[#d8e5e2] bg-[#fbfbfa] text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {['concise', 'standard', 'deep'].map((value) => (
                        <SelectItem key={value} value={value} className="capitalize">{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-[0.16em] text-[#173634]/55">Save to project</Label>
                  <Select value={projectId} onValueChange={setProjectId} disabled={status === 'running'}>
                    <SelectTrigger className="h-10 rounded-none border-[#d8e5e2] bg-[#fbfbfa] text-sm">
                      <SelectValue placeholder="Keep unassigned" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">Keep unassigned</SelectItem>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedProject?.operatingBrief && (
                <div className="border border-[#d8e5e2] bg-[#f1f6f4] px-4 py-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">Inherited project memory</p>
                      <p className="mt-1 text-sm font-medium text-[#173634]">{selectedProject.name}</p>
                    </div>
                    <span className="border border-[#d8e5e2] bg-[#fbfbfa] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#173634]/70">
                      {selectedProject.workflow?.find((step) => step.status === 'active')?.name || 'No active step'}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#173634]/75">{selectedProject.operatingBrief.objective}</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">Success definition</p>
                      <p className="mt-1 text-xs leading-5 text-[#173634]/70">{selectedProject.operatingBrief.successDefinition}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">Latest memory</p>
                      <p className="mt-1 text-xs leading-5 text-[#173634]/70">
                        {selectedProject.memory?.[0]?.note || 'No memory captured yet.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button
                  onClick={handleRun}
                  disabled={!task.trim() || status === 'running'}
                  className="h-10 rounded-none bg-[#173634] px-6 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#1e3431] disabled:opacity-40"
                >
                  {status === 'running' && <Loader2 size={13} className="mr-2 animate-spin" />}
                  {status === 'running' ? 'Running...' : 'Run specialist'}
                </Button>
                <Button asChild variant="outline" className="h-10 rounded-none border-[#d8e5e2] px-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#173634]">
                  <Link href="/app/agents">Browse specialists</Link>
                </Button>
              </div>
            </div>
          </section>

          {status === 'error' && (
            <div className="flex items-start gap-3 border border-red-200 bg-red-50 px-5 py-4">
              <AlertCircle size={14} className="mt-0.5 shrink-0 text-red-500" />
              <p className="text-sm text-red-600">{errorMsg}</p>
            </div>
          )}

          {status === 'done' && output && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">Generated deliverable</p>
                  <p className="mt-1 text-sm text-[#52605d]">Review, save, and route the next specialist if needed.</p>
                </div>
                {saved ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#8fb2aa]">
                    <CheckCircle2 size={12} /> Saved
                  </span>
                ) : (
                  <button
                    onClick={handleSaveDeliverable}
                    className="inline-flex items-center gap-1.5 border border-[#d8e5e2] bg-[#fbfbfa] px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#173634] hover:bg-[#f1f6f4]"
                  >
                    <Bookmark size={12} /> {selectedProject ? 'Save deliverable' : 'Save to library'}
                  </button>
                )}
              </div>

              <Block title="Summary"><p>{output.summary}</p></Block>

              <Block title="Main result">
                <div className="space-y-2">
                  {output.mainResult.split('\n').map((line, index) => {
                    if (!line.trim()) return null
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return <p key={index} className="mt-3 font-semibold text-[#173634]">{line.replace(/\*\*/g, '')}</p>
                    }
                    return <p key={index}>{line}</p>
                  })}
                </div>
              </Block>

              <Block title="Action steps">
                <ol className="space-y-3">
                  {output.actionSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center border border-[#d8e5e2] bg-[#f1f6f4] text-[10px] font-bold text-[#8fb2aa]">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </Block>

              {output.risksNotes.length > 0 && (
                <Block title="Risks and notes">
                  <ul className="space-y-2">
                    {output.risksNotes.map((note, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 bg-[#8fb2aa]" />
                        {note}
                      </li>
                    ))}
                  </ul>
                </Block>
              )}

              <Block title="What to do next">
                <p>{output.suggestedNextStep}</p>
                {output.relatedAgents.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {output.relatedAgents.map((relatedSlug) => {
                      const related = getAgentBySlug(relatedSlug)
                      if (!related) return null

                      return (
                        <Link
                          key={relatedSlug}
                          href={`/app/agents/${relatedSlug}`}
                          className="inline-flex items-center gap-1 border border-[#d8e5e2] bg-[#f1f6f4] px-3 py-1.5 text-xs text-[#173634] hover:bg-white"
                        >
                          {related.name} <ArrowRight size={10} />
                        </Link>
                      )
                    })}
                  </div>
                )}
              </Block>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setStatus('idle')
                    setOutput(null)
                    setLatestRun(null)
                    setTask('')
                    setContext('')
                    setPrefilledProjectId('')
                    setSaved(false)
                  }}
                  className="h-10 rounded-none border-[#d8e5e2] px-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#173634]"
                >
                  Run another specialist
                </Button>
                <Button asChild className="h-10 rounded-none bg-[#173634] px-5 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#1e3431]">
                  <Link href="/app/history">View history</Link>
                </Button>
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <section className="border border-[#d8e5e2] bg-[#fbfbfa]">
            <div className="border-b border-[#d8e5e2] bg-[#f1f6f4] px-5 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">Specialist context</p>
            </div>
            <div className="px-5 py-5">
              <p className="text-sm font-medium text-[#173634]">{agent.name}</p>
              <p className="mt-2 text-sm leading-6 text-[#52605d]">{agent.whenToUse}</p>
              <div className="mt-4 border border-[#d8e5e2] bg-[#f1f6f4] px-4 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">Suggested prompt starter</p>
                <p className="mt-1 text-xs leading-5 text-[#173634]/70">{agent.suggestedPrompts[0]}</p>
              </div>
            </div>
          </section>

          <section className="border border-[#d8e5e2] bg-[#fbfbfa]">
            <div className="border-b border-[#d8e5e2] bg-[#f1f6f4] px-5 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">Run checklist</p>
            </div>
            <div className="divide-y divide-[#d8e5e2]">
              {[
                'Write a task with an explicit output.',
                'Use project context when this work belongs to a larger initiative.',
                'Save the result so the next run starts from memory instead of zero.',
              ].map((item) => (
                <div key={item} className="px-5 py-3 text-xs leading-6 text-[#52605d]">{item}</div>
              ))}
            </div>
          </section>

          {selectedProject?.workflow?.length ? (
            <section className="border border-[#d8e5e2] bg-[#fbfbfa]">
              <div className="border-b border-[#d8e5e2] bg-[#f1f6f4] px-5 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">Project workflow</p>
              </div>
              <div className="divide-y divide-[#d8e5e2]">
                {selectedProject.workflow.map((step) => (
                  <div key={step.id} className="px-5 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-medium text-[#173634]">{step.name}</p>
                      <span className="text-[10px] uppercase tracking-[0.16em] text-[#8fb2aa]">{step.status}</span>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-[#52605d]">{step.detail}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {status === 'done' && latestRun ? (
            <section className="border border-[#d8e5e2] bg-[#fbfbfa]">
              <div className="border-b border-[#d8e5e2] bg-[#f1f6f4] px-5 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">Execution receipt</p>
              </div>
              <div className="space-y-3 px-5 py-5 text-sm text-[#52605d]">
                <div className="flex items-center justify-between gap-3">
                  <span>Run id</span>
                  <span className="font-mono text-[11px] text-[#173634]">{latestRun.id}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Status</span>
                  <span className="inline-flex items-center gap-1 text-[#8fb2aa]">
                    <Sparkles size={11} />
                    {stateLabel}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Output mode</span>
                  <span className="capitalize text-[#173634]">{desiredOutput}</span>
                </div>
              </div>
            </section>
          ) : null}
        </aside>
      </div>
    </div>
  )
}

export default function RunAgentPage(props: Props) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="border border-[#d8e5e2] bg-[#fbfbfa] px-6 py-12 text-sm text-[#52605d]">
            Loading specialist workspace...
          </div>
        </div>
      }
    >
      <RunAgentPageContent {...props} />
    </Suspense>
  )
}
