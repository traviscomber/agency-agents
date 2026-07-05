import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Mail, MessageCircle, Phone, ShieldCheck, Workflow, Shield } from 'lucide-react'
import { contactPageCopy, getLocalizedHref, type MarketingLocale } from '@/lib/marketing-i18n'
import { PublicNavbar } from '@/components/public/PublicNavbar'

const CONTACT_ICONS = [Mail, MessageCircle, Phone]
const SIGNAL_ICONS = [Workflow, Shield]

export function LocalizedContactPage({ locale }: { locale: MarketingLocale }) {
  const copy = contactPageCopy[locale]

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_30%),linear-gradient(to_bottom,_#f8fafc,_#ffffff_22%,_#f8fafc_100%)]">
      <PublicNavbar />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#ffffff_54%,#f8fafc_100%)] shadow-[0_18px_60px_-44px_rgba(15,23,42,0.45)]">
          <div className="grid gap-8 p-6 lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-700">
                <ShieldCheck size={12} className="text-primary" />
                {copy.badge}
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">{copy.title}</h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-700 sm:text-base">{copy.body}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="mailto:hello@n3uralia.com">
                    {copy.primary} <ArrowRight size={12} className="ml-1" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={getLocalizedHref(locale, '/pricing')}>{copy.secondary}</Link>
                </Button>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {copy.signals.map(([title, body], index) => {
                  const Icon = SIGNAL_ICONS[index]
                  return (
                    <div key={title} className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-800">
                          <Icon size={15} />
                        </div>
                        <p className="text-sm font-semibold text-foreground">{title}</p>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-slate-700">{body}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="space-y-3">
              {copy.channels.map(([title, detail, body, href, cta], index) => {
                const Icon = CONTACT_ICONS[index]
                return (
                  <div key={title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
                        <Icon size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-foreground">{title}</p>
                        <p className="mt-1 text-sm text-slate-700">{detail}</p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-700">{body}</p>
                        <div className="mt-4">
                          <Button variant="outline" size="sm" asChild>
                            <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}>
                              {cta}
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-4">
          {copy.gridSignals.map(([title, body]) => (
            <div key={title} className="rounded-[1.35rem] border border-slate-200 bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.35)]">
              <p className="text-sm font-semibold text-foreground">{title}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{body}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.35)] sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">{copy.diagnosisEyebrow}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-foreground">{copy.diagnosisTitle}</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">{copy.diagnosisBody}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {copy.diagnosisItems.map((item: string) => (
                <div key={item} className="rounded-[1.15rem] border border-slate-200 bg-gradient-to-b from-slate-50 to-white px-4 py-3 text-sm text-slate-700">
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
