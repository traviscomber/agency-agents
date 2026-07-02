import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UsageMeter } from '@/components/shared/UsageMeter'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { PlanBadge } from '@/components/shared/PlanBadge'
import { MOCK_USER, MOCK_RUNS, MOCK_PROJECTS, MOCK_SAVED_OUTPUTS } from '@/lib/data/mock-store'
import { getFeaturedAgents } from '@/lib/data/seed-agents'
import { getPlanById } from '@/lib/data/plans'
import { ArrowRight, BarChart3, Bookmark, Bot, FolderOpen, Plus, Sparkles } from 'lucide-react'

export default function AppDashboard() {
  const plan = getPlanById(MOCK_USER.plan)
  const featuredAgents = getFeaturedAgents().slice(0, 4)
  const recentRuns = MOCK_RUNS.slice(0, 3)

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="pointer-events-none absolute inset-x-4 top-8 -z-10 h-64 rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(15,23,42,0.14),transparent_48%),radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.14),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.9),rgba(248,250,252,0.6))] blur-2xl" />

      <section className="overflow-hidden rounded-[2.25rem] border border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#ffffff_48%,#f8fafc_100%)] shadow-[0_18px_60px_-44px_rgba(15,23,42,0.45)]">
        <div className="grid gap-6 p-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:p-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-600">
              <Sparkles size={12} className="text-primary" />
              Operational dashboard
            </div>
            <h1 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[3rem] lg:leading-[1.05]">
              Good morning, {MOCK_USER.fullName.split(' ')[0]}. The next move is always visible.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              You are on the <span className="font-medium text-foreground capitalize">{plan?.name}</span> plan.
              Start an agent, save an output, or move work into a project with fewer visual distractions.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="sm" asChild>
                <Link href="/app/agents">
                  Run agent <ArrowRight size={12} className="ml-1" />
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/app/projects">Create project</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-[1.25rem] border border-slate-200 bg-slate-950 p-4 text-white shadow-[0_18px_40px_-24px_rgba(15,23,42,0.9)]">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">Runs</p>
              <p className="mt-3 text-3xl font-semibold">{MOCK_RUNS.length}</p>
              <p className="mt-1 text-[11px] text-white/70">Executed this cycle</p>
            </div>
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-600">Projects</p>
              <p className="mt-3 text-3xl font-semibold text-foreground">{MOCK_PROJECTS.length}</p>
              <p className="mt-1 text-[11px] text-slate-600">Workspace structure</p>
            </div>
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-600">Saved</p>
              <p className="mt-3 text-3xl font-semibold text-foreground">{MOCK_SAVED_OUTPUTS.length}</p>
              <p className="mt-1 text-[11px] text-slate-600">Reusable outputs</p>
            </div>
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-600">Plan</p>
              <p className="mt-3 text-sm font-semibold capitalize text-foreground">{plan?.name}</p>
              <div className="mt-2">
                <PlanBadge plan={MOCK_USER.plan} size="sm" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(20rem,0.9fr)]">
        <div className="space-y-6">
          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Recommended agents</h2>
                <p className="text-xs text-slate-600">Curated specialists based on your workspace.</p>
              </div>
              <Link href="/app/agents" className="text-xs font-medium text-slate-600 transition-colors hover:text-foreground">
                All agents <ArrowRight size={11} className="ml-1 inline" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {featuredAgents.map((agent) => (
                <Link
                  key={agent.id}
                  href={`/app/agents/${agent.slug}`}
                  className="group rounded-[1.25rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_14px_34px_-28px_rgba(15,23,42,0.55)]"
                >
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <DivisionBadge division={agent.division} size="sm" />
                    <PlanBadge plan={agent.planRequired} size="sm" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{agent.name}</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-700">{agent.shortDescription}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary">
                    Run <ArrowRight size={11} />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Recent runs</h2>
                <p className="text-xs text-slate-700">What the team has been working on.</p>
              </div>
              <Link href="/app/history" className="text-xs font-medium text-slate-600 transition-colors hover:text-foreground">
                View all <ArrowRight size={11} className="ml-1 inline" />
              </Link>
            </div>
            <div className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white">
              {recentRuns.map((run, index) => (
                <div key={run.id} className={`flex items-start gap-3 p-4 ${index < recentRuns.length - 1 ? 'border-b border-slate-200' : ''}`}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <Bot size={15} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{run.agentName}</p>
                      <DivisionBadge division={run.agentDivision} size="sm" />
                      <span className="ml-auto text-xs text-slate-600">
                        {new Date(run.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-700">{run.task}</p>
                    {run.projectName && (
                      <p className="mt-1 text-xs text-slate-600">
                        <FolderOpen size={10} className="mr-1 inline" />
                        {run.projectName}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <UsageMeter used={3} limit={plan?.monthlyRunLimit || 5} plan={MOCK_USER.plan} />

          <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Projects</h2>
              <Link href="/app/projects" className="text-xs text-slate-700 transition-colors hover:text-foreground">
                <ArrowRight size={13} />
              </Link>
            </div>
            <div className="space-y-3">
              {MOCK_PROJECTS.map((project) => (
                <Link key={project.id} href={`/app/projects/${project.id}`} className="group flex items-start gap-2.5">
                  <FolderOpen size={14} className="mt-0.5 shrink-0 text-slate-600 transition-colors group-hover:text-foreground" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground group-hover:text-primary">
                      {project.name}
                    </p>
                    <p className="text-xs text-slate-700">
                      {project.runCount} runs · {project.savedCount} saved
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <Button variant="outline" size="sm" className="mt-4 w-full justify-start text-xs" asChild>
              <Link href="/app/projects">
                <Plus size={12} className="mr-1.5" /> New project
              </Link>
            </Button>
          </section>

          <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Recent saves</h2>
              <Link href="/app/saved" className="text-xs text-slate-700 transition-colors hover:text-foreground">
                <ArrowRight size={13} />
              </Link>
            </div>
            <div className="space-y-3">
              {MOCK_SAVED_OUTPUTS.slice(0, 3).map((saved) => (
                <Link key={saved.id} href="/app/saved" className="group flex items-start gap-2.5">
                  <Bookmark size={13} className="mt-0.5 shrink-0 text-slate-600 transition-colors group-hover:text-foreground" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-foreground group-hover:text-primary">
                      {saved.title}
                    </p>
                    <p className="text-[11px] text-slate-600">{saved.agentName}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
            <div className="mb-3 flex items-center gap-2">
              <BarChart3 size={15} className="text-primary" />
              <h2 className="text-sm font-semibold text-foreground">Quick actions</h2>
            </div>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start text-xs" asChild>
                <Link href="/app/agents">
                  <Bot size={13} className="mr-2" /> Browse agents
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-xs" asChild>
                <Link href="/app/projects">
                  <Plus size={13} className="mr-2" /> Create project
                </Link>
              </Button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}
