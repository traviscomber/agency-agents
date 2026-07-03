import Link from 'next/link'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { PLANS } from '@/lib/data/plans'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

const FAQ = [
  { q: 'Can I start without a credit card?', a: 'Yes. The free plan gives you 5 runs per month to evaluate the workspace before committing.' },
  { q: 'What happens when I hit the run limit?', a: 'Runs stop and you see an upgrade prompt. No overages, no surprise charges.' },
  { q: 'Can I change plans at any time?', a: 'Yes. Upgrades take effect immediately; downgrades apply at the start of the next billing period.' },
  { q: 'What is an agent run?', a: 'One complete execution of a specialist agent with your inputs, producing a structured output artifact.' },
]

export default function PricingPage() {
  return (
    <div style={{ backgroundColor: '#fbfbfa' }} className="min-h-screen">
      <PublicNavbar />

      <main>
        {/* ── Header ── dark ── */}
        <section className="border-b border-[#1e3431] pt-[4.75rem]" style={{ backgroundColor: '#060a10' }}>
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#789b96]">Pricing</p>
            <h1 className="mt-4 text-4xl font-semibold leading-[0.96] tracking-[-0.02em] text-[#f5fbfa] text-balance md:text-6xl">
              Simple pricing.<br />
              <span className="font-light text-[#789b96]">Presented like a serious product.</span>
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-7 text-[#9db7b1]">
              Start free, then move up only when the workspace needs more runs, deeper access, or team coordination.
            </p>
          </div>
        </section>

        {/* ── Plan cards — gap-as-border ── */}
        <section className="border-b border-[#d8e5e2]" style={{ backgroundColor: '#f1f6f4' }}>
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
            <div className="border border-[#d8e5e2] bg-[#d8e5e2]">
              <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4">
                {PLANS.map((plan) => (
                  <div
                    key={plan.id}
                    className="relative flex flex-col bg-[#fbfbfa] p-7 transition-colors hover:bg-[#f1f6f4]"
                    style={plan.highlighted ? { backgroundColor: '#173634' } : undefined}
                  >
                    {plan.highlighted && (
                      <span className="mb-4 inline-flex self-start border border-[#8fb2aa]/30 bg-[#8fb2aa]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8fb2aa]">
                        Most popular
                      </span>
                    )}

                    <div className="mb-6">
                      <h2 className={`text-[10px] font-semibold uppercase tracking-[0.24em] ${plan.highlighted ? 'text-[#8fb2aa]' : 'text-[#789b96]'}`}>
                        {plan.name}
                      </h2>
                      <div className="mt-3 flex items-baseline gap-1.5">
                        <span className={`text-4xl font-semibold leading-none tracking-[-0.02em] ${plan.highlighted ? 'text-[#f5fbfa]' : 'text-[#173634]'}`}>
                          {plan.priceLabel}
                        </span>
                        {plan.price !== null && (
                          <span className={`text-xs ${plan.highlighted ? 'text-[#9db7b1]' : 'text-[#65706d]'}`}>/month</span>
                        )}
                      </div>
                      <p className={`mt-2 text-xs leading-6 ${plan.highlighted ? 'text-[#9db7b1]' : 'text-[#65706d]'}`}>
                        {plan.description}
                      </p>
                    </div>

                    <ul className="flex-1 space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className={`flex items-start gap-2.5 text-xs leading-6 ${plan.highlighted ? 'text-[#d9e3e0]' : 'text-[#52605d]'}`}>
                          <CheckCircle2 size={13} className={`mt-0.5 shrink-0 ${plan.highlighted ? 'text-[#8fb2aa]' : 'text-[#173634]'}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={plan.id === 'enterprise' ? '/contact' : '/signup'}
                      className={`mt-7 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold transition-colors ${
                        plan.highlighted
                          ? 'bg-[#8fb2aa] text-[#060a10] hover:bg-[#d9e3e0]'
                          : 'border border-[#d8e5e2] bg-[#fbfbfa] text-[#173634] hover:border-[#8fb2aa]/40 hover:bg-[#edf4f1]'
                      }`}
                    >
                      {plan.cta} <ArrowRight size={13} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── light ── */}
        <section className="border-b border-[#d8e5e2]" style={{ backgroundColor: '#fbfbfa' }}>
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <p className="mb-10 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#789b96]">Common questions</p>
            <div className="border border-[#d8e5e2] bg-[#d8e5e2]">
              <div className="grid gap-px sm:grid-cols-2">
                {FAQ.map(({ q, a }) => (
                  <div key={q} className="bg-[#fbfbfa] p-7 transition-colors hover:bg-[#f1f6f4]">
                    <p className="text-sm font-semibold text-[#173634]">{q}</p>
                    <p className="mt-2 text-sm leading-7 text-[#65706d]">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── dark ── */}
        <section className="border-b border-[#1e3431]" style={{ backgroundColor: '#0d1f1d' }}>
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#789b96]">Ready to start</p>
                <h2 className="mt-4 text-3xl font-light leading-tight text-[#f5fbfa] text-balance">
                  No credit card needed to begin.
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/signup" className="inline-flex items-center gap-2 bg-[#8fb2aa] px-6 py-3.5 text-sm font-semibold text-[#060a10] transition-colors hover:bg-[#d9e3e0]">
                  Start free <ArrowRight size={13} />
                </Link>
                <Link href="/login" className="inline-flex items-center gap-2 border border-[#28413d] px-5 py-3.5 text-sm font-semibold text-[#d9e3e0] transition-colors hover:border-[#8fb2aa]/40 hover:text-[#f5fbfa]">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
