import Link from 'next/link'
import { ArrowRight, CalendarClock, ClipboardCheck, Gauge, Layers3, ShieldCheck, Workflow } from 'lucide-react'
import { PublicFooter } from '@/components/public/PublicFooter'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { BadgeEyebrow } from '@/components/shared/BadgeStyled'
import { Button } from '@/components/shared/ButtonStyled'
import { Card } from '@/components/shared/CardStyled'
import { Body, Eyebrow, H1Hero, H2Section, H3 } from '@/components/shared/Typography'
import { getLocalizedHref, type MarketingLocale } from '@/lib/marketing-i18n'

const PHASE_ICONS = [ClipboardCheck, Workflow, ShieldCheck, Gauge]

const implementationCopy = {
  es: {
    badge: 'Operacion inteligente en 30 dias',
    title: 'De proceso repetitivo a twin operativo supervisado.',
    body:
      'N3uralia convierte un cargo o proceso critico en una rutina digital con memoria, handoffs, limites seguros y medicion de ROI. La meta no es una demo: es una primera capacidad operativa funcionando.',
    primary: 'Solicitar diagnostico',
    secondary: 'Ver planes',
    formula: 'Diagnostico + Twin + Supervision + ROI = Operacion desplegable',
    phasesTitle: 'Plan de despliegue',
    phases: [
      {
        week: 'Semana 1',
        title: 'Diagnostico del cargo',
        body: 'Mapeamos tareas repetibles, datos disponibles, riesgos, responsables humanos y criterio experto.',
        output: 'Mapa del rol, replacement inicial, inputs requeridos y primer caso de uso.',
      },
      {
        week: 'Semana 2',
        title: 'Twin minimo operativo',
        body: 'Configuramos instrucciones, rutinas, formato de salida, memoria inicial y limites de decision.',
        output: 'Primer twin listo para ejecutar con datos reales acotados.',
      },
      {
        week: 'Semana 3',
        title: 'Rutina supervisada',
        body: 'Ejecutamos casos reales, ajustamos outputs, definimos handoffs y marcamos puntos de aprobacion humana.',
        output: 'Artifacts reutilizables, owners, reglas de escalamiento y bitacora de mejoras.',
      },
      {
        week: 'Semana 4',
        title: 'ROI y expansion',
        body: 'Medimos horas recuperadas, calidad de entregables, errores evitados y proximo rol a desplegar.',
        output: 'Dashboard de valor, backlog de automatizacion y plan de expansion por rol.',
      },
    ],
    packagesTitle: 'Programas que se pueden desplegar primero',
    packages: [
      ['Sales Twin Starter', 'Seguimiento comercial, pipeline, discovery, propuestas iniciales y recuperacion de oportunidades dormidas.'],
      ['Licitaciones Pro', 'Lectura de bases, go/no-go, checklist documental, riesgos y plan de respuesta.'],
      ['Cobranza Pyme', 'Priorizacion de cartera, promesas de pago, mensajes, excepciones y escalamiento humano.'],
      ['Implementation OS', 'Minutas, hitos, bloqueos, handoffs, owners y continuidad de proyectos.'],
    ],
    gatesTitle: 'Gates para no vender humo',
    gates: [
      ['Datos reales', 'El twin debe correr con inputs del cliente, no con ejemplos genericos.'],
      ['Handoff visible', 'Cada output debe dejar owner, proximo paso y decision pendiente.'],
      ['Limites seguros', 'Debe estar claro que aprueba humano y que no hace el twin.'],
      ['ROI medible', 'La mejora se mide en horas, velocidad, errores evitados o recuperacion.'],
    ],
    finalTitle: 'Empieza con un rol. Escala hacia un sistema operativo por cargos.',
    finalBody:
      'El primer despliegue debe probar valor en un proceso concreto. Despues se conectan roles: ventas, propuesta, implementacion, cobranza y reporting.',
  },
  en: {
    badge: 'Intelligent operations in 30 days',
    title: 'From repetitive process to supervised operating twin.',
    body:
      'N3uralia turns a critical role or process into a digital routine with memory, handoffs, safe limits, and ROI measurement. The goal is not a demo: it is the first operating capacity working.',
    primary: 'Request diagnosis',
    secondary: 'View pricing',
    formula: 'Diagnosis + Twin + Supervision + ROI = Deployable operation',
    phasesTitle: 'Deployment plan',
    phases: [
      {
        week: 'Week 1',
        title: 'Role diagnosis',
        body: 'We map repeatable tasks, available data, risks, human owners, and expert judgment.',
        output: 'Role map, initial replacement scope, required inputs, and first use case.',
      },
      {
        week: 'Week 2',
        title: 'Minimum operating twin',
        body: 'We configure instructions, routines, output format, initial memory, and decision limits.',
        output: 'First twin ready to run with scoped real data.',
      },
      {
        week: 'Week 3',
        title: 'Supervised routine',
        body: 'We run real cases, tune outputs, define handoffs, and mark human approval points.',
        output: 'Reusable artifacts, owners, escalation rules, and improvement log.',
      },
      {
        week: 'Week 4',
        title: 'ROI and expansion',
        body: 'We measure recovered hours, deliverable quality, avoided errors, and the next role to deploy.',
        output: 'Value dashboard, automation backlog, and role-expansion plan.',
      },
    ],
    packagesTitle: 'Programs you can deploy first',
    packages: [
      ['Sales Twin Starter', 'Sales follow-up, pipeline, discovery, initial proposals, and recovery of dormant opportunities.'],
      ['Tenders Pro', 'Bid review, go/no-go, document checklist, risks, and response plan.'],
      ['Collections SMB', 'Portfolio prioritization, payment promises, messages, exceptions, and human escalation.'],
      ['Implementation OS', 'Minutes, milestones, blockers, handoffs, owners, and project continuity.'],
    ],
    gatesTitle: 'Gates against empty demos',
    gates: [
      ['Real data', 'The twin must run with client inputs, not generic examples.'],
      ['Visible handoff', 'Each output must leave owner, next step, and pending decision.'],
      ['Safe limits', 'It must be clear what a human approves and what the twin does not do.'],
      ['Measurable ROI', 'The improvement is measured in hours, speed, avoided errors, or recovery.'],
    ],
    finalTitle: 'Start with one role. Scale into an operating system by job.',
    finalBody:
      'The first deployment must prove value in one concrete process. Then roles connect: sales, proposal, implementation, collections, and reporting.',
  },
} satisfies Record<MarketingLocale, any>

export function LocalizedImplementationPage({ locale }: { locale: MarketingLocale }) {
  const copy = implementationCopy[locale]

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
              backgroundSize: '78px 78px',
            }}
          />
          <div className="pointer-events-none absolute -right-24 top-0 h-[640px] w-[640px]" style={{ background: 'radial-gradient(circle, rgba(143,178,170,0.16) 0%, transparent 62%)' }} />
          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-end">
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
                  <Link href={getLocalizedHref(locale, '/pricing')}>
                    <Button variant="secondary" size="lg" className="inline-flex items-center gap-2">
                      {copy.secondary} <ArrowRight size={14} />
                    </Button>
                  </Link>
                </div>
              </div>

              <Card variant="dark" className="border-white/10 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center bg-[#8fb2aa]/10 text-[#8fb2aa]">
                    <CalendarClock size={18} />
                  </div>
                  <p className="text-sm font-semibold text-white">{copy.formula}</p>
                </div>
                <div className="mt-6 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-4">
                  {['01', '02', '03', '04'].map((step, index) => (
                    <div key={step} className="bg-[#102826] px-4 py-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8fb2aa]">{step}</p>
                      <p className="mt-2 text-xs leading-5 text-[#d9e3e0]">{copy.phases[index].title}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="border-b border-[#d8e5e2] bg-[#f1f6f4]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <div className="mb-10">
              <Eyebrow className="text-[#789b96]">{locale === 'es' ? 'Ruta de despliegue' : 'Deployment route'}</Eyebrow>
              <H2Section className="mt-3 text-[#173634]">{copy.phasesTitle}</H2Section>
            </div>
            <div className="grid gap-4 lg:grid-cols-4">
              {copy.phases.map((phase: { week: string; title: string; body: string; output: string }, index: number) => {
                const Icon = PHASE_ICONS[index] ?? Layers3
                return (
                  <Card key={phase.week} variant="light" className="p-6">
                    <div className="flex h-11 w-11 items-center justify-center bg-[#173634] text-[#d9e3e0]">
                      <Icon size={18} />
                    </div>
                    <BadgeEyebrow className="mt-5">{phase.week}</BadgeEyebrow>
                    <H3 className="mt-3 text-[#173634]">{phase.title}</H3>
                    <p className="mt-3 text-sm leading-7 text-[#52605d]">{phase.body}</p>
                    <div className="mt-5 border-l-2 border-[#8fb2aa] bg-[#edf6f3] px-4 py-3">
                      <p className="text-xs font-semibold leading-5 text-[#173634]">{phase.output}</p>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-[#d8e5e2] bg-[#fbfbfa]">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Eyebrow className="text-[#789b96]">{locale === 'es' ? 'Paquetes iniciales' : 'Initial packages'}</Eyebrow>
              <H2Section className="mt-3 text-[#173634]">{copy.packagesTitle}</H2Section>
              <p className="mt-4 text-sm leading-7 text-[#52605d]">{copy.finalBody}</p>
            </div>
            <div className="grid gap-px border border-[#d8e5e2] bg-[#d8e5e2] sm:grid-cols-2">
              {copy.packages.map(([title, body]: [string, string]) => (
                <div key={title} className="bg-white p-5">
                  <p className="text-sm font-semibold text-[#173634]">{title}</p>
                  <p className="mt-2 text-sm leading-7 text-[#52605d]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#d8e5e2] bg-[#f1f6f4]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div>
                <Eyebrow className="text-[#789b96]">{locale === 'es' ? 'Criterios de produccion' : 'Production criteria'}</Eyebrow>
                <H2Section className="mt-3 text-[#173634]">{copy.gatesTitle}</H2Section>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {copy.gates.map(([title, body]: [string, string]) => (
                  <Card key={title} variant="light" className="p-5">
                    <BadgeEyebrow>{title}</BadgeEyebrow>
                    <p className="mt-3 text-sm leading-7 text-[#52605d]">{body}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#0d1f1d]">
          <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 sm:py-20">
            <Card variant="dark" className="border-white/10 p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <H2Section className="max-w-3xl text-white">{copy.finalTitle}</H2Section>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-[#c7d5d1]">{copy.finalBody}</p>
                </div>
                <Link href={getLocalizedHref(locale, '/diagnosis')} className="inline-flex items-center gap-2 bg-[#8fb2aa] px-5 py-3 text-sm font-semibold text-[#060a10] transition-colors hover:bg-[#d9e3e0]">
                  {copy.primary} <ArrowRight size={14} />
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
