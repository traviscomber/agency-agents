import Link from 'next/link'
import { PLANS } from '@/lib/data/plans'
import { CheckCircle2, ArrowRight, Workflow, ShieldCheck, Layers3 } from 'lucide-react'
import { pricingPageCopy, type MarketingLocale } from '@/lib/marketing-i18n'
import { PublicNavbar } from '@/components/public/PublicNavbar'

const VALUE_ICONS = [Workflow, ShieldCheck, Layers3]

export function LocalizedPricingPage({ locale }: { locale: MarketingLocale }) {
  const copy = pricingPageCopy[locale]

  return (
    <div className="min-h-screen bg-[#fbfbfa]">
      <PublicNavbar />
      <main>
        <section className="relative overflow-hidden border-b border-[#1e3431] pt-[4.75rem]" style={{ backgroundColor: '#060a10' }}>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(143,178,170,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(143,178,170,0.04) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
          <div className="pointer-events-none absolute left-0 top-0 h-[560px] w-[560px]" style={{ background: 'radial-gradient(circle, rgba(143,178,170,0.14) 0%, transparent 64%)' }} />
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#789b96]">{copy.eyebrow}</p>
                <h1 className="mt-4 text-4xl font-semibold leading-[0.96] tracking-[-0.03em] text-[#f5fbfa] md:text-6xl">
                  {copy.title}
                </h1>
                <p className="mt-5 max-w-xl text-sm leading-7 text-[#9db7b1]">{copy.summary}</p>
              </div>

              <div className="rounded-[1.8rem] border border-white/10 bg-[#0d1f1d]/90 p-6 shadow-[0_22px_70px_-42px_rgba(0,0,0,0.55)]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8fb2aa]">What scales with plan</p>
                <div className="mt-5 space-y-3">
                  {copy.valueStack.map(([title, desc], index) => {
                    const Icon = VALUE_ICONS[index]
                    return (
                      <div key={title} className="rounded-[1.1rem] border border-white/10 bg-white/5 p-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-9 w-9 items-center justify-center bg-white/10 text-[#8fb2aa]">
                            <Icon size={15} />
                          </div>
                          <p className="text-sm font-semibold text-white">{title}</p>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-[#d9e3e0]">{desc}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#d8e5e2] bg-[#f1f6f4]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
            <div className="mb-8 grid gap-4 lg:grid-cols-3">
              {copy.metrics.map(([title, body]) => (
                <div key={title} className="rounded-[1.35rem] border border-[#d8e5e2] bg-white p-5 shadow-[0_16px_40px_-34px_rgba(15,23,42,0.35)]">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8fb2aa]">{title}</p>
                  <p className="mt-3 text-lg font-semibold text-[#173634]">{body}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-5">
              {PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative flex flex-col border p-6 shadow-[0_18px_44px_-34px_rgba(15,23,42,0.35)] transition-transform hover:-translate-y-1 ${
                    plan.highlighted
                      ? 'border-[#173634] bg-[#173634]'
                      : 'border-[#d8e5e2] bg-white'
                  }`}
                >
                  {plan.highlighted && (
                    <span className="mb-4 inline-flex self-start border border-[#8fb2aa]/30 bg-[#8fb2aa]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8fb2aa]">
                      {copy.bestFit}
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
                      {plan.price !== null ? (
                        <span className={`text-xs ${plan.highlighted ? 'text-[#9db7b1]' : 'text-[#65706d]'}`}>/month</span>
                      ) : null}
                    </div>
                    <p className={`mt-2 text-xs leading-6 ${plan.highlighted ? 'text-[#9db7b1]' : 'text-[#65706d]'}`}>
                      {plan.description}
                    </p>
                  </div>

                  <div className={`mb-5 border p-4 ${plan.highlighted ? 'border-white/10 bg-white/5' : 'border-[#d8e5e2] bg-[#f8fbfa]'}`}>
                    <p className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${plan.highlighted ? 'text-[#8fb2aa]' : 'text-[#789b96]'}`}>
                      {copy.twinCapacity}
                    </p>
                    <p className={`mt-2 text-sm ${plan.highlighted ? 'text-white' : 'text-[#173634]'}`}>
                      {plan.monthlyRunLimit >= 99999 ? copy.unlimitedTwinExecution : `${plan.monthlyRunLimit} ${copy.runsPerMonth}`}
                    </p>
                    <p className={`mt-1 text-sm ${plan.highlighted ? 'text-[#d9e3e0]' : 'text-[#52605d]'}`}>
                      {plan.maxProjects >= 999 ? copy.unlimitedPrograms : `${plan.maxProjects} ${copy.activePrograms}`}
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
        </section>

        <section className="border-b border-[#d8e5e2] bg-[#fbfbfa]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#789b96]">{copy.faqEyebrow}</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-[#173634]">{copy.faqTitle}</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {copy.faq.map(([q, a]) => (
                  <div key={q} className="rounded-[1.5rem] border border-[#d8e5e2] bg-white p-6 shadow-[0_16px_40px_-34px_rgba(15,23,42,0.35)]">
                    <p className="text-sm font-semibold text-[#173634]">{q}</p>
                    <p className="mt-2 text-sm leading-7 text-[#65706d]">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#1e3431] bg-[#0d1f1d]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <div className="rounded-[2rem] border border-[#28413d] bg-[linear-gradient(135deg,#102826,#0d1f1d)] p-8 shadow-[0_22px_80px_-40px_rgba(0,0,0,0.52)]">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#789b96]">{copy.readyEyebrow}</p>
                  <h2 className="mt-4 text-3xl font-light leading-tight text-[#f5fbfa]">{copy.readyTitle}</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/signup" className="inline-flex items-center gap-2 bg-[#8fb2aa] px-6 py-3.5 text-sm font-semibold text-[#060a10] transition-colors hover:bg-[#d9e3e0]">
                    {copy.readyPrimary} <ArrowRight size={13} />
                  </Link>
                  <Link href="/login" className="inline-flex items-center gap-2 border border-[#28413d] px-5 py-3.5 text-sm font-semibold text-[#d9e3e0] transition-colors hover:border-[#8fb2aa]/40 hover:text-[#f5fbfa]">
                    {copy.readySecondary}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
