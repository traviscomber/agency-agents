import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MOCK_USER } from '@/lib/data/mock-store'
import { PLANS, getPlanById } from '@/lib/data/plans'
import { PLAN_HIERARCHY } from '@/lib/types'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function BillingPage() {
  const currentPlan = getPlanById(MOCK_USER.plan)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground mb-1">Billing</h1>
        <p className="text-sm text-muted-foreground">
          Manage your plan and billing information.
        </p>
      </div>

      {/* Current plan summary */}
      <div className="rounded-lg border border-border bg-white p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Current plan</p>
            <p className="text-xl font-semibold text-foreground capitalize">{currentPlan?.name}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {currentPlan?.price === 0
                ? 'Free — no card required'
                : currentPlan?.price === null
                ? 'Custom pricing'
                : `$${currentPlan?.price}/month · Renews Jan 31, 2024`}
            </p>
          </div>
          {MOCK_USER.plan !== 'free' && MOCK_USER.plan !== 'enterprise' && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Manage payment</Button>
              <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/5">
                Cancel plan
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Plan comparison */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-foreground mb-4">Available plans</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PLANS.filter((p) => p.id !== 'enterprise').map((plan) => {
            const isCurrent = plan.id === MOCK_USER.plan
            const isUpgrade = PLAN_HIERARCHY.indexOf(plan.id) > PLAN_HIERARCHY.indexOf(MOCK_USER.plan)
            const isDowngrade = PLAN_HIERARCHY.indexOf(plan.id) < PLAN_HIERARCHY.indexOf(MOCK_USER.plan)

            return (
              <div
                key={plan.id}
                className={cn(
                  'relative flex flex-col p-5 rounded-lg border bg-white',
                  isCurrent
                    ? 'border-primary ring-1 ring-primary/20'
                    : plan.highlighted
                    ? 'border-border shadow-sm'
                    : 'border-border'
                )}
              >
                {isCurrent && (
                  <span className="absolute -top-2.5 left-4 bg-primary text-primary-foreground text-[10px] font-medium px-2 py-0.5 rounded-full">
                    Current
                  </span>
                )}
                {plan.highlighted && !isCurrent && (
                  <span className="absolute -top-2.5 left-4 bg-foreground text-background text-[10px] font-medium px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                )}

                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-foreground mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-semibold text-foreground">{plan.priceLabel}</span>
                    {plan.price !== null && plan.price !== 0 && (
                      <span className="text-xs text-muted-foreground">/mo</span>
                    )}
                  </div>
                </div>

                <ul className="flex-1 space-y-2 mb-5">
                  {plan.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                      <CheckCircle2 size={12} className="text-primary mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {isCurrent ? (
                  <Button variant="outline" size="sm" className="w-full text-xs" disabled>
                    Current plan
                  </Button>
                ) : isUpgrade ? (
                  <Button size="sm" className="w-full text-xs" asChild>
                    <Link href={`/api/checkout?plan=${plan.id}`}>
                      Upgrade <ArrowRight size={11} className="ml-1" />
                    </Link>
                  </Button>
                ) : isDowngrade ? (
                  <Button variant="outline" size="sm" className="w-full text-xs" asChild>
                    <Link href={`/api/checkout?plan=${plan.id}`}>Downgrade</Link>
                  </Button>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>

      {/* Enterprise */}
      <div className="rounded-lg border border-border bg-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-0.5">Enterprise</h3>
          <p className="text-xs text-muted-foreground">
            Private agents, white-label, custom limits, and dedicated onboarding.
          </p>
        </div>
        <Button size="sm" asChild>
          <Link href="mailto:hello@agencyos.app">Contact sales</Link>
        </Button>
      </div>

      {/* Billing history */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-4">Billing history</h2>
        {MOCK_USER.plan === 'free' ? (
          <div className="rounded-lg border border-border bg-white p-6 text-center">
            <p className="text-xs text-muted-foreground">No invoices. You are on the free plan.</p>
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-white overflow-hidden">
            <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-2.5 border-b border-border bg-muted/30">
              <span className="text-xs font-medium text-muted-foreground">Date</span>
              <span className="text-xs font-medium text-muted-foreground">Amount</span>
              <span className="text-xs font-medium text-muted-foreground">Status</span>
            </div>
            {[
              { date: 'Jan 1, 2024', amount: `$${currentPlan?.price}`, status: 'Paid' },
              { date: 'Dec 1, 2023', amount: `$${currentPlan?.price}`, status: 'Paid' },
            ].map((invoice, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-3 border-b border-border last:border-0 items-center"
              >
                <span className="text-sm text-foreground">{invoice.date}</span>
                <span className="text-sm text-foreground">{invoice.amount}</span>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
                  {invoice.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
