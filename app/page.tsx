import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { getFeaturedAgents } from '@/lib/data/seed-agents'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { PlanBadge } from '@/components/shared/PlanBadge'
import { ArrowRight, CheckCircle2, Sparkles, Shield, Workflow, Zap } from 'lucide-react'

const CATEGORIES = [
  'Engineering',
  'Design',
  'Product',
  'Sales',
  'Marketing',
  'Strategy',
  'Security',
  'Operations',
  'Finance',
  'Research',
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Pick an agent', desc: 'Browse specialists by division or search by task.' },
  { step: '02', title: 'Describe the task', desc: 'Provide context. The agent knows what to ask for.' },
  { step: '03', title: 'Receive a deliverable', desc: 'A structured output, not a generic chat response.' },
  { step: '04', title: 'Save to a project', desc: 'Organize outputs by project folder. Find them anytime.' },
]

const USE_CASES = [
  'Build MVPs',
  'Review code',
  'Design product flows',
  'Prepare sales outreach',
  'Write proposals',
  'Analyze strategy',
  'Improve security',
  'Create launch plans',
  'Generate documentation',
  'Define ICP',
  'Map user journeys',
  'Plan operations',
]

const VALUE_POINTS = [
  { icon: Sparkles, title: 'Specialist-first', desc: 'Each surface looks and feels like a focused expert, not a chat toy.' },
  { icon: Workflow, title: 'Task-driven', desc: 'The UI pushes the user toward an output, a project, or the next action.' },
  { icon: Shield, title: 'Trust cues', desc: 'Subtle hierarchy, cleaner badges, and stronger spacing make the app feel deliberate.' },
  { icon: Zap, title: 'Fast scanning', desc: 'The interface is built so users can understand the state of work at a glance.' },
]

export default function LandingPage() {
  const featuredAgents = getFeaturedAgents()

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.14),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.12),_transparent_30%),linear-gradient(to_bottom,_rgba(255,255,255,0.9),_rgba(248,250,252,0.92))]" />
          </div>
          <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-24 pt-16 sm:px-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:pt-20">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
                <Sparkles size={12} className="text-primary" />
                AI specialist workspace
              </div>
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-foreground text-balance sm:text-5xl lg:text-[64px] lg:leading-[1]">
                Your AI specialist agency in one workspace.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Access specialized agents for product, code, design, sales, strategy, security, and
                operations. Run tasks, save outputs, and organize your work from one professional dashboard.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="default" asChild className="shadow-sm shadow-primary/10">
                  <Link href="/signup">
                    Start free <ArrowRight size={14} className="ml-1.5" />
                  </Link>
                </Button>
                <Button variant="outline" size="default" asChild>
                  <Link href="/agents">View agents</Link>
                </Button>
              </div>
              <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ['10+', 'agent families'],
                  ['5 min', 'to first run'],
                  ['1 workspace', 'for the team'],
                  ['24/7', 'specialist support'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-border bg-white/80 p-4 shadow-sm backdrop-blur">
                    <p className="text-xl font-semibold tracking-tight text-foreground">{value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.08),_transparent_55%)] blur-2xl" />
              <div className="rounded-[1.75rem] border border-border/70 bg-white/90 p-5 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur">
                <div className="rounded-[1.25rem] border border-slate-200 bg-slate-950 p-5 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">AgencyOS control room</p>
                      <h2 className="mt-2 text-xl font-semibold tracking-tight">Work with specialists, not prompts.</h2>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white">
                      <Workflow size={18} />
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      ['Routing', 'Match the task to the right expert'],
                      ['Output', 'Structured deliverables by design'],
                      ['Projects', 'Save work into repeatable flows'],
                      ['Signal', 'Track what is live, ready, and next'],
                    ].map(([title, desc]) => (
                      <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-sm font-medium">{title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-300">{desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>Current workflow</span>
                      <span>Design review</span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-2 flex-1 rounded-full bg-white/10">
                        <div className="h-2 w-[68%] rounded-full bg-white" />
                      </div>
                      <span className="text-xs text-slate-300">68%</span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <DivisionBadge division="Design" size="sm" />
                      <PlanBadge plan="team" size="sm" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {VALUE_POINTS.map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="rounded-2xl border border-border bg-white p-4 shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
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
          </div>
        </section>

        <section className="border-t border-border/70 bg-white/70">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">Brand language</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground text-balance">
                  A calmer, more editorial interface for specialist work.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  The product should feel precise, trustworthy, and fast to scan. That means a clearer typographic
                  rhythm, restrained color usage, and surfaces that separate strategy from execution.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  'Fewer decorative colors, more information density.',
                  'Higher contrast between action surfaces and content surfaces.',
                  'Badges and chips act as system cues, not decoration.',
                  'Every section should answer "what should I do next?"',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-border bg-white p-4 shadow-sm">
                    <CheckCircle2 size={14} className="text-primary" />
                    <p className="mt-3 text-sm leading-relaxed text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground text-balance">
                Specialists for every function.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Browse agents by division. Each specialist understands their domain deeply and is designed to produce
                a concrete deliverable.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  href={`/agents?division=${encodeURIComponent(cat)}`}
                  className="rounded-full border border-border bg-white px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary/35 hover:bg-slate-50"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-white/70">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">Featured agents</h2>
                <p className="mt-2 text-sm text-muted-foreground">A preview of what is waiting inside.</p>
              </div>
              <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
                <Link href="/agents">
                  See all <ArrowRight size={14} className="ml-1" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredAgents.slice(0, 6).map((agent) => (
                <Link
                  key={agent.id}
                  href={`/agents/${agent.slug}`}
                  className="group rounded-2xl border border-border bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <DivisionBadge division={agent.division} size="sm" />
                    <PlanBadge plan={agent.planRequired} size="sm" />
                  </div>
                  <h3 className="text-sm font-semibold tracking-tight text-foreground">{agent.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{agent.shortDescription}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary">
                    View specialist <ArrowRight size={11} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="mb-10">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">Workflow</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">How it works</h2>
              <p className="mt-3 text-sm text-muted-foreground">Four steps from task to saved deliverable.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {HOW_IT_WORKS.map((item) => (
                <div key={item.step} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                  <span className="text-xs font-mono text-muted-foreground">{item.step}</span>
                  <h3 className="mt-3 text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-white/70">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">What you can build</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {USE_CASES.map((uc) => (
                <span
                  key={uc}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-sm text-foreground shadow-sm"
                >
                  <CheckCircle2 size={12} className="text-primary" />
                  {uc}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
            <div className="max-w-xl rounded-[1.75rem] border border-border bg-slate-950 p-8 text-white shadow-[0_20px_80px_rgba(15,23,42,0.18)]">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-400">Next step</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance">
                Start with one task. Build your AI agency as you grow.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                Free to start. No credit card required. Upgrade when you need more.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
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
        </section>
      </main>
    </div>
  )
}
