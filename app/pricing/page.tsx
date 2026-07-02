import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { PLANS } from '@/lib/data/plans'
import { CheckCircle2, ArrowRight, Sparkles, Shield, Wand2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(201,213,225,0.32),_transparent_30%),linear-gradient(to_bottom,_#f8fafc,_#ffffff_18%,_#f8fafc_100%)]">
      <PublicNavbar />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <section className="overflow-hidden rounded-[2rem] border border-border/70 bg-gradient-to-br from-white via-white to-muted/30 shadow-[0_18px_60px_-44px_rgba(15,23,42,0.45)]">
          <div className="grid gap-8 p-6 lg:grid-cols-[1.08fr_0.92fr] lg:p-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                <Sparkles size={12} className="text-primary" />
                Pricing for specialist work
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground text-balance sm:text-5xl">
                Simple pricing, presented like a serious product.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Start free, then move up only when the workspace needs more runs, deeper access, or team coordination.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/signup">
                    Start free <ArrowRight size={12} className="ml-1" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/login">Sign in</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { title: 'Free to start', desc: 'Test the system without a credit card.' },
                { title: 'Clear upgrade path', desc: 'Plans scale from solo use to teams.' },
                { title: 'Agent access', desc: 'Each plan exposes a deeper specialist set.' },
                { title: 'Predictable limits', desc: 'Usage and upgrades are easy to scan.' },
              ].map(({ title, desc }) => (
                <div key={title} className="rounded-[1.25rem] border border-border bg-white p-4 shadow-sm">
                  <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-muted/60">
                    <Shield size={14} className="text-foreground" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                'relative flex flex-col overflow-hidden rounded-[1.5rem] border bg-white p-6 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)] transition-all',
                plan.highlighted
                  ? 'border-primary/40 ring-1 ring-primary/15 shadow-[0_16px_42px_-34px_rgba(15,23,42,0.55)]'
                  : 'border-border hover:border-primary/20 hover:-translate-y-0.5'
              )}
            >
              {plan.highlighted && (
                <span className="absolute right-4 top-4 rounded-full bg-slate-950 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
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
              <Button variant={plan.highlighted ? 'default' : 'outline'} className="mt-6 w-full" asChild>
                <Link href={plan.id === 'enterprise' ? '/contact' : '/signup'}>
                  {plan.cta} <ArrowRight size={12} className="ml-1" />
                </Link>
              </Button>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[1.75rem] border border-border bg-white p-6 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              <Wand2 size={12} className="text-primary" />
              What pricing includes
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">A cleaner fit for specialist work.</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              The product should feel easy to evaluate: every plan communicates value, limits, and the next step to upgrade.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-border bg-white p-6 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                'No hidden billing states',
                'Usage is readable at a glance',
                'Upgrade prompts appear only when useful',
                'A polished path from free to team use',
              ].map((item) => (
                <div key={item} className="rounded-[1.15rem] border border-border bg-slate-50 px-4 py-3 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
