import Link from 'next/link'
import { ArrowRight, ClipboardCheck, DatabaseZap, FileClock, LockKeyhole, ShieldCheck, UserCheck } from 'lucide-react'
import { PublicFooter } from '@/components/public/PublicFooter'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { BadgeEyebrow } from '@/components/shared/BadgeStyled'
import { Button } from '@/components/shared/ButtonStyled'
import { Card } from '@/components/shared/CardStyled'
import { Body, Eyebrow, H1Hero, H2Section, H3 } from '@/components/shared/Typography'
import { getLocalizedHref, type MarketingLocale } from '@/lib/marketing-i18n'

const CONTROL_ICONS = [ShieldCheck, UserCheck, FileClock, DatabaseZap]

const trustCopy = {
  es: {
    badge: 'Confianza operacional para Chile y Latam',
    title: 'Autonomía parcial, supervisión clara y límites visibles por twin.',
    body:
      'N3uralia Twin OS no vende autonomía total. Cada gemelo digital trabaja dentro de un marco auditable: fuentes, memoria, reglas de aprobación, handoffs humanos y tareas explícitamente fuera de alcance.',
    primary: 'Diagnosticar mi operación',
    secondary: 'Ver roles replicables',
    controlTitle: 'Cómo se controla cada twin',
    controls: [
      ['Fuentes declaradas', 'Cada programa define qué documentos, cuentas, CRM, planillas o notas puede usar el twin antes de ejecutar.'],
      ['Aprobación humana', 'Las decisiones comerciales, legales, financieras o reputacionales quedan marcadas como aprobación obligatoria.'],
      ['Logs y artefactos', 'Cada corrida deja entregables, memoria, owner siguiente y contexto recuperable para auditoría interna.'],
      ['Límites por rol', 'El alcance se define por cargo: preparar, priorizar, resumir, sugerir, escalar o documentar.'],
    ],
    matrixTitle: 'Matriz de límites seguros',
    columns: ['Puede hacer', 'Requiere aprobación', 'No hace'],
    matrix: [
      {
        role: 'Ejecutivo Comercial B2B',
        can: ['Priorizar cuentas', 'Preparar follow-up', 'Resumir objeciones'],
        approval: ['Enviar propuesta final', 'Aplicar descuentos', 'Cambiar condiciones'],
        never: ['Firmar contratos', 'Negociar precio final', 'Prometer capacidades no validadas'],
      },
      {
        role: 'Analista de Licitaciones',
        can: ['Leer bases', 'Extraer requisitos', 'Crear go/no-go inicial'],
        approval: ['Presentar oferta', 'Aceptar riesgo legal', 'Comprometer boletas o garantías'],
        never: ['Aprobar postulación sin humano', 'Inventar cumplimiento', 'Omitir incompatibilidades'],
      },
      {
        role: 'Cobranza Pyme',
        can: ['Priorizar cartera', 'Sugerir mensajes', 'Detectar promesas de pago'],
        approval: ['Escalar cuenta crítica', 'Aplicar condonación', 'Enviar comunicación sensible'],
        never: ['Amenazar clientes', 'Modificar deuda', 'Ejecutar acciones legales'],
      },
    ],
    evidenceTitle: 'Confianza vendible para compradores locales',
    localControlTitle: 'Checklist operativo para vender confianza',
    localControlBody:
      'Antes de conectar un twin a procesos reales, el comprador debe poder revisar qué datos usa, quién aprueba, qué queda registrado y cómo se recupera el contexto si cambia el operador.',
    localControls: [
      ['Fuentes y datos mínimos', 'Definir documentos, planillas, CRM o notas permitidas por programa. Evitar secretos o datos sensibles que no sean necesarios para ejecutar la rutina.'],
      ['Aprobaciones por decisión', 'Marcar descuentos, propuestas finales, compromisos legales, comunicaciones sensibles y escalamiento financiero como puntos de aprobación humana.'],
      ['Bitácora recuperable', 'Cada ejecución debe dejar brief, entregable, owner, decisión pendiente y siguiente paso para auditoría interna o continuidad operacional.'],
      ['Revisión y mejora', 'Los programas deben revisarse por calidad de entregables, horas recuperadas, errores evitados y excepciones que siguen requiriendo supervisión.'],
    ],
    evidence: [
      ['Modo supervisado por defecto', 'El punto de partida es control humano sobre excepciones, no autonomía ciega.'],
      ['ROI trazable', 'La promesa se mide en horas recuperadas, errores evitados, velocidad de respuesta y continuidad por cuenta.'],
      ['Datos acotados', 'El twin trabaja con contexto provisto por el programa, no con acceso abierto innecesario.'],
      ['Operación en producción', 'La meta es dejar rutinas, handoffs y artefactos reutilizables, no demos aisladas.'],
    ],
    finalTitle: 'Si un twin no tiene límites, no está listo para operar.',
    finalBody:
      'El diferencial de N3uralia es empaquetar el cargo, la rutina, el output y la supervisión. Eso permite vender capacidad digital sin prometer decisiones autónomas que una empresa chilena no debería delegar.',
  },
  en: {
    badge: 'Operating trust for Chile and Latam',
    title: 'Partial autonomy, clear supervision, and visible limits by twin.',
    body:
      'N3uralia Twin OS does not sell total autonomy. Each digital twin works inside an auditable frame: sources, memory, approval rules, human handoffs, and tasks that are explicitly out of scope.',
    primary: 'Diagnose my operation',
    secondary: 'View replicable roles',
    controlTitle: 'How each twin is controlled',
    controls: [
      ['Declared sources', 'Each program defines which documents, accounts, CRM records, sheets, or notes the twin can use before it runs.'],
      ['Human approval', 'Commercial, legal, financial, or reputational decisions are marked as mandatory approval points.'],
      ['Logs and artifacts', 'Each run leaves deliverables, memory, next owner, and recoverable context for internal audit.'],
      ['Role boundaries', 'Scope is defined by job: prepare, prioritize, summarize, suggest, escalate, or document.'],
    ],
    matrixTitle: 'Safe-limits matrix',
    columns: ['Can do', 'Needs approval', 'Does not do'],
    matrix: [
      {
        role: 'B2B Sales Executive',
        can: ['Prioritize accounts', 'Prepare follow-up', 'Summarize objections'],
        approval: ['Send final proposal', 'Apply discounts', 'Change terms'],
        never: ['Sign contracts', 'Negotiate final price', 'Promise unvalidated capabilities'],
      },
      {
        role: 'Tender Analyst',
        can: ['Read bid docs', 'Extract requirements', 'Create initial go/no-go'],
        approval: ['Submit offer', 'Accept legal risk', 'Commit guarantees'],
        never: ['Approve submission without a human', 'Invent compliance', 'Hide incompatibilities'],
      },
      {
        role: 'SMB Collections',
        can: ['Prioritize portfolio', 'Suggest messages', 'Detect payment promises'],
        approval: ['Escalate critical account', 'Apply forgiveness', 'Send sensitive communication'],
        never: ['Threaten customers', 'Modify debt', 'Execute legal actions'],
      },
    ],
    evidenceTitle: 'Buyer-ready trust for local companies',
    localControlTitle: 'Operating checklist for buyer confidence',
    localControlBody:
      'Before a twin connects to real processes, the buyer should be able to review what data it uses, who approves decisions, what is logged, and how context is recovered when the operator changes.',
    localControls: [
      ['Sources and minimum data', 'Define allowed documents, sheets, CRM records, or notes by program. Avoid secrets or sensitive data that is not required for the routine.'],
      ['Decision approvals', 'Mark discounts, final proposals, legal commitments, sensitive communications, and financial escalation as human approval points.'],
      ['Recoverable audit trail', 'Each execution should leave the brief, deliverable, owner, pending decision, and next step for internal audit or operating continuity.'],
      ['Review and improvement', 'Programs should be reviewed for deliverable quality, recovered hours, avoided errors, and exceptions that still require supervision.'],
    ],
    evidence: [
      ['Supervised by default', 'The starting point is human control over exceptions, not blind autonomy.'],
      ['Traceable ROI', 'The promise is measured in recovered hours, avoided errors, response speed, and account continuity.'],
      ['Scoped data', 'The twin works with program-provided context, not unnecessary open-ended access.'],
      ['Production operation', 'The goal is reusable routines, handoffs, and artifacts, not isolated demos.'],
    ],
    finalTitle: 'If a twin has no limits, it is not ready to operate.',
    finalBody:
      'N3uralia differentiates by packaging the role, routine, output, and supervision. That lets companies buy digital capacity without delegating decisions they should keep human.',
  },
} satisfies Record<MarketingLocale, any>

export function LocalizedTrustPage({ locale }: { locale: MarketingLocale }) {
  const copy = trustCopy[locale]

  return (
    <div className="min-h-screen bg-[#fbfbfa]">
      <PublicNavbar />
      <main>
        <section className="relative overflow-hidden border-b border-[#1e3431] bg-[#060a10] pt-[4.75rem] text-[#f5fbfa]">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(143,178,170,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(143,178,170,0.04) 1px, transparent 1px)',
              backgroundSize: '76px 76px',
            }}
          />
          <div className="pointer-events-none absolute right-0 top-0 h-[620px] w-[620px]" style={{ background: 'radial-gradient(circle, rgba(143,178,170,0.15) 0%, transparent 62%)' }} />
          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <div>
                <Eyebrow className="text-[#8fb2aa]">{copy.badge}</Eyebrow>
                <H1Hero className="mt-5 max-w-4xl text-white">{copy.title}</H1Hero>
                <Body variant="dark" className="mt-6 max-w-2xl !text-[#c7d5d1]">{copy.body}</Body>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={getLocalizedHref(locale, '/diagnosis')}>
                    <Button variant="primary" size="lg" className="inline-flex items-center gap-2">
                      {copy.primary} <ArrowRight size={14} />
                    </Button>
                  </Link>
                  <Link href={getLocalizedHref(locale, '/roles')}>
                    <Button variant="secondary" size="lg" className="inline-flex items-center gap-2">
                      {copy.secondary} <ArrowRight size={14} />
                    </Button>
                  </Link>
                </div>
              </div>

              <Card variant="dark" className="border-white/10 p-5">
                <BadgeEyebrow>{copy.controlTitle}</BadgeEyebrow>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {copy.controls.map((item: string[], index: number) => {
                    const [title, body] = item
                    const Icon = CONTROL_ICONS[index] ?? ShieldCheck
                    return (
                      <div key={title} className="border border-white/10 bg-white/5 p-4">
                        <div className="flex h-10 w-10 items-center justify-center bg-[#8fb2aa]/10 text-[#8fb2aa]">
                          <Icon size={17} />
                        </div>
                        <p className="mt-4 text-sm font-semibold text-white">{title}</p>
                        <p className="mt-2 text-sm leading-6 text-[#c7d5d1]">{body}</p>
                      </div>
                    )
                  })}
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="border-b border-[#d8e5e2] bg-[#f1f6f4]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Eyebrow className="text-[#789b96]">{locale === 'es' ? 'Gobierno por cargo' : 'Governance by role'}</Eyebrow>
                <H2Section className="mt-3 text-[#173634]">{copy.matrixTitle}</H2Section>
              </div>
              <p className="max-w-md text-sm leading-7 text-[#52605d]">
                {locale === 'es'
                  ? 'Cada ficha de twin debe hacer explicito que absorbe, que escala y que no debe ejecutar.'
                  : 'Every twin profile should make explicit what it absorbs, what it escalates, and what it must not execute.'}
              </p>
            </div>

            <div className="grid gap-4">
              {copy.matrix.map((row: { role: string; can: string[]; approval: string[]; never: string[] }) => (
                <Card key={row.role} variant="light" className="p-5">
                  <H3 className="text-[#173634]">{row.role}</H3>
                  <div className="mt-5 grid gap-px overflow-hidden border border-[#d8e5e2] bg-[#d8e5e2] lg:grid-cols-3">
                    {[row.can, row.approval, row.never].map((items, index) => (
                      <div key={copy.columns[index]} className="bg-white p-4">
                        <BadgeEyebrow>{copy.columns[index]}</BadgeEyebrow>
                        <ul className="mt-4 space-y-2">
                          {items.map((item) => (
                            <li key={item} className="flex gap-2 text-sm leading-6 text-[#52605d]">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#8fb2aa]" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#d8e5e2] bg-[#fbfbfa]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <div className="mb-16 grid gap-8 border-b border-[#d8e5e2] pb-16 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <Eyebrow className="text-[#789b96]">{locale === 'es' ? 'Control local' : 'Local controls'}</Eyebrow>
                <H2Section className="mt-3 text-[#173634]">{copy.localControlTitle}</H2Section>
                <p className="mt-4 max-w-md text-sm leading-7 text-[#52605d]">{copy.localControlBody}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {copy.localControls.map((item: string[], index: number) => {
                  const [title, body] = item
                  const Icon = CONTROL_ICONS[index] ?? ShieldCheck
                  return (
                    <Card key={title} variant="light" className="p-5">
                      <div className="flex h-10 w-10 items-center justify-center bg-[#173634] text-[#d9e3e0]">
                        <Icon size={16} />
                      </div>
                      <p className="mt-4 text-sm font-semibold text-[#173634]">{title}</p>
                      <p className="mt-2 text-sm leading-7 text-[#52605d]">{body}</p>
                    </Card>
                  )
                })}
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <Eyebrow className="text-[#789b96]">{locale === 'es' ? 'Prueba de confianza' : 'Trust evidence'}</Eyebrow>
                <H2Section className="mt-3 text-[#173634]">{copy.evidenceTitle}</H2Section>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {copy.evidence.map((item: string[]) => {
                  const [title, body] = item
                  return (
                    <Card key={title} variant="light" className="p-5">
                      <div className="flex h-10 w-10 items-center justify-center bg-[#173634] text-[#d9e3e0]">
                        <LockKeyhole size={16} />
                      </div>
                      <p className="mt-4 text-sm font-semibold text-[#173634]">{title}</p>
                      <p className="mt-2 text-sm leading-7 text-[#52605d]">{body}</p>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#0d1f1d]">
          <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 sm:py-20">
            <Card variant="dark" className="border-white/10 p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <div className="flex h-11 w-11 items-center justify-center bg-[#8fb2aa]/10 text-[#8fb2aa]">
                    <ClipboardCheck size={18} />
                  </div>
                  <H2Section className="mt-5 max-w-3xl text-white">{copy.finalTitle}</H2Section>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-[#c7d5d1]">{copy.finalBody}</p>
                </div>
                <Link href={getLocalizedHref(locale, '/pricing')} className="inline-flex items-center gap-2 bg-[#8fb2aa] px-5 py-3 text-sm font-semibold text-[#060a10] transition-colors hover:bg-[#d9e3e0]">
                  {locale === 'es' ? 'Ver planes' : 'View pricing'} <ArrowRight size={14} />
                </Link>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  )
}
