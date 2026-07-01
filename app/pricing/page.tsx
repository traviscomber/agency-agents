import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { PLANS } from '@/lib/data/plans'
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <section className="mb-10 overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-sm">
          <div className="grid gap-8 p-6 lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-slate-50 px-3 py-1 text-xs font-medium text-muted-foreground">
                <Sparkles size={12} className="text-primary" />
                Pricing built for specialist work
              </div>
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-foreground text-balance sm:text-5xl">
                Simple, transparent pricing.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Start for free. Upgrade when you need more runs, more agents, or team collaboration.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ['Free to start', 'Test the system without a credit card.'],
                ['Clear upgrade path', 'Plans scale from solo use to teams.'],
                ['Agent access', 'Each plan exposes a deeper specialist set.'],
                ['Predictable limits', 'Usage and upgrades are easy to scan.'],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-2xl border border-border bg-slate-50 p-4 shadow-sm">
                  <p className="text-sm font-semibold text-foreground">{title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 mb-10 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.filter((plan) => plan.id !== 'enterprise').map((plan) => (
            <div
              key={plan.id}
              className={cn(
                'relative flex flex-col overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all',
                plan.highlighted
                  ? 'border-primary/40 ring-1 ring-primary/15 shadow-md'
                  : 'border-border hover:border-primary/20 hover:shadow-md'
              )}
            >
              {plan.highlighted && (
                <span className="absolute right-4 top-4 rounded-full bg-slate-950 px-3 py-1 text-[11px] font-medium text-white">
                  Most popular
                </span>
              )}
              <div className="mb-5">
                <h2 className="text-sm font-semibold tracking-tight text-foreground">{plan.name}</h2>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-semibold tracking-tight text-foreground">{plan.priceLabel}</span>
                  {plan.price !== null && <span className="text-xs text-muted-foreground">/month</span>}
                </div>
              </div>
              <ul className="flex-1 space-y-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.highlighted ? 'default' : 'outline'}
                size="sm"
                asChild
                className="mt-6 w-full"
              >
                <Link href="/signup">
                  {plan.cta}
                  <ArrowRight size={12} className="ml-1.5" />
                </Link>
              </Button>
            </div>
          ))}
        </section>

        <section className="rounded-[1.75rem] border border-border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-foreground">Enterprise</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Private agents, white-label, custom usage limits, dedicated onboarding, and custom security requirements.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <ul className="flex flex-wrap gap-3">
                {PLANS.find((plan) => plan.id === 'enterprise')?.features.slice(0, 3).map((feature) => (
                  <li key={feature} className="flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-xs text-muted-foreground">
                    <CheckCircle2 size={12} className="text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button size="sm" asChild>
                <Link href="mailto:hello@agencyos.app">Contact us</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mt-14 max-w-2xl">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Common questions</h2>
          <div className="mt-8 space-y-6">
            {[
              {
                q: 'What counts as an agent run?',
                a: 'Each time you submit a task to an agent, it counts as one run. Viewing an agent detail page or browsing does not count.',
              },
              {
                q: 'Can I change my plan at any time?',
                a: 'Yes. You can upgrade or downgrade at any time from your billing page. Changes take effect immediately.',
              },
              {
                q: 'What happens when I reach my monthly limit?',
                a: 'New agent runs are paused until the next billing period. You can upgrade at any time to continue immediately.',
              },
              {
                q: 'Do unused runs roll over?',
                a: 'No. Run limits reset at the start of each billing period. Unused runs do not carry over.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-border pb-6 last:border-0">
                <h3 className="text-sm font-semibold text-foreground">{q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
