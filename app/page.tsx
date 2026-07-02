import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { getFeaturedAgents } from '@/lib/data/seed-agents'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { PlanBadge } from '@/components/shared/PlanBadge'
import { ArrowRight, CheckCircle2, Sparkles, Shield, Workflow, Zap, BarChart3, Layers3 } from 'lucide-react'

const OPERATING_LAYERS = [
  {
    step: '01',
    title: 'Evidence',
    desc: 'Tasks begin with context, documents, and the real object of work instead of a blank prompt.',
  },
  {
    step: '02',
    title: 'Execution',
    desc: 'Each run produces a structured deliverable, clear handoffs, and the next action the team can use.',
  },
  {
    step: '03',
    title: 'Management',
    desc: 'Projects and history make progress visible, so work can be reviewed without rebuilding the story.',
  },
  {
    step: '04',
    title: 'Agents',
    desc: 'Specialists work inside a controlled workspace with real division, plan, and output cues.',
  },
]

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
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-x-0 top-0 h-[680px] bg-[linear-gradient(to_bottom,_rgba(15,23,42,0.96),_rgba(15,23,42,0.88)_55%,_rgba(15,23,42,0.75)_100%)]" />
            <div className="absolute inset-x-0 top-0 h-[680px] bg-[radial-gradient(circle_at_top_left,_rgba(148,163,184,0.20),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(255,255,255,0.08),_transparent_30%)]" />
          </div>

          <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-24 pt-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:pt-20">
            <div className="max-w-2xl text-white">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/72">
                <Sparkles size={12} className="text-white" />
                AI specialist workspace
              </div>
              <h1 className="mt-5 max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-[68px] lg:leading-[0.98]">
                A specialist workspace for work that needs structure.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg">
                AgencyOS turns scattered prompts into an operating layer: agents, projects, run history, saved
                deliverables, and plan control in one place.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="default" asChild className="bg-white text-slate-950 hover:bg-slate-100">
                  <Link href="/signup">
                    Start free <ArrowRight size={14} className="ml-1.5" />
                  </Link>
                </Button>
                <Button variant="outline" size="default" asChild className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                  <Link href="/pricing">See pricing</Link>
                </Button>
              </div>
              <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ['10+', 'agent families'],
                  ['1 workspace', 'for the whole team'],
                  ['24/7', 'specialist availability'],
                  ['4 layers', 'evidence to action'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-[1.25rem] border border-white/10 bg-white/6 p-4 backdrop-blur">
                    <p className="text-2xl font-semibold tracking-tight text-white">{value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/55">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_55%)] blur-2xl" />
              <div className="rounded-[2rem] border border-white/12 bg-slate-950 p-5 text-white shadow-[0_24px_90px_rgba(15,23,42,0.42)]">
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-white/45">Operating layer</p>
                    <h2 className="mt-2 text-xl font-semibold tracking-tight">From scattered signals to accountable work.</h2>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                    <Layers3 size={18} />
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {OPERATING_LAYERS.map((layer, index) => (
                    <div key={layer.step} className="flex items-start gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-xs font-semibold text-slate-950">
                        {layer.step}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-sm font-semibold">{layer.title}</p>
                          <span className="text-[10px] uppercase tracking-[0.2em] text-white/45">
                            {index === 0 ? 'capture' : index === 1 ? 'structure' : index === 2 ? 'manage' : 'act'}
                          </span>
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-white/68">{layer.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between text-xs text-white/65">
                    <span>Operational clarity</span>
                    <span>86%</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-white/10">
                    <div className="h-2 w-[86%] rounded-full bg-white" />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <DivisionBadge division="Operations" size="sm" />
                    <PlanBadge plan="team" size="sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border/70 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">How it becomes a system</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground text-balance">
                  Designed to move from one concrete drag to a controlled operating layer.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  The visual system should say the same thing the product does: this is not a toy, it is an applied
                  workspace for teams under pressure.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {VALUE_POINTS.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="rounded-[1.35rem] border border-border bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.35)]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
                        <Icon size={16} />
                      </div>
                      <p className="text-sm font-semibold text-foreground">{title}</p>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-slate-950 text-white">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">Implementation rhythm</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
                  The interface should feel like a method, not a collection of screens.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/68">
                  Four steps are enough when the language is clear and each section earns its place.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {WORKFLOW_STEPS.map((item) => (
                  <div key={item.step} className="rounded-[1.35rem] border border-white/10 bg-white/5 p-5">
                    <span className="text-xs font-mono text-white/45">{item.step}</span>
                    <h3 className="mt-3 text-sm font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/68">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-white/70">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Agents</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground text-balance">
                Specialists for every function.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Each specialist is built to look and behave like part of a real operating system: division, plan,
                output, and next action are always visible.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredAgents.slice(0, 6).map((agent) => (
                <Link
                  key={agent.id}
                  href={`/agents/${agent.slug}`}
                  className="group rounded-[1.35rem] border border-border bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.35)] transition-all hover:-translate-y-0.5 hover:border-primary/25"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <DivisionBadge division={agent.division} size="sm" />
                    <PlanBadge plan={agent.planRequired} size="sm" />
                  </div>
                  <h3 className="text-sm font-semibold tracking-tight text-foreground">{agent.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{agent.shortDescription}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-foreground">
                    Open specialist <ArrowRight size={11} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
            <div className="rounded-[2rem] border border-border bg-slate-950 p-8 text-white shadow-[0_24px_90px_rgba(15,23,42,0.18)]">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">Next step</p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance">
                    Start with one task. Turn it into a workspace that the team can actually use.
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-white/68">
                    Free to start. No credit card required. Upgrade when the workflow needs more structure.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button size="default" asChild className="bg-white text-slate-950 hover:bg-slate-100">
                    <Link href="/signup">
                      Start free <ArrowRight size={14} className="ml-1.5" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="default" asChild className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                    <Link href="/pricing">See pricing</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
