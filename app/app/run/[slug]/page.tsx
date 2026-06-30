'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { PlanBadge } from '@/components/shared/PlanBadge'
import { SEED_AGENTS, getAgentBySlug } from '@/lib/data/seed-agents'
import { MOCK_USER, MOCK_PROJECTS } from '@/lib/data/mock-store'
import { runMockAgent } from '@/lib/ai/mock-provider'
import { canAccessAgent } from '@/lib/types'
import type { AgentOutput } from '@/lib/types'
import { ArrowLeft, Bot, Loader2, ArrowRight, Lock, Bookmark, CheckCircle2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { use } from 'react'

interface Props {
  params: Promise<{ slug: string }>
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

  if (!agent) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <p className="text-sm text-muted-foreground mb-4">Agent not found.</p>
        <Button variant="outline" asChild>
          <Link href="/app/agents">Back to agents</Link>
        </Button>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
          <Lock size={18} className="text-muted-foreground" />
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-2">Upgrade required</h2>
        <p className="text-sm text-muted-foreground mb-6">
          {agent.name} requires the{' '}
          <span className="font-medium capitalize">{agent.planRequired}</span> plan.
        </p>
        <Button asChild>
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
    // In a real app: POST to /api/saved-outputs with the output
    setSaved(true)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Back */}
      <Link
        href={`/app/agents/${slug}`}
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft size={13} /> Back to {agent.name}
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input form */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <DivisionBadge division={agent.division} />
            <PlanBadge plan={agent.planRequired} />
          </div>
          <h1 className="text-xl font-semibold text-foreground mb-1">{agent.name}</h1>
          <p className="text-sm text-muted-foreground mb-8">{agent.shortDescription}</p>

          <div className="space-y-5">
            {/* Task */}
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
                className="resize-none text-sm"
                disabled={status === 'running'}
              />
            </div>

            {/* Context */}
            <div className="space-y-1.5">
              <Label htmlFor="context" className="text-sm font-medium">
                Context{' '}
                <span className="text-muted-foreground font-normal text-xs">(optional)</span>
              </Label>
              <Textarea
                id="context"
                placeholder="Provide relevant background — product details, constraints, existing approach..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                rows={3}
                className="resize-none text-sm"
                disabled={status === 'running'}
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {/* Desired output */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Desired output</Label>
                <Select value={desiredOutput} onValueChange={setDesiredOutput} disabled={status === 'running'}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="analysis">Analysis</SelectItem>
                    <SelectItem value="action_plan">Action plan</SelectItem>
                    <SelectItem value="document_draft">Document draft</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="recommendation">Recommendation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Detail level */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Detail level</Label>
                <Select value={detailLevel} onValueChange={setDetailLevel} disabled={status === 'running'}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="concise">Concise</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="detailed">Detailed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Project */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Save to project</Label>
                <Select value={projectId} onValueChange={setProjectId} disabled={status === 'running'}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="None" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {MOCK_PROJECTS.map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleRun}
              disabled={!task.trim() || status === 'running'}
              className="w-full sm:w-auto"
            >
              {status === 'running' ? (
                <>
                  <Loader2 size={14} className="mr-2 animate-spin" /> Running...
                </>
              ) : (
                <>
                  <Bot size={14} className="mr-2" /> Run agent
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Info panel */}
        <div className="space-y-5">
          <div className="rounded-lg border border-border bg-white p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              What you get
            </h3>
            <ul className="space-y-2">
              {agent.outputFormat.map((fmt, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-foreground">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                  {fmt}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-white p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Try a prompt
            </h3>
            <div className="space-y-2">
              {agent.suggestedPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => setTask(prompt)}
                  disabled={status === 'running'}
                  className="w-full text-left text-xs text-muted-foreground hover:text-foreground p-2 rounded border border-border hover:border-primary/30 hover:bg-muted/20 transition-all leading-relaxed"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Output */}
      {status === 'running' && (
        <div className="mt-10 rounded-lg border border-border bg-white p-8">
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <Loader2 size={24} className="animate-spin text-primary" />
            <p className="text-sm font-medium text-foreground">{agent.name} is working...</p>
            <p className="text-xs text-muted-foreground">Generating a structured deliverable for your task.</p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-10 rounded-lg border border-destructive/30 bg-destructive/5 p-5 flex items-start gap-3">
          <AlertCircle size={16} className="text-destructive shrink-0 mt-0.5" />
          <p className="text-sm text-destructive">{errorMsg}</p>
        </div>
      )}

      {status === 'done' && output && (
        <div className="mt-10 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Agent output</h2>
            <div className="flex items-center gap-2">
              {saved ? (
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CheckCircle2 size={13} className="text-primary" /> Saved
                </span>
              ) : (
                <Button variant="outline" size="sm" className="text-xs h-7" onClick={handleSave}>
                  <Bookmark size={12} className="mr-1.5" /> Save output
                </Button>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="rounded-lg border border-border bg-white p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Summary
            </h3>
            <p className="text-sm text-foreground leading-relaxed">{output.summary}</p>
          </div>

          {/* Main result */}
          <div className="rounded-lg border border-border bg-white p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Main result
            </h3>
            <div className="prose prose-sm max-w-none">
              {output.mainResult.split('\n').map((line, i) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <p key={i} className="text-sm font-semibold text-foreground mt-4 mb-1">{line.replace(/\*\*/g, '')}</p>
                }
                if (line.match(/^\d\./)) {
                  return <p key={i} className="text-sm text-foreground ml-3 mb-1">{line}</p>
                }
                if (line.trim() === '') return null
                return <p key={i} className="text-sm text-foreground leading-relaxed mb-2">{line}</p>
              })}
            </div>
          </div>

          {/* Action steps */}
          <div className="rounded-lg border border-border bg-white p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Action steps
            </h3>
            <ol className="space-y-3">
              {output.actionSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Risks */}
          {output.risksNotes.length > 0 && (
            <div className="rounded-lg border border-border bg-white p-5">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Risks &amp; notes
              </h3>
              <ul className="space-y-2">
                {output.risksNotes.map((note, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                    <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Next steps */}
          <div className="rounded-lg border border-border bg-white p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Suggested next step
            </h3>
            <p className="text-sm text-foreground mb-4">{output.suggestedNextStep}</p>
            {output.relatedAgents.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {output.relatedAgents.map((relSlug) => {
                  const rel = getAgentBySlug(relSlug)
                  if (!rel) return null
                  return (
                    <Link
                      key={relSlug}
                      href={`/app/agents/${relSlug}`}
                      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border border-border bg-muted/30 text-foreground hover:border-primary/30 hover:bg-muted/60 transition-all"
                    >
                      {rel.name} <ArrowRight size={10} />
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          {/* Run another */}
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
  )
}
