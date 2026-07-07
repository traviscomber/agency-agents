import Link from 'next/link'
import { getFeaturedAgents } from '@/lib/data/seed-agents'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { PlanBadge } from '@/components/shared/PlanBadge'
import { FadeInUp } from '@/components/animations/FadeInUp'
import { ArrowRight, Bookmark, Radar, ShieldCheck, Workflow, Layers3, CircleAlert, Sparkles } from 'lucide-react'
import { getLocalizedAgentHref, getLocalizedHref, landingCopy, type MarketingLocale } from '@/lib/marketing-i18n'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { H1Hero, H2Section, H3, Eyebrow, Body, HeadingWithEyebrow } from '@/components/shared/Typography'
import { Button } from '@/components/shared/ButtonStyled'
import { Card } from '@/components/shared/CardStyled'
import { Badge, BadgeEyebrow } from '@/components/shared/BadgeStyled'

const DIFFERENTIATOR_ICONS = [Workflow, Bookmark, Radar, ShieldCheck]
const CASE_ICONS = [Layers3, CircleAlert, Sparkles]

const twinArchitecture = {
  es: {
    eyebrow: 'Arquitectura Twin OS',
    title: 'Un twin operativo no es un prompt. Es datos, habilidad y memoria del rol.',
      body:
      'La unidad vendible combina conectores, skills y memoria del cargo para ejecutar rutinas reales con límites y handoffs. Eso lo diferencia de un builder genérico de agentes.',
    formula: 'Connector + Skill + Memoria del rol = Gemelo operativo',
    parts: [
      ['Connectors', 'Gmail, Drive, Sheets, CRM, ERP, correos, documentos, licitaciones, facturas y datos de clientes.'],
      ['Skills', 'Cobranza, licitacion, seguimiento comercial, propuestas, implementacion, reporting y reclutamiento.'],
      ['Memoria del rol', 'Criterios, límites, KPIs, formatos de salida, owners y decisiones pendientes por cuenta o programa.'],
    ],
  },
  en: {
    eyebrow: 'Twin OS architecture',
    title: 'An operating twin is not a prompt. It is data, skill, and role memory.',
    body:
      'The sellable unit combines connectors, skills, and role memory to run real routines with limits and handoffs. That separates it from a generic agent builder.',
    formula: 'Connector + Skill + Role memory = Operating twin',
    parts: [
      ['Connectors', 'Gmail, Drive, Sheets, CRM, ERP, emails, documents, tenders, invoices, and customer data.'],
      ['Skills', 'Collections, tenders, sales follow-up, proposals, implementation, reporting, and recruiting.'],
      ['Role memory', 'Criteria, limits, KPIs, output formats, owners, and pending decisions by account or program.'],
    ],
  },
}

const operatingProof = {
  es: {
    eyebrow: 'Producto trabajando',
    title: 'De input disperso a entregable guardado y handoff supervisado en una corrida.',
    body:
      'La demo debe mostrar trabajo real: datos de entrada, rutina del twin, entregable guardado, siguiente responsable, límite seguro y ROI estimado.',
    inputTitle: 'Input real',
    inputItems: ['CRM con 18 cuentas activas', 'Notas de reuniones y objeciones', 'Meta: recuperar 10 oportunidades dormidas'],
    twinTitle: 'Twin seleccionado',
    twinName: 'Ejecutivo Comercial B2B Chile',
    twinBody: 'Rutina: priorizar cuentas, preparar follow-up, detectar bloqueos y dejar memoria por oportunidad.',
    outputTitle: 'Entregable generado',
    outputItems: ['Top 5 cuentas por urgencia y potencial', '3 correos de seguimiento listos para revisión', 'Resumen de objeciones y siguiente acción'],
    handoffTitle: 'Handoff humano',
    handoffItems: ['Owner: líder comercial', 'Decisión: aprobar propuesta final', 'Escala si hay descuento, contrato o riesgo legal'],
    metrics: [
      ['Replacement', '74%', 'Carga repetible absorbible'],
      ['Tiempo', '7 h', 'Ahorro semanal estimado'],
      ['Control', '3 puntos', 'Handoffs y aprobaciones humanas visibles'],
    ],
    safetyTitle: 'Límites seguros',
    safetyBody:
      'El twin prepara, resume y prioriza. No negocia precio final, no aprueba contratos y no toma decisiones legales sin humano.',
    cta: 'Diagnosticar mi operación',
  },
  en: {
    eyebrow: 'Product at work',
    title: 'From scattered input to a saved deliverable and supervised handoff in one run.',
    body:
      'The demo should show real work: input data, twin routine, saved deliverable, next owner, safe limit, and estimated ROI.',
    inputTitle: 'Real input',
    inputItems: ['CRM with 18 active accounts', 'Meeting notes and objections', 'Goal: recover 10 dormant opportunities'],
    twinTitle: 'Selected twin',
    twinName: 'B2B Sales Executive Twin Chile',
    twinBody: 'Routine: prioritize accounts, prepare follow-up, detect blockers, and save memory by opportunity.',
    outputTitle: 'Generated deliverable',
    outputItems: ['Top 5 accounts by urgency and potential', '3 follow-up emails ready for review', 'Objection summary and next action'],
    handoffTitle: 'Human handoff',
    handoffItems: ['Owner: sales lead', 'Decision: approve final proposal', 'Escalates on discount, contract, or legal risk'],
    metrics: [
      ['Replacement', '74%', 'Repeatable load absorbable'],
      ['Time', '7 h', 'Estimated weekly savings'],
      ['Control', '3 points', 'Visible handoffs and human approvals'],
    ],
    safetyTitle: 'Safe limits',
    safetyBody:
      'The twin prepares, summarizes, and prioritizes. It does not negotiate final price, approve contracts, or make legal decisions without a human.',
    cta: 'Diagnose my operation',
  },
}

const guidedDemos = {
  es: [
    {
      title: 'Ejecutivo Comercial B2B Chile',
      pressure: 'sales',
      company: 'services',
      promise: 'Convierte seguimiento comercial disperso en una rutina semanal con pipeline, proximas acciones y propuestas iniciales.',
      steps: ['Cargar CRM, ICP y ultimas conversaciones', 'Ejecutar follow-up por cuenta activa', 'Guardar recap, objeciones y siguiente accion'],
      roi: '35 a 55 horas/mes recuperables',
    },
    {
      title: 'Cobranza Pyme Chile',
      pressure: 'collections',
      company: 'logistics',
      promise: 'Prioriza cuentas vencidas, prepara mensajes y escala excepciones sin perder trazabilidad humana.',
      steps: ['Cargar aging y politicas de cobranza', 'Clasificar deudores por riesgo y urgencia', 'Generar promesas de pago y handoff humano'],
      roi: '30 a 50 horas/mes recuperables',
    },
    {
      title: 'Analista de Licitaciones Chile',
      pressure: 'tenders',
      company: 'industrial',
      promise: 'Lee bases, arma go/no-go, checklist documental y riesgos antes del sign-off humano.',
      steps: ['Cargar bases y criterios de adjudicacion', 'Detectar requisitos, plazos y riesgos', 'Producir plan de respuesta y checklist'],
      roi: '25 a 45 horas/mes recuperables',
    },
  ],
  en: [
    {
      title: 'B2B Sales Executive Twin Chile',
      pressure: 'sales',
      company: 'services',
      promise: 'Turn scattered commercial follow-up into a weekly routine with pipeline, next actions, and initial proposals.',
      steps: ['Load CRM, ICP, and recent conversations', 'Run follow-up across active accounts', 'Save recap, objections, and next action'],
      roi: '35 to 55 recoverable hours/month',
    },
    {
      title: 'SME Collections Twin Chile',
      pressure: 'collections',
      company: 'logistics',
      promise: 'Prioritize overdue accounts, prepare messages, and escalate exceptions without losing human traceability.',
      steps: ['Load aging and collection policies', 'Classify debtors by risk and urgency', 'Generate payment promises and human handoff'],
      roi: '30 to 50 recoverable hours/month',
    },
    {
      title: 'Tender Analyst Twin Chile',
      pressure: 'tenders',
      company: 'industrial',
      promise: 'Read bid docs, produce go/no-go, document checklist, and risks before human sign-off.',
      steps: ['Load bid docs and award criteria', 'Detect requirements, deadlines, and risks', 'Produce response plan and checklist'],
      roi: '25 to 45 recoverable hours/month',
    },
  ],
}

const marketPositioning = {
  es: {
    eyebrow: 'Diferenciacion en mercado',
    title: 'No compite por cantidad de apps ni por prometer autonomia total.',
    body:
      'N3uralia se posiciona entre consultoria IA, RPA, chatbots y builders genericos: entrega capacidad operativa por cargo, con memoria, handoff, ROI y limites humanos desde el primer despliegue.',
    rows: [
      ['Chatbots y CX', 'Automatizan conversacion y atencion.', 'N3uralia automatiza trabajo interno por cargo: ventas, cobranza, licitaciones, implementacion y reclutamiento.'],
      ['RPA tradicional', 'Ejecuta procesos rigidos y repetibles.', 'N3uralia trabaja con lenguaje, documentos, criterios y handoffs donde el proceso cambia por contexto.'],
      ['Builders de agentes', 'Piden al cliente inventar prompts y flujos.', 'N3uralia parte desde roles chilenos empaquetados con rutinas, KPIs, limites y outputs listos.'],
      ['Copilots enterprise', 'Requieren ecosistema pesado y gobierno amplio.', 'N3uralia baja a pymes y medianas Latam con diagnostico, programa operativo y ROI visible en 30 dias.'],
    ],
  },
  en: {
    eyebrow: 'Market differentiation',
    title: 'It does not compete on app count or total-autonomy claims.',
    body:
      'N3uralia sits between AI consulting, RPA, chatbots, and generic agent builders: it delivers operating capacity by role, with memory, handoff, ROI, and human limits from the first deployment.',
    rows: [
      ['Chatbots and CX', 'Automate conversations and support.', 'N3uralia automates internal role work: sales, collections, tenders, implementation, and recruiting.'],
      ['Traditional RPA', 'Runs rigid repeatable processes.', 'N3uralia works with language, documents, criteria, and handoffs where the process changes by context.'],
      ['Agent builders', 'Ask customers to invent prompts and flows.', 'N3uralia starts from packaged Chilean roles with routines, KPIs, limits, and ready output shapes.'],
      ['Enterprise copilots', 'Need heavier ecosystems and broad governance.', 'N3uralia lands in Latam SMBs and mid-market teams with diagnosis, operating program, and visible ROI in 30 days.'],
    ],
  },
}

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
                    <Link href={getLocalizedHref(locale, '/diagnosis')}>
                      <Button variant="primary" size="lg" className="inline-flex items-center gap-2">
                        {copy.heroPrimary} <ArrowRight size={14} />
                      </Button>
                    </Link>
                    <Link href={getLocalizedHref(locale, '/roles')}>
                      <Button variant="secondary" size="lg" className="inline-flex items-center gap-2">
                        {copy.heroSecondary} <ArrowRight size={14} />
                      </Button>
                    </Link>
                    <Link href={getLocalizedHref(locale, '/demo')} className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-semibold text-[#d9e3e0] transition-colors hover:border-[#8fb2aa]/40 hover:text-white">
                      {locale === 'es' ? 'Ver demo guiada' : 'View guided demo'} <ArrowRight size={14} />
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
                    <div className="flex h-10 w-10 items-center justify-center border border-[#d8e5e2] bg-[#f1f6f4] text-[#789b96]">
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

        <section className="border-b border-[#d8e5e2] bg-[#173634] text-[#f5fbfa]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <Eyebrow className="text-[#8fb2aa]">{marketPositioning[locale].eyebrow}</Eyebrow>
                <H2Section className="mt-4 text-white">{marketPositioning[locale].title}</H2Section>
              </div>
              <Body variant="dark" className="!text-[#c7d5d1]">
                {marketPositioning[locale].body}
              </Body>
            </div>

            <div className="mt-10 grid gap-px border border-white/10 bg-white/10 lg:grid-cols-4">
              {marketPositioning[locale].rows.map(([category, market, n3uralia]) => (
                <article key={category} className="bg-[#0d1f1d] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">{category}</p>
                  <p className="mt-4 text-sm leading-6 text-[#9db7b1]">{market}</p>
                  <div className="mt-5 border-l-2 border-[#8fb2aa] pl-4">
                    <p className="text-sm font-semibold leading-6 text-[#f5fbfa]">{n3uralia}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#d8e5e2] bg-[#f1f6f4]">
          <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 sm:py-20">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <div>
                <Eyebrow className="text-[#789b96]">{twinArchitecture[locale].eyebrow}</Eyebrow>
                <H2Section className="mt-3 text-[#173634]">{twinArchitecture[locale].title}</H2Section>
                <Body variant="light" className="mt-4">
                  {twinArchitecture[locale].body}
                </Body>
              </div>
              <div className="border border-[#d8e5e2] bg-white p-5 shadow-[0_20px_60px_-42px_rgba(15,23,42,0.35)]">
                <div className="border border-[#173634] bg-[#173634] px-4 py-4">
                  <p className="text-sm font-semibold text-[#f5fbfa]">{twinArchitecture[locale].formula}</p>
                </div>
                <div className="mt-4 grid gap-px border border-[#d8e5e2] bg-[#d8e5e2] md:grid-cols-3">
                  {twinArchitecture[locale].parts.map(([title, body]) => (
                    <div key={title} className="bg-[#fbfbfa] p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#789b96]">{title}</p>
                      <p className="mt-3 text-sm leading-7 text-[#52605d]">{body}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href={getLocalizedHref(locale, '/chile')} className="inline-flex items-center gap-2 border border-[#d8e5e2] bg-[#f1f6f4] px-5 py-3 text-sm font-semibold text-[#173634] transition-colors hover:bg-white">
                    {locale === 'es' ? 'Ver modelo Chile/Latam' : 'View Chile/Latam model'} <ArrowRight size={14} />
                  </Link>
                  <Link href={getLocalizedHref(locale, '/playbooks')} className="inline-flex items-center gap-2 border border-[#d8e5e2] bg-white px-5 py-3 text-sm font-semibold text-[#173634] transition-colors hover:bg-[#f1f6f4]">
                    {locale === 'es' ? 'Ver playbooks' : 'View playbooks'} <ArrowRight size={14} />
                  </Link>
                  <Link href={getLocalizedHref(locale, '/implementation')} className="inline-flex items-center gap-2 border border-[#d8e5e2] bg-[#173634] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1e3431]">
                    {locale === 'es' ? 'Implementación 30 días' : '30-day implementation'} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#d8e5e2] bg-[#0d1f1d] text-[#f5fbfa]">
          <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div>
                <Eyebrow className="text-[#8fb2aa]">{operatingProof[locale].eyebrow}</Eyebrow>
                <H2Section className="mt-3 max-w-2xl text-white">{operatingProof[locale].title}</H2Section>
                <Body variant="dark" className="mt-4 max-w-xl !text-[#c7d5d1]">
                  {operatingProof[locale].body}
                </Body>
                <Link href={getLocalizedHref(locale, '/diagnosis')} className="mt-8 inline-flex items-center gap-2 bg-[#8fb2aa] px-5 py-3 text-sm font-semibold text-[#060a10] transition-colors hover:bg-[#d9e3e0]">
                  {operatingProof[locale].cta} <ArrowRight size={14} />
                </Link>
              </div>

              <div className="border border-white/10 bg-[#102826] p-4 shadow-[0_28px_80px_-52px_rgba(0,0,0,0.8)]">
                <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-[0.85fr_1.15fr]">
                  <div className="bg-[#0d1f1d] p-5">
                    <BadgeEyebrow>{operatingProof[locale].inputTitle}</BadgeEyebrow>
                    <ul className="mt-4 space-y-3">
                      {operatingProof[locale].inputItems.map((item) => (
                        <li key={item} className="border border-white/10 bg-white/5 px-3 py-2 text-sm leading-6 text-[#d9e3e0]">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#f5fbfa] p-5 text-[#173634]">
                    <BadgeEyebrow>{operatingProof[locale].twinTitle}</BadgeEyebrow>
                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">{operatingProof[locale].twinName}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#52605d]">{operatingProof[locale].twinBody}</p>
                    <div className="mt-5 grid gap-2 sm:grid-cols-3">
                      {operatingProof[locale].metrics.map(([label, value, note]) => (
                        <div key={label} className="border border-[#d8e5e2] bg-[#edf6f3] px-3 py-3">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#527b73]">{label}</p>
                          <p className="mt-1 text-2xl font-light tracking-[-0.04em] text-[#173634]">{value}</p>
                          <p className="mt-1 text-[11px] leading-4 text-[#52605d]">{note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <Card variant="dark" className="border-white/10 p-5">
                    <BadgeEyebrow>{operatingProof[locale].outputTitle}</BadgeEyebrow>
                    <ul className="mt-4 space-y-3">
                      {operatingProof[locale].outputItems.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-6 text-[#d9e3e0]">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#8fb2aa]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>

                  <Card variant="dark" className="border-white/10 p-5">
                    <BadgeEyebrow>{operatingProof[locale].handoffTitle}</BadgeEyebrow>
                    <ul className="mt-4 space-y-3">
                      {operatingProof[locale].handoffItems.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-6 text-[#d9e3e0]">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#8fb2aa]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>

                <div className="mt-4 border border-amber-300/20 bg-amber-300/10 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-200">{operatingProof[locale].safetyTitle}</p>
                  <p className="mt-2 text-sm leading-7 text-[#f4ead4]">{operatingProof[locale].safetyBody}</p>
                  <Link href={getLocalizedHref(locale, '/trust')} className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-amber-100 transition-colors hover:text-white">
                    {locale === 'es' ? 'Ver seguridad y supervision' : 'View trust and supervision'} <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
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
            <Link href={getLocalizedHref(locale, '/industries')} className="mt-8 inline-flex items-center gap-2 border border-[#d8e5e2] bg-white px-5 py-3 text-sm font-semibold text-[#173634] hover:bg-[#f1f6f4]">
              {locale === 'es' ? 'Ver casos por industria' : 'View industry cases'} <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        <section className="border-y border-[#d8e5e2] bg-[#fbfbfa]">
          <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 sm:py-20">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Eyebrow>{locale === 'es' ? 'Demo guiada' : 'Guided demo'}</Eyebrow>
                <H2Section className="mt-3 max-w-3xl text-[#173634]">
                  {locale === 'es'
                    ? 'Tres recorridos para entender como se vende un gemelo digital por cargo.'
                    : 'Three walkthroughs that show how a role-based digital twin is sold.'}
                </H2Section>
              </div>
              <p className="max-w-md text-sm leading-7 text-[#52605d]">
                {locale === 'es'
                  ? 'Cada demo baja desde dolor operativo a datos, rutina, entregable y ROI antes de crear el programa.'
                  : 'Each demo moves from operating pain to data, routine, deliverable, and ROI before creating the program.'}
              </p>
            </div>
            <Link href={getLocalizedHref(locale, '/demo')} className="mt-6 inline-flex items-center gap-2 border border-[#d8e5e2] bg-white px-5 py-3 text-sm font-semibold text-[#173634] hover:bg-[#f1f6f4]">
              {locale === 'es' ? 'Abrir demo completa' : 'Open full demo'} <ArrowRight size={14} />
            </Link>
            <Link href={getLocalizedHref(locale, '/playbooks')} className="ml-3 mt-6 inline-flex items-center gap-2 border border-[#d8e5e2] bg-[#f1f6f4] px-5 py-3 text-sm font-semibold text-[#173634] hover:bg-white">
              {locale === 'es' ? 'Ver playbooks operativos' : 'View operating playbooks'} <ArrowRight size={14} />
            </Link>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {guidedDemos[locale].map((demo, index) => (
                <Card key={demo.title} variant="light" className="flex flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <BadgeEyebrow>{locale === 'es' ? `Recorrido ${index + 1}` : `Walkthrough ${index + 1}`}</BadgeEyebrow>
                      <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-[#173634]">{demo.title}</h3>
                    </div>
                    <span className="border border-[#d8e5e2] bg-[#f1f6f4] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#527b73]">
                      {demo.roi}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[#52605d]">{demo.promise}</p>
                  <div className="mt-5 flex-1 space-y-2">
                    {demo.steps.map((step, stepIndex) => (
                      <div key={step} className="border border-[#d8e5e2] bg-[#f8fbfa] px-3 py-2">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#789b96]">
                          {locale === 'es' ? 'Paso' : 'Step'} {stepIndex + 1}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-[#52605d]">{step}</p>
                      </div>
                    ))}
                  </div>
                  <Link href={`${getLocalizedHref(locale, '/diagnosis')}?company=${demo.company}&pressure=${demo.pressure}`} className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#173634] hover:text-[#8fb2aa]">
                    {locale === 'es' ? 'Diagnosticar este gemelo' : 'Diagnose this twin'} <ArrowRight size={12} />
                  </Link>
                </Card>
              ))}
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
              <Link href={getLocalizedHref(locale, '/agents')} className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#173634] hover:text-[#8fb2aa]">
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
                    <Link href={getLocalizedAgentHref(locale, agent.slug)} className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#173634]">
                      {locale === 'es' ? 'Abrir twin' : 'Open twin'} <ArrowRight size={12} />
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
                <Link href={getLocalizedHref(locale, '/diagnosis')}>
                  <Button variant="primary" size="lg" className="inline-flex items-center gap-2">
                    {copy.workspacePrimary} <ArrowRight size={14} />
                  </Button>
                </Link>
                <Link href={getLocalizedHref(locale, '/pricing')}>
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
