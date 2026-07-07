import Link from 'next/link'
import { PLANS } from '@/lib/data/plans'
import { CheckCircle2, ArrowRight, Workflow, ShieldCheck, Layers3 } from 'lucide-react'
import { getLocalizedHref, pricingPageCopy, type MarketingLocale } from '@/lib/marketing-i18n'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { H1Hero, H2Section, H3, Eyebrow, Body } from '@/components/shared/Typography'
import { Button } from '@/components/shared/ButtonStyled'
import { Card } from '@/components/shared/CardStyled'
import { Badge, BadgeEyebrow } from '@/components/shared/BadgeStyled'

const VALUE_ICONS = [Workflow, ShieldCheck, Layers3]

const clpAnchors = {
  es: {
    free: 'CLP $0',
    starter: 'Referencia Chile: desde CLP $95.000/mes',
    pro: 'Referencia Chile: desde CLP $285.000/mes',
    team: 'Referencia Chile: desde CLP $760.000/mes',
    enterprise: 'CLP custom segun integraciones y SLA',
  },
  en: {
    free: 'CLP $0',
    starter: 'Chile reference: from CLP $95,000/month',
    pro: 'Chile reference: from CLP $285,000/month',
    team: 'Chile reference: from CLP $760,000/month',
    enterprise: 'Custom CLP based on integrations and SLA',
  },
}

const deploymentBands = {
  es: [
    ['Diagnostico', '1 cargo prioritario', 'Mapa de tareas, datos necesarios, supervision, ROI estimado en CLP y primer programa operativo.'],
    ['Despliegue', '1 a 3 gemelos', 'Configuracion del rol, memoria inicial, rutinas semanales, entregables guardados y reglas de escalamiento.'],
    ['Sistema operativo', '10+ gemelos', 'Conectores, reporting recurrente, handoffs multi-rol, QA ejecutivo y mejora continua por industria.'],
  ],
  en: [
    ['Diagnosis', '1 priority role', 'Task map, required data, supervision, CLP ROI estimate, and first operating program.'],
    ['Deployment', '1 to 3 twins', 'Role configuration, initial memory, weekly routines, saved deliverables, and escalation rules.'],
    ['Operating system', '10+ twins', 'Connectors, recurring reporting, multi-role handoffs, executive QA, and industry improvement loops.'],
  ],
}

const managedPrograms = {
  es: [
    {
      name: 'Sales Twin Starter',
      target: 'Pymes B2B y servicios profesionales',
      price: 'USD 199-499/mes',
      promise: 'Ordena pipeline, follow-up, discovery y proximos pasos con memoria por cuenta y supervision humana.',
      roi: 'Ahorro esperado: 5-8 h/semana por ejecutivo y menos oportunidades perdidas.',
      cta: 'Diagnosticar ventas',
    },
    {
      name: 'Licitaciones Pro',
      target: 'Proveedoras del Estado, industriales y constructoras',
      price: 'USD 499-1.500/mes',
      promise: 'Convierte bases, requisitos y riesgos en go/no-go, checklist, plan documental y handoff temprano.',
      roi: 'Ahorro esperado: lectura inicial en minutos, menos errores y mejor control del proceso.',
      cta: 'Revisar licitaciones',
    },
    {
      name: 'Cobranza Pyme',
      target: 'Empresas con cartera vencida o seguimiento manual',
      price: 'USD 299-799/mes',
      promise: 'Prioriza cuentas, prepara mensajes, detecta promesas de pago y escala excepciones al humano correcto.',
      roi: 'Ahorro esperado: mas recuperacion con menos seguimiento manual y mas control de mora.',
      cta: 'Ordenar cobranza',
    },
    {
      name: 'Implementation OS',
      target: 'SaaS, agencias, consultoras y equipos de servicio',
      price: 'USD 499-1.200/mes',
      promise: 'Transforma reuniones, bloqueos e hitos en handoffs, owners y entregables reutilizables.',
      roi: 'Ahorro esperado: menos perdida de contexto entre kickoff y entrega final.',
      cta: 'Mapear implementacion',
    },
  ],
  en: [
    {
      name: 'Sales Twin Starter',
      target: 'B2B SMBs and professional services',
      price: 'USD 199-499/month',
      promise: 'Organize pipeline, follow-up, discovery, and next steps with account memory and human supervision.',
      roi: 'Expected savings: 5-8 h/week per sales rep and fewer missed opportunities.',
      cta: 'Diagnose sales',
    },
    {
      name: 'Tenders Pro',
      target: 'Public-sector suppliers, industrial firms, and builders',
      price: 'USD 499-1,500/month',
      promise: 'Turn tender bases, requirements, and risks into go/no-go, checklists, document plans, and early handoffs.',
      roi: 'Expected savings: first-pass review in minutes, fewer errors, and better process control.',
      cta: 'Review tenders',
    },
    {
      name: 'Collections SMB',
      target: 'Companies with overdue accounts or manual follow-up',
      price: 'USD 299-799/month',
      promise: 'Prioritize accounts, prepare messages, detect payment promises, and escalate exceptions to the right human owner.',
      roi: 'Expected savings: more recovery with less manual follow-up and tighter delinquency control.',
      cta: 'Organize collections',
    },
    {
      name: 'Implementation OS',
      target: 'SaaS, agencies, consultancies, and service teams',
      price: 'USD 499-1,200/month',
      promise: 'Turn meetings, blockers, and milestones into handoffs, owners, and reusable deliverables.',
      roi: 'Expected savings: less context loss between kickoff and final delivery.',
      cta: 'Map implementation',
    },
  ],
}

const planPresentation = {
  es: {
    free: {
      name: 'Free / Demo',
      interval: '/mes',
      cta: 'Probar gratis',
      description: 'Para probar la tesis con un rol, un programa y entregables guardados antes de invertir en un despliegue operativo.',
      features: [
        '5 corridas de gemelo digital al mes',
        '1 programa operativo activo',
        'Biblioteca base de roles',
        'Entregables guardados',
        'Preview basico de replacement',
      ],
    },
    starter: {
      name: 'Starter',
      interval: '/mes',
      cta: 'Desplegar Starter',
      description: 'Para convertir un proceso repetitivo en el primer programa operativo con memoria basica y control humano.',
      features: [
        '1 gemelo operativo desplegado',
        'Memoria basica por cuenta o proceso',
        'Entregables reutilizables',
        'Checklist de diagnostico del rol',
        'Soporte por email',
      ],
    },
    pro: {
      name: 'Pro',
      interval: '/mes',
      cta: 'Desplegar Pro',
      description: 'Para equipos que necesitan varios twins, automatizaciones semanales y replacement visible por programa.',
      features: [
        '3 gemelos operativos desplegados',
        'Automatizaciones semanales',
        'Historial completo por proyecto y cuenta',
        'Handoffs humanos y estados de revision',
        'Dashboard de replacement',
        'Soporte prioritario',
      ],
    },
    team: {
      name: 'Business',
      interval: '/mes',
      cta: 'Desplegar Business',
      description: 'Para operar varias areas con conectores, reporting recurrente y handoffs entre roles supervisados.',
      features: [
        '10 gemelos operativos desplegados',
        'Workspace de equipo',
        'Conectores para documentos, Sheets, CRM o ERP',
        'Reporting recurrente',
        'Soporte de implementacion',
        'API avanzada',
        'Revisiones operativas prioritarias',
      ],
    },
    enterprise: {
      name: 'Enterprise',
      interval: '',
      cta: 'Contactar ventas',
      description: 'Para portafolios multi-rol con integraciones privadas, seguridad avanzada, SLA y gobierno ejecutivo.',
      features: [
        'Portafolio a medida de gemelos digitales',
        'Conectores e integraciones privadas',
        'Despliegue partner o marca privada',
        'Seguridad avanzada y SSO',
        'SLA y soporte dedicado',
        'Roadmap de implementacion custom',
      ],
    },
  },
  en: {
    free: {
      name: 'Free / Demo',
      interval: '/month',
      cta: 'Create diagnosis',
      description: 'For testing the thesis with one priority role, one operating program, and saved deliverables before investing in a full deployment.',
      features: [
        '5 supervised routine executions per month',
        '1 active operating program',
        'Core role twin library',
        'Saved deliverables',
        'Basic replacement preview',
      ],
    },
    starter: {
      name: 'Starter',
      interval: '/month',
      cta: 'Deploy Starter',
      description: 'For turning one repetitive process into the first operating twin with basic memory and human control.',
      features: [
        '1 deployed operating twin',
        'Basic memory by account or process',
        'Reusable deliverables',
        'Role diagnosis checklist',
        'Email support',
      ],
    },
    pro: {
      name: 'Pro',
      interval: '/month',
      cta: 'Deploy Pro',
      description: 'For teams that need multiple twins, weekly automations, and visible replacement by program.',
      features: [
        '3 deployed operating twins',
        'Weekly automations',
        'Full program and account history',
        'Human handoffs and review states',
        'Replacement dashboard',
        'Priority support',
      ],
    },
    team: {
      name: 'Business',
      interval: '/month',
      cta: 'Deploy Business',
      description: 'For operating several areas with connectors, recurring reporting, and handoffs between supervised roles.',
      features: [
        '10 deployed operating twins',
        'Team operating workspace',
        'Connectors for documents, sheets, CRM, or ERP',
        'Recurring reporting',
        'Implementation support',
        'Advanced API',
        'Priority operating reviews',
      ],
    },
    enterprise: {
      name: 'Enterprise',
      interval: '',
      cta: 'Contact sales',
      description: 'For multi-role portfolios with private integrations, advanced security, SLAs, and executive governance.',
      features: [
        'Custom digital twin portfolio',
        'Private connectors and integrations',
        'Partner or private-brand deployment',
        'Advanced security and SSO',
        'SLA and dedicated support',
        'Custom implementation roadmap',
      ],
    },
  },
} satisfies Record<MarketingLocale, Record<string, { name: string; interval: string; cta: string; description: string; features: string[] }>>

export function LocalizedPricingPage({ locale }: { locale: MarketingLocale }) {
  const copy = pricingPageCopy[locale]

  return (
    <div className="min-h-screen bg-[#fbfbfa]">
      <PublicNavbar />
      <main>
        <section className="relative overflow-hidden border-b border-[#1e3431] pt-[4.75rem]" style={{ backgroundColor: '#060a10' }}>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(143,178,170,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(143,178,170,0.04) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
          <div className="pointer-events-none absolute left-0 top-0 h-[560px] w-[560px]" style={{ background: 'radial-gradient(circle, rgba(143,178,170,0.14) 0%, transparent 64%)' }} />
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
              <div>
                <Eyebrow className="text-[#789b96]">{copy.eyebrow}</Eyebrow>
                <H1Hero className="mt-4 text-[#f5fbfa]">
                  {copy.title}
                </H1Hero>
                <Body variant="dark" className="mt-5 max-w-xl !text-[#9db7b1]">
                  {copy.summary}
                </Body>
              </div>

              <Card variant="dark" className="p-6 border-white/10">
                <BadgeEyebrow>{locale === 'es' ? 'Que compra cada plan' : 'What each plan buys'}</BadgeEyebrow>
                <div className="mt-5 space-y-3">
                  {copy.valueStack.map(([title, desc], index) => {
                    const Icon = VALUE_ICONS[index]
                    return (
                      <Card key={title} variant="dark" className="p-4 border-white/10">
                        <div className="flex items-center gap-2">
                          <div className="flex h-9 w-9 items-center justify-center bg-white/10 text-[#8fb2aa]">
                            <Icon size={15} />
                          </div>
                          <p className="text-sm font-semibold text-white">{title}</p>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-[#d9e3e0]">{desc}</p>
                      </Card>
                    )
                  })}
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="border-b border-[#d8e5e2] bg-[#f1f6f4]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
            <div className="mb-8 grid gap-4 lg:grid-cols-3">
              {copy.metrics.map(([title, body]) => (
                <Card key={title} variant="light" className="p-5">
                  <BadgeEyebrow>{title}</BadgeEyebrow>
                  <p className="mt-3 text-lg font-semibold text-[#173634]">{body}</p>
                </Card>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-5">
              {PLANS.map((plan) => {
                const presentation = planPresentation[locale][plan.id]
                return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col border p-6 shadow-[0_18px_44px_-34px_rgba(15,23,42,0.35)] transition-transform hover:-translate-y-1 ${
                    plan.highlighted
                      ? 'border-[#173634] bg-[#173634]'
                      : 'border-[#d8e5e2] bg-white'
                  }`}
                >
                  {plan.highlighted && (
                    <span className="mb-4 inline-flex self-start border border-[#8fb2aa]/30 bg-[#8fb2aa]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8fb2aa]">
                      {copy.bestFit}
                    </span>
                  )}

                  <div className="mb-6">
                    <h2 className={`text-[10px] font-semibold uppercase tracking-[0.24em] ${plan.highlighted ? 'text-[#8fb2aa]' : 'text-[#789b96]'}`}>
                      {presentation.name}
                    </h2>
                    <div className="mt-3 flex items-baseline gap-1.5">
                      <span className={`text-4xl font-semibold leading-none tracking-[-0.02em] ${plan.highlighted ? 'text-[#f5fbfa]' : 'text-[#173634]'}`}>
                        {plan.priceLabel}
                      </span>
                      {plan.price !== null ? (
                        <span className={`text-xs ${plan.highlighted ? 'text-[#9db7b1]' : 'text-[#65706d]'}`}>{presentation.interval}</span>
                      ) : null}
                    </div>
                    <p className={`mt-2 text-xs leading-6 ${plan.highlighted ? 'text-[#9db7b1]' : 'text-[#65706d]'}`}>
                      {presentation.description}
                    </p>
                    <p className={`mt-3 border-t pt-3 text-[11px] font-semibold leading-5 ${plan.highlighted ? 'border-white/10 text-[#8fb2aa]' : 'border-[#d8e5e2] text-[#173634]'}`}>
                      {clpAnchors[locale][plan.id]}
                    </p>
                  </div>

                  <div className={`mb-5 border p-4 ${plan.highlighted ? 'border-white/10 bg-white/5' : 'border-[#d8e5e2] bg-[#f8fbfa]'}`}>
                    <p className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${plan.highlighted ? 'text-[#8fb2aa]' : 'text-[#789b96]'}`}>
                      {copy.twinCapacity}
                    </p>
                    <p className={`mt-2 text-sm ${plan.highlighted ? 'text-white' : 'text-[#173634]'}`}>
                      {plan.monthlyRunLimit >= 99999 ? copy.unlimitedTwinExecution : `${plan.monthlyRunLimit} ${copy.runsPerMonth}`}
                    </p>
                    <p className={`mt-1 text-sm ${plan.highlighted ? 'text-[#d9e3e0]' : 'text-[#52605d]'}`}>
                      {plan.maxProjects >= 999 ? copy.unlimitedPrograms : `${plan.maxProjects} ${copy.activePrograms}`}
                    </p>
                  </div>

                  <ul className="flex-1 space-y-3">
                    {presentation.features.map((feature) => (
                      <li key={feature} className={`flex items-start gap-2.5 text-xs leading-6 ${plan.highlighted ? 'text-[#d9e3e0]' : 'text-[#52605d]'}`}>
                        <CheckCircle2 size={13} className={`mt-0.5 shrink-0 ${plan.highlighted ? 'text-[#8fb2aa]' : 'text-[#173634]'}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link href={getLocalizedHref(locale, plan.id === 'enterprise' ? '/contact' : '/signup')} className="mt-7 inline-block w-full">
                    <Button 
                      variant={plan.highlighted ? 'primary' : 'secondary'} 
                      size="md"
                      className="w-full inline-flex items-center justify-center gap-2"
                    >
                      {presentation.cta} <ArrowRight size={13} />
                    </Button>
                  </Link>
                </div>
                )
              })}
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {deploymentBands[locale].map(([stage, scope, body]) => (
                <Card key={stage} variant="light" className="p-5">
                  <BadgeEyebrow>{stage}</BadgeEyebrow>
                  <p className="mt-3 text-lg font-semibold text-[#173634]">{scope}</p>
                  <p className="mt-2 text-sm leading-7 text-[#52605d]">{body}</p>
                </Card>
              ))}
            </div>
            <Link href={getLocalizedHref(locale, '/implementation')} className="mt-6 inline-flex items-center gap-2 border border-[#173634] bg-[#173634] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1e3431]">
              {locale === 'es' ? 'Ver implementacion en 30 dias' : 'View 30-day implementation'} <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        <section className="border-b border-[#d8e5e2] bg-[#fbfbfa]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <div className="mb-10 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <Eyebrow className="text-[#789b96]">
                  {locale === 'es' ? 'Programas operativos gestionados' : 'Managed operating programs'}
                </Eyebrow>
                <H2Section className="mt-4 text-[#173634]">
                  {locale === 'es'
                    ? 'Compra capacidad operativa supervisada, no solo una suscripcion.'
                    : 'Buy supervised operating capacity, not just a subscription.'}
                </H2Section>
              </div>
              <Body className="text-[#52605d]">
                {locale === 'es'
                  ? 'Los planes base sirven para self-service. Los programas gestionados convierten un proceso repetitivo en capacidad operativa con diagnostico, memoria, handoffs, supervision y ROI visible.'
                  : 'Base plans support self-service. Managed programs turn a repetitive process into operating capacity with diagnosis, memory, handoffs, supervision, and visible ROI.'}
              </Body>
            </div>

            <div className="grid gap-px border border-[#d8e5e2] bg-[#d8e5e2] lg:grid-cols-4">
              {managedPrograms[locale].map((program) => (
                <Card key={program.name} variant="light" className="flex min-h-[340px] flex-col rounded-none border-0 p-6">
                  <BadgeEyebrow>{program.target}</BadgeEyebrow>
                  <H3 className="mt-4 text-[#173634]">{program.name}</H3>
                  <p className="mt-3 text-sm font-semibold text-[#173634]">{program.price}</p>
                  <p className="mt-4 text-sm leading-7 text-[#52605d]">{program.promise}</p>
                  <div className="mt-5 border-l-2 border-[#8fb2aa] bg-[#f1f6f4] px-4 py-3">
                    <p className="text-xs font-semibold leading-5 text-[#173634]">{program.roi}</p>
                  </div>
                  <Link
                    href={getLocalizedHref(locale, '/diagnosis')}
                    className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-[#173634] transition-colors hover:text-[#527b73]"
                  >
                    {program.cta} <ArrowRight size={13} />
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#d8e5e2] bg-[#fbfbfa]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
              <div>
                <Eyebrow className="text-[#789b96]">{copy.faqEyebrow}</Eyebrow>
                <H2Section className="mt-4 text-[#173634]">{copy.faqTitle}</H2Section>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {copy.faq.map(([q, a]) => (
                  <Card key={q} variant="light" className="p-6">
                    <p className="text-sm font-semibold text-[#173634]">{q}</p>
                    <p className="mt-2 text-sm leading-7 text-[#65706d]">{a}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#1e3431] bg-[#0d1f1d]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <div className="border border-[#28413d] bg-[linear-gradient(135deg,#102826,#0d1f1d)] p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#789b96]">{copy.readyEyebrow}</p>
                  <h2 className="mt-4 text-3xl font-light leading-tight text-[#f5fbfa]">{copy.readyTitle}</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href={getLocalizedHref(locale, '/diagnosis')} className="inline-flex items-center gap-2 bg-[#8fb2aa] px-6 py-3.5 text-sm font-semibold text-[#060a10] transition-colors hover:bg-[#d9e3e0]">
                    {copy.readyPrimary} <ArrowRight size={13} />
                  </Link>
                  <Link href={getLocalizedHref(locale, '/login')} className="inline-flex items-center gap-2 border border-[#28413d] px-5 py-3.5 text-sm font-semibold text-[#d9e3e0] transition-colors hover:border-[#8fb2aa]/40 hover:text-[#f5fbfa]">
                    {copy.readySecondary}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
