import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { PLANS } from '@/lib/data/plans'
import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="max-w-xl mb-14">
          <h1 className="text-4xl font-semibold text-foreground mb-4 text-balance">
            Simple, transparent pricing.
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Start for free. Upgrade when you need more runs, more agents, or team collaboration.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {PLANS.filter((p) => p.id !== 'enterprise').map((plan) => (
            <div
              key={plan.id}
              className={cn(
                'relative flex flex-col p-6 rounded-lg border bg-white',
                plan.highlighted
                  ? 'border-primary shadow-sm ring-1 ring-primary/20'
                  : 'border-border'
              )}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-0.5 rounded-full">
                  Most popular
                </span>
              )}
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-foreground mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-semibold text-foreground">{plan.priceLabel}</span>
                  {plan.price !== null && (
                    <span className="text-xs text-muted-foreground">/month</span>
                  )}
                </div>
              </div>
              <ul className="flex-1 space-y-2.5 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.highlighted ? 'default' : 'outline'}
                size="sm"
                asChild
                className="w-full"
              >
                <Link href="/signup">{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Enterprise row */}
        <div className="rounded-lg border border-border bg-white p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Enterprise</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Private agents, white-label, custom usage limits, dedicated onboarding, and custom security requirements.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <ul className="flex flex-wrap gap-3 mb-3 sm:mb-0">
              {PLANS.find((p) => p.id === 'enterprise')?.features.slice(0, 3).map((f) => (
                <li key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CheckCircle2 size={12} className="text-primary" /> {f}
                </li>
              ))}
            </ul>
            <Button size="sm" asChild>
              <Link href="mailto:hello@agencyos.app">Contact us</Link>
            </Button>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-2xl">
          <h2 className="text-xl font-semibold text-foreground mb-8">Common questions</h2>
          <div className="space-y-6">
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
              {
                q: 'Is there a free trial for paid plans?',
                a: 'The Free plan gives you 5 agent runs per month at no cost. You can explore the product before upgrading.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-border pb-6 last:border-0">
                <h3 className="text-sm font-semibold text-foreground mb-2">{q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
