import Link from 'next/link'
import { ArrowRight, CheckCircle2, CircleDollarSign, ClipboardList, ShieldCheck } from 'lucide-react'
import { PublicFooter } from '@/components/public/PublicFooter'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { ConversionPath } from '@/components/public/ConversionPath'
import { getLocalizedHref, type MarketingLocale } from '@/lib/marketing-i18n'

const demoScenarios = {
  es: [
    {
      title: 'Ejecutivo Comercial B2B Chile',
      company: 'services',
      pressure: 'sales',
      pain: 'Seguimiento comercial inconsistente, reuniones sin recap reutilizable y pipeline que depende demasiado de memoria humana.',
      routine: 'El gemelo revisa cuentas activas, arma follow-up, resume conversaciones, propone siguiente accion y deja memoria por oportunidad.',
      output: 'Recap comercial, objeciones, prioridad de cuenta, propuesta inicial y siguiente accion.',
      supervision: 'Media',
      roi: '35 a 55 horas/mes recuperables',
      data: ['CRM o planilla de pipeline', 'ICP y criterios de calificacion', 'Pricing y objeciones frecuentes', 'Ultimas conversaciones comerciales'],
    },
    {
      title: 'Cobranza Pyme Chile',
      company: 'logistics',
      pressure: 'collections',
      pain: 'Cuentas vencidas sin priorizacion, mensajes repetidos manualmente y poca trazabilidad de promesas de pago.',
      routine: 'El gemelo clasifica deuda, prepara mensajes, detecta cuentas criticas y escala excepciones al responsable humano.',
      output: 'Lista priorizada de cobranza, mensajes sugeridos, promesas de pago y handoff de excepciones.',
      supervision: 'Media',
      roi: '30 a 50 horas/mes recuperables',
      data: ['Aging de deuda', 'Politicas de cobranza', 'Historial de contacto', 'Reglas de escalamiento'],
    },
    {
      title: 'Analista de Licitaciones Chile',
      company: 'industrial',
      pressure: 'tenders',
      pain: 'Bases largas, deadlines dispersos, requisitos documentales y riesgos que se detectan tarde.',
      routine: 'El gemelo lee bases, arma go/no-go, extrae requisitos, levanta riesgos y prepara checklist de respuesta.',
      output: 'Matriz go/no-go, checklist documental, riesgos, deadlines y plan de respuesta.',
      supervision: 'Alta',
      roi: '25 a 45 horas/mes recuperables',
      data: ['Bases de licitacion', 'Criterios de adjudicacion', 'Capacidades de la empresa', 'Deadlines y documentos disponibles'],
    },
  ],
  en: [
    {
      title: 'B2B Sales Executive Twin Chile',
      company: 'services',
      pressure: 'sales',
      pain: 'Inconsistent commercial follow-up, meetings without reusable recap, and pipeline depending too much on human memory.',
      routine: 'The twin reviews active accounts, drafts follow-up, summarizes conversations, proposes next action, and leaves account memory.',
      output: 'Commercial recap, objections, account priority, initial proposal, and next action.',
      supervision: 'Medium',
      roi: '35 to 55 recoverable hours/month',
      data: ['CRM or pipeline sheet', 'ICP and qualification criteria', 'Pricing and frequent objections', 'Recent commercial conversations'],
    },
    {
      title: 'SME Collections Twin Chile',
      company: 'logistics',
      pressure: 'collections',
      pain: 'Overdue accounts without prioritization, repeated manual messages, and weak traceability of payment promises.',
      routine: 'The twin classifies debt, prepares messages, detects critical accounts, and escalates exceptions to a human owner.',
      output: 'Prioritized collection list, suggested messages, payment promises, and exception handoff.',
      supervision: 'Medium',
      roi: '30 to 50 recoverable hours/month',
      data: ['Debt aging', 'Collection policies', 'Contact history', 'Escalation rules'],
    },
    {
      title: 'Tender Analyst Twin Chile',
      company: 'industrial',
      pressure: 'tenders',
      pain: 'Long bid documents, scattered deadlines, document requirements, and risks detected too late.',
      routine: 'The twin reads bid docs, creates go/no-go, extracts requirements, surfaces risks, and prepares the response checklist.',
      output: 'Go/no-go matrix, document checklist, risks, deadlines, and response plan.',
      supervision: 'High',
      roi: '25 to 45 recoverable hours/month',
      data: ['Bid documents', 'Award criteria', 'Company capabilities', 'Deadlines and available documents'],
    },
  ],
}

export function LocalizedDemoPage({ locale }: { locale: MarketingLocale }) {
  const copy = {
    es: {
      eyebrow: 'Demo comercial',
      title: 'Tres demos para vender gemelos digitales por cargo en Chile.',
      body: 'Cada recorrido muestra el dolor, los datos necesarios, la rutina del gemelo, el entregable esperado, el nivel de supervision y el ROI operativo antes de crear el programa.',
      primary: 'Diagnosticar mi primer gemelo',
      secondary: 'Ver planes',
      data: 'Datos requeridos',
      pain: 'Dolor operativo',
      routine: 'Rutina del gemelo',
      output: 'Entregable esperado',
      supervision: 'Supervision',
      roi: 'ROI operativo',
      cta: 'Crear diagnostico contextual',
    },
    en: {
      eyebrow: 'Commercial demo',
      title: 'Three demos for selling role-based digital twins in Chile.',
      body: 'Each walkthrough shows the pain, required data, twin routine, expected deliverable, supervision level, and operating ROI before creating the program.',
      primary: 'Diagnose my first twin',
      secondary: 'View pricing',
      data: 'Required data',
      pain: 'Operating pain',
      routine: 'Twin routine',
      output: 'Expected deliverable',
      supervision: 'Supervision',
      roi: 'Operating ROI',
      cta: 'Create contextual diagnosis',
    },
  }[locale]

  return (
    <div className="min-h-screen bg-[#fbfbfa] text-[#173634]">
      <PublicNavbar />
      <main>
        <section className="bg-[#07100f] px-5 pb-16 pt-[8.5rem] text-[#f5fbfa] sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8fb2aa]">{copy.eyebrow}</p>
              <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.96] tracking-[-0.03em] md:text-7xl">{copy.title}</h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#c7d5d1]">{copy.body}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={getLocalizedHref(locale, '/diagnosis')} className="inline-flex items-center gap-2 bg-[#8fb2aa] px-5 py-3 text-sm font-semibold text-[#06100f] hover:bg-[#d9e3e0]">
                  {copy.primary} <ArrowRight size={14} />
                </Link>
                <Link href={getLocalizedHref(locale, '/pricing')} className="inline-flex items-center gap-2 border border-[#28413d] bg-[#0d1917] px-5 py-3 text-sm font-semibold text-[#f5fbfa] hover:bg-[#142522]">
                  {copy.secondary}
                </Link>
                <Link href={getLocalizedHref(locale, '/playbooks')} className="inline-flex items-center gap-2 border border-[#28413d] bg-[#0d1917] px-5 py-3 text-sm font-semibold text-[#f5fbfa] hover:bg-[#142522]">
                  {locale === 'es' ? 'Ver playbooks' : 'View playbooks'}
                </Link>
              </div>
            </div>
            <ConversionPath locale={locale} active="context" variant="dark" />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="grid gap-5">
            {demoScenarios[locale].map((demo, index) => (
              <article key={demo.title} className="overflow-hidden border border-[#d8e5e2] bg-[#d8e5e2]">
                <div className="grid gap-px lg:grid-cols-[0.82fr_1.18fr]">
                  <div className="bg-white p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#789b96]">
                      {locale === 'es' ? `Recorrido ${index + 1}` : `Walkthrough ${index + 1}`}
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#173634]">{demo.title}</h2>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {[
                        [copy.supervision, demo.supervision, ShieldCheck],
                        [copy.roi, demo.roi, CircleDollarSign],
                      ].map(([label, value, Icon]) => (
                        <div key={label as string} className="border border-[#d8e5e2] bg-[#f8fbfa] p-4">
                          <Icon size={16} className="text-[#527b73]" />
                          <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#789b96]">{label as string}</p>
                          <p className="mt-1 text-sm font-semibold text-[#173634]">{value as string}</p>
                        </div>
                      ))}
                    </div>
                    <Link href={`${getLocalizedHref(locale, '/diagnosis')}?company=${demo.company}&pressure=${demo.pressure}`} className="mt-6 inline-flex items-center gap-2 bg-[#173634] px-5 py-3 text-sm font-semibold text-white hover:bg-[#244944]">
                      {copy.cta} <ArrowRight size={14} />
                    </Link>
                  </div>
                  <div className="grid gap-px bg-[#d8e5e2] sm:grid-cols-2">
                    {[
                      [copy.pain, demo.pain, ClipboardList],
                      [copy.routine, demo.routine, CheckCircle2],
                      [copy.output, demo.output, ArrowRight],
                    ].map(([label, value, Icon]) => (
                      <div key={label as string} className="bg-[#fbfbfa] p-5">
                        <Icon size={17} className="text-[#527b73]" />
                        <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#789b96]">{label as string}</p>
                        <p className="mt-2 text-sm leading-7 text-[#52605d]">{value as string}</p>
                      </div>
                    ))}
                    <div className="bg-[#f1f6f4] p-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#789b96]">{copy.data}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {demo.data.map((item) => (
                          <span key={item} className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 text-xs font-semibold text-[#173634]">
                            <CheckCircle2 size={12} /> {item}
                          </span>
                        ))}
                      </div>
                    </div>
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
