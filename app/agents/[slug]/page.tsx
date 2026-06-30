import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { getAgentBySlug, SEED_AGENTS } from '@/lib/data/seed-agents'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { PlanBadge } from '@/components/shared/PlanBadge'
import { ArrowRight, ChevronRight } from 'lucide-react'

export async function generateStaticParams() {
  return SEED_AGENTS.map((a) => ({ slug: a.slug }))
}

export default async function PublicAgentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const agent = getAgentBySlug(slug)
  if (!agent) notFound()

  const relatedAgents = SEED_AGENTS.filter(
    (a) => a.id !== agent.id && (a.division === agent.division || agent.suggestedPrompts.some(() => true))
  ).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-8">
          <Link href="/agents" className="hover:text-foreground transition-colors">Agents</Link>
          <ChevronRight size={12} />
          <span className="text-foreground">{agent.name}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <DivisionBadge division={agent.division} />
                <PlanBadge plan={agent.planRequired} />
              </div>
              <h1 className="text-3xl font-semibold text-foreground mb-3">{agent.name}</h1>
              <p className="text-muted-foreground leading-relaxed">{agent.longDescription}</p>
            </div>

            {/* Role & Mission */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-5 rounded-lg border border-border bg-white">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Role</p>
                <p className="text-sm text-foreground font-medium">{agent.role}</p>
              </div>
              <div className="p-5 rounded-lg border border-border bg-white">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Mission</p>
                <p className="text-sm text-foreground">{agent.mission}</p>
              </div>
            </div>

            {/* When to use */}
            <div>
              <h2 className="text-base font-semibold text-foreground mb-3">When to use</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{agent.whenToUse}</p>
            </div>

            {/* Input & Output */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h2 className="text-base font-semibold text-foreground mb-3">Input requirements</h2>
                <ul className="space-y-2">
                  {agent.inputRequirements.map((req) => (
                    <li key={req} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-muted-foreground/40 shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-base font-semibold text-foreground mb-3">Output format</h2>
                <ul className="space-y-2">
                  {agent.outputFormat.map((fmt) => (
                    <li key={fmt} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                      {fmt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Example tasks */}
            <div>
              <h2 className="text-base font-semibold text-foreground mb-3">Example tasks</h2>
              <div className="space-y-2">
                {agent.exampleTasks.map((task) => (
                  <Link
                    key={task}
                    href="/signup"
                    className="flex items-center justify-between p-3 rounded border border-border bg-white hover:border-primary/30 hover:shadow-sm transition-all group"
                  >
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {task}
                    </span>
                    <ArrowRight size={13} className="text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0 ml-3" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Suggested prompts */}
            <div>
              <h2 className="text-base font-semibold text-foreground mb-3">Suggested prompts</h2>
              <div className="flex flex-wrap gap-2">
                {agent.suggestedPrompts.map((prompt) => (
                  <Link
                    key={prompt}
                    href="/signup"
                    className="px-3 py-1.5 text-xs border border-border rounded bg-white hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  >
                    {prompt}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Run CTA */}
            <div className="p-5 rounded-lg border border-border bg-white sticky top-20">
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-1">Required plan</p>
                <PlanBadge plan={agent.planRequired} />
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Sign up to run this agent and receive a structured deliverable saved to your workspace.
              </p>
              <Button className="w-full mb-2" asChild>
                <Link href="/signup">
                  Run this agent <ArrowRight size={14} className="ml-1.5" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full" size="sm" asChild>
                <Link href="/signup">Sign in</Link>
              </Button>
            </div>

            {/* Related agents */}
            {relatedAgents.length > 0 && (
              <div className="p-5 rounded-lg border border-border bg-white">
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-4">
                  Related agents
                </h3>
                <div className="space-y-3">
                  {relatedAgents.map((related) => (
                    <Link
                      key={related.id}
                      href={`/agents/${related.slug}`}
                      className="flex items-start gap-3 group"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                          {related.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">{related.division}</p>
                      </div>
                      <ArrowRight size={12} className="text-muted-foreground/40 mt-1 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
