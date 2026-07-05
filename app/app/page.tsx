'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
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
  Sparkles,
  Orbit,
  Radar,
  ShieldCheck,
  Workflow,
  Zap,
  Clock3,
  Binary,
} from 'lucide-react'
import type { AgentRun, DigitalTwinProfile, Project, SavedOutput } from '@/lib/types'
import { buildProjectHandoffPacket, buildProjectRunHref, getAllRuns, getAllSavedOutputs, getMergedProjects, getProjectCurrentWorkflowStep, getWorkflowStatusMeta } from '@/lib/project-memory'
import { cn } from '@/lib/utils'

function resolveRecommendedAgentSlug(project: Project) {
  const activeStep = getProjectCurrentWorkflowStep(project.workflow)
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
    Accounts: 'product-strategist',
    Delivery: 'proposal-strategist',
    Creative: 'proposal-strategist',
  }

  return ownerMap[activeStep.owner] ?? null
}

function getProjectActiveStep(project: Project) {
  return getProjectCurrentWorkflowStep(project.workflow)
}

function formatShortDate(date: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(date))
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

  const activeProjects = projects.filter((project) => project.status === 'active')
  const leadProject = activeProjects[0] ?? projects[0] ?? null
  const recentRuns = runs.slice(0, 4)
  const latestSaved = savedOutputs.slice(0, 3)
  const completionRate = runs.length === 0
    ? 0
    : Math.round((runs.filter((run) => run.status === 'completed').length / runs.length) * 100)
  const divisionsInUse = new Set(runs.map((run) => run.agentDivision)).size
  const leadStep = leadProject ? getProjectActiveStep(leadProject) : null
  const leadStepMeta = leadStep ? getWorkflowStatusMeta(leadStep.status) : null
  const leadAgent = leadProject ? getAgentBySlug(resolveRecommendedAgentSlug(leadProject) ?? '') : null
  const latestRun = runs[0] ?? null
  const latestSavedArtifact = savedOutputs[0] ?? null
  const leadPacket = leadProject ? buildProjectHandoffPacket(leadProject, latestSavedArtifact?.projectId === leadProject.id ? latestSavedArtifact : undefined) : null
  const featuredTwinProfiles = featuredAgents
    .map((agent) => agent.twinProfile)
    .filter((profile): profile is DigitalTwinProfile => Boolean(profile))
  const averageReplacementScore = featuredTwinProfiles.length === 0
    ? 0
    : Math.round(
        featuredTwinProfiles.reduce((total, profile) => total + (profile.operationalReplacementScore ?? 0), 0) /
        featuredTwinProfiles.length
      )
  const highSupervisionTwins = featuredTwinProfiles.filter((profile) => profile.supervisionLevel === 'high').length

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <section className="n3-glow-ring overflow-hidden border border-[#173634] bg-[#173634] text-[#f5fbfa]">
        <div className="n3-hero-grid relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(143,178,170,0.2),_transparent_30%),radial-gradient(circle_at_85%_15%,_rgba(255,255,255,0.08),_transparent_24%),linear-gradient(135deg,_rgba(8,16,18,0.3),_transparent_60%)]" />
          <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9db7b1]">Twin OS command surface</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-light leading-none tracking-[-0.05em] text-white sm:text-5xl">
                Deploy role twins with memory, coverage, and visible supervision.
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#d9e3e0] sm:text-[15px]">
                N3uralia Studio should behave like Twin OS: the control layer for sales, licitaciones, collections,
                implementation, and recruiting where every run leaves reusable operating state behind.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/app/projects" className="inline-flex h-10 items-center border border-[#8fb2aa] bg-[#8fb2aa] px-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#173634] hover:bg-[#dce8e4]">
                  Open active work <ArrowRight size={12} className="ml-1.5" />
                </Link>
                <Link href="/app/agents" className="inline-flex h-10 items-center border border-[#789b96] bg-transparent px-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f5fbfa] hover:bg-white/8 hover:text-white">
                  <Bot size={12} className="mr-1.5" />
                  Run twin
                </Link>
                <Link href="/app/saved" className="inline-flex h-10 items-center border border-[#789b96] bg-transparent px-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f5fbfa] hover:bg-white/8 hover:text-white">
                  <Bookmark size={12} className="mr-1.5" />
                  Inspect memory
                </Link>
              </div>

              <div className="mt-8 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
                {[
                  { label: 'Active programs', value: activeProjects.length, note: `${projects.length} total operating programs tracked` },
                  { label: 'Execution quality', value: `${completionRate}%`, note: 'recent twin completion rate' },
                  { label: 'Role coverage', value: divisionsInUse || 0, note: 'divisions currently covered by twins' },
                ].map(({ label, value, note }) => (
                  <div key={label} className="bg-[#102826]/90 px-4 py-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9db7b1]">{label}</p>
                    <p className="mt-3 text-3xl font-light tracking-[-0.04em] text-white">{value}</p>
                    <p className="mt-1 text-xs text-[#c3d3cf]">{note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="border border-white/10 bg-[#0d1f1d]/90 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9db7b1]">Priority twin program</p>
                    <p className="mt-3 text-2xl font-light tracking-[-0.04em] text-white">
                      {leadProject?.name ?? 'No active program yet'}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 border border-[#789b96] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d9e3e0]">
                    <Sparkles size={11} />
                    {plan?.name ?? 'Professional'}
                  </span>
                </div>

                <div className="mt-4 border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9db7b1]">Twin brief</p>
                  <p className="mt-2 text-sm leading-6 text-[#d9e3e0]">
                    {leadPacket?.summary || leadProject?.operatingBrief?.objective || 'Create one active program with a workflow so the studio can expose twin-ready state.'}
                  </p>
                  <p className="mt-3 text-xs leading-6 text-[#c3d3cf]">
                    {leadPacket?.riskNote || 'The differentiator is keeping twin scope, next move, and escalation risk visible before the next execution starts.'}
                  </p>
                </div>

                <div className="mt-5 grid gap-3 text-sm text-[#d9e3e0]">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span>Current step</span>
                    <span className="font-medium text-white">{leadStep?.name ?? 'Define the first workflow'}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span>Recommended twin</span>
                    <span className="font-medium text-white">{leadAgent?.name ?? 'Assign inside program'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Next movement</span>
                    <span className="max-w-[58%] text-right font-medium text-white">{leadPacket?.nextStep ?? 'No further step defined'}</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
                {[
                  {
                    icon: Orbit,
                    label: 'Role first',
                    copy: 'Programs start from a replicable role, not from a blank prompt box.',
                  },
                  {
                    icon: Radar,
                    label: 'State retained',
                    copy: 'Memory, runs, and deliverables stay attached to the account or workflow.',
                  },
                  {
                    icon: ShieldCheck,
                    label: 'Escalation visible',
                    copy: 'Each program exposes the next step and the recommended twin or human owner.',
                  },
                ].map(({ icon: Icon, label, copy }) => (
                  <div key={label} className="bg-[#102826]/90 px-4 py-4">
                    <div className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/5 text-[#9db7b1]">
                      <Icon size={16} />
                    </div>
                    <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9db7b1]">{label}</p>
                    <p className="mt-2 text-sm leading-6 text-[#d9e3e0]">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-px border border-[#d8e5e2] bg-[#d8e5e2] lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="n3-panel p-5">
          <p className="n3-eyebrow">Decision cockpit</p>
          <p className="n3-section-title">
            {leadProject ? `Advance ${leadProject.name} without losing context.` : 'Create the first program to start the twin operating loop.'}
          </p>
          <p className="mt-3 text-sm leading-7 text-[#52605d]">
            The product becomes differentiable when the operator can see the brief, the active step, the next twin, and the latest
            artifact in one surface.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={leadProject ? `/app/projects/${leadProject.id}` : '/app/projects'} className="inline-flex h-9 items-center bg-[#173634] px-4 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-[#1e3431]">
              <Workflow size={12} className="mr-1.5" />
              Open priority program
            </Link>
            <Link href="/app/projects" className="inline-flex h-9 items-center border border-[#d8e5e2] px-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#173634] hover:bg-[#f1f6f4]">
              <Plus size={12} className="mr-1.5" />
              New twin program
            </Link>
          </div>
        </div>

        <div className="n3-subpanel bg-[#f1f6f4] p-5">
          <div className="flex items-center gap-2 text-[#8fb2aa]">
            <Clock3 size={14} />
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em]">Latest run</p>
          </div>
          <p className="mt-4 text-sm font-medium text-[#173634]">{latestRun?.agentName ?? 'No execution yet'}</p>
          <p className="mt-2 text-sm leading-6 text-[#52605d]">{latestRun?.task ?? 'Run the first twin to create a persistent execution record.'}</p>
          <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-[#8fb2aa]">
            {latestRun ? `${formatShortDate(latestRun.createdAt)} / ${latestRun.status}` : 'waiting for first run'}
          </p>
        </div>

        <div className="n3-subpanel bg-[#f1f6f4] p-5">
          <div className="flex items-center gap-2 text-[#8fb2aa]">
            <Binary size={14} />
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em]">Latest artifact</p>
          </div>
          <p className="mt-4 text-sm font-medium text-[#173634]">{latestSavedArtifact?.title ?? 'No saved output yet'}</p>
          <p className="mt-2 text-sm leading-6 text-[#52605d]">
            {latestSavedArtifact ? 'Saved outputs should become reusable operating material, not dead exports.' : 'Save the first output to start the reusable artifact library.'}
          </p>
          <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-[#8fb2aa]">
            {latestSavedArtifact ? formatShortDate(latestSavedArtifact.createdAt) : 'artifact queue empty'}
          </p>
        </div>
      </section>

      {leadPacket ? (
        <section className="mt-6 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <article className="n3-panel p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="n3-eyebrow">Live handoff packet</p>
                <p className="mt-2 text-xl font-semibold text-[#173634]">The next human or twin can inherit real state immediately.</p>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#52605d]">
                  This is the differentiator in product form: a visible packet with current step, output expectation, and risk note already attached.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="n3-chip-soft">{leadPacket.projectTypeLabel}</span>
                <span className="n3-chip-soft">{leadPacket.executionMode}</span>
                {leadStepMeta ? <span className={cn('rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]', leadStepMeta.tone)}>{leadStepMeta.label}</span> : null}
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="n3-subpanel">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">Current step</p>
                <p className="mt-1 text-sm font-medium text-[#173634]">{leadPacket.currentStep}</p>
                <p className="mt-1 text-xs leading-5 text-[#52605d]">{leadPacket.currentStepOwner}</p>
              </div>
              <div className="n3-subpanel">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">Expected output</p>
                <p className="mt-1 text-sm leading-6 text-[#52605d]">{leadPacket.outputExpectation}</p>
              </div>
              <div className="n3-subpanel">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">Risk note</p>
                <p className="mt-1 text-sm leading-6 text-[#52605d]">{leadPacket.riskNote}</p>
              </div>
            </div>
          </article>

          <article className="n3-panel p-5">
            <p className="n3-eyebrow">Twin program health</p>
            <p className="mt-2 text-xl font-semibold text-[#173634]">Replacement and supervision are visible at a glance.</p>
            <div className="mt-5 grid gap-3">
              {[
                ['Active twins', `${featuredTwinProfiles.length} featured role replicas currently surfaced in Twin OS.`],
                ['Average replacement', `${averageReplacementScore}% of repeatable load across the featured twin set.`],
                ['High supervision twins', `${highSupervisionTwins} twins currently marked for high supervision.`],
                ['Next escalation', leadPacket.nextStep || 'Define the next escalation path so the system can route execution cleanly.'],
              ].map(([title, body]) => (
                <div key={title} className="rounded-[1rem] border border-[#d8e5e2] bg-white px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-[#52605d]">{body}</p>
                </div>
              ))}
            </div>
          </article>
        </section>
      ) : null}

      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        {activeProjects.slice(0, 3).map((project) => {
          const packet = buildProjectHandoffPacket(project, savedOutputs.find((item) => item.projectId === project.id))
          if (!packet) return null

          return (
            <article key={project.id} className="n3-panel p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="n3-eyebrow">Twin pressure</p>
                  <p className="mt-2 text-lg font-semibold text-[#173634]">{project.name}</p>
                </div>
                <span className="n3-chip-soft">{packet.projectTypeLabel}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#52605d]">{packet.riskNote}</p>
              <div className="mt-4 space-y-3">
                <div className="n3-subpanel">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">Next move</p>
                  <p className="mt-1 text-sm font-medium text-[#173634]">{packet.nextStep || packet.currentStep}</p>
                </div>
                <div className="n3-subpanel">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">Expected output</p>
                  <p className="mt-1 text-sm leading-6 text-[#52605d]">{packet.outputExpectation}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-[11px] text-[#52605d]">
                <span>Updated {formatShortDate(project.updatedAt)}</span>
                <Link href={`/app/projects/${project.id}`} className="inline-flex items-center gap-1 font-semibold uppercase tracking-[0.16em] text-[#8fb2aa] hover:text-[#173634]">
                  Inspect <ArrowRight size={10} />
                </Link>
              </div>
            </article>
          )
        })}
      </section>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1.25fr_0.75fr]">
        <section className="space-y-8">
          <section className="n3-panel">
            <div className="flex items-center justify-between border-b border-[#d8e5e2] bg-[#f1f6f4] px-5 py-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">Programs requiring decisions</p>
                <p className="mt-1 text-sm text-[#52605d]">Active programs with a visible next step and reusable state attached.</p>
              </div>
              <Link href="/app/projects" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa] hover:text-[#173634]">
                Full ledger
              </Link>
            </div>
            <div className="grid gap-px bg-[#d8e5e2]">
              {activeProjects.slice(0, 4).map((project) => {
                const activeStep = getProjectActiveStep(project)
                const recommendedAgent = getAgentBySlug(resolveRecommendedAgentSlug(project) ?? '')
                const packet = buildProjectHandoffPacket(project, savedOutputs.find((item) => item.projectId === project.id))
                const stepMeta = activeStep ? getWorkflowStatusMeta(activeStep.status) : null

                return (
                  <div key={project.id} className="n3-card grid gap-4 bg-[#fbfbfa] px-5 py-5 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-[#173634]">{project.name}</p>
                        <span className="n3-chip-soft">
                          {project.projectType ?? 'operations'}
                        </span>
                        {packet ? <span className="n3-chip-soft">{packet.executionMode}</span> : null}
                        {stepMeta ? <span className={cn('rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]', stepMeta.tone)}>{stepMeta.label}</span> : null}
                      </div>
                      <p className="mt-2 max-w-3xl text-sm leading-6 text-[#52605d]">
                        {packet?.summary || project.description || 'Tighten the brief so future runs inherit stronger context and fewer assumptions.'}
                      </p>

                      <div className="mt-4 grid gap-3 md:grid-cols-3">
                        <div className="rounded-[1rem] border border-[#d8e5e2] bg-white px-3 py-3">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8fb2aa]">Current step</p>
                          <p className="mt-1 text-sm font-medium text-[#173634]">{activeStep?.name ?? 'No step configured'}</p>
                          <p className="mt-1 text-xs leading-5 text-[#52605d]">{activeStep?.owner ?? 'Assign an owner inside the project'}</p>
                        </div>
                        <div className="rounded-[1rem] border border-[#d8e5e2] bg-white px-3 py-3">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8fb2aa]">Recommended twin</p>
                          <p className="mt-1 text-sm font-medium text-[#173634]">{recommendedAgent?.name ?? 'No recommendation yet'}</p>
                          <p className="mt-1 text-xs leading-5 text-[#52605d]">{recommendedAgent?.division ?? 'Choose one inside the workflow editor'}</p>
                        </div>
                        <div className="rounded-[1rem] border border-[#d8e5e2] bg-white px-3 py-3">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8fb2aa]">Risk note</p>
                          <p className="mt-1 text-sm font-medium text-[#173634]">
                            {packet?.nextStep ?? `${project.memory?.length ?? 0} memory / ${project.savedCount ?? 0} saved`}
                          </p>
                          <p className="mt-1 text-xs leading-5 text-[#52605d]">
                            {packet?.riskNote ?? `${project.runCount ?? 0} runs linked to this program`}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 lg:justify-end">
                      <Link href={`/app/projects/${project.id}`} className="inline-flex h-9 items-center border border-[#d8e5e2] px-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#173634] hover:bg-[#f1f6f4]">
                        <Workflow size={12} className="mr-1.5" />
                        Open project
                      </Link>
                      {recommendedAgent && buildProjectRunHref(project) ? (
                        <Link href={buildProjectRunHref(project) ?? `/app/run/${recommendedAgent.slug}?projectId=${project.id}`} className="inline-flex h-9 items-center bg-[#173634] px-4 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-[#1e3431]">
                          <Zap size={12} className="mr-1.5" />
                          Run next
                        </Link>
                      ) : null}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <div className="grid gap-px border border-[#d8e5e2] bg-[#d8e5e2] md:grid-cols-3">
            {[
              {
                icon: Orbit,
                label: 'System memory',
                value: `${savedOutputs.length} artifacts retained`,
                copy: 'Outputs should become reusable material for the next twin or human owner, not a dead appendix.',
              },
              {
                icon: Radar,
                label: 'Execution flow',
                value: `${recentRuns.length} recent runs`,
                copy: 'Operators need to inspect what was attempted, what succeeded, and what should happen next.',
              },
              {
                icon: ShieldCheck,
                label: 'Delivery posture',
                value: `${activeProjects.length} active programs`,
                copy: 'A healthy system keeps the next decision visible inside each operating program.',
              },
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
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">Execution stream</p>
                <p className="mt-1 text-sm text-[#52605d]">The latest runs should read like a working record, not anonymous activity.</p>
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
                    <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-[#8fb2aa]">{formatShortDate(run.createdAt)}</p>
                  </div>
                  <span
                    className={`inline-flex h-fit shrink-0 border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${
                      run.status === 'completed'
                        ? 'border-[#d8e5e2] bg-[#f1f6f4] text-[#8fb2aa]'
                        : run.status === 'failed'
                          ? 'border-red-200 bg-red-50 text-red-500'
                          : 'border-amber-200 bg-amber-50 text-amber-600'
                    }`}
                  >
                    {run.status}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </section>

        <aside className="space-y-8">
          <section className="border border-[#d8e5e2] bg-[#fbfbfa] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">Plan posture</p>
            <p className="mt-2 text-2xl font-light tracking-[-0.04em] text-[#173634]">{plan?.name ?? 'Professional'} capacity</p>
            <p className="mt-3 text-sm leading-7 text-[#52605d]">
              Keep the operating rhythm visible so the product feels intentional, financially bounded, and ready for a real team workflow.
            </p>
            <div className="mt-5">
              <UsageMeter used={runs.length} limit={plan?.monthlyRunLimit ?? 0} plan={MOCK_USER.plan} />
            </div>
          </section>

          <section className="border border-[#d8e5e2] bg-[#fbfbfa]">
            <div className="flex items-center justify-between border-b border-[#d8e5e2] px-5 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">Priority ledger</p>
              <Link href="/app/projects" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa] hover:text-[#173634]">
                View all
              </Link>
            </div>
            <div className="divide-y divide-[#d8e5e2]">
              {projects.slice(0, 3).map((project) => (
                <Link key={project.id} href={`/app/projects/${project.id}`} className="block px-5 py-4 transition-colors hover:bg-[#f1f6f4]">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center border border-[#d8e5e2] bg-[#f1f6f4] text-[#8fb2aa]">
                        <FolderOpen size={14} />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-[#173634]">{project.name}</p>
                        <p className="text-[11px] text-[#52605d]">
                          {project.runCount ?? 0} runs / {project.savedCount ?? 0} saved
                        </p>
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
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">Artifact library</p>
              <Link href="/app/saved" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa] hover:text-[#173634]">
                View all
              </Link>
            </div>
            <div className="divide-y divide-[#d8e5e2]">
              {latestSaved.map((saved) => (
                <Link key={saved.id} href={`/app/saved?selected=${saved.id}`} className="flex items-center gap-3 px-5 py-4 transition-colors hover:bg-[#f1f6f4]">
                  <div className="flex h-9 w-9 items-center justify-center border border-[#d8e5e2] bg-[#f1f6f4] text-[#8fb2aa]">
                    <Bookmark size={13} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[#173634]">{saved.title}</p>
                    <p className="text-[11px] text-[#52605d]">Reusable output linked back to execution history.</p>
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
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">Recommended twins</p>
            <p className="mt-1 text-sm text-[#52605d]">Start from roles that fit the current operating state, not from a generic library wall.</p>
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
                Run twin <ArrowRight size={10} className="ml-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
