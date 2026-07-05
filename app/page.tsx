import Link from 'next/link'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { getFeaturedAgents } from '@/lib/data/seed-agents'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { PlanBadge } from '@/components/shared/PlanBadge'
import { FadeInUp } from '@/components/animations/FadeInUp'
import { ArrowRight, Bookmark, Radar, ShieldCheck, Workflow, Layers3, CircleAlert, Sparkles } from 'lucide-react'

const OPERATING_SEQUENCE = [
  {
    step: '01',
    title: 'Select the role twin',
    desc: 'Start from a replicable role with Chilean routines, KPIs, and operating boundaries instead of a generic chat box.',
  },
  {
    step: '02',
    title: 'Load account and process context',
    desc: 'Give the twin the client, opportunity, workflow, and constraints so the execution inherits the right operating state.',
  },
  {
    step: '03',
    title: 'Execute the routine with memory',
    desc: 'Let the twin run follow-ups, screening, coordination, or document work while preserving every output and decision trail.',
  },
  {
    step: '04',
    title: 'Escalate what still needs a human',
    desc: 'Keep approvals, exceptions, and strategic calls with a person while the repetitive operating load stays automated.',
  },
]

const DIFFERENTIATORS = [
  {
    icon: Workflow,
    title: 'Not another agent builder',
    desc: 'The differentiator is a deployable role system for Chilean work, not a blank tool for assembling generic agents.',
  },
  {
    icon: Bookmark,
    title: 'Replicable by role',
    desc: 'Each twin ships with routines, KPIs, boundaries, and output formats tied to a specific job instead of abstract prompts.',
  },
  {
    icon: Radar,
    title: 'Measured like an operator',
    desc: 'Replacement score, supervision requirement, and execution history make the system legible for leaders and operators.',
  },
  {
    icon: ShieldCheck,
    title: 'Built for supervised execution',
    desc: 'Twins can absorb repetitive operational load while human escalation stays explicit for legal, strategic, or commercial calls.',
  },
]

const PROOF_STACK = [
  {
    label: 'Role system',
    title: 'Every twin has a job to replicate, a market fit, and a visible operating envelope.',
    copy: 'That shifts the product from AI tooling into a system for deploying digital labor by role.',
  },
  {
    label: 'Control',
    title: 'Each program exposes what the twin can absorb and what still needs supervision.',
    copy: 'That makes replacement measurable instead of hand-wavy.',
  },
  {
    label: 'Handoff',
    title: 'The next human or twin inherits memory, outputs, and pending decisions.',
    copy: 'Continuity is part of the product, not an afterthought.',
  },
]

const PRESSURE_CASES = [
  {
    icon: Layers3,
    title: 'Ventas B2B Chile',
    desc: 'Deploy a commercial twin that keeps pipeline, follow-up, and next actions disciplined across active accounts.',
  },
  {
    icon: CircleAlert,
    title: 'Licitaciones y documentos',
    desc: 'Use a licitaciones twin to classify opportunities, order requirements, and surface risks before a human signs off.',
  },
  {
    icon: Sparkles,
    title: 'Cobranza e implementación',
    desc: 'Run repetitive collection and delivery coordination routines with clear escalation rules when exceptions appear.',
  },
]

export default function LandingPage() {
  const featuredAgents = getFeaturedAgents().slice(0, 6)

  return (
    <div className="min-h-screen bg-[#fbfbfa]">
      <PublicNavbar />

      <main>
        <section className="relative overflow-hidden bg-[#060a10] text-[#f5fbfa]">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(143,178,170,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(143,178,170,0.04) 1px, transparent 1px)',
              backgroundSize: '72px 72px',
            }}
          />
          <div
            className="pointer-events-none absolute left-0 top-0 h-[760px] w-[760px] -translate-x-1/3 -translate-y-1/3"
            style={{ background: 'radial-gradient(circle, rgba(143,178,170,0.14) 0%, transparent 62%)' }}
          />
          <div
            className="pointer-events-none absolute bottom-0 right-0 h-[640px] w-[640px] translate-x-1/4 translate-y-1/4"
            style={{ background: 'radial-gradient(circle, rgba(120,155,150,0.12) 0%, transparent 58%)' }}
          />

          <div className="mx-auto max-w-7xl px-5 pb-24 pt-[8.5rem] sm:px-8 lg:pb-28">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div>
                <FadeInUp>
                  <div className="inline-flex items-center gap-2.5 rounded-full border border-[#1e3431] bg-[#0d1f1d] px-3.5 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#8fb2aa]" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#789b96]">
                      Twin OS For Chilean Operating Roles
                    </span>
                  </div>
                </FadeInUp>

                <FadeInUp delay={0.08}>
                  <h1 className="mt-7 max-w-5xl text-5xl font-semibold leading-[0.94] tracking-[-0.04em] text-[#f5fbfa] md:text-7xl lg:text-[5.35rem]">
                    Deploy digital twins
                    <br />
                    for real operating roles
                    <br />
                    in the Chilean market.
                  </h1>
                </FadeInUp>

                <FadeInUp delay={0.14}>
                  <p className="mt-7 max-w-2xl text-base leading-8 text-[#c7d5d1]">
                    N3uralia Studio turns recurrent jobs into supervised digital twins with memory, KPIs, handoffs,
                    and visible replacement scope across sales, licitaciones, collections, implementation, and recruiting.
                  </p>
                </FadeInUp>

                <FadeInUp delay={0.2}>
                  <div className="mt-9 flex flex-wrap gap-3">
                    <Link
                      href="/signup"
                      className="inline-flex h-11 items-center gap-2 rounded-full border border-[#8fb2aa] bg-[#8fb2aa] px-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#173634] transition hover:bg-[#dce8e4]"
                    >
                      Deploy the first twin <ArrowRight size={12} />
                    </Link>
                    <Link
                      href="/app"
                      className="inline-flex h-11 items-center gap-2 rounded-full border border-[#789b96] px-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f5fbfa] transition hover:bg-white/8"
                    >
                      Inspect Twin OS <ArrowRight size={12} />
                    </Link>
                  </div>
                </FadeInUp>

                <FadeInUp delay={0.26}>
                  <div className="mt-10 grid gap-3 sm:grid-cols-3">
                    {[
                      ['Role coverage', 'Twin by role and vertical'],
                      ['Operational memory', 'Reusable state per account'],
                      ['Supervised handoffs', 'Clear human escalation'],
                    ].map(([title, body]) => (
                      <div key={title} className="rounded-[1.35rem] border border-white/10 bg-white/5 px-4 py-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8fb2aa]">{title}</p>
                        <p className="mt-2 text-sm text-[#d9e3e0]">{body}</p>
                      </div>
                    ))}
                  </div>
                </FadeInUp>
              </div>

              <FadeInUp delay={0.12}>
                <div className="rounded-[2rem] border border-white/10 bg-[#0d1f1d]/92 p-6 shadow-[0_28px_90px_-42px_rgba(0,0,0,0.65)]">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-[#789b96] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d9e3e0]">
                        Twin control surface
                      </span>
                      <span className="rounded-full border border-[#789b96] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d9e3e0]">
                        Chile-ready workflows
                      </span>
                    </div>
                    <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                      Deployable
                    </span>
                  </div>

                  <div className="mt-5 rounded-[1.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5">
                    <div className="grid gap-px overflow-hidden rounded-[1rem] border border-white/10 bg-white/10">
                      {[
                        ['Replacement score', '72% to 86% by role'],
                        ['Supervision', 'Medium by default, high for exceptions'],
                        ['Next move', 'Route the right twin with inherited context'],
                      ].map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between bg-[#102826] px-4 py-4">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9db7b1]">{label}</p>
                          <p className="max-w-[62%] text-right text-sm font-medium text-white">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 rounded-[1.1rem] border border-white/10 bg-black/10 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9db7b1]">Why this matters</p>
                      <p className="mt-3 text-sm leading-7 text-[#d9e3e0]">
                        Teams do not need more generic AI. They need a way to replicate operational roles with context,
                        controls, and clear limits. This surface makes that deployable.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>
        </section>

        <section className="border-b border-[#d8e5e2] bg-[#fbfbfa]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
            <div className="grid gap-6 lg:grid-cols-4">
              {DIFFERENTIATORS.map(({ icon: Icon, title, desc }) => (
                <article key={title} className="n3-panel rounded-[1.6rem] p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#d8e5e2] bg-[#f1f6f4] text-[#789b96]">
                    <Icon size={16} />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-[#173634]">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-[#52605d]">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f5f7f6]">
          <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 sm:py-20">
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="max-w-3xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Twin operating loop</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#173634]">
                  The product should replicate work, not just generate answers.
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#52605d]">
                  The commercial promise is supervised replacement: every twin should absorb repeatable load and leave a stronger operating state behind.
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                {OPERATING_SEQUENCE.map((item) => (
                  <article key={item.step} className="n3-panel rounded-[1.6rem] p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">{item.step}</p>
                    <h3 className="mt-4 text-lg font-semibold text-[#173634]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#52605d]">{item.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#fbfbfa]">
          <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Why this wins</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#173634]">
                  Built around roles you can deploy, supervise, and scale.
                </h2>
              </div>

              <div className="grid gap-4">
                {PROOF_STACK.map((item) => (
                  <article key={item.label} className="n3-panel rounded-[1.6rem] p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">{item.label}</p>
                    <p className="mt-3 text-lg font-semibold text-[#173634]">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-[#52605d]">{item.copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#d8e5e2] bg-[#f5f7f6]">
          <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 sm:py-20">
            <div className="grid gap-4 lg:grid-cols-3">
              {PRESSURE_CASES.map(({ icon: Icon, title, desc }) => (
                <article key={title} className="rounded-[1.7rem] border border-[#d8e5e2] bg-white p-6 shadow-[0_18px_44px_-34px_rgba(15,23,42,0.35)]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#173634] text-[#d9e3e0]">
                    <Icon size={18} />
                  </div>
                  <p className="mt-4 text-lg font-semibold text-[#173634]">{title}</p>
                  <p className="mt-2 text-sm leading-7 text-[#52605d]">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#d8e5e2] bg-[#fbfbfa]">
          <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 sm:py-20">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Featured twins</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#173634]">
                  Start from the jobs that teams repeat every week.
                </h2>
              </div>
              <Link href="/agents" className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#173634]">
                Browse all twins <ArrowRight size={12} />
              </Link>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {featuredAgents.map((agent) => (
                <article key={agent.id} className="rounded-[1.65rem] border border-[#d8e5e2] bg-white p-5 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.35)]">
                  <div className="flex items-center justify-between gap-3">
                    <DivisionBadge division={agent.division} size="sm" />
                    <PlanBadge plan={agent.planRequired} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[#173634]">{agent.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#52605d]">{agent.shortDescription}</p>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-[#8fb2aa]">{agent.outputFormat[0]}</p>
                  <div className="mt-5">
                    <Link href={`/agents/${agent.slug}`} className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#173634]">
                      Open twin <ArrowRight size={12} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#060a10] text-[#f5fbfa]">
          <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 sm:py-20">
            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,#0d1f1d,#102826)] p-8 shadow-[0_24px_80px_-38px_rgba(0,0,0,0.65)] sm:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Operator-ready workspace</p>
              <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-white">
                If the output disappears from the system after one run, it is not operational yet.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#c7d5d1]">
                Start with one twin if you need to. Stay for the part that compounds: the brief, the workflow, the packet,
                the deliverable archive, and the next move in one place.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/signup"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-[#8fb2aa] bg-[#8fb2aa] px-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#173634] transition hover:bg-[#dce8e4]"
                >
                  Create account <ArrowRight size={12} />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-[#789b96] px-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f5fbfa] transition hover:bg-white/8"
                >
                  View plans <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
