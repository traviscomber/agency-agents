'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { MOCK_RUNS, MOCK_SAVED_OUTPUTS } from '@/lib/data/mock-store'
import { getAgentById } from '@/lib/data/seed-agents'
import { getRunById, getSavedOutputsForRun } from '@/lib/project-memory'
import type { AgentRun, SavedOutput } from '@/lib/types'
import { ArrowLeft, ArrowRight, Bookmark, FolderOpen } from 'lucide-react'

interface Props {
  params: Promise<{ id: string }>
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

function OutputBlock({ title, content }: { title: string; content: string }) {
  return (
    <section className="border border-[#d8e5e2]">
      <div className="border-b border-[#d8e5e2] bg-[#f1f6f4] px-5 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#173634]/45">{title}</p>
      </div>
      <div className="space-y-2 px-5 py-5 text-sm leading-relaxed text-[#173634]/80">
        {content.split('\n').map((line, index) => (
          line.trim() ? <p key={`${title}-${index}`}>{line}</p> : null
        ))}
      </div>
    </section>
  )
}

export default function RunDetailPage({ params }: Props) {
  const { id } = use(params)
  const [run, setRun] = useState<AgentRun | null>(null)
  const [savedOutputs, setSavedOutputs] = useState<SavedOutput[]>([])

  useEffect(() => {
    void (async () => {
      const [resolvedRun, relatedSavedOutputs] = await Promise.all([
        getRunById(id, MOCK_RUNS),
        getSavedOutputsForRun(id, MOCK_SAVED_OUTPUTS),
      ])

      setRun(resolvedRun)
      setSavedOutputs(relatedSavedOutputs)
    })()
  }, [id])

  if (!run) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link href="/app/history" className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa] hover:text-[#173634]">
          <ArrowLeft size={12} /> Run history
        </Link>
        <div className="mt-6 border border-[#d8e5e2] px-8 py-16 text-center">
          <p className="text-sm font-medium text-[#173634]">Run not found</p>
          <p className="mt-1 text-xs text-[#173634]/45">The execution record may have been removed or never persisted.</p>
        </div>
      </div>
    )
  }

  const runAgent = getAgentById(run.agentId)

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link href="/app/history" className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa] hover:text-[#173634]">
        <ArrowLeft size={12} /> Run history
      </Link>

      <header className="mb-8 mt-5 border-b border-[#d8e5e2] pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <DivisionBadge division={run.agentDivision} size="sm" />
          <span className="border border-[#d8e5e2] bg-[#f1f6f4] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8fb2aa]">
            {run.status}
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-light tracking-tight text-[#173634]">{run.agentName}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#173634]/70">{run.task}</p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] text-[#173634]/45">
          <span>{formatDateTime(run.createdAt)}</span>
          {run.projectName ? (
            <span className="inline-flex items-center gap-1">
              <FolderOpen size={11} /> {run.projectName}
            </span>
          ) : (
            <span>Unassigned run</span>
          )}
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <div className="space-y-5">
          {run.output ? (
            <>
              <OutputBlock title="Summary" content={run.output.summary} />
              <OutputBlock title="Main result" content={run.output.mainResult} />

              {run.output.actionSteps.length ? (
                <section className="border border-[#d8e5e2]">
                  <div className="border-b border-[#d8e5e2] bg-[#f1f6f4] px-5 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#173634]/45">Action steps</p>
                  </div>
                  <ol className="space-y-3 px-5 py-5 text-sm leading-relaxed text-[#173634]/80">
                    {run.output.actionSteps.map((step, index) => (
                      <li key={step} className="flex items-start gap-3">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center border border-[#d8e5e2] bg-[#f1f6f4] text-[10px] font-bold text-[#8fb2aa]">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </section>
              ) : null}

              {run.output.risksNotes.length ? (
                <section className="border border-[#d8e5e2]">
                  <div className="border-b border-[#d8e5e2] bg-[#f1f6f4] px-5 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#173634]/45">Risks and notes</p>
                  </div>
                  <ul className="space-y-3 px-5 py-5 text-sm leading-relaxed text-[#173634]/80">
                    {run.output.risksNotes.map((note) => (
                      <li key={note} className="flex items-start gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 bg-[#8fb2aa]" />
                        {note}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </>
          ) : (
            <section className="border border-[#d8e5e2] px-5 py-10 text-sm text-[#173634]/55">
              No persisted output was captured for this run.
            </section>
          )}
        </div>

        <aside className="space-y-4">
          <section className="border border-[#d8e5e2]">
            <div className="border-b border-[#d8e5e2] px-5 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#173634]/45">Execution metadata</p>
            </div>
            <div className="space-y-3 px-5 py-5 text-sm text-[#173634]/70">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">Output shape</p>
                <p className="mt-1 capitalize">{run.desiredOutput || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">Depth</p>
                <p className="mt-1 capitalize">{run.detailLevel || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">Model</p>
                <p className="mt-1">{run.modelUsed || 'Not recorded'}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">Credits used</p>
                <p className="mt-1">{run.creditsUsed}</p>
              </div>
            </div>
          </section>

          {savedOutputs.length ? (
            <section className="border border-[#d8e5e2]">
              <div className="border-b border-[#d8e5e2] px-5 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#173634]/45">Saved deliverables</p>
              </div>
              <div className="divide-y divide-[#d8e5e2]">
                {savedOutputs.map((savedOutput) => (
                  <Link key={savedOutput.id} href="/app/saved" className="flex items-center justify-between gap-3 px-5 py-4 hover:bg-[#f1f6f4]">
                    <div className="min-w-0">
                      <div className="inline-flex items-center gap-2 text-[#8fb2aa]">
                        <Bookmark size={12} />
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em]">Saved output</p>
                      </div>
                      <p className="mt-2 truncate text-sm text-[#173634]">{savedOutput.title}</p>
                    </div>
                    <ArrowRight size={12} className="shrink-0 text-[#d8e5e2]" />
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {runAgent ? (
            <Button asChild className="h-9 w-full rounded-none bg-[#173634] text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#1e3431]">
              <Link href={`/app/run/${runAgent.slug}`}>Run this specialist again</Link>
            </Button>
          ) : null}
        </aside>
      </div>
    </div>
  )
}
