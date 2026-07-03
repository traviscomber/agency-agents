import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { getAgentBySlug, SEED_AGENTS } from '@/lib/data/seed-agents'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { PlanBadge } from '@/components/shared/PlanBadge'
import { MOCK_USER } from '@/lib/data/mock-store'
import { canAccessAgent } from '@/lib/types'
import { ArrowRight, ArrowLeft, Lock, Sparkles } from 'lucide-react'

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
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link
        href="/app/agents"
        className="mb-6 inline-flex items-center gap-1.5 text-xs text-slate-700 transition-colors hover:text-slate-950"
      >
        <ArrowLeft size={13} /> Back to agents
      </Link>

      <section className="mb-8 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-8 p-6 lg:grid-cols-[1.08fr_0.92fr] lg:p-8">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <DivisionBadge division={agent.division} />
              <PlanBadge plan={agent.planRequired} />
            </div>
            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl">
              {agent.name}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
              {agent.longDescription}
            </p>
            <p className="mt-5 text-sm font-medium text-foreground">Role: {agent.role}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{agent.mission}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ['When to use', agent.whenToUse],
              ['What you provide', 'Context, constraints, and any source material the specialist should use.'],
              ['What you get', 'Structured output with clear recommendations, not a generic conversation transcript.'],
              ['Next action', hasAccess ? 'Run the specialist in the workspace.' : 'Upgrade to unlock this specialist.'],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-700">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-foreground">What you provide</h2>
              <ul className="mt-4 space-y-3">
                {agent.inputRequirements.map((req) => (
                  <li key={req} className="flex items-start gap-2 text-sm leading-relaxed text-slate-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {req}
                  </li>
                ))}
              </ul>
            </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-foreground">What you get</h2>
              <ul className="mt-4 space-y-3">
                {agent.outputFormat.map((fmt) => (
                  <li key={fmt} className="flex items-start gap-2 text-sm leading-relaxed text-slate-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-700" />
                    {fmt}
                  </li>
                ))}
              </ul>
            </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-foreground">Example tasks</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {agent.exampleTasks.map((task, index) => (
                <div key={index} className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 text-sm leading-relaxed text-foreground">
                  {task}
                </div>
              ))}
            </div>
          </section>

          {hasAccess && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-foreground">Suggested starting prompts</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {agent.suggestedPrompts.map((prompt) => (
                  <Link
                    key={prompt}
                    href={`/app/run/${agent.slug}?task=${encodeURIComponent(prompt)}`}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700 transition-colors hover:border-primary/25 hover:bg-white hover:text-slate-950"
                  >
                    {prompt}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-5">
          <div className="sticky top-24 rounded-2xl border border-slate-900/10 bg-slate-950 p-6 text-white shadow-[0_20px_80px_rgba(15,23,42,0.18)]">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-medium text-slate-100">
              <Sparkles size={12} />
              {hasAccess ? 'Ready to run' : 'Locked specialist'}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-200">
              {hasAccess
                ? 'Describe your task and the workspace will guide you into a structured run.'
                : `This specialist requires the ${agent.planRequired} plan or higher.`}
            </p>
            <div className="mt-5 rounded-2xl border border-white/12 bg-white/8 p-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-300">Required plan</p>
                <div className="mt-3">
                  <PlanBadge plan={agent.planRequired} />
                </div>
            </div>
            <div className="mt-5 space-y-2">
              {hasAccess ? (
                <Button className="w-full bg-white text-slate-950 hover:bg-slate-100" asChild>
                  <Link href={`/app/run/${agent.slug}`}>
                    Run this specialist <ArrowRight size={14} className="ml-1.5" />
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" className="w-full border-white/24 bg-white/8 text-white hover:bg-white/12 hover:text-white" asChild>
                  <Link href="/app/billing">
                    <Lock size={13} className="mr-1.5" />
                    Upgrade to unlock
                  </Link>
                </Button>
              )}
              <Button variant="outline" className="w-full border-white/24 bg-white/8 text-white hover:bg-white/12 hover:text-white" asChild>
                <Link href={hasAccess ? '/app/agents' : '/signup'}>{hasAccess ? 'Browse agents' : 'Sign up'}</Link>
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
