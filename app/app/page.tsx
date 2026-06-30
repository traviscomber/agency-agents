import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UsageMeter } from '@/components/shared/UsageMeter'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { PlanBadge } from '@/components/shared/PlanBadge'
import { MOCK_USER, MOCK_RUNS, MOCK_PROJECTS, MOCK_SAVED_OUTPUTS } from '@/lib/data/mock-store'
import { getFeaturedAgents } from '@/lib/data/seed-agents'
import { getPlanById } from '@/lib/data/plans'
import { ArrowRight, Bot, FolderOpen, Bookmark, Plus } from 'lucide-react'

export default function AppDashboard() {
  const plan = getPlanById(MOCK_USER.plan)
  const featuredAgents = getFeaturedAgents().slice(0, 4)
  const recentRuns = MOCK_RUNS.slice(0, 3)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-xl font-semibold text-foreground mb-0.5">
            Good morning, {MOCK_USER.fullName.split(' ')[0]}.
          </h1>
          <p className="text-sm text-muted-foreground">
            You are on the <span className="font-medium text-foreground capitalize">{plan?.name}</span> plan.
          </p>
        </div>
        <Button asChild size="sm">
          <Link href="/app/agents">
            <Bot size={14} className="mr-1.5" /> Run an agent
          </Link>
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <div className="p-4 rounded-lg border border-border bg-white">
          <p className="text-xs text-muted-foreground mb-1">Runs this month</p>
          <p className="text-2xl font-semibold text-foreground">3</p>
        </div>
        <div className="p-4 rounded-lg border border-border bg-white">
          <p className="text-xs text-muted-foreground mb-1">Active projects</p>
          <p className="text-2xl font-semibold text-foreground">{MOCK_PROJECTS.length}</p>
        </div>
        <div className="p-4 rounded-lg border border-border bg-white">
          <p className="text-xs text-muted-foreground mb-1">Saved outputs</p>
          <p className="text-2xl font-semibold text-foreground">{MOCK_SAVED_OUTPUTS.length}</p>
        </div>
        <div className="p-4 rounded-lg border border-border bg-white">
          <p className="text-xs text-muted-foreground mb-1">Plan</p>
          <p className="text-2xl font-semibold text-foreground capitalize">{plan?.name}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">

          {/* Recommended agents */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground">Recommended agents</h2>
              <Link href="/app/agents" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                All agents <ArrowRight size={11} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {featuredAgents.map((agent) => (
                <Link
                  key={agent.id}
                  href={`/app/agents/${agent.slug}`}
                  className="group flex flex-col p-4 rounded-lg border border-border bg-white hover:border-primary/30 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <DivisionBadge division={agent.division} size="sm" />
                    <PlanBadge plan={agent.planRequired} size="sm" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">{agent.name}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed flex-1">{agent.shortDescription}</p>
                  <div className="mt-3 flex items-center gap-1 text-xs text-primary">
                    Run <ArrowRight size={11} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent runs */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground">Recent runs</h2>
              <Link href="/app/history" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                View all <ArrowRight size={11} />
              </Link>
            </div>
            <div className="rounded-lg border border-border bg-white overflow-hidden">
              {recentRuns.map((run, i) => (
                <div
                  key={run.id}
                  className={`flex items-start gap-3 p-4 ${i < recentRuns.length - 1 ? 'border-b border-border' : ''}`}
                >
                  <div className="w-7 h-7 rounded bg-muted flex items-center justify-center shrink-0">
                    <Bot size={13} className="text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <p className="text-sm font-medium text-foreground">{run.agentName}</p>
                      <DivisionBadge division={run.agentDivision} size="sm" />
                      <span className="text-xs text-muted-foreground ml-auto">
                        {new Date(run.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{run.task}</p>
                    {run.projectName && (
                      <p className="text-xs text-muted-foreground/60 mt-0.5">
                        <FolderOpen size={10} className="inline mr-1" />{run.projectName}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar column */}
        <div className="space-y-5">
          {/* Usage */}
          <UsageMeter used={3} limit={plan?.monthlyRunLimit || 5} plan={MOCK_USER.plan} />

          {/* Active projects */}
          <div className="p-5 rounded-lg border border-border bg-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground">Projects</h2>
              <Link href="/app/projects" className="text-xs text-muted-foreground hover:text-foreground">
                <ArrowRight size={13} />
              </Link>
            </div>
            <div className="space-y-3">
              {MOCK_PROJECTS.map((project) => (
                <Link
                  key={project.id}
                  href={`/app/projects/${project.id}`}
                  className="flex items-start gap-2.5 group"
                >
                  <FolderOpen size={14} className="text-muted-foreground mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                      {project.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {project.runCount} runs · {project.savedCount} saved
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4 text-xs" asChild>
              <Link href="/app/projects">
                <Plus size={12} className="mr-1.5" /> New project
              </Link>
            </Button>
          </div>

          {/* Saved outputs */}
          <div className="p-5 rounded-lg border border-border bg-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground">Recent saves</h2>
              <Link href="/app/saved" className="text-xs text-muted-foreground hover:text-foreground">
                <ArrowRight size={13} />
              </Link>
            </div>
            <div className="space-y-3">
              {MOCK_SAVED_OUTPUTS.slice(0, 3).map((saved) => (
                <Link
                  key={saved.id}
                  href="/app/saved"
                  className="flex items-start gap-2.5 group"
                >
                  <Bookmark size={13} className="text-muted-foreground mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate group-hover:text-primary transition-colors">
                      {saved.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground">{saved.agentName}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="p-5 rounded-lg border border-border bg-white">
            <h2 className="text-sm font-semibold text-foreground mb-3">Quick actions</h2>
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
          </div>
        </div>
      </div>
    </div>
  )
}
