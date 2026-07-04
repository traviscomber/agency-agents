'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { UsageMeter } from '@/components/shared/UsageMeter'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { MOCK_USER, MOCK_RUNS, MOCK_PROJECTS, MOCK_SAVED_OUTPUTS } from '@/lib/data/mock-store'
import { getAgentBySlug, getFeaturedAgents } from '@/lib/data/seed-agents'
import { getPlanById } from '@/lib/data/plans'
import {
  ArrowRight,
  Bookmark,
  Bot,
  FolderOpen,
  Plus,
  Zap,
  GitBranch,
  Cpu,
  Sparkles,
  Orbit,
  Radar,
  ShieldCheck,
  Workflow,
} from 'lucide-react'
import type { AgentRun, Project, SavedOutput } from '@/lib/types'
import { getAllRuns, getAllSavedOutputs, getMergedProjects } from '@/lib/project-memory'

function resolveRecommendedAgentSlug(project: Project) {
  const activeStep = project.workflow?.find((step) => step.status === 'active') ?? project.workflow?.find((step) => step.status === 'next')
  if (!activeStep) return null
  if (activeStep.recommendedAgentSlug) return activeStep.recommendedAgentSlug

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

  return ownerMap[activeStep.owner] ?? null
}

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
  const topProjects = projects.slice(0, 3)
  const latestSaved = savedOutputs.slice(0, 3)
  const activeProjects = projects.filter((project) => project.status === 'active').slice(0, 4)
  const divisionsInUse = new Set(runs.map((run) => run.agentDivision)).size
  const completionRate = runs.length === 0
    ? 0
    : Math.round((runs.filter((run) => run.status === 'completed').length / runs.length) * 100)
  const workflowHealth = projects.length === 0
    ? 'No active workstreams yet'
    : `${projects.filter((project) => project.status === 'active').length} active workstreams`

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <section className="n3-glow-ring overflow-hidden border border-[#1e3431] bg-[#173634] text-[#f5fbfa]">
        <div className="n3-hero-grid relative grid gap-8 px-6 py-8 lg:grid-cols-[1.35fr_0.85fr] lg:px-8 lg:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(143,178,170,0.18),_transparent_34%),linear-gradient(135deg,_rgba(6,10,16,0.14),_transparent_56%)]" />
          <div className="relative">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9db7b1]">Autonomous Operating Layer</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-light leading-none tracking-[-0.04em] text-white sm:text-5xl">
              Build launches, delivery systems, and agent workflows from one deliberate command surface.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#d9e3e0] sm:text-[15px]">
              The current plan should feel less like a generic dashboard and more like an operating system for agency work:
              brief first, specialist execution second, reusable outputs always retained.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild className="h-10 rounded-none border border-[#8fb2aa] bg-[#8fb2aa] px-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#173634] hover:bg-[#d9e3e0]">
                <Link href="/app/agents">Launch specialist <ArrowRight size={12} className="ml-1.5" /></Link>
              </Button>
              <Button asChild variant="outline" className="h-10 rounded-none border-[#789b96] bg-transparent px-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f5fbfa] hover:bg-white/8 hover:text-white">
                <Link href="/app/projects"><Plus size={12} className="mr-1.5" />Open work ledger</Link>
              </Button>
            </div>
            <div className="mt-8 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
              {[
                { label: 'Projects in motion', value: projects.length, note: workflowHealth },
                { label: 'Completion rate', value: `${completionRate}%`, note: 'recent execution quality' },
                { label: 'Divisions active', value: divisionsInUse || 0, note: 'specialist coverage' },
              ].map(({ label, value, note }) => (
                <div key={label} className="n3-metric-card bg-[#102826]/90 px-4 py-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9db7b1]">{label}</p>
                  <p className="mt-3 text-3xl font-light tracking-[-0.04em] text-white">{value}</p>
                  <p className="mt-1 text-xs text-[#c3d3cf]">{note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative grid gap-4">
            <div className="border border-white/10 bg-[#0d1f1d]/90 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9db7b1]">System brief</p>
                  <p className="mt-3 text-2xl font-light tracking-[-0.04em] text-white">
                    {plan?.name ?? 'Professional'} plan
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 border border-[#789b96] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d9e3e0]">
                  <Sparkles size={11} />
                  Live
                </span>
              </div>
              <div className="mt-5 grid gap-3 text-sm text-[#d9e3e0]">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span>Runs used this cycle</span>
                  <span className="font-medium text-white">{MOCK_USER.runsUsed} / {MOCK_USER.runsLimit}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span>Saved deliverables</span>
                  <span className="font-medium text-white">{savedOutputs.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Suggested next move</span>
                  <span className="font-medium text-white">Tighten project briefs</span>
                </div>
              </div>
            </div>
            <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
              {[
                { href: '/app/agents', icon: Zap, label: 'Direct execution', copy: 'Run one specialist against a focused task.' },
                { href: '/app/chains', icon: GitBranch, label: 'Workflow chain', copy: 'Move from isolated prompts to orchestrated delivery.' },
                { href: '/app/fine-tuning', icon: Cpu, label: 'Training track', copy: 'Prepare reusable patterns and model refinement.' },
                { href: '/app/saved', icon: Bookmark, label: 'Output library', copy: 'Recover artifacts instead of restarting from zero.' },
              ].map(({ href, icon: Icon, label, copy }) => (
                <Link key={href} href={href} className="group bg-[#102826]/90 p-4 transition-colors hover:bg-[#163230]">
                  <div className="flex h-9 w-9 items-center justify-center border border-white/10 bg-white/5 text-[#9db7b1]">
                    <Icon size={15} />
                  </div>
                  <p className="mt-4 text-sm font-medium text-white">{label}</p>
                  <p className="mt-1 text-xs leading-6 text-[#c3d3cf]">{copy}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9db7b1] group-hover:text-white">
                    Open <ArrowRight size={10} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-8">
          <section className="border border-[#d8e5e2] bg-[#fbfbfa]">
            <div className="flex items-center justify-between border-b border-[#d8e5e2] bg-[#f1f6f4] px-5 py-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">Control room</p>
                <p className="mt-1 text-sm text-[#52605d]">Active projects, current step, and the next recommended specialist.</p>
              </div>
              <Link href="/app/projects" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa] hover:text-[#173634]">
                Open ledger
              </Link>
            </div>
            <div className="grid gap-px bg-[#d8e5e2]">
              {activeProjects.map((project) => {
                const activeStep = project.workflow?.find((step) => step.status === 'active') ?? project.workflow?.find((step) => step.status === 'next')
                const recommendedAgentSlug = resolveRecommendedAgentSlug(project)
                const recommendedAgent = recommendedAgentSlug ? getAgentBySlug(recommendedAgentSlug) : null

                return (
                  <div key={project.id} className="grid gap-4 bg-[#fbfbfa] px-5 py-5 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-[#173634]">{project.name}</p>
                        <span className="rounded-full bg-[#f1f6f4] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">
                          {activeStep?.status ?? 'idle'}
                        </span>
                      </div>
                      <div className="mt-3 grid gap-3 md:grid-cols-3">
                        <div className="rounded-[1rem] border border-[#d8e5e2] bg-white px-3 py-3">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8fb2aa]">Current step</p>
                          <p className="mt-1 text-sm font-medium text-[#173634]">{activeStep?.name ?? 'No step set'}</p>
                          <p className="mt-1 text-xs leading-5 text-[#52605d]">{activeStep?.owner ?? 'No owner'}</p>
                        </div>
                        <div className="rounded-[1rem] border border-[#d8e5e2] bg-white px-3 py-3">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8fb2aa]">Recommended specialist</p>
                          <p className="mt-1 text-sm font-medium text-[#173634]">{recommendedAgent?.name ?? 'No recommendation'}</p>
                          <p className="mt-1 text-xs leading-5 text-[#52605d]">{recommendedAgent?.division ?? 'Choose one inside the project'}</p>
                        </div>
                        <div className="rounded-[1rem] border border-[#d8e5e2] bg-white px-3 py-3">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8fb2aa]">Reusable state</p>
                          <p className="mt-1 text-sm font-medium text-[#173634]">{project.memory?.length ?? 0} memory · {project.savedCount ?? 0} saved</p>
                          <p className="mt-1 text-xs leading-5 text-[#52605d]">{project.runCount ?? 0} runs linked to the record</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 lg:justify-end">
                      <Button variant="outline" asChild className="h-9 rounded-none border-[#d8e5e2] px-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#173634]">
                        <Link href={`/app/projects/${project.id}`}>
                          <Workflow size={12} className="mr-1.5" /> Open project
                        </Link>
                      </Button>
                      {recommendedAgent ? (
                        <Button asChild className="h-9 rounded-none bg-[#173634] px-4 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-[#1e3431]">
                          <Link href={`/app/run/${recommendedAgent.slug}?projectId=${project.id}`}>
                            <Bot size={12} className="mr-1.5" /> Run next
                          </Link>
                        </Button>
                      ) : null}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <div className="grid gap-px border border-[#d8e5e2] bg-[#d8e5e2] md:grid-cols-3">
            {[
              { icon: Orbit, label: 'Agent surface', value: `${getFeaturedAgents().length} specialists`, copy: 'Ready to route work by division and depth.' },
              { icon: Radar, label: 'Operational memory', value: `${savedOutputs.length} reusable outputs`, copy: 'Briefs, runs, and deliverables stay connected.' },
              { icon: ShieldCheck, label: 'Delivery posture', value: `${recentRuns.length} recent runs`, copy: 'Use history to re-run, save, and inspect decisions.' },
            ].map(({ icon: Icon, label, value, copy }) => (
              <div key={label} className="bg-[#fbfbfa] p-5">
                <div className="flex h-10 w-10 items-center justify-center border border-[#d8e5e2] bg-[#f1f6f4] text-[#789b96]">
                  <Icon size={16} />
                </div>
                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">{label}</p>
                <p className="mt-2 text-2xl font-light tracking-[-0.04em] text-[#173634]">{value}</p>
                <p className="mt-2 text-xs leading-6 text-[#52605d]">{copy}</p>
              </div>
            ))}
          </div>

          <section className="border border-[#d8e5e2] bg-[#fbfbfa]">
            <div className="flex items-center justify-between border-b border-[#d8e5e2] bg-[#f1f6f4] px-5 py-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">Recent execution</p>
                <p className="mt-1 text-sm text-[#52605d]">What the system has produced most recently.</p>
              </div>
              <Link href="/app/history" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa] transition-colors hover:text-[#173634]">
                Full history
              </Link>
            </div>
            <div className="divide-y divide-[#d8e5e2]">
              {recentRuns.map((run, index) => (
                <Link key={run.id} href={`/app/history/${run.id}`} className="grid gap-4 px-5 py-4 transition-colors hover:bg-[#f1f6f4] sm:grid-cols-[36px_1fr_auto] sm:items-start">
                  <div className="flex h-9 w-9 items-center justify-center border border-[#d8e5e2] bg-[#f1f6f4] text-[11px] font-semibold text-[#8fb2aa]">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-sm font-medium text-[#173634]">{run.agentName}</p>
                      <DivisionBadge division={run.agentDivision} size="sm" />
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#52605d]">{run.task}</p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-[#8fb2aa]">
                      {new Date(run.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <span className={`inline-flex h-fit shrink-0 border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${
                    run.status === 'completed'
                      ? 'border-[#d8e5e2] bg-[#f1f6f4] text-[#8fb2aa]'
                      : run.status === 'failed'
                      ? 'border-red-200 bg-red-50 text-red-500'
                      : 'border-amber-200 bg-amber-50 text-amber-600'
                  }`}>
                    {run.status}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </section>

        <aside className="space-y-8">
          <section className="border border-[#d8e5e2] bg-[#fbfbfa] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">Plan pressure</p>
            <p className="mt-2 max-w-xs text-sm leading-6 text-[#52605d]">
              Keep the operating rhythm visible so the product feels intentional, not like disconnected screens.
            </p>
            <div className="mt-5">
              <UsageMeter used={MOCK_USER.runsUsed} limit={MOCK_USER.runsLimit} plan={MOCK_USER.plan} />
            </div>
          </section>

          <section className="border border-[#d8e5e2] bg-[#fbfbfa]">
            <div className="flex items-center justify-between border-b border-[#d8e5e2] px-5 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">Projects in motion</p>
              <Link href="/app/projects" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa] hover:text-[#173634]">View all</Link>
            </div>
            <div className="divide-y divide-[#d8e5e2]">
              {topProjects.map((proj) => (
                <Link key={proj.id} href={`/app/projects/${proj.id}`} className="block px-5 py-4 transition-colors hover:bg-[#f1f6f4]">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center border border-[#d8e5e2] bg-[#f1f6f4] text-[#8fb2aa]">
                        <FolderOpen size={14} />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-[#173634]">{proj.name}</p>
                        <p className="text-[11px] text-[#52605d]">{proj.runCount} runs · {proj.savedCount} saved</p>
                      </div>
                    </div>
                    <ArrowRight size={12} className="shrink-0 text-[#8fb2aa]" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="border border-[#d8e5e2] bg-[#fbfbfa]">
            <div className="flex items-center justify-between border-b border-[#d8e5e2] px-5 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">Output library</p>
              <Link href="/app/saved" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa] hover:text-[#173634]">View all</Link>
            </div>
            <div className="divide-y divide-[#d8e5e2]">
              {latestSaved.map((saved) => (
                <Link key={saved.id} href={`/app/saved?selected=${saved.id}`} className="flex items-center gap-3 px-5 py-4 transition-colors hover:bg-[#f1f6f4]">
                  <div className="flex h-9 w-9 items-center justify-center border border-[#d8e5e2] bg-[#f1f6f4] text-[#8fb2aa]">
                    <Bookmark size={13} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[#173634]">{saved.title}</p>
                    <p className="text-[11px] text-[#52605d]">Saved artifact linked to a run.</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>

      <section className="mt-8 border border-[#d8e5e2] bg-[#fbfbfa]">
        <div className="flex items-center justify-between border-b border-[#d8e5e2] bg-[#f1f6f4] px-5 py-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">Specialist roster</p>
            <p className="mt-1 text-sm text-[#52605d]">Recommended starting points for the next cycle of work.</p>
          </div>
          <Link href="/app/agents" className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa] transition-colors hover:text-[#173634]">
            Browse all <ArrowRight size={11} />
          </Link>
        </div>
        <div className="grid gap-px bg-[#d8e5e2] sm:grid-cols-2 xl:grid-cols-4">
          {featuredAgents.map((agent) => (
            <Link key={agent.id} href={`/app/run/${agent.slug}`} className="group flex flex-col justify-between bg-[#fbfbfa] p-5 transition-colors hover:bg-[#f1f6f4]">
              <div>
                <DivisionBadge division={agent.division} size="sm" />
                <p className="mt-4 text-base font-medium text-[#173634]">{agent.name}</p>
                <p className="mt-2 text-sm leading-6 text-[#52605d]">{agent.shortDescription}</p>
              </div>
              <div className="mt-6 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8fb2aa] group-hover:text-[#173634]">
                Run specialist <ArrowRight size={10} className="ml-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
