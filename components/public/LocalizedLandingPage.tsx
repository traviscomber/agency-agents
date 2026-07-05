import Link from 'next/link'
import { getFeaturedAgents } from '@/lib/data/seed-agents'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { PlanBadge } from '@/components/shared/PlanBadge'
import { FadeInUp } from '@/components/animations/FadeInUp'
import { ArrowRight, Bookmark, Radar, ShieldCheck, Workflow, Layers3, CircleAlert, Sparkles } from 'lucide-react'
import { landingCopy, type MarketingLocale } from '@/lib/marketing-i18n'
import { PublicNavbar } from '@/components/public/PublicNavbar'

const DIFFERENTIATOR_ICONS = [Workflow, Bookmark, Radar, ShieldCheck]
const CASE_ICONS = [Layers3, CircleAlert, Sparkles]

export function LocalizedLandingPage({ locale }: { locale: MarketingLocale }) {
  const copy = landingCopy[locale]
  const featuredAgents = getFeaturedAgents().slice(0, 6)

  return (
    <div className="min-h-screen bg-[#fbfbfa]">
      <PublicNavbar />
      <main>
        <section className="relative overflow-hidden bg-[#060a10] text-[#f5fbfa]">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(143,178,170,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(143,178,170,0.04) 1px, transparent 1px)',
              backgroundSize: '72px 72px',
            }}
          />
          <div
            className="pointer-events-none absolute left-0 top-0 h-[760px] w-[760px] -translate-x-1/3 -translate-y-1/3"
            style={{ background: 'radial-gradient(circle, rgba(143,178,170,0.14) 0%, transparent 62%)' }}
          />
          <div
            className="pointer-events-none absolute bottom-0 right-0 h-[640px] w-[640px] translate-x-1/4 translate-y-1/4"
            style={{ background: 'radial-gradient(circle, rgba(120,155,150,0.12) 0%, transparent 58%)' }}
          />

          <div className="mx-auto max-w-7xl px-5 pb-24 pt-[8.5rem] sm:px-8 lg:pb-28">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div>
                <FadeInUp>
                  <div className="inline-flex items-center gap-2.5 border border-[#1e3431] bg-[#0d1f1d] px-3.5 py-1.5">
                    <span className="h-1.5 w-1.5 bg-[#8fb2aa]" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#789b96]">
                      {copy.badge}
                    </span>
                  </div>
                </FadeInUp>

                <FadeInUp delay={0.08}>
                  <h1 className="mt-7 max-w-5xl text-5xl font-semibold leading-[0.94] tracking-[-0.04em] text-[#f5fbfa] md:text-7xl lg:text-[5.35rem]">
                    {copy.heroTitle}
                  </h1>
                </FadeInUp>

                <FadeInUp delay={0.14}>
                  <p className="mt-7 max-w-2xl text-base leading-8 text-[#c7d5d1]">{copy.heroBody}</p>
                </FadeInUp>

                <FadeInUp delay={0.2}>
                  <div className="mt-9 flex flex-wrap gap-3">
                    <Link
                      href="/signup"
                      className="inline-flex h-11 items-center gap-2 border border-[#8fb2aa] bg-[#8fb2aa] px-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#173634] transition hover:bg-[#dce8e4]"
                    >
                      {copy.heroPrimary} <ArrowRight size={12} />
                    </Link>
                    <Link
                      href="/app"
                      className="inline-flex h-11 items-center gap-2 border border-[#789b96] px-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f5fbfa] transition hover:bg-white/8"
                    >
                      {copy.heroSecondary} <ArrowRight size={12} />
                    </Link>
                  </div>
                </FadeInUp>

                <FadeInUp delay={0.26}>
                  <div className="mt-10 grid gap-3 sm:grid-cols-3">
                    {copy.heroSignals.map(([title, body]) => (
                      <div key={title} className="border border-[#1e3431] bg-[#0d1917] px-4 py-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8fb2aa]">{title}</p>
                        <p className="mt-2 text-sm text-[#d9e3e0]">{body}</p>
                      </div>
                    ))}
                  </div>
                </FadeInUp>
              </div>

              <FadeInUp delay={0.12}>
                <div className="border border-[#1e3431] bg-[#0d1917] p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      {copy.controlSurfaceBadges.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-[#789b96] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d9e3e0]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                      {copy.deployable}
                    </span>
                  </div>

                  <div className="mt-5 border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5">
                    <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10">
                      {copy.controlRows.map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between bg-[#102826] px-4 py-4">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9db7b1]">{label}</p>
                          <p className="max-w-[62%] text-right text-sm font-medium text-white">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 border border-white/10 bg-black/10 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9db7b1]">{copy.whyThisMattersTitle}</p>
                      <p className="mt-3 text-sm leading-7 text-[#d9e3e0]">{copy.whyThisMattersBody}</p>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>
        </section>

        <section className="border-b border-[#d8e5e2] bg-[#fbfbfa]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
            <div className="grid gap-6 lg:grid-cols-4">
              {copy.differentiators.map(([title, desc], index) => {
                const Icon = DIFFERENTIATOR_ICONS[index]
                return (
                  <article key={title} className="n3-panel p-5">
                    <div className="flex h-10 w-10 items-center justify-center2xl border border-[#d8e5e2] bg-[#f1f6f4] text-[#789b96]">
                      <Icon size={16} />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-[#173634]">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-[#52605d]">{desc}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#f5f7f6]">
          <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 sm:py-20">
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="max-w-3xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">{copy.loopEyebrow}</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#173634]">{copy.loopTitle}</h2>
                <p className="mt-4 text-sm leading-7 text-[#52605d]">{copy.loopBody}</p>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                {copy.sequence.map(([step, title, desc]) => (
                  <article key={step} className="n3-panel p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">{step}</p>
                    <h3 className="mt-4 text-lg font-semibold text-[#173634]">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#52605d]">{desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#fbfbfa]">
          <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">{copy.winsEyebrow}</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#173634]">{copy.winsTitle}</h2>
              </div>

              <div className="grid gap-4">
                {copy.proofStack.map(([label, title, body]) => (
                  <article key={label} className="n3-panel p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">{label}</p>
                    <p className="mt-3 text-lg font-semibold text-[#173634]">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-[#52605d]">{body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#d8e5e2] bg-[#f5f7f6]">
          <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 sm:py-20">
            <div className="grid gap-4 lg:grid-cols-3">
              {copy.cases.map(([title, desc], index) => {
                const Icon = CASE_ICONS[index]
                return (
                  <article key={title} className="rounded-[1.7rem] border border-[#d8e5e2] bg-white p-6 shadow-[0_18px_44px_-34px_rgba(15,23,42,0.35)]">
                    <div className="flex h-11 w-11 items-center justify-center2xl bg-[#173634] text-[#d9e3e0]">
                      <Icon size={18} />
                    </div>
                    <p className="mt-4 text-lg font-semibold text-[#173634]">{title}</p>
                    <p className="mt-2 text-sm leading-7 text-[#52605d]">{desc}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-[#d8e5e2] bg-[#fbfbfa]">
          <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 sm:py-20">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">{copy.featuredEyebrow}</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#173634]">{copy.featuredTitle}</h2>
              </div>
              <Link href="/agents" className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#173634]">
                {copy.featuredCta} <ArrowRight size={12} />
              </Link>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {featuredAgents.map((agent) => (
                <article key={agent.id} className="rounded-[1.65rem] border border-[#d8e5e2] bg-white p-5 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.35)]">
                  <div className="flex items-center justify-between gap-3">
                    <DivisionBadge division={agent.division} size="sm" />
                    <PlanBadge plan={agent.planRequired} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[#173634]">{agent.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#52605d]">{agent.shortDescription}</p>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-[#8fb2aa]">{agent.outputFormat[0]}</p>
                  <div className="mt-5">
                    <Link href={`/agents/${agent.slug}`} className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#173634]">
                      Open twin <ArrowRight size={12} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#060a10] text-[#f5fbfa]">
          <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 sm:py-20">
            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,#0d1f1d,#102826)] p-8 shadow-[0_24px_80px_-38px_rgba(0,0,0,0.65)] sm:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">{copy.workspaceEyebrow}</p>
              <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-white">{copy.workspaceTitle}</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#c7d5d1]">{copy.workspaceBody}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/signup"
                  className="inline-flex h-11 items-center gap-2 border border-[#8fb2aa] bg-[#8fb2aa] px-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#173634] transition hover:bg-[#dce8e4]"
                >
                  {copy.workspacePrimary} <ArrowRight size={12} />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex h-11 items-center gap-2 border border-[#789b96] px-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f5fbfa] transition hover:bg-white/8"
                >
                  {copy.workspaceSecondary} <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
