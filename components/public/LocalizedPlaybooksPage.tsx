import Link from 'next/link'
import { ArrowRight, CheckCircle2, ClipboardList, Gauge, ShieldCheck, Workflow } from 'lucide-react'
import { PublicFooter } from '@/components/public/PublicFooter'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { ConversionPath } from '@/components/public/ConversionPath'
import { getLocalizedHref, type MarketingLocale } from '@/lib/marketing-i18n'

const playbooks = {
  es: [
    {
      title: 'Playbook Comercial B2B Chile',
      twin: 'Ejecutivo Comercial B2B Chile',
      company: 'services',
      pressure: 'sales',
      supervision: 'Media',
      replacement: '72% a 82%',
      data: ['CRM o pipeline', 'ICP', 'Pricing', 'Objeciones', 'Conversaciones recientes'],
      phases: ['Diagnosticar pipeline y cuentas activas', 'Ejecutar follow-up por prioridad', 'Guardar recap y siguiente accion', 'Escalar negociaciones sensibles'],
      outputs: ['Recap de cuenta', 'Email de follow-up', 'Propuesta inicial', 'Memoria comercial por oportunidad'],
    },
    {
      title: 'Playbook Cobranza Pyme Chile',
      twin: 'Cobranza Pyme Chile',
      company: 'logistics',
      pressure: 'collections',
      supervision: 'Media',
      replacement: '70% a 80%',
      data: ['Aging de deuda', 'Politicas de cobranza', 'Historial de contacto', 'Reglas de escalamiento'],
      phases: ['Clasificar cuentas por riesgo', 'Preparar mensajes por tramo', 'Registrar promesas de pago', 'Escalar excepciones al humano'],
      outputs: ['Lista priorizada', 'Mensajes sugeridos', 'Handoff de excepciones', 'Reporte semanal de cobranza'],
    },
    {
      title: 'Playbook Licitaciones Chile',
      twin: 'Analista de Licitaciones Chile',
      company: 'industrial',
      pressure: 'tenders',
      supervision: 'Alta',
      replacement: '65% a 76%',
      data: ['Bases', 'Criterios de adjudicacion', 'Documentos disponibles', 'Capacidades de empresa'],
      phases: ['Leer bases y plazos', 'Armar go/no-go', 'Extraer requisitos y riesgos', 'Preparar checklist de respuesta'],
      outputs: ['Matriz go/no-go', 'Checklist documental', 'Mapa de riesgos', 'Plan de respuesta'],
    },
    {
      title: 'Playbook Implementacion Chile',
      twin: 'PM de Implementacion Chile',
      company: 'construction',
      pressure: 'implementation',
      supervision: 'Media',
      replacement: '74% a 84%',
      data: ['Plan de proyecto', 'Stakeholders', 'Hitos', 'Bloqueos', 'Compromisos pendientes'],
      phases: ['Mapear estado real del proyecto', 'Ordenar bloqueos por impacto', 'Preparar minuta y responsables', 'Actualizar siguiente hito'],
      outputs: ['Minuta ejecutiva', 'Lista de bloqueos', 'Handoff semanal', 'Plan de proximas acciones'],
    },
    {
      title: 'Playbook Reclutamiento Operativo Chile',
      twin: 'Reclutador Operativo Chile',
      company: 'services',
      pressure: 'recruiting',
      supervision: 'Alta',
      replacement: '62% a 74%',
      data: ['Perfil del cargo', 'CVs', 'Criterios de filtro', 'Etapas del proceso'],
      phases: ['Traducir cargo a filtros', 'Screening inicial', 'Preparar shortlist', 'Escalar candidatos sensibles'],
      outputs: ['Pauta de screening', 'Shortlist', 'Resumen por candidato', 'Reporte de avance'],
    },
  ],
  en: [
    {
      title: 'B2B Sales Playbook Chile',
      twin: 'B2B Sales Executive Twin Chile',
      company: 'services',
      pressure: 'sales',
      supervision: 'Medium',
      replacement: '72% to 82%',
      data: ['CRM or pipeline', 'ICP', 'Pricing', 'Objections', 'Recent conversations'],
      phases: ['Diagnose pipeline and active accounts', 'Run priority follow-up', 'Save recap and next action', 'Escalate sensitive negotiations'],
      outputs: ['Account recap', 'Follow-up email', 'Initial proposal', 'Commercial memory by opportunity'],
    },
    {
      title: 'SME Collections Playbook Chile',
      twin: 'SME Collections Twin Chile',
      company: 'logistics',
      pressure: 'collections',
      supervision: 'Medium',
      replacement: '70% to 80%',
      data: ['Debt aging', 'Collection policies', 'Contact history', 'Escalation rules'],
      phases: ['Classify accounts by risk', 'Prepare messages by segment', 'Record payment promises', 'Escalate exceptions to humans'],
      outputs: ['Prioritized list', 'Suggested messages', 'Exception handoff', 'Weekly collection report'],
    },
    {
      title: 'Tender Playbook Chile',
      twin: 'Tender Analyst Twin Chile',
      company: 'industrial',
      pressure: 'tenders',
      supervision: 'High',
      replacement: '65% to 76%',
      data: ['Bid documents', 'Award criteria', 'Available documents', 'Company capabilities'],
      phases: ['Read docs and deadlines', 'Create go/no-go', 'Extract requirements and risks', 'Prepare response checklist'],
      outputs: ['Go/no-go matrix', 'Document checklist', 'Risk map', 'Response plan'],
    },
    {
      title: 'Implementation Playbook Chile',
      twin: 'Implementation PM Twin Chile',
      company: 'construction',
      pressure: 'implementation',
      supervision: 'Medium',
      replacement: '74% to 84%',
      data: ['Project plan', 'Stakeholders', 'Milestones', 'Blockers', 'Pending commitments'],
      phases: ['Map real project state', 'Rank blockers by impact', 'Prepare minutes and owners', 'Update next milestone'],
      outputs: ['Executive minutes', 'Blocker list', 'Weekly handoff', 'Next action plan'],
    },
    {
      title: 'Operations Recruiting Playbook Chile',
      twin: 'Operations Recruiter Twin Chile',
      company: 'services',
      pressure: 'recruiting',
      supervision: 'High',
      replacement: '62% to 74%',
      data: ['Role profile', 'CVs', 'Screening criteria', 'Process stages'],
      phases: ['Translate role into filters', 'Initial screening', 'Prepare shortlist', 'Escalate sensitive candidates'],
      outputs: ['Screening guide', 'Shortlist', 'Candidate summary', 'Progress report'],
    },
  ],
}

export function LocalizedPlaybooksPage({ locale }: { locale: MarketingLocale }) {
  const copy = {
    es: {
      eyebrow: 'Playbooks operativos',
      title: 'Como se despliega un gemelo digital por cargo, paso a paso.',
      body: 'Estos playbooks convierten la promesa comercial en operacion: datos requeridos, rutina semanal, supervision humana, outputs y replacement por rol.',
      primary: 'Diagnosticar primer cargo',
      secondary: 'Ver demo',
      data: 'Datos requeridos',
      phases: 'Rutina de despliegue',
      outputs: 'Outputs reutilizables',
      supervision: 'Supervision',
      replacement: 'Replacement',
      cta: 'Crear diagnostico desde este playbook',
    },
    en: {
      eyebrow: 'Operating playbooks',
      title: 'How a role-based digital twin is deployed, step by step.',
      body: 'These playbooks turn the commercial promise into operations: required data, weekly routine, human supervision, outputs, and replacement by role.',
      primary: 'Diagnose first role',
      secondary: 'View demo',
      data: 'Required data',
      phases: 'Deployment routine',
      outputs: 'Reusable outputs',
      supervision: 'Supervision',
      replacement: 'Replacement',
      cta: 'Create diagnosis from this playbook',
    },
  }[locale]

  return (
    <div className="min-h-screen bg-[#fbfbfa] text-[#173634]">
      <PublicNavbar />
      <main>
        <section className="bg-[#07100f] px-5 pb-16 pt-[8.5rem] text-[#f5fbfa] sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8fb2aa]">{copy.eyebrow}</p>
              <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.96] tracking-[-0.03em] md:text-7xl">{copy.title}</h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#c7d5d1]">{copy.body}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={getLocalizedHref(locale, '/diagnosis')} className="inline-flex items-center gap-2 bg-[#8fb2aa] px-5 py-3 text-sm font-semibold text-[#06100f] hover:bg-[#d9e3e0]">
                  {copy.primary} <ArrowRight size={14} />
                </Link>
                <Link href={getLocalizedHref(locale, '/demo')} className="inline-flex items-center gap-2 border border-[#28413d] bg-[#0d1917] px-5 py-3 text-sm font-semibold text-[#f5fbfa] hover:bg-[#142522]">
                  {copy.secondary}
                </Link>
              </div>
            </div>
            <ConversionPath locale={locale} active="context" variant="dark" />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="grid gap-5">
            {playbooks[locale].map((playbook) => (
              <article key={playbook.title} className="overflow-hidden border border-[#d8e5e2] bg-[#d8e5e2]">
                <div className="grid gap-px lg:grid-cols-[0.78fr_1.22fr]">
                  <div className="bg-white p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#789b96]">{playbook.twin}</p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#173634]">{playbook.title}</h2>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {[
                        [copy.supervision, playbook.supervision, ShieldCheck],
                        [copy.replacement, playbook.replacement, Gauge],
                      ].map(([label, value, Icon]) => (
                        <div key={label as string} className="border border-[#d8e5e2] bg-[#f8fbfa] p-4">
                          <Icon size={16} className="text-[#527b73]" />
                          <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#789b96]">{label as string}</p>
                          <p className="mt-1 text-sm font-semibold text-[#173634]">{value as string}</p>
                        </div>
                      ))}
                    </div>
                    <Link href={`${getLocalizedHref(locale, '/diagnosis')}?company=${playbook.company}&pressure=${playbook.pressure}`} className="mt-6 inline-flex items-center gap-2 bg-[#173634] px-5 py-3 text-sm font-semibold text-white hover:bg-[#244944]">
                      {copy.cta} <ArrowRight size={14} />
                    </Link>
                  </div>
                  <div className="grid gap-px bg-[#d8e5e2] md:grid-cols-3">
                    {[
                      [copy.data, playbook.data, ClipboardList],
                      [copy.phases, playbook.phases, Workflow],
                      [copy.outputs, playbook.outputs, CheckCircle2],
                    ].map(([label, items, Icon]) => (
                      <div key={label as string} className="bg-[#fbfbfa] p-5">
                        <Icon size={17} className="text-[#527b73]" />
                        <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#789b96]">{label as string}</p>
                        <div className="mt-3 space-y-2">
                          {(items as string[]).map((item) => (
                            <p key={item} className="border border-[#d8e5e2] bg-white px-3 py-2 text-xs leading-5 text-[#52605d]">{item}</p>
                          ))}
                        </div>
                      </div>
                    ))}
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
