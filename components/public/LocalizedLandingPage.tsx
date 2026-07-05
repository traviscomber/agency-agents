import Link from 'next/link'
import { getFeaturedAgents } from '@/lib/data/seed-agents'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { PlanBadge } from '@/components/shared/PlanBadge'
import { FadeInUp } from '@/components/animations/FadeInUp'
import { ArrowRight, Bookmark, Radar, ShieldCheck, Workflow, Layers3, CircleAlert, Sparkles } from 'lucide-react'
import { landingCopy, type MarketingLocale } from '@/lib/marketing-i18n'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { H1Hero, H2Section, H3, Eyebrow, Body, HeadingWithEyebrow } from '@/components/shared/Typography'
import { Button } from '@/components/shared/ButtonStyled'
import { Card } from '@/components/shared/CardStyled'
import { Badge, BadgeEyebrow } from '@/components/shared/BadgeStyled'

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
                  <Badge variant="dark" size="md">
                    <span className="h-1.5 w-1.5 bg-[#8fb2aa] rounded-full mr-2 inline-block" />
                    {copy.badge}
                  </Badge>
                </FadeInUp>

                <FadeInUp delay={0.08}>
                  <H1Hero className="mt-7 max-w-5xl">
                    {copy.heroTitle}
                  </H1Hero>
                </FadeInUp>

                <FadeInUp delay={0.14}>
                  <Body variant="dark" className="mt-7 max-w-2xl !text-[#c7d5d1]">
                    {copy.heroBody}
                  </Body>
                </FadeInUp>

                <FadeInUp delay={0.2}>
                  <div className="mt-9 flex flex-wrap gap-4">
                    <Link href="/signup">
                      <Button variant="primary" size="lg" className="inline-flex items-center gap-2">
                        {copy.heroPrimary} <ArrowRight size={14} />
                      </Button>
                    </Link>
                    <Link href="/app">
                      <Button variant="secondary" size="lg" className="inline-flex items-center gap-2">
                        {copy.heroSecondary} <ArrowRight size={14} />
                      </Button>
                    </Link>
                  </div>
                </FadeInUp>

                <FadeInUp delay={0.26}>
                  <div className="mt-10 grid gap-3 sm:grid-cols-3">
                    {copy.heroSignals.map(([title, body]) => (
                      <Card key={title} variant="dark" className="p-4">
                        <Badge.Eyebrow>{title}</Badge.Eyebrow>
                        <p className="mt-2 text-sm text-[#d9e3e0]">{body}</p>
                      </Card>
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
                          className="border border-[#789b96] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d9e3e0]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <span className="border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
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
                <Eyebrow>{copy.loopEyebrow}</Eyebrow>
                <H2Section className="mt-3 text-[#173634]">{copy.loopTitle}</H2Section>
                <Body variant="light" className="mt-4">
                  {copy.loopBody}
                </Body>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                {copy.sequence.map(([step, title, desc]) => (
                  <Card key={step} variant="light" className="p-5">
                    <Badge.Eyebrow>{step}</Badge.Eyebrow>
                    <H3 className="mt-4 text-[#173634]">{title}</H3>
                    <p className="mt-3 text-sm leading-6 text-[#52605d]">{desc}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#fbfbfa]">
          <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <Eyebrow>{copy.winsEyebrow}</Eyebrow>
                <H2Section className="mt-3 text-[#173634]">{copy.winsTitle}</H2Section>
              </div>

              <div className="grid gap-4">
                {copy.proofStack.map(([label, title, body]) => (
                  <Card key={label} variant="light" className="p-5">
                    <Badge.Eyebrow>{label}</Badge.Eyebrow>
                    <p className="mt-3 text-lg font-semibold text-[#173634]">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-[#52605d]">{body}</p>
                  </Card>
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
                  <Card key={title} variant="light" className="p-6">
                    <div className="flex h-11 w-11 items-center justify-center bg-[#173634] text-[#d9e3e0]">
                      <Icon size={18} />
                    </div>
                    <p className="mt-4 text-lg font-semibold text-[#173634]">{title}</p>
                    <p className="mt-2 text-sm leading-7 text-[#52605d]">{desc}</p>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-[#d8e5e2] bg-[#fbfbfa]">
          <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 sm:py-20">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Eyebrow>{copy.featuredEyebrow}</Eyebrow>
                <H2Section className="mt-3 text-[#173634]">{copy.featuredTitle}</H2Section>
              </div>
              <Link href="/agents" className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#173634] hover:text-[#8fb2aa]">
                {copy.featuredCta} <ArrowRight size={12} />
              </Link>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {featuredAgents.map((agent) => (
                <Card key={agent.id} variant="light" className="p-5">
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
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#060a10] text-[#f5fbfa]">
          <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 sm:py-20">
            <Card variant="dark" className="p-8 sm:p-10 border-white/10">
              <Eyebrow>{copy.workspaceEyebrow}</Eyebrow>
              <H2Section className="mt-4 max-w-4xl text-white">{copy.workspaceTitle}</H2Section>
              <Body variant="dark" className="mt-4 max-w-2xl !text-[#c7d5d1]">
                {copy.workspaceBody}
              </Body>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/signup">
                  <Button variant="primary" size="lg" className="inline-flex items-center gap-2">
                    {copy.workspacePrimary} <ArrowRight size={14} />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="secondary" size="lg" className="inline-flex items-center gap-2">
                    {copy.workspaceSecondary} <ArrowRight size={14} />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
