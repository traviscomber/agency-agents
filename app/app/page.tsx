'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { UsageMeter } from '@/components/shared/UsageMeter'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { MOCK_USER, MOCK_RUNS, MOCK_PROJECTS, MOCK_SAVED_OUTPUTS } from '@/lib/data/mock-store'
import { getFeaturedAgents } from '@/lib/data/seed-agents'
import { getPlanById } from '@/lib/data/plans'
import { ArrowRight, Bookmark, FolderOpen, Plus, Zap, GitBranch, Cpu } from 'lucide-react'
import type { AgentRun, Project, SavedOutput } from '@/lib/types'
import { getAllRuns, getAllSavedOutputs, getMergedProjects } from '@/lib/project-memory'

export default function AppDashboard() {
  const plan = getPlanById(MOCK_USER.plan)
  const featuredAgents = getFeaturedAgents().slice(0, 4)
  const [runs, setRuns] = useState<AgentRun[]>(MOCK_RUNS)
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS)
  const [savedOutputs, setSavedOutputs] = useState<SavedOutput[]>(MOCK_SAVED_OUTPUTS)

  useEffect(() => {
    void (async () => {
      const [allRuns, mergedProjects, allSavedOutputs] = await Promise.all([
        getAllRuns(MOCK_RUNS),
        getMergedProjects(MOCK_PROJECTS),
        getAllSavedOutputs(MOCK_SAVED_OUTPUTS),
      ])

      setRuns(allRuns)
      setProjects(mergedProjects)
      setSavedOutputs(allSavedOutputs)
    })()
  }, [])

  const recentRuns = runs.slice(0, 4)

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">

      {/* Page header */}
      <header className="mb-10 border-b border-[#d8e5e2] pb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Operational Dashboard</p>
        <h1 className="mt-2 text-3xl font-light tracking-tight text-[#173634]">
          Good morning, {MOCK_USER.fullName.split(' ')[0]}.
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[#173634]/60">
          You are on the{' '}
          <span className="font-medium text-[#173634] capitalize">{plan?.name}</span> plan.{' '}
          {MOCK_USER.runsUsed} of {MOCK_USER.runsLimit} runs used this cycle.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button asChild className="h-9 rounded-none bg-[#173634] px-5 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#1e3431]">
            <Link href="/app/agents">Run specialist <ArrowRight size={12} className="ml-1.5" /></Link>
          </Button>
          <Button asChild variant="outline" className="h-9 rounded-none border-[#d8e5e2] px-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#173634] hover:bg-[#f1f6f4]">
            <Link href="/app/projects"><Plus size={12} className="mr-1.5" />New project</Link>
          </Button>
        </div>
      </header>

      {/* Quick action panels */}
      <div className="mb-10 grid gap-px border border-[#d8e5e2] bg-[#d8e5e2] md:grid-cols-3">
        <Link href="/app/agents" className="flex items-center gap-4 bg-[#fbfbfa] px-6 py-5 hover:bg-[#f1f6f4]">
          <div className="flex h-10 w-10 items-center justify-center border border-[#d8e5e2] bg-[#f1f6f4]">
            <Zap size={16} className="text-[#8fb2aa]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#173634]">Execute</p>
            <p className="text-[10px] text-[#173634]/50">Run single agent</p>
          </div>
          <ArrowRight size={12} className="shrink-0 text-[#d8e5e2]" />
        </Link>
        <Link href="/app/chains" className="flex items-center gap-4 bg-[#fbfbfa] px-6 py-5 hover:bg-[#f1f6f4]">
          <div className="flex h-10 w-10 items-center justify-center border border-[#d8e5e2] bg-[#f1f6f4]">
            <GitBranch size={16} className="text-[#8fb2aa]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#173634]">Chain</p>
            <p className="text-[10px] text-[#173634]/50">Orchestrate workflows</p>
          </div>
          <ArrowRight size={12} className="shrink-0 text-[#d8e5e2]" />
        </Link>
        <Link href="/app/fine-tuning" className="flex items-center gap-4 bg-[#fbfbfa] px-6 py-5 hover:bg-[#f1f6f4]">
          <div className="flex h-10 w-10 items-center justify-center border border-[#d8e5e2] bg-[#f1f6f4]">
            <Cpu size={16} className="text-[#8fb2aa]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#173634]">Train</p>
            <p className="text-[10px] text-[#173634]/50">Fine-tune models</p>
          </div>
          <ArrowRight size={12} className="shrink-0 text-[#d8e5e2]" />
        </Link>
      </div>

      {/* Stats row with trends */}
      <div className="mb-10 grid grid-cols-2 gap-px border border-[#d8e5e2] bg-[#d8e5e2] sm:grid-cols-4">
        {[
          { label: 'Total runs', value: runs.length, sub: 'this cycle', trend: '+12%' },
          { label: 'Projects', value: projects.length, sub: 'active', trend: '+3' },
          { label: 'Saved deliverables', value: savedOutputs.length, sub: 'in library', trend: '+8' },
          { label: 'Specialists', value: getFeaturedAgents().length, sub: 'on your plan', trend: 'all' },
        ].map(({ label, value, sub, trend }) => (
          <div key={label} className="bg-[#fbfbfa] px-5 py-6">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">{label}</p>
              <span className="text-[9px] font-semibold text-[#8fb2aa]">{trend}</span>
            </div>
            <p className="mt-2 text-4xl font-light tracking-tight text-[#173634]">{value}</p>
            <p className="mt-1 text-xs text-[#173634]/45">{sub}</p>
          </div>
        ))}
      </div>

      {/* Split-view execution canvas */}
      <section className="mb-10 border border-[#d8e5e2]">
        <div className="border-b border-[#d8e5e2] bg-[#f1f6f4] px-6 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#173634]/45">Agent Execution Canvas</p>
        </div>
        <div className="grid h-80 gap-px bg-[#d8e5e2] sm:grid-cols-2">
          {/* Input pane */}
          <div className="flex flex-col bg-[#fbfbfa] p-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#173634]">Input</p>
            <textarea placeholder="Define your task, data, or prompt here..." className="flex-1 resize-none border border-[#d8e5e2] bg-white p-3 text-sm text-[#173634] placeholder:text-[#173634]/30 focus:outline-none focus:ring-1 focus:ring-[#8fb2aa]" />
            <Button className="mt-3 h-8 rounded-none bg-[#173634] text-xs font-semibold uppercase tracking-[0.12em] text-white hover:bg-[#1e3431]">
              Execute
            </Button>
          </div>
          {/* Output pane */}
          <div className="flex flex-col bg-[#fbfbfa] p-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#173634]">Output</p>
            <div className="flex-1 border border-[#d8e5e2] bg-white p-3 overflow-auto">
              <p className="text-xs text-[#173634]/40">Results will appear here after execution...</p>
            </div>
            <Button variant="outline" className="mt-3 h-8 rounded-none border-[#d8e5e2] text-xs font-semibold uppercase tracking-[0.12em] text-[#173634] hover:bg-[#f1f6f4]">
              Copy Output
            </Button>
          </div>
        </div>
      </section>

      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">

        {/* Recent runs */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#173634]/45">Recent runs</p>
            <Link href="/app/history" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa] transition-colors hover:text-[#173634]">
              View all
            </Link>
          </div>
          <div className="divide-y divide-[#d8e5e2] border border-[#d8e5e2]">
            {recentRuns.map((run) => (
              <div key={run.id} className="flex items-start justify-between gap-4 px-5 py-4 hover:bg-[#f1f6f4]">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#173634]">{run.agentName}</p>
                  <p className="mt-0.5 truncate text-xs text-[#173634]/50">{run.task}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <DivisionBadge division={run.agentDivision} size="sm" />
                    <span className="text-[10px] text-[#173634]/35">
                      {new Date(run.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
                <span className={`mt-0.5 shrink-0 border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                  run.status === 'completed'
                    ? 'border-[#d8e5e2] bg-[#f1f6f4] text-[#8fb2aa]'
                    : run.status === 'failed'
                    ? 'border-red-200 bg-red-50 text-red-500'
                    : 'border-amber-200 bg-amber-50 text-amber-600'
                }`}>
                  {run.status}
                </span>
              </div>
            ))}
          </div>
          <Link href="/app/history" className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa] transition-colors hover:text-[#173634]">
            All run history <ArrowRight size={11} />
          </Link>
        </section>

        {/* Right column */}
        <aside className="space-y-8">
          <section>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#173634]/45">Plan usage</p>
            <UsageMeter used={MOCK_USER.runsUsed} limit={MOCK_USER.runsLimit} plan={MOCK_USER.plan} />
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#173634]/45">Projects</p>
              <Link href="/app/projects" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa] transition-colors hover:text-[#173634]">View all</Link>
            </div>
            <div className="divide-y divide-[#d8e5e2] border border-[#d8e5e2]">
              {projects.slice(0, 3).map((proj) => (
                <Link key={proj.id} href={`/app/projects/${proj.id}`} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-[#f1f6f4]">
                  <div className="flex min-w-0 items-center gap-3">
                    <FolderOpen size={14} className="shrink-0 text-[#8fb2aa]" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[#173634]">{proj.name}</p>
                      <p className="text-[10px] text-[#173634]/40">{proj.runCount} runs</p>
                    </div>
                  </div>
                  <ArrowRight size={12} className="shrink-0 text-[#d8e5e2]" />
                </Link>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#173634]/45">Saved deliverables</p>
              <Link href="/app/saved" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa] transition-colors hover:text-[#173634]">View all</Link>
            </div>
            <div className="divide-y divide-[#d8e5e2] border border-[#d8e5e2]">
              {savedOutputs.slice(0, 3).map((s) => (
                <div key={s.id} className="flex items-center gap-3 px-4 py-3 hover:bg-[#f1f6f4]">
                  <Bookmark size={13} className="shrink-0 text-[#8fb2aa]" />
                  <p className="truncate text-sm text-[#173634]">{s.title}</p>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>

      {/* Suggested agents */}
      <section className="mt-14">
        <div className="mb-6 flex items-center justify-between border-b border-[#d8e5e2] pb-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#173634]/45">Suggested specialists</p>
          <Link href="/app/agents" className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa] transition-colors hover:text-[#173634]">
            Browse all <ArrowRight size={11} />
          </Link>
        </div>
        <div className="grid gap-px border border-[#d8e5e2] bg-[#d8e5e2] sm:grid-cols-2 lg:grid-cols-4">
          {featuredAgents.map((agent) => (
            <Link key={agent.id} href={`/app/run/${agent.slug}`} className="group flex flex-col justify-between bg-[#fbfbfa] p-5 hover:bg-[#f1f6f4]">
              <div>
                <DivisionBadge division={agent.division} size="sm" />
                <p className="mt-3 text-sm font-medium text-[#173634]">{agent.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-[#173634]/55">{agent.shortDescription}</p>
              </div>
              <div className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8fb2aa] group-hover:text-[#173634]">
                Run <ArrowRight size={10} className="ml-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
