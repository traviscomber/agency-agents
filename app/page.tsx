import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { getFeaturedAgents } from '@/lib/data/seed-agents'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { PlanBadge } from '@/components/shared/PlanBadge'
import { FadeInUp } from '@/components/animations/FadeInUp'
import { ScaleIn } from '@/components/animations/ScaleIn'
import { HoverCard } from '@/components/animations/HoverCard'
import { HeroPanel } from '@/components/public/HeroPanel'
import { ArrowRight, BarChart3, CheckCircle2, Shield, Sparkles, Workflow, Zap } from 'lucide-react'

const WORKFLOW_STEPS = [
  { step: '01', title: 'Select the specialist', desc: 'Choose by function, output type, or business problem.' },
  { step: '02', title: 'Add the operational context', desc: 'Give the agent the few constraints that actually matter.' },
  { step: '03', title: 'Review a concrete artifact', desc: 'Get a deliverable that can be stored, shared, or acted on.' },
  { step: '04', title: 'Turn the run into a system', desc: 'Save outputs to a project and make the next step visible.' },
]

const VALUE_POINTS = [
  {
    icon: Workflow,
    title: 'Operating layer, not chat',
    desc: 'The interface should feel like an operational system with logic, not a generic prompt wrapper.',
  },
  {
    icon: Shield,
    title: 'Traceable by default',
    desc: 'Clear surfaces, visible ownership, and structured outputs reduce ambiguity across the workspace.',
  },
  {
    icon: BarChart3,
    title: 'Readable at a glance',
    desc: 'Status, usage, and work history are presented so a leader can scan the system fast.',
  },
  {
    icon: Zap,
    title: 'Built for action',
    desc: 'Every screen pushes toward a next step: run, save, review, or route the work forward.',
  },
]

export default function LandingPage() {
  const featuredAgents = getFeaturedAgents().slice(0, 6)

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.12),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(201,213,225,0.28),_transparent_34%),linear-gradient(to_bottom,_#f8fafc,_#ffffff_18%,_#f8fafc_100%)]">
      <PublicNavbar />

      <main>
        {/* ── HERO ── */}
        <section className="relative min-h-[92vh] overflow-hidden bg-[#060a14]">
          {/* Background grid + glow */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:64px_64px]" />
            <div className="absolute left-0 top-0 h-[640px] w-[640px] -translate-x-1/3 -translate-y-1/4 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.12),transparent_60%)]" />
            <div className="absolute right-0 top-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgba(148,163,184,0.08),transparent_58%)]" />
            <div className="absolute bottom-0 left-1/2 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-white/12 to-transparent" />
          </div>

          <div className="mx-auto flex max-w-6xl flex-col items-center px-4 pb-28 pt-16 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:pt-20">
            {/* Left column */}
            <div className="flex-1 text-white">
              <FadeInUp>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  AI Specialist Workspace
                </div>
              </FadeInUp>

              <FadeInUp delay={0.08}>
                <h1 className="mt-6 text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[0.96] tracking-[-0.02em] text-white text-balance">
                  Specialists that&nbsp;work.<br />
                  <span className="text-white/42">Not prompts that drift.</span>
                </h1>
              </FadeInUp>

              <FadeInUp delay={0.16}>
                <p className="mt-6 max-w-md text-base leading-relaxed text-white/72 sm:text-[1.05rem]">
                  AgencyOS is a structured AI workspace — agents, projects, run history, deliverables, and plan control in one place. Built for teams that need results, not chat.
                </p>
              </FadeInUp>

              <FadeInUp delay={0.22}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button
                    asChild
                    className="h-11 rounded-xl bg-white px-6 text-sm font-semibold text-slate-950 shadow-[0_4px_24px_rgba(255,255,255,0.18)] hover:bg-slate-100"
                  >
                    <Link href="/signup">
                      Start free <ArrowRight size={14} className="ml-1.5" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    asChild
                    className="h-11 rounded-xl border border-white/12 px-6 text-sm font-semibold text-white/80 hover:bg-white/6 hover:text-white"
                  >
                    <Link href="/pricing">See pricing</Link>
                  </Button>
                </div>
              </FadeInUp>

              <FadeInUp delay={0.3}>
                <div className="mt-12 flex items-center gap-6 border-t border-white/8 pt-8">
                  {[
                    ['10+', 'Agent specialists'],
                    ['4', 'Business divisions'],
                    ['100%', 'Structured output'],
                  ].map(([val, lbl]) => (
                    <div key={lbl}>
                      <p className="text-2xl font-semibold tracking-tight text-white">{val}</p>
                      <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-white/40">{lbl}</p>
                    </div>
                  ))}
                </div>
              </FadeInUp>
            </div>

            {/* Right column — animated panel */}
            <FadeInUp delay={0.2} className="mt-14 w-full max-w-[520px] shrink-0 lg:mt-0">
              <HeroPanel />
            </FadeInUp>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">How it becomes a system</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-foreground">
                  Designed to move from one concrete drag to a controlled operating layer.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  The visual system should say the same thing the product does: this is not a toy, it is an applied
                  workspace for teams under pressure.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {VALUE_POINTS.map(({ icon: Icon, title, desc }, idx) => (
                  <FadeInUp key={title} delay={0.1 * idx}>
                    <HoverCard>
                      <div className="rounded-[1.35rem] border border-slate-200 bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.35)]">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
                            <Icon size={16} />
                          </div>
                          <p className="text-sm font-semibold text-foreground">{title}</p>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-slate-600">{desc}</p>
                      </div>
                    </HoverCard>
                  </FadeInUp>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-slate-950 text-white">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/58">Implementation rhythm</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
                  The interface should feel like a method, not a collection of screens.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/78">
                  Four steps are enough when the language is clear and each section earns its place.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {WORKFLOW_STEPS.map((item, idx) => (
                  <FadeInUp key={item.step} delay={0.1 * idx}>
                    <HoverCard>
                      <div className="rounded-[1.35rem] border border-white/12 bg-white/7 p-5">
                        <span className="text-xs font-mono text-white/56">{item.step}</span>
                        <h3 className="mt-3 text-sm font-semibold text-white">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/78">{item.desc}</p>
                      </div>
                    </HoverCard>
                  </FadeInUp>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Agents</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-foreground">
                Specialists for every function.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
                Each specialist is built to look and behave like part of a real operating system: division, plan,
                output, and next action are always visible.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredAgents.slice(0, 6).map((agent, idx) => (
                <FadeInUp key={agent.id} delay={0.05 * idx}>
                  <HoverCard>
                    <Link
                      href={`/agents/${agent.slug}`}
                      className="group rounded-[1.35rem] border border-slate-200 bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.35)] transition-all hover:border-primary/25 block"
                    >
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <DivisionBadge division={agent.division} size="sm" />
                        <PlanBadge plan={agent.planRequired} size="sm" />
                      </div>
                      <h3 className="text-sm font-semibold tracking-tight text-foreground">{agent.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{agent.shortDescription}</p>
                      <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-foreground">
                        Open specialist <ArrowRight size={11} />
                      </div>
                    </Link>
                  </HoverCard>
                </FadeInUp>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200">
          <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
            <ScaleIn>
              <div className="rounded-[2rem] border border-slate-900/10 bg-slate-950 p-8 text-white shadow-[0_24px_90px_rgba(15,23,42,0.18)]">
                <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                  <FadeInUp>
                    <div className="max-w-2xl">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/58">Next step</p>
                      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance">
                        Start with one task. Turn it into a workspace that the team can actually use.
                      </h2>
                      <p className="mt-4 text-sm leading-relaxed text-white/78">
                        Free to start. No credit card required. Upgrade when the workflow needs more structure.
                      </p>
                    </div>
                  </FadeInUp>
                  <div className="flex flex-wrap gap-3">
                    <Button size="default" asChild className="bg-white text-slate-950 hover:bg-slate-100">
                      <Link href="/signup">
                        Start free <ArrowRight size={14} className="ml-1.5" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="default"
                      asChild
                      className="border-white/24 bg-white/8 text-white hover:bg-white/12 hover:text-white"
                    >
                      <Link href="/pricing">See pricing</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </ScaleIn>
          </div>
        </section>
      </main>
    </div>
  )
}
