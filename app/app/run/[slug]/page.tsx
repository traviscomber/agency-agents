'use client'

import { useEffect, useState, use } from 'react'
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
import { runMockAgent } from '@/lib/ai/mock-provider'
import { canAccessAgent } from '@/lib/types'
import type { AgentOutput } from '@/lib/types'
import { ArrowLeft, Bot, Loader2, ArrowRight, Lock, Bookmark, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string }>
}

function HeaderStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-border bg-white p-4 shadow-sm">
      <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-lg font-semibold text-foreground">{value}</p>
    </div>
  )
}

export default function RunAgentPage({ params }: Props) {
  const { slug } = use(params)
  const searchParams = useSearchParams()

  const agent = getAgentBySlug(slug)
  const hasAccess = agent ? canAccessAgent(MOCK_USER.plan, agent.planRequired) : false

  const [task, setTask] = useState(searchParams.get('task') || '')
  const [context, setContext] = useState('')
  const [desiredOutput, setDesiredOutput] = useState('analysis')
  const [detailLevel, setDetailLevel] = useState('standard')
  const [projectId, setProjectId] = useState('')
  const [status, setStatus] = useState<'idle' | 'running' | 'done' | 'error'>('idle')
  const [output, setOutput] = useState<AgentOutput | null>(null)
  const [saved, setSaved] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (!projectId && MOCK_PROJECTS[0]) setProjectId(MOCK_PROJECTS[0].id)
  }, [projectId])

  if (!agent) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <p className="text-sm text-muted-foreground mb-4">Agent not found.</p>
        <Button variant="outline" asChild>
          <Link href="/app/agents">Back to agents</Link>
        </Button>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-muted/40">
          <Lock size={18} className="text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Upgrade required</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {agent.name} requires the <span className="font-medium capitalize">{agent.planRequired}</span> plan.
        </p>
        <Button asChild className="mt-6">
          <Link href="/app/billing">Upgrade plan</Link>
        </Button>
      </div>
    )
  }

  async function handleRun() {
    if (!task.trim()) return
    setStatus('running')
    setOutput(null)
    setErrorMsg('')
    setSaved(false)
    try {
      const result = await runMockAgent(agent!, { task, context, desiredOutput, detailLevel })
      setOutput(result)
      setStatus('done')
    } catch {
      setErrorMsg('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  function handleSave() {
    setSaved(true)
  }

  const selectedProject = MOCK_PROJECTS.find((project) => project.id === projectId)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <Link
        href={`/app/agents/${slug}`}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={13} /> Back to {agent.name}
      </Link>

      <section className="mt-5 overflow-hidden rounded-[2rem] border border-border/70 bg-gradient-to-br from-white via-white to-muted/30 shadow-[0_18px_60px_-44px_rgba(15,23,42,0.45)]">
        <div className="grid gap-6 p-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:p-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              <Sparkles size={12} className="text-primary" />
              Run workspace
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <DivisionBadge division={agent.division} />
              <PlanBadge plan={agent.planRequired} />
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {agent.name}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {agent.shortDescription}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <HeaderStat label="Best used for" value={agent.whenToUse} />
            <HeaderStat label="Output style" value="Structured response with clear follow-through" />
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)] sm:p-6">
            <div className="grid gap-3 sm:grid-cols-3">
              <HeaderStat label="Plan" value={MOCK_USER.plan} />
              <HeaderStat label="Project" value={selectedProject?.name || 'Unassigned'} />
              <HeaderStat label="State" value={status === 'idle' ? 'Ready' : status === 'running' ? 'Running' : status === 'done' ? 'Complete' : 'Error'} />
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)] sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Run configuration</h2>
                <p className="text-xs text-muted-foreground">Shape the request before execution.</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="task" className="text-sm font-medium">
                  Task <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="task"
                  placeholder={`e.g. ${agent.suggestedPrompts[0]}`}
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  rows={4}
                  className="resize-none rounded-2xl text-sm"
                  disabled={status === 'running'}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="context" className="text-sm font-medium">
                  Context <span className="text-xs font-normal text-muted-foreground">(optional)</span>
                </Label>
                <Textarea
                  id="context"
                  placeholder="Add extra background, constraints, or links."
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  rows={3}
                  className="resize-none rounded-2xl text-sm"
                  disabled={status === 'running'}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Desired output</Label>
                  <Select value={desiredOutput} onValueChange={setDesiredOutput} disabled={status === 'running'}>
                    <SelectTrigger className="rounded-2xl text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="analysis">Analysis</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="plan">Plan</SelectItem>
                      <SelectItem value="summary">Summary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Detail level</Label>
                  <Select value={detailLevel} onValueChange={setDetailLevel} disabled={status === 'running'}>
                    <SelectTrigger className="rounded-2xl text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="concise">Concise</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="deep">Deep</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Project</Label>
                <Select value={projectId} onValueChange={setProjectId} disabled={status === 'running'}>
                  <SelectTrigger className="rounded-2xl text-sm">
                    <SelectValue placeholder="Unassigned" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_PROJECTS.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button onClick={handleRun} disabled={!task.trim() || status === 'running'} className="min-w-28">
                  {status === 'running' ? <Loader2 size={14} className="mr-1.5 animate-spin" /> : null}
                  {status === 'running' ? 'Running' : 'Run agent'}
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/app/agents">
                    Browse agents <ArrowRight size={12} className="ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {status === 'error' && (
            <div className="rounded-[1.5rem] border border-destructive/25 bg-destructive/5 p-5">
              <div className="flex items-start gap-3">
                <AlertCircle size={16} className="mt-0.5 shrink-0 text-destructive" />
                <p className="text-sm text-destructive">{errorMsg}</p>
              </div>
            </div>
          )}

          {status === 'done' && output && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground">Agent output</h2>
                {saved ? (
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CheckCircle2 size={13} className="text-primary" /> Saved
                  </span>
                ) : (
                  <Button variant="outline" size="sm" className="text-xs" onClick={handleSave}>
                    <Bookmark size={12} className="mr-1.5" /> Save output
                  </Button>
                )}
              </div>

              <div className="rounded-[1.5rem] border border-border bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Summary</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground">{output.summary}</p>
              </div>

              <div className="rounded-[1.5rem] border border-border bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Main result</h3>
                <div className="prose prose-sm mt-4 max-w-none">
                  {output.mainResult.split('\n').map((line, i) => {
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return (
                        <p key={i} className="mb-2 mt-4 text-sm font-semibold text-foreground">
                          {line.replace(/\*\*/g, '')}
                        </p>
                      )
                    }
                    if (line.match(/^\d\./)) {
                      return (
                        <p key={i} className="mb-1 ml-3 text-sm text-foreground">
                          {line}
                        </p>
                      )
                    }
                    if (line.trim() === '') return null
                    return (
                      <p key={i} className="mb-2 text-sm leading-relaxed text-foreground">
                        {line}
                      </p>
                    )
                  })}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-border bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Action steps</h3>
                <ol className="mt-4 space-y-3">
                  {output.actionSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {output.risksNotes.length > 0 && (
                <div className="rounded-[1.5rem] border border-border bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Risks &amp; notes</h3>
                  <ul className="mt-4 space-y-2">
                    {output.risksNotes.map((note, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-[1.5rem] border border-border bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Suggested next step</h3>
                <p className="mt-3 text-sm text-foreground">{output.suggestedNextStep}</p>
                {output.relatedAgents.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {output.relatedAgents.map((relSlug) => {
                      const rel = getAgentBySlug(relSlug)
                      if (!rel) return null
                      return (
                        <Link
                          key={relSlug}
                          href={`/app/agents/${relSlug}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/30 px-3 py-1.5 text-xs text-foreground transition-colors hover:border-primary/30 hover:bg-muted/60"
                        >
                          {rel.name} <ArrowRight size={10} />
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setStatus('idle')
                    setOutput(null)
                    setTask('')
                    setContext('')
                  }}
                >
                  Run another task
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/app/agents">Browse agents</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/app/history">View history</Link>
                </Button>
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Agent context</p>
                <h2 className="mt-2 text-sm font-semibold text-foreground">{agent.name}</h2>
              </div>
              <Bot size={16} className="text-muted-foreground" />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{agent.shortDescription}</p>
            <div className="mt-4 rounded-[1.25rem] border border-border bg-muted/20 p-4">
              <p className="text-xs text-muted-foreground">Recommended use</p>
              <p className="mt-1 text-sm font-medium text-foreground">{agent.whenToUse}</p>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Checklist</p>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <div className="rounded-[1.25rem] border border-border bg-muted/20 p-4">Write a task with a clear outcome.</div>
              <div className="rounded-[1.25rem] border border-border bg-muted/20 p-4">Add context if the agent needs source material.</div>
              <div className="rounded-[1.25rem] border border-border bg-muted/20 p-4">Save the output if it becomes part of your project history.</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
