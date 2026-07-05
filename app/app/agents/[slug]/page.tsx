import Link from 'next/link'
import { notFound } from 'next/navigation'
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
              {agent.roleMode === 'digital-twin' ? <span className="n3-chip-soft">Digital twin</span> : null}
              {agent.marketFocus ? <span className="n3-chip-soft">{agent.marketFocus}</span> : null}
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
              ['What you provide', 'Context, constraints, and any source material the twin should use.'],
              ['Deliverable shape', 'Structured output with clear recommendations, not a generic conversation transcript.'],
              ['Next action', hasAccess ? 'Open a run in the workspace.' : 'Upgrade to unlock this profile.'],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-700">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          {agent.twinProfile ? (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-foreground">Digital twin profile</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-700">Target companies</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">{agent.twinProfile.targetCompanies}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-700">Replacement scope</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">{agent.twinProfile.replacementScope}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-700">Operational replacement</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">{agent.twinProfile.operationalReplacementScore ?? 0}% of repeatable load</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-700">Required supervision</p>
                  <p className="mt-2 text-sm capitalize leading-relaxed text-foreground">{agent.twinProfile.supervisionLevel ?? 'medium'}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-700">KPIs</p>
                  <ul className="mt-2 space-y-2">
                    {agent.twinProfile.keyKPIs.map((item) => (
                      <li key={item} className="text-sm leading-relaxed text-slate-700">{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-700">Core routines</p>
                  <ul className="mt-2 space-y-2">
                    {agent.twinProfile.coreRoutines.map((item) => (
                      <li key={item} className="text-sm leading-relaxed text-slate-700">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ) : null}

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
              <h2 className="text-sm font-semibold text-foreground">Deliverable shape</h2>
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
                <div key={index} className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4 text-sm leading-relaxed text-foreground">
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
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 transition-colors hover:border-primary/25 hover:bg-slate-50 hover:text-slate-950"
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
            <div className="inline-flex items-center gap-2 rounded-full bg-white/16 px-3 py-1 text-xs font-medium text-white/95">
              <Sparkles size={12} />
              {hasAccess ? 'Ready to run' : 'Locked twin'}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/86">
              {hasAccess
                ? 'Describe the target, context, and constraints. The workspace will turn that into a structured run.'
                : `This ${agent.roleMode === 'digital-twin' ? 'digital twin' : 'operator'} requires the ${agent.planRequired} plan or higher.`}
              </p>
            <div className="mt-5 rounded-2xl border border-white/16 bg-white/14 p-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/92">Required plan</p>
                <div className="mt-3">
                  <PlanBadge plan={agent.planRequired} />
                </div>
            </div>
            <div className="mt-5 space-y-2">
              {hasAccess ? (
                <Link href={`/app/run/${agent.slug}`} className="inline-flex w-full items-center justify-center rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-950 hover:bg-slate-100">
                  Run this {agent.roleMode === 'digital-twin' ? 'twin' : 'operator'} <ArrowRight size={14} className="ml-1.5" />
                </Link>
              ) : (
                <Link href="/app/billing" className="inline-flex w-full items-center justify-center rounded-lg border border-white/24 bg-white/14 px-3 py-2 text-sm font-medium text-white hover:bg-white/18">
                  <Lock size={13} className="mr-1.5" />
                  Upgrade to unlock
                </Link>
              )}
              <Link href={hasAccess ? '/app/agents' : '/signup'} className="inline-flex w-full items-center justify-center rounded-lg border border-white/24 bg-white/14 px-3 py-2 text-sm font-medium text-white hover:bg-white/18">
                {hasAccess ? 'Browse twins' : 'Sign up'}
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
