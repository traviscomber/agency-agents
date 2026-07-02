import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MOCK_USER } from '@/lib/data/mock-store'
import { PLANS, getPlanById } from '@/lib/data/plans'
import { PLAN_HIERARCHY } from '@/lib/types'
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function BillingPage() {
  const currentPlan = getPlanById(MOCK_USER.plan)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <section className="mb-8 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-6 p-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:p-8">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
              <Sparkles size={12} className="text-primary" />
              Billing and plan management
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
              Manage your plan with less friction.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Review your current plan, compare limits, and move up or down without losing context.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ['Current plan', currentPlan?.name ?? 'Unknown'],
              ['Billing model', currentPlan?.price === 0 ? 'Free' : currentPlan?.price === null ? 'Custom' : 'Monthly'],
              ['Upgrade path', 'Visible and immediate'],
              ['Support', 'Contact sales for enterprise'],
            ].map(([title, value]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">{title}</p>
                <p className="mt-2 text-sm font-semibold text-foreground">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs text-slate-500">Current plan</p>
            <p className="text-2xl font-semibold tracking-tight capitalize text-foreground">{currentPlan?.name}</p>
            <p className="mt-1 text-sm text-slate-600">
              {currentPlan?.price === 0
                ? 'Free - no card required'
                : currentPlan?.price === null
                  ? 'Custom pricing'
                  : `$${currentPlan?.price}/month · Renews Jan 31, 2024`}
            </p>
          </div>
          {MOCK_USER.plan !== 'free' && MOCK_USER.plan !== 'enterprise' && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Manage payment</Button>
              <Button variant="outline" size="sm" className="border-destructive/30 text-destructive hover:bg-destructive/5">
                Cancel plan
              </Button>
            </div>
          )}
        </div>
      </section>

      <div className="mb-6 mt-8">
        <h2 className="mb-4 text-sm font-semibold text-foreground">Available plans</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.filter((p) => p.id !== 'enterprise').map((plan) => {
            const isCurrent = plan.id === MOCK_USER.plan
            const isUpgrade = PLAN_HIERARCHY.indexOf(plan.id) > PLAN_HIERARCHY.indexOf(MOCK_USER.plan)
            const isDowngrade = PLAN_HIERARCHY.indexOf(plan.id) < PLAN_HIERARCHY.indexOf(MOCK_USER.plan)

            return (
              <div
                key={plan.id}
                className={cn(
                  'relative flex flex-col rounded-2xl border bg-white p-5 shadow-sm',
                  isCurrent
                    ? 'border-primary/40 ring-1 ring-primary/15'
                    : plan.highlighted
                      ? 'border-slate-200 shadow-sm'
                      : 'border-slate-200'
                )}
              >
                {isCurrent && (
                  <span className="absolute -top-2.5 left-4 rounded-full bg-slate-950 px-2 py-0.5 text-[10px] font-medium text-white">
                    Current
                  </span>
                )}
                {plan.highlighted && !isCurrent && (
                  <span className="absolute -top-2.5 left-4 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700">
                    Popular
                  </span>
                )}

                <div className="mb-4">
                  <h3 className="mb-1 text-sm font-semibold text-foreground">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-semibold text-foreground">{plan.priceLabel}</span>
                    {plan.price !== null && plan.price !== 0 && (
                      <span className="text-xs text-slate-600">/mo</span>
                    )}
                  </div>
                </div>

                <ul className="mb-5 flex-1 space-y-2">
                  {plan.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex items-start gap-1.5 text-xs text-slate-600">
                      <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-primary" />
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

      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="mb-0.5 text-sm font-semibold text-foreground">Enterprise</h3>
            <p className="text-xs text-slate-600">
              Private agents, white-label, custom limits, and dedicated onboarding.
            </p>
          </div>
          <Button size="sm" asChild>
            <Link href="mailto:hello@agencyos.app">Contact sales</Link>
          </Button>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-sm font-semibold text-foreground">Billing history</h2>
        {MOCK_USER.plan === 'free' ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <p className="text-xs text-slate-600">No invoices. You are on the free plan.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-slate-200 bg-slate-50 px-4 py-2.5">
              <span className="text-xs font-medium text-slate-500">Date</span>
              <span className="text-xs font-medium text-slate-500">Amount</span>
              <span className="text-xs font-medium text-slate-500">Status</span>
            </div>
            {[
              { date: 'Jan 1, 2024', amount: `$${currentPlan?.price}`, status: 'Paid' },
              { date: 'Dec 1, 2023', amount: `$${currentPlan?.price}`, status: 'Paid' },
            ].map((invoice, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-slate-200 px-4 py-3 last:border-0"
              >
                <span className="text-sm text-foreground">{invoice.date}</span>
                <span className="text-sm text-foreground">{invoice.amount}</span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
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
