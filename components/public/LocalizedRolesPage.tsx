import Link from 'next/link'
import { ArrowRight, Gauge, ShieldCheck } from 'lucide-react'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { PublicFooter } from '@/components/public/PublicFooter'
import { getLocalizedHref, rolesPageCopy, type MarketingLocale } from '@/lib/marketing-i18n'

export function LocalizedRolesPage({ locale }: { locale: MarketingLocale }) {
  const copy = rolesPageCopy[locale]

  return (
    <div className="min-h-screen bg-[#fbfbfa] text-[#173634]">
      <PublicNavbar />
      <main>
        <section className="bg-[#07100f] px-5 pb-16 pt-[8.5rem] text-[#f5fbfa] sm:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8fb2aa]">{copy.eyebrow}</p>
            <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
              <div>
                <h1 className="max-w-4xl text-5xl font-semibold leading-[0.96] tracking-[-0.03em] md:text-7xl">{copy.title}</h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-[#c7d5d1]">{copy.body}</p>
              </div>
              <div className="border border-[#28413d] bg-[#0d1917] p-5">
                <Gauge className="text-[#8fb2aa]" size={22} />
                <p className="mt-4 text-sm leading-7 text-[#c7d5d1]">
                  {locale === 'es'
                    ? 'Cada rol se evalua por alcance de reemplazo, nivel de supervision y horas recuperables antes de crear el gemelo digital.'
                    : 'Each role is evaluated by replacement scope, supervision level, and recoverable hours before creating the digital twin.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="overflow-hidden border border-[#d8e5e2] bg-white">
            <div className="grid grid-cols-1 border-b border-[#d8e5e2] bg-[#f1f6f4] text-[10px] font-semibold uppercase tracking-[0.22em] text-[#789b96] md:grid-cols-[0.9fr_1.4fr_0.55fr_0.7fr]">
              {copy.tableHeaders.map((header) => (
                <div key={header} className="border-b border-[#d8e5e2] p-4 md:border-b-0 md:border-r last:md:border-r-0">
                  {header}
                </div>
              ))}
            </div>
            {copy.roles.map(([role, scope, supervision, savings]) => (
              <article key={role} className="grid grid-cols-1 border-b border-[#e5eeee] last:border-b-0 md:grid-cols-[0.9fr_1.4fr_0.55fr_0.7fr]">
                <div className="p-4 text-sm font-semibold text-[#173634]">{role}</div>
                <div className="p-4 text-sm leading-7 text-[#65706d]">{scope}</div>
                <div className="p-4">
                  <span className="inline-flex items-center gap-2 bg-[#f1f6f4] px-3 py-1.5 text-xs font-semibold text-[#173634]">
                    <ShieldCheck size={13} /> {supervision}
                  </span>
                </div>
                <div className="p-4 text-sm font-semibold text-[#173634]">{savings}</div>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={getLocalizedHref(locale, '/signup')} className="inline-flex items-center gap-2 bg-[#173634] px-5 py-3 text-sm font-semibold text-white hover:bg-[#244944]">
              {copy.cta} <ArrowRight size={14} />
            </Link>
            <Link href={getLocalizedHref(locale, '/agents')} className="inline-flex items-center gap-2 border border-[#d8e5e2] bg-white px-5 py-3 text-sm font-semibold text-[#173634] hover:bg-[#f1f6f4]">
              Twins
            </Link>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  )
}
