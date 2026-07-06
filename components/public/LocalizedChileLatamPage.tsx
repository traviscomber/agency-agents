import Link from 'next/link'
import { ArrowRight, BarChart3, BriefcaseBusiness, CheckCircle2, ShieldCheck } from 'lucide-react'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { PublicFooter } from '@/components/public/PublicFooter'
import { chileLatamPageCopy, getLocalizedHref, type MarketingLocale } from '@/lib/marketing-i18n'

const proofIcons = [BriefcaseBusiness, BarChart3, ShieldCheck]

export function LocalizedChileLatamPage({ locale }: { locale: MarketingLocale }) {
  const copy = chileLatamPageCopy[locale]

  return (
    <div className="min-h-screen bg-[#fbfbfa] text-[#173634]">
      <PublicNavbar />
      <main>
        <section className="relative overflow-hidden bg-[#07100f] px-5 pb-20 pt-[8.5rem] text-[#f5fbfa] sm:px-8">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(143,178,170,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(143,178,170,0.05)_1px,transparent_1px)] bg-[length:76px_76px]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8fb2aa]">{copy.eyebrow}</p>
              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.03em] md:text-7xl">
                {copy.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#c7d5d1]">{copy.body}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={getLocalizedHref(locale, '/diagnosis')} className="inline-flex items-center gap-2 bg-[#8fb2aa] px-5 py-3 text-sm font-semibold text-[#06100f] hover:bg-[#d9e3e0]">
                  {locale === 'es' ? 'Hacer diagnostico' : 'Run diagnosis'} <ArrowRight size={14} />
                </Link>
                <Link href={getLocalizedHref(locale, '/roles')} className="inline-flex items-center gap-2 border border-[#28413d] bg-[#0d1917] px-5 py-3 text-sm font-semibold text-[#f5fbfa] hover:bg-[#142522]">
                  {copy.secondary}
                </Link>
                <Link href={getLocalizedHref(locale, '/industries')} className="inline-flex items-center gap-2 border border-[#28413d] bg-[#0d1917] px-5 py-3 text-sm font-semibold text-[#f5fbfa] hover:bg-[#142522]">
                  {locale === 'es' ? 'Ver industrias' : 'View industries'}
                </Link>
              </div>
            </div>

            <div className="grid gap-3">
              {copy.proof.map(([title, body], index) => {
                const Icon = proofIcons[index]
                return (
                  <div key={title} className="border border-[#28413d] bg-[#0d1917] p-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center bg-[#142522] text-[#8fb2aa]">
                        <Icon size={18} />
                      </span>
                      <h2 className="text-base font-semibold text-white">{title}</h2>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-[#c7d5d1]">{body}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#789b96]">Market fit</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-[#173634] md:text-5xl">
                {copy.industriesTitle}
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {copy.industries.map(([title, body]) => (
                <article key={title} className="border border-[#d8e5e2] bg-white p-5">
                  <CheckCircle2 size={18} className="text-[#527b73]" />
                  <h3 className="mt-4 text-base font-semibold text-[#173634]">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#65706d]">{body}</p>
                </article>
              ))}
            </div>
            <Link href={getLocalizedHref(locale, '/industries')} className="inline-flex items-center gap-2 self-start border border-[#d8e5e2] bg-white px-5 py-3 text-sm font-semibold text-[#173634] hover:bg-[#f1f6f4]">
              {locale === 'es' ? 'Abrir casos por industria' : 'Open industry cases'} <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        <section className="border-y border-[#d8e5e2] bg-[#f1f6f4]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
            <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.02em] text-[#173634] md:text-5xl">
              {copy.operatingModelTitle}
            </h2>
            <div className="mt-8 grid gap-3 md:grid-cols-4">
              {copy.operatingModel.map(([title, body]) => (
                <article key={title} className="border border-[#d8e5e2] bg-[#fbfbfa] p-5">
                  <h3 className="text-sm font-semibold text-[#173634]">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#65706d]">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="grid gap-8 border border-[#d8e5e2] bg-white p-6 lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#789b96]">
                {locale === 'es' ? 'Arquitectura del producto' : 'Product architecture'}
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-[#173634] md:text-5xl">
                {locale === 'es'
                  ? 'Un gemelo operativo combina datos, habilidad y memoria del rol.'
                  : 'An operating twin combines data, skill, and role memory.'}
              </h2>
            </div>
            <div className="grid gap-3">
              {[
                locale === 'es'
                  ? ['Connectors', 'Gmail, Drive, Sheets, CRM, ERP, documentos, correos, licitaciones y facturas.']
                  : ['Connectors', 'Gmail, Drive, Sheets, CRM, ERP, documents, emails, tenders, and invoices.'],
                locale === 'es'
                  ? ['Skills', 'Cobranza, licitacion, seguimiento comercial, propuestas, implementacion y reclutamiento.']
                  : ['Skills', 'Collections, tenders, sales follow-up, proposals, implementation, and recruiting.'],
                locale === 'es'
                  ? ['Memoria del rol', 'Criterios, limites, handoffs, entregables y estado recuperable por cuenta o programa.']
                  : ['Role memory', 'Criteria, limits, handoffs, deliverables, and recoverable state by account or program.'],
              ].map(([title, body]) => (
                <article key={title} className="border border-[#d8e5e2] bg-[#f8fbfa] p-5">
                  <h3 className="text-sm font-semibold text-[#173634]">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#65706d]">{body}</p>
                </article>
              ))}
              <div className="bg-[#173634] p-5 text-sm font-semibold text-white">
                {locale === 'es'
                  ? 'Connector + Skill + Memoria del rol = Gemelo operativo'
                  : 'Connector + Skill + Role memory = Operating twin'}
              </div>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  )
}
