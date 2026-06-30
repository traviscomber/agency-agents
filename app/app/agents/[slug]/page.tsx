import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { getAgentBySlug, SEED_AGENTS } from '@/lib/data/seed-agents'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { PlanBadge } from '@/components/shared/PlanBadge'
import { MOCK_USER } from '@/lib/data/mock-store'
import { canAccessAgent } from '@/lib/types'
import { ArrowRight, ArrowLeft, Lock } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return SEED_AGENTS.map((a) => ({ slug: a.slug }))
}

export default async function AppAgentDetailPage({ params }: Props) {
  const { slug } = await params
  const agent = getAgentBySlug(slug)
  if (!agent) notFound()

  const hasAccess = canAccessAgent(MOCK_USER.plan, agent.planRequired)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Back */}
      <Link
        href="/app/agents"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft size={13} /> Back to agents
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8 pb-8 border-b border-border">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <DivisionBadge division={agent.division} />
            <PlanBadge plan={agent.planRequired} />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">{agent.name}</h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mb-1">
            {agent.longDescription}
          </p>
          <p className="text-xs text-muted-foreground">Role: {agent.role}</p>
        </div>
        <div className="shrink-0">
          {hasAccess ? (
            <Button asChild>
              <Link href={`/app/run/${agent.slug}`}>
                Run this agent <ArrowRight size={14} className="ml-1.5" />
              </Link>
            </Button>
          ) : (
            <Button variant="outline" asChild>
              <Link href="/app/billing">
                <Lock size={13} className="mr-1.5" /> Upgrade to unlock
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {/* Mission */}
        <div>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Mission
          </h2>
          <p className="text-sm text-foreground leading-relaxed">{agent.mission}</p>
        </div>

        {/* When to use */}
        <div>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            When to use
          </h2>
          <p className="text-sm text-foreground leading-relaxed">{agent.whenToUse}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {/* Input requirements */}
        <div>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            What you provide
          </h2>
          <ul className="space-y-2">
            {agent.inputRequirements.map((req, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {req}
              </li>
            ))}
          </ul>
        </div>

        {/* Output format */}
        <div>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            What you get
          </h2>
          <ul className="space-y-2">
            {agent.outputFormat.map((fmt, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {fmt}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Example tasks */}
      <div className="mb-10">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Example tasks
        </h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {agent.exampleTasks.map((task, i) => (
            <div key={i} className="p-4 rounded-lg border border-border bg-white text-sm text-foreground leading-relaxed">
              {task}
            </div>
          ))}
        </div>
      </div>

      {/* Suggested prompts */}
      {hasAccess && (
        <div className="mb-10">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Suggested starting prompts
          </h2>
          <div className="space-y-2">
            {agent.suggestedPrompts.map((prompt, i) => (
              <Link
                key={i}
                href={`/app/run/${agent.slug}?task=${encodeURIComponent(prompt)}`}
                className="flex items-center justify-between p-3 rounded border border-border bg-white hover:border-primary/30 hover:bg-muted/20 transition-all group text-sm text-foreground"
              >
                <span>{prompt}</span>
                <ArrowRight size={12} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-3" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="rounded-lg border border-border bg-white p-6">
        {hasAccess ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Ready to run {agent.name}?</h3>
              <p className="text-xs text-muted-foreground">Describe your task and receive a structured deliverable.</p>
            </div>
            <Button asChild>
              <Link href={`/app/run/${agent.slug}`}>
                Run now <ArrowRight size={14} className="ml-1.5" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">
                Upgrade to access {agent.name}
              </h3>
              <p className="text-xs text-muted-foreground">
                This agent requires the{' '}
                <span className="font-medium capitalize">{agent.planRequired}</span> plan or higher.
              </p>
            </div>
            <Button asChild>
              <Link href="/app/billing">Upgrade plan</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
