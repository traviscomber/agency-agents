'use client'

import { useEffect, useState, use, type ReactNode } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
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
import { ArrowLeft, ArrowRight, AlertCircle, Bookmark, CheckCircle2, Loader2, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string }>
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border border-[#d8e5e2]">
      <div className="border-b border-[#d8e5e2] bg-[#f1f6f4] px-5 py-2.5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#173634]/45">{title}</p>
      </div>
      <div className="px-5 py-5 text-sm leading-relaxed text-[#173634]/80">{children}</div>
    </div>
  )
}

export default function RunAgentPage({ params }: Props) {
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

  const selectedProject = projectId === 'unassigned' ? undefined : projects.find((p) => p.id === projectId)

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
        output: payload.output,
        status: 'completed',
        modelUsed: payload.modelUsed,
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
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link href={`/app/agents/${slug}`} className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa] hover:text-[#173634]">
        <ArrowLeft size={12} /> {agent.name}
      </Link>

      <header className="mb-8 mt-5 border-b border-[#d8e5e2] pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <DivisionBadge division={agent.division} size="sm" />
          <PlanBadge plan={agent.planRequired} />
        </div>
        <h1 className="mt-3 text-3xl font-light tracking-tight text-[#173634]">{agent.name}</h1>
        <p className="mt-1 text-sm text-[#173634]/55">{agent.shortDescription}</p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#173634]/70">
          Give the specialist one clear objective, add the context that matters, and save the result into a project if it becomes part of the workflow.
        </p>
      </header>

      <div className="mb-8 grid grid-cols-3 gap-px border border-[#d8e5e2] bg-[#d8e5e2]">
        {[
          { label: 'Plan', value: MOCK_USER.plan, cap: true },
          { label: 'Project', value: selectedProject?.name || 'Unassigned' },
          { label: 'State', value: stateLabel },
        ].map(({ label, value, cap }) => (
          <div key={label} className="bg-[#fbfbfa] px-4 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8fb2aa]">{label}</p>
            <p className={cn('mt-1.5 text-base font-medium text-[#173634]', cap && 'capitalize')}>{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <section className="border border-[#d8e5e2]">
            <div className="border-b border-[#d8e5e2] px-5 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#173634]/45">Execution brief</p>
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
                  rows={3}
                  disabled={status === 'running'}
                  className="resize-none rounded-none border-[#d8e5e2] bg-[#fbfbfa] text-sm text-[#173634] focus-visible:ring-[#8fb2aa]"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-[0.16em] text-[#173634]/55">Output shape</Label>
                  <Select value={desiredOutput} onValueChange={setDesiredOutput} disabled={status === 'running'}>
                    <SelectTrigger className="h-9 rounded-none border-[#d8e5e2] bg-[#fbfbfa] text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {['analysis', 'draft', 'plan', 'summary'].map((v) => (
                        <SelectItem key={v} value={v} className="capitalize">{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-[0.16em] text-[#173634]/55">Depth</Label>
                  <Select value={detailLevel} onValueChange={setDetailLevel} disabled={status === 'running'}>
                    <SelectTrigger className="h-9 rounded-none border-[#d8e5e2] bg-[#fbfbfa] text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {['concise', 'standard', 'deep'].map((v) => (
                        <SelectItem key={v} value={v} className="capitalize">{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-[0.16em] text-[#173634]/55">Save to project</Label>
                  <Select value={projectId} onValueChange={setProjectId} disabled={status === 'running'}>
                    <SelectTrigger className="h-9 rounded-none border-[#d8e5e2] bg-[#fbfbfa] text-sm">
                      <SelectValue placeholder="Keep unassigned" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">Keep unassigned</SelectItem>
                      {projects.map((p) => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedProject?.operatingBrief && (
                <div className="border border-[#d8e5e2] bg-white px-4 py-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">Project memory</p>
                      <p className="mt-1 text-sm font-medium text-[#173634]">{selectedProject.name}</p>
                    </div>
                    <span className="rounded-full border border-[#d8e5e2] bg-[#f1f6f4] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#173634]/70">
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
                  className="h-9 rounded-none bg-[#173634] px-6 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#1e3431] disabled:opacity-40"
                >
                  {status === 'running' && <Loader2 size={13} className="mr-2 animate-spin" />}
                  {status === 'running' ? 'Running...' : 'Run specialist'}
                </Button>
                <Button asChild variant="outline" className="h-9 rounded-none border-[#d8e5e2] px-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#173634]">
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
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#173634]/45">Deliverable</p>
                {saved ? (
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#8fb2aa]">
                    <CheckCircle2 size={12} /> Saved
                  </span>
                ) : (
                  <button
                    onClick={handleSaveDeliverable}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#173634]/55 hover:text-[#173634]"
                  >
                    <Bookmark size={12} /> {selectedProject ? 'Save deliverable' : 'Save to library'}
                  </button>
                )}
              </div>

              <Block title="Summary"><p>{output.summary}</p></Block>

              <Block title="Main result">
                <div className="space-y-1.5">
                  {output.mainResult.split('\n').map((line, i) => {
                    if (!line.trim()) return null
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return <p key={i} className="mt-3 font-semibold text-[#173634]">{line.replace(/\*\*/g, '')}</p>
                    }
                    return <p key={i}>{line}</p>
                  })}
                </div>
              </Block>

              <Block title="Action steps">
                <ol className="space-y-3">
                  {output.actionSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center border border-[#d8e5e2] bg-[#f1f6f4] text-[10px] font-bold text-[#8fb2aa]">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </Block>

              {output.risksNotes.length > 0 && (
                <Block title="Risks &amp; notes">
                  <ul className="space-y-2">
                    {output.risksNotes.map((note, i) => (
                      <li key={i} className="flex items-start gap-2">
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
                    {output.relatedAgents.map((relSlug) => {
                      const rel = getAgentBySlug(relSlug)
                      if (!rel) return null
                      return (
                        <Link
                          key={relSlug}
                          href={`/app/agents/${relSlug}`}
                          className="inline-flex items-center gap-1 border border-[#d8e5e2] bg-[#f1f6f4] px-3 py-1 text-xs text-[#173634] hover:bg-white"
                        >
                          {rel.name} <ArrowRight size={10} />
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
                  className="h-9 rounded-none border-[#d8e5e2] px-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#173634]"
                >
                  Run another specialist
                </Button>
                <Button asChild className="h-9 rounded-none bg-[#173634] px-5 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#1e3431]">
                  <Link href="/app/history">View history</Link>
                </Button>
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <section className="border border-[#d8e5e2]">
            <div className="border-b border-[#d8e5e2] px-5 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#173634]/45">Specialist context</p>
            </div>
            <div className="px-5 py-5">
              <p className="text-sm font-medium text-[#173634]">{agent.name}</p>
              <p className="mt-2 text-xs leading-relaxed text-[#173634]/55">{agent.shortDescription}</p>
              <div className="mt-4 border border-[#d8e5e2] bg-[#f1f6f4] px-4 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">Best for</p>
                <p className="mt-1 text-xs text-[#173634]/70">{agent.whenToUse}</p>
              </div>
            </div>
          </section>

          <section className="border border-[#d8e5e2]">
            <div className="border-b border-[#d8e5e2] px-5 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#173634]/45">Run checklist</p>
            </div>
            <div className="divide-y divide-[#d8e5e2]">
              {[
                'Write a task with a clear outcome.',
                'Add context if the agent needs source material.',
                'Save the deliverable if it belongs to a project.',
              ].map((item) => (
                <div key={item} className="px-5 py-3 text-xs leading-relaxed text-[#173634]/60">{item}</div>
              ))}
            </div>
          </section>

          {selectedProject?.workflow?.length ? (
            <section className="border border-[#d8e5e2]">
              <div className="border-b border-[#d8e5e2] px-5 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#173634]/45">Project workflow</p>
              </div>
              <div className="divide-y divide-[#d8e5e2]">
                {selectedProject.workflow.map((step) => (
                  <div key={step.id} className="px-5 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-medium text-[#173634]">{step.name}</p>
                      <span className="text-[10px] uppercase tracking-[0.16em] text-[#8fb2aa]">{step.status}</span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-[#173634]/60">{step.detail}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </aside>
      </div>
    </div>
  )
}
