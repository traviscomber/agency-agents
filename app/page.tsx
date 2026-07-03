import Link from 'next/link'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { getFeaturedAgents } from '@/lib/data/seed-agents'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { PlanBadge } from '@/components/shared/PlanBadge'
import { FadeInUp } from '@/components/animations/FadeInUp'
import { HeroPanel } from '@/components/public/HeroPanel'
import { ArrowRight, BarChart3, Shield, Workflow, Zap } from 'lucide-react'

const WORKFLOW_STEPS = [
  { step: '01', title: 'Select the specialist', desc: 'Choose by function, output type, or business problem.' },
  { step: '02', title: 'Add operational context', desc: 'Give the agent the constraints that actually matter.' },
  { step: '03', title: 'Review a concrete artifact', desc: 'Get a deliverable that can be stored, shared, or acted on.' },
  { step: '04', title: 'Turn the run into a system', desc: 'Save outputs to a project and make the next step visible.' },
]

const VALUE_POINTS = [
  { icon: Workflow, title: 'Operating layer, not chat', desc: 'An operational system with logic, not a generic prompt wrapper.' },
  { icon: Shield, title: 'Traceable by default', desc: 'Visible ownership and structured outputs reduce ambiguity across the workspace.' },
  { icon: BarChart3, title: 'Readable at a glance', desc: 'Status, usage, and work history presented so a leader can scan fast.' },
  { icon: Zap, title: 'Built for action', desc: 'Every screen pushes toward a next step: run, save, review, or route forward.' },
]

export default function LandingPage() {
  const featuredAgents = getFeaturedAgents().slice(0, 6)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fbfbfa' }}>
      <PublicNavbar />

      <main>
        {/* ── HERO ── dark canvas, N3 grid + glow ── */}
        <section className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#060a10' }}>
          {/* Subtle grid */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(143,178,170,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(143,178,170,0.04) 1px, transparent 1px)',
              backgroundSize: '72px 72px',
            }}
          />
          {/* Radial teal glow — top left */}
          <div
            className="pointer-events-none absolute left-0 top-0 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/3"
            style={{ background: 'radial-gradient(circle, rgba(143,178,170,0.10) 0%, transparent 60%)' }}
          />
          {/* Bottom border fade */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #1e3431, transparent)' }}
          />

          <div className="mx-auto flex max-w-7xl flex-col px-5 pb-32 pt-[8.5rem] sm:px-8 lg:flex-row lg:items-center lg:gap-20">
            {/* Left */}
            <div className="flex-1">
              <FadeInUp>
                <div className="inline-flex items-center gap-2.5 border border-[#1e3431] bg-[#0d1f1d] px-3.5 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8fb2aa]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#789b96]">
                    AI Specialist Workspace
                  </span>
                </div>
              </FadeInUp>

              <FadeInUp delay={0.08}>
                <h1 className="mt-7 text-5xl font-semibold leading-[0.94] tracking-[-0.025em] text-[#f5fbfa] md:text-7xl lg:text-[5.5rem]">
                  Specialists<br />
                  that&nbsp;work.
                </h1>
                <p className="mt-2 text-5xl font-light leading-[0.94] tracking-[-0.02em] text-[#789b96] md:text-7xl lg:text-[5.5rem]">
                  Not prompts<br />
                  that drift.
                </p>
              </FadeInUp>

              <FadeInUp delay={0.16}>
                <p className="mt-8 max-w-[26rem] text-base leading-8 text-[#9db7b1]">
                  AgencyOS is a structured AI workspace — agents, projects, run history, deliverables, and plan control in one place. Built for teams that need results, not chat.
                </p>
              </FadeInUp>

              <FadeInUp delay={0.22}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Link
                    href="/signup"
                    className="inline-flex items-center gap-2 bg-[#8fb2aa] px-6 py-3.5 text-sm font-semibold text-[#060a10] transition-colors hover:bg-[#d9e3e0]"
                  >
                    Start free <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 border border-[#28413d] bg-[#0b1117] px-5 py-3.5 text-sm font-semibold text-[#d9e3e0] transition-colors hover:border-[#8fb2aa]/40 hover:text-[#f5fbfa]"
                  >
                    See pricing
                  </Link>
                </div>
              </FadeInUp>

              <FadeInUp delay={0.3}>
                <div className="mt-14 border-t border-[#1e3431] pt-8">
                  <div className="flex items-center gap-10">
                    {[
                      ['10+', 'Specialist agents'],
                      ['4', 'Divisions'],
                      ['100%', 'Structured output'],
                    ].map(([val, lbl]) => (
                      <div key={lbl}>
                        <p className="text-2xl font-semibold leading-none tracking-tight text-[#f4faf8]">{val}</p>
                        <p className="mt-1.5 text-[10px] uppercase tracking-[0.22em] text-[#789b96]">{lbl}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInUp>
            </div>

            {/* Right — animated panel */}
            <FadeInUp delay={0.18} className="mt-16 w-full max-w-[520px] shrink-0 lg:mt-0">
              <HeroPanel />
            </FadeInUp>
          </div>
        </section>

        {/* ── VALUE POINTS ── light surface ── */}
        <section className="border-t border-[#d8e5e2]" style={{ backgroundColor: '#fbfbfa' }}>
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
            <div className="grid gap-16 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
              <FadeInUp>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#789b96]">
                    How it becomes a system
                  </p>
                  <h2 className="mt-4 text-3xl font-light leading-tight tracking-tight text-[#173634] text-balance md:text-5xl">
                    Designed to move from scattered work to a controlled operating layer.
                  </h2>
                  <p className="mt-5 text-sm leading-7 text-[#65706d]">
                    The visual system says the same thing the product does: this is not a toy — it is an applied workspace for teams under pressure.
                  </p>
                </div>
              </FadeInUp>

              {/* Gap-as-border grid */}
              <div className="border border-[#d8e5e2] bg-[#d8e5e2]">
                <div className="grid gap-px sm:grid-cols-2">
                  {VALUE_POINTS.map(({ icon: Icon, title, desc }, idx) => (
                    <FadeInUp key={title} delay={0.08 * idx}>
                      <div className="n3-card group bg-[#fbfbfa] p-6 transition-colors hover:bg-[#f1f6f4]">
                        <div className="mb-4 flex h-9 w-9 items-center justify-center border border-[#d8e5e2] bg-[#edf4f1] text-[#52605d]">
                          <Icon size={15} />
                        </div>
                        <p className="text-sm font-semibold text-[#173634]">{title}</p>
                        <p className="mt-2 text-sm leading-7 text-[#65706d]">{desc}</p>
                      </div>
                    </FadeInUp>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WORKFLOW STEPS ── dark canvas ── */}
        <section className="border-t border-[#1e3431]" style={{ backgroundColor: '#060a10' }}>
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
            <div className="grid gap-16 lg:grid-cols-[0.82fr_1.18fr]">
              <FadeInUp>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#789b96]">
                    Implementation rhythm
                  </p>
                  <h2 className="mt-4 text-3xl font-light leading-tight text-[#f5fbfa] text-balance md:text-5xl">
                    Four steps. Clear language. No wasted screens.
                  </h2>
                  <p className="mt-5 text-sm leading-7 text-[#9db7b1]">
                    The interface feels like a method, not a collection of disconnected tools.
                  </p>
                </div>
              </FadeInUp>

              {/* Gap-as-border dark grid */}
              <div className="border border-[#1e3431] bg-[#1e3431]">
                <div className="grid gap-px sm:grid-cols-2">
                  {WORKFLOW_STEPS.map((item, idx) => (
                    <FadeInUp key={item.step} delay={0.08 * idx}>
                      <div className="n3-card group bg-[#060a10] p-6 transition-colors hover:bg-[#0d1f1d]">
                        <span className="font-mono text-xs text-[#a7b9b4]">{item.step}</span>
                        <h3 className="mt-3 text-sm font-semibold text-[#f5fbfa]">{item.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-[#9db7b1]">{item.desc}</p>
                      </div>
                    </FadeInUp>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── AGENTS GRID ── light surface ── */}
        <section className="border-t border-[#d8e5e2]" style={{ backgroundColor: '#f1f6f4' }}>
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
            <FadeInUp>
              <div className="mb-10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#789b96]">Agents</p>
                <h2 className="mt-4 text-3xl font-light leading-tight text-[#173634] text-balance md:text-5xl">
                  Specialists for every function.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[#65706d]">
                  Each specialist shows division, plan, output type, and next action — always visible, always structured.
                </p>
              </div>
            </FadeInUp>

            {/* Gap-as-border agent grid */}
            <div className="border border-[#d8e5e2] bg-[#d8e5e2]">
              <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
                {featuredAgents.map((agent, idx) => (
                  <FadeInUp key={agent.id} delay={0.05 * idx}>
                    <Link
                      href={`/agents/${agent.slug}`}
                      className="n3-card group block bg-[#fbfbfa] p-6 transition-colors hover:bg-[#f1f6f4]"
                    >
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <DivisionBadge division={agent.division} size="sm" />
                        <PlanBadge plan={agent.planRequired} size="sm" />
                      </div>
                      <h3 className="text-sm font-semibold text-[#173634]">{agent.name}</h3>
                      <p className="mt-2 text-sm leading-7 text-[#65706d]">{agent.shortDescription}</p>
                      <div className="mt-5 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#52605d] transition-colors group-hover:text-[#173634]">
                        Open specialist <ArrowRight size={10} />
                      </div>
                    </Link>
                  </FadeInUp>
                ))}
              </div>
            </div>

            <FadeInUp delay={0.1}>
              <div className="mt-8 text-center">
                <Link
                  href="/agents"
                  className="inline-flex items-center gap-2 border border-[#d8e5e2] bg-[#fbfbfa] px-6 py-3 text-sm font-semibold text-[#173634] transition-colors hover:border-[#8fb2aa]/40 hover:bg-[#edf4f1]"
                >
                  View all agents <ArrowRight size={13} />
                </Link>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* ── CTA ── dark canvas ── */}
        <section className="border-t border-[#1e3431]" style={{ backgroundColor: '#0d1f1d' }}>
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
            <FadeInUp>
              <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#789b96]">Next step</p>
                  <h2 className="mt-4 text-3xl font-light leading-tight text-[#f5fbfa] text-balance md:text-5xl">
                    Start with one task. Turn it into a workspace the team can use.
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[#9db7b1]">
                    Free to start. No credit card required. Upgrade when the workflow needs more structure.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href="/signup"
                    className="inline-flex items-center gap-2 bg-[#8fb2aa] px-6 py-3.5 text-sm font-semibold text-[#060a10] transition-colors hover:bg-[#d9e3e0]"
                  >
                    Start free <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 border border-[#28413d] px-5 py-3.5 text-sm font-semibold text-[#d9e3e0] transition-colors hover:border-[#8fb2aa]/40 hover:text-[#f5fbfa]"
                  >
                    See pricing
                  </Link>
                </div>
              </div>
            </FadeInUp>
          </div>
        </section>
      </main>
    </div>
  )
}
