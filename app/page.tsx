import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { getFeaturedAgents } from '@/lib/data/seed-agents'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { PlanBadge } from '@/components/shared/PlanBadge'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const CATEGORIES = [
  'Engineering', 'Design', 'Product', 'Sales',
  'Marketing', 'Strategy', 'Security', 'Operations',
  'Finance', 'Research',
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Pick an agent', desc: 'Browse specialists by division or search by task.' },
  { step: '02', title: 'Describe the task', desc: 'Provide context. The agent knows what to ask for.' },
  { step: '03', title: 'Receive a deliverable', desc: 'A structured output, not a generic chat response.' },
  { step: '04', title: 'Save to a project', desc: 'Organize outputs by project folder. Find them anytime.' },
  { step: '05', title: 'Continue with a specialist', desc: 'Follow suggested agents to keep work moving.' },
]

const USE_CASES = [
  'Build MVPs', 'Review code', 'Design product flows', 'Prepare sales outreach',
  'Write proposals', 'Analyze strategy', 'Improve security', 'Create launch plans',
  'Generate documentation', 'Define ICP', 'Map user journeys', 'Plan operations',
]

export default function LandingPage() {
  const featuredAgents = getFeaturedAgents()

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24">
        <div className="max-w-3xl">
          <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-5">
            AI Specialist Workspace
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-semibold tracking-tight text-foreground leading-tight text-balance mb-6">
            Your AI specialist agency in one workspace.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
            Access specialized agents for product, code, design, sales, strategy, security, and
            operations. Run tasks, save outputs, and organize your work from one professional dashboard.
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Button size="default" asChild>
              <Link href="/signup">
                Start free <ArrowRight size={14} className="ml-1.5" />
              </Link>
            </Button>
            <Button variant="outline" size="default" asChild>
              <Link href="/agents">View agents</Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Built for teams, founders, creators, consultants, and operators.
          </p>
        </div>
      </section>

      {/* Problem */}
      <section className="border-t border-border bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4 text-balance">
                Generic chat is not enough for serious work.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Most AI tools give you one blank chat box. AgencyOS gives you structured specialists
                with clear roles, missions, input formats, and deliverables.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4 text-balance">
                Choose the right specialist for the job.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Browse agents by division, run focused tasks, save the result to projects, and
                continue your workflow with the next expert.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Categories */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-3 text-balance">
              Specialists for every function.
            </h2>
            <p className="text-muted-foreground text-sm">
              Browse agents by division. Each specialist understands their domain deeply.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/agents?division=${encodeURIComponent(cat)}`}
                className="px-3 py-1.5 text-sm border border-border rounded bg-white hover:bg-muted transition-colors text-foreground"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Agents */}
      <section className="border-t border-border bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-1">Featured agents</h2>
              <p className="text-sm text-muted-foreground">A preview of what is waiting inside.</p>
            </div>
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
              <Link href="/agents">
                See all <ArrowRight size={14} className="ml-1" />
              </Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredAgents.slice(0, 6).map((agent) => (
              <Link
                key={agent.id}
                href={`/agents/${agent.slug}`}
                className="group p-5 rounded-lg border border-border bg-white hover:border-primary/40 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <DivisionBadge division={agent.division} size="sm" />
                  <PlanBadge plan={agent.planRequired} size="sm" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1.5">
                  {agent.name}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {agent.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-3">How it works</h2>
            <p className="text-muted-foreground text-sm">Five steps from task to saved deliverable.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="flex flex-col gap-2">
                <span className="text-xs font-mono text-muted-foreground">{item.step}</span>
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="border-t border-border bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-3">What you can build</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {USE_CASES.map((uc) => (
              <span
                key={uc}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border rounded bg-muted/30 text-foreground"
              >
                <CheckCircle2 size={12} className="text-primary" />
                {uc}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold text-foreground mb-4 text-balance">
              Start with one task. Build your AI agency as you grow.
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Free to start. No credit card required. Upgrade when you need more.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="default" asChild>
                <Link href="/signup">
                  Start free <ArrowRight size={14} className="ml-1.5" />
                </Link>
              </Button>
              <Button variant="outline" size="default" asChild>
                <Link href="/pricing">See pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <span className="text-sm font-semibold text-foreground">AgencyOS</span>
            <div className="flex flex-wrap gap-5">
              <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
              <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/pricing" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
              <Link href="/agents" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Agents</Link>
            </div>
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} AgencyOS
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
