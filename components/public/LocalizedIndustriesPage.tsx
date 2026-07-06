import Link from 'next/link'
import { ArrowRight, Building2, CheckCircle2, CircleDollarSign, ClipboardList } from 'lucide-react'
import { PublicFooter } from '@/components/public/PublicFooter'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { getLocalizedHref, industriesPageCopy, type MarketingLocale } from '@/lib/marketing-i18n'

export function LocalizedIndustriesPage({ locale }: { locale: MarketingLocale }) {
  const copy = industriesPageCopy[locale]

  return (
    <div className="min-h-screen bg-[#fbfbfa] text-[#173634]">
      <PublicNavbar />
      <main>
        <section className="bg-[#07100f] px-5 pb-16 pt-[8.5rem] text-[#f5fbfa] sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8fb2aa]">{copy.eyebrow}</p>
              <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.96] tracking-[-0.03em] md:text-7xl">{copy.title}</h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#c7d5d1]">{copy.body}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={getLocalizedHref(locale, '/diagnosis')} className="inline-flex items-center gap-2 bg-[#8fb2aa] px-5 py-3 text-sm font-semibold text-[#06100f] hover:bg-[#d9e3e0]">
                  {copy.primary} <ArrowRight size={14} />
                </Link>
                <Link href={getLocalizedHref(locale, '/roles')} className="inline-flex items-center gap-2 border border-[#28413d] bg-[#0d1917] px-5 py-3 text-sm font-semibold text-[#f5fbfa] hover:bg-[#142522]">
                  {copy.secondary}
                </Link>
              </div>
            </div>
            <div className="grid gap-3">
              {[
                locale === 'es'
                  ? ['Dolor concreto', 'El comprador reconoce el flujo antes de entender el modelo de IA.']
                  : ['Concrete pain', 'The buyer recognizes the workflow before understanding the AI model.'],
                locale === 'es'
                  ? ['ROI operativo', 'Cada caso se expresa en horas, dependencia reducida y continuidad.']
                  : ['Operating ROI', 'Each case is expressed in hours, reduced dependency, and continuity.'],
                locale === 'es'
                  ? ['Gemelos por cargo', 'La oferta baja desde categoria abstracta a puesto replicable.']
                  : ['Twins by role', 'The offer moves from abstract category to replicable work role.'],
              ].map(([title, body]) => (
                <div key={title} className="border border-[#28413d] bg-[#0d1917] p-5">
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-2 text-sm leading-7 text-[#c7d5d1]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="grid gap-4">
            {copy.cases.map((item: any) => (
              <article key={item.industry} className="grid gap-px overflow-hidden border border-[#d8e5e2] bg-[#d8e5e2] lg:grid-cols-[0.9fr_1.1fr]">
                <div className="bg-white p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center bg-[#f1f6f4] text-[#527b73]">
                      <Building2 size={18} />
                    </span>
                    <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#173634]">{item.industry}</h2>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-[#52605d]">{item.pressure}</p>
                  <div className="mt-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#789b96]">{copy.headers.twins}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.twins.map((twin: string) => (
                        <span key={twin} className="inline-flex items-center gap-1.5 bg-[#f1f6f4] px-3 py-1.5 text-xs font-semibold text-[#173634]">
                          <CheckCircle2 size={12} /> {twin}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid gap-px bg-[#d8e5e2] sm:grid-cols-2">
                  <div className="bg-[#fbfbfa] p-6">
                    <CircleDollarSign size={19} className="text-[#527b73]" />
                    <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#789b96]">{copy.headers.roi}</p>
                    <p className="mt-3 text-sm leading-7 text-[#52605d]">{item.roi}</p>
                  </div>
                  <div className="bg-[#fbfbfa] p-6">
                    <ClipboardList size={19} className="text-[#527b73]" />
                    <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#789b96]">{copy.headers.firstMove}</p>
                    <p className="mt-3 text-sm leading-7 text-[#52605d]">{item.firstMove}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  )
}
