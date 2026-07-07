import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAgentBySlug, SEED_AGENTS } from '@/lib/data/seed-agents'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { PlanBadge } from '@/components/shared/PlanBadge'
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react'
import { getLocalizedAgentHref, getLocalizedHref, type MarketingLocale } from '@/lib/marketing-i18n'
import { PublicNavbar } from '@/components/public/PublicNavbar'

function getAgentDetailCopy(locale: MarketingLocale) {
  return locale === 'es'
    ? {
        breadcrumb: 'Twins',
        runThisTwin: 'Correr este twin',
        comparePlans: 'Comparar planes',
        role: 'Rol',
        mission: 'Misión',
        bestUse: 'Mejor uso',
        outputShape: 'Forma del output',
        outputShapeBody: 'Entregables estructurados con secciones claras y siguientes pasos accionables.',
        commercialFit: 'Ficha comercial del twin',
        replicatedRole: 'Rol replicado',
        businessProblem: 'Problema que resuelve',
        expectedSavings: 'Ahorro esperado',
        firstResult: 'Primer resultado',
        approvalRequired: 'Necesita aprobacion para',
        doesNotDo: 'No hace',
        safeLimits: 'Limites seguros',
        safeLimitsBody:
          'Este twin prepara, resume, prioriza y documenta. Las decisiones comerciales, legales, financieras o reputacionales siguen requiriendo aprobacion humana.',
        supervisionModel: 'Modelo de supervision',
        profile: 'Perfil del twin digital',
        marketFit: 'Market fit',
        replacementScope: 'Alcance de replacement',
        operationalReplacement: 'Replacement operativo',
        repeatableLoad: 'de la carga repetible',
        requiredSupervision: 'Supervisión requerida',
        coreKpis: 'KPIs base',
        coreRoutines: 'Rutinas base',
        inputRequirements: 'Inputs requeridos',
        deliverableShape: 'Forma del entregable',
        exampleTasks: 'Tareas ejemplo',
        suggestedPrompts: 'Prompts sugeridos',
        readyToRun: 'Listo para correr',
        readyBody: 'Crea tu cuenta para correr este twin y recibir un entregable estructurado guardado en tu workspace.',
        requiredPlan: 'Plan requerido',
        signUp: 'Crear cuenta',
        signIn: 'Ingresar',
        relatedAgents: 'Twins relacionados',
        digitalTwin: 'Digital twin',
      }
    : {
        breadcrumb: 'Twins',
        runThisTwin: 'Run this twin',
        comparePlans: 'Compare plans',
        role: 'Role',
        mission: 'Mission',
        bestUse: 'Best use',
        outputShape: 'Output shape',
        outputShapeBody: 'Structured deliverables with clear sections and next steps.',
        commercialFit: 'Commercial twin card',
        replicatedRole: 'Replicated role',
        businessProblem: 'Business problem',
        expectedSavings: 'Expected savings',
        firstResult: 'First result',
        approvalRequired: 'Needs approval for',
        doesNotDo: 'Does not do',
        safeLimits: 'Safe limits',
        safeLimitsBody:
          'This twin prepares, summarizes, prioritizes, and documents. Commercial, legal, financial, or reputational decisions still require human approval.',
        supervisionModel: 'Supervision model',
        profile: 'Digital twin profile',
        marketFit: 'Market fit',
        replacementScope: 'Replacement scope',
        operationalReplacement: 'Operational replacement',
        repeatableLoad: 'of repeatable load',
        requiredSupervision: 'Required supervision',
        coreKpis: 'Core KPIs',
        coreRoutines: 'Core routines',
        inputRequirements: 'Input requirements',
        deliverableShape: 'Deliverable shape',
        exampleTasks: 'Example tasks',
        suggestedPrompts: 'Suggested prompts',
        readyToRun: 'Ready to run',
        readyBody: 'Sign up to run this twin and receive a structured deliverable saved to your workspace.',
        requiredPlan: 'Required plan',
        signUp: 'Sign up',
        signIn: 'Sign in',
        relatedAgents: 'Related twins',
        digitalTwin: 'Digital twin',
      }
}

function getCommercialCard(locale: MarketingLocale, agent: NonNullable<ReturnType<typeof getAgentBySlug>>) {
  const score = agent.twinProfile?.operationalReplacementScore ?? 0
  const supervision = agent.twinProfile?.supervisionLevel ?? 'medium'
  const firstOutput = agent.outputFormat[0] ?? (locale === 'es' ? 'Entregable operativo inicial' : 'Initial operating deliverable')
  const firstInput = agent.inputRequirements[0] ?? (locale === 'es' ? 'Contexto del proceso' : 'Process context')

  if (!agent.twinProfile) {
    return {
      problem:
        locale === 'es'
          ? 'Trabajo especializado que necesita estructura, criterios claros y salida reutilizable.'
          : 'Specialized work that needs structure, clear criteria, and reusable output.',
      savings:
        locale === 'es'
          ? 'Ahorro variable segun volumen, calidad del contexto y repeticion del flujo.'
          : 'Variable savings depending on volume, context quality, and workflow repetition.',
      firstResult:
        locale === 'es'
          ? `${firstOutput} construido desde ${firstInput.toLowerCase()}.`
          : `${firstOutput} built from ${firstInput.toLowerCase()}.`,
      supervision:
        locale === 'es'
          ? 'Revision humana recomendada antes de usar entregables en produccion.'
          : 'Human review recommended before using deliverables in production.',
      needsApprovalFor: [],
      doesNotDo: [],
      score,
      supervisionLevel: supervision,
    }
  }

  const savingsBySlug: Record<string, { es: string; en: string; problemEs: string; problemEn: string }> = {
    'twin-ejecutivo-comercial-b2b-chile': {
      es: '5-8 h/semana por ejecutivo comercial.',
      en: '5-8 h/week per sales executive.',
      problemEs: 'Seguimiento inconsistente, pipeline desordenado y proximas acciones que dependen de memoria individual.',
      problemEn: 'Inconsistent follow-up, messy pipeline, and next actions that depend on individual memory.',
    },
    'twin-analista-licitaciones-chile': {
      es: '25-45 h/mes en lectura inicial, requisitos y checklist documental.',
      en: '25-45 h/month on first-pass review, requirements, and document checklists.',
      problemEs: 'Bases extensas, riesgo documental y decisiones go/no-go lentas antes de postular.',
      problemEn: 'Long bid docs, document risk, and slow go/no-go decisions before submission.',
    },
    'twin-cobranza-pyme-chile': {
      es: '30-50 h/mes en priorizacion, mensajes y seguimiento de promesas de pago.',
      en: '30-50 h/month on prioritization, messages, and payment-promise follow-up.',
      problemEs: 'Cartera vencida sin priorizacion, promesas de pago dispersas y escalamiento poco visible.',
      problemEn: 'Overdue portfolio without prioritization, scattered payment promises, and unclear escalation.',
    },
    'twin-pm-implementacion-chile': {
      es: '4-7 h/semana en minutas, bloqueos, handoffs y seguimiento de hitos.',
      en: '4-7 h/week on minutes, blockers, handoffs, and milestone follow-up.',
      problemEs: 'Perdida de contexto entre reuniones, bloqueos invisibles y responsables poco claros.',
      problemEn: 'Context loss between meetings, invisible blockers, and unclear owners.',
    },
    'twin-reclutador-operativo-chile': {
      es: '20-35 h/mes en screening inicial, ranking y seguimiento de vacantes.',
      en: '20-35 h/month on initial screening, ranking, and vacancy follow-up.',
      problemEs: 'Vacantes desordenadas, criterios inconsistentes y seguimiento manual de candidatos.',
      problemEn: 'Messy vacancies, inconsistent criteria, and manual candidate follow-up.',
    },
  }

  const match = savingsBySlug[agent.slug]
  const englishBoundariesBySlug: Record<string, { needsApprovalFor: string[]; doesNotDo: string[] }> = {
    'twin-ejecutivo-comercial-b2b-chile': {
      needsApprovalFor: ['Discounts or price changes', 'Final proposals', 'Contract commitments'],
      doesNotDo: ['Does not negotiate final terms', 'Does not approve contracts', 'Does not promise timelines without a human owner'],
    },
    'twin-analista-licitaciones-chile': {
      needsApprovalFor: ['Final bid decision', 'Sensitive legal interpretation', 'Economic offer'],
      doesNotDo: ['Does not sign documents', 'Does not replace legal review', 'Does not define final pricing'],
    },
    'twin-cobranza-pyme-chile': {
      needsApprovalFor: ['Special payment agreements', 'Service blocks', 'Legal escalation'],
      doesNotDo: ['Does not threaten customers', 'Does not renegotiate debt without policy', 'Does not execute legal actions'],
    },
    'twin-pm-implementacion-chile': {
      needsApprovalFor: ['Scope changes', 'Final committed dates', 'Executive escalation'],
      doesNotDo: ['Does not change contracts', 'Does not reprioritize roadmap without sponsor', 'Does not promise delivery without the team'],
    },
    'twin-reclutador-operativo-chile': {
      needsApprovalFor: ['Final selection', 'Job offer', 'Sensitive evaluations'],
      doesNotDo: ['Does not discriminate on protected attributes', 'Does not decide final hiring', 'Does not negotiate compensation without a recruiter'],
    },
  }
  const englishBoundaries = englishBoundariesBySlug[agent.slug]

  return {
    problem:
      locale === 'es'
        ? agent.twinProfile.businessProblem ?? match?.problemEs ?? `Rutinas repetitivas de ${agent.role.toLowerCase()} que necesitan continuidad, memoria y handoff.`
        : match?.problemEn ?? agent.twinProfile.businessProblem ?? `Repeatable ${agent.role.toLowerCase()} routines that need continuity, memory, and handoff.`,
    savings:
      locale === 'es'
        ? agent.twinProfile.expectedSavings ?? match?.es ?? `Replacement estimado de ${score}% de la carga repetible.`
        : match?.en ?? agent.twinProfile.expectedSavings ?? `Estimated replacement of ${score}% of repeatable load.`,
    firstResult:
      locale === 'es'
        ? agent.twinProfile.firstResult ?? `${firstOutput} con owner, siguiente paso y memoria del proceso.`
        : `${firstOutput} with owner, next step, and process memory.`,
    supervision:
      locale === 'es'
        ? `${supervision === 'high' ? 'Alta' : supervision === 'low' ? 'Baja' : 'Media'}: el twin ejecuta rutina repetible y escala excepciones a humano.`
        : `${supervision === 'high' ? 'High' : supervision === 'low' ? 'Low' : 'Medium'}: the twin runs repeatable routine work and escalates exceptions to a human.`,
    needsApprovalFor: locale === 'en' ? englishBoundaries?.needsApprovalFor ?? [] : agent.twinProfile.needsApprovalFor ?? [],
    doesNotDo: locale === 'en' ? englishBoundaries?.doesNotDo ?? [] : agent.twinProfile.doesNotDo ?? [],
    score,
    supervisionLevel: supervision,
  }
}

export function LocalizedAgentDetailPage({
  locale,
  slug,
}: {
  locale: MarketingLocale
  slug: string
}) {
  const copy = getAgentDetailCopy(locale)
  const agent = getAgentBySlug(slug)
  if (!agent) notFound()
  const commercialCard = getCommercialCard(locale, agent)

  const relatedAgents = SEED_AGENTS.filter(
    (a) => a.id !== agent.id && (a.division === agent.division || a.suggestedPrompts.some(() => true))
  ).slice(0, 3)

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_30%),linear-gradient(to_bottom,_#f8fafc,_#ffffff_24%,_#f8fafc_100%)]">
      <PublicNavbar />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <nav className="mb-6 flex items-center gap-1 text-xs text-slate-700">
          <Link href={getLocalizedHref(locale, '/agents')} className="transition-colors hover:text-foreground">
            {copy.breadcrumb}
          </Link>
          <ChevronRight size={12} />
          <span className="text-foreground">{agent.name}</span>
        </nav>

        <section className="mb-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#ffffff_40%,#eef2ff_100%)] shadow-[0_18px_60px_-44px_rgba(15,23,42,0.45)]">
          <div className="grid gap-8 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <DivisionBadge division={agent.division} />
                <PlanBadge plan={agent.planRequired} />
                {agent.roleMode === 'digital-twin' ? <span className="n3-chip-soft">{copy.digitalTwin}</span> : null}
                {agent.marketFocus ? <span className="n3-chip-soft">{agent.marketFocus}</span> : null}
              </div>
              <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
                {agent.name}
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
                {agent.longDescription}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={getLocalizedHref(locale, '/signup')} className="inline-flex items-center rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/80">
                  {copy.runThisTwin} <ArrowRight size={14} className="ml-1.5" />
                </Link>
                <Link href={getLocalizedHref(locale, '/pricing')} className="inline-flex items-center rounded-lg border border-slate-200 bg-background px-3 py-2 text-sm font-medium text-foreground hover:bg-slate-100">
                  {copy.comparePlans}
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                [copy.role, agent.role],
                [copy.mission, agent.mission],
                [copy.bestUse, agent.whenToUse],
                [copy.outputShape, copy.outputShapeBody],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-4 shadow-[0_12px_36px_-32px_rgba(15,23,42,0.5)]">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-700">{title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_60px_-44px_rgba(15,23,42,0.45)]">
          <div className="grid gap-px bg-slate-200 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-[#0f172a] p-6 text-white lg:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">{copy.commercialFit}</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">{agent.twinProfile?.roleLabel ?? agent.role}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-200">{commercialCard.problem}</p>
              <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                <div className="bg-white/10 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300">Replacement</p>
                  <p className="mt-2 text-3xl font-light tracking-[-0.04em]">{commercialCard.score || 'N/A'}{commercialCard.score ? '%' : ''}</p>
                </div>
                <div className="bg-white/10 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300">Supervision</p>
                  <p className="mt-2 text-3xl font-light capitalize tracking-[-0.04em]">{commercialCard.supervisionLevel}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-px bg-slate-200 sm:grid-cols-2">
              {[
                [copy.replicatedRole, agent.role],
                [copy.expectedSavings, commercialCard.savings],
                [copy.firstResult, commercialCard.firstResult],
                [copy.supervisionModel, commercialCard.supervision],
                [copy.businessProblem, commercialCard.problem],
                [copy.safeLimits, copy.safeLimitsBody],
              ].map(([title, body]) => (
                <div key={title} className="bg-[#fbfbfa] p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">{title}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-800">{body}</p>
                </div>
              ))}
              {commercialCard.needsApprovalFor.length ? (
                <div className="bg-[#fbfbfa] p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">{copy.approvalRequired}</p>
                  <ul className="mt-3 space-y-2">
                    {commercialCard.needsApprovalFor.map((item) => (
                      <li key={item} className="text-sm leading-6 text-slate-800">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {commercialCard.doesNotDo.length ? (
                <div className="bg-[#fbfbfa] p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">{copy.doesNotDo}</p>
                  <ul className="mt-3 space-y-2">
                    {commercialCard.doesNotDo.map((item) => (
                      <li key={item} className="text-sm leading-6 text-slate-800">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            {agent.twinProfile ? (
              <section className="rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
                <h2 className="text-sm font-semibold text-foreground">{copy.profile}</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-700">{copy.marketFit}</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground">{agent.twinProfile.targetCompanies}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-700">{copy.replacementScope}</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground">{agent.twinProfile.replacementScope}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-700">{copy.operationalReplacement}</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground">{agent.twinProfile.operationalReplacementScore ?? 0}% {copy.repeatableLoad}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-700">{copy.requiredSupervision}</p>
                    <p className="mt-2 text-sm capitalize leading-relaxed text-foreground">{agent.twinProfile.supervisionLevel ?? 'medium'}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-700">{copy.coreKpis}</p>
                    <ul className="mt-2 space-y-2">
                      {agent.twinProfile.keyKPIs.map((item) => (
                        <li key={item} className="text-sm leading-relaxed text-slate-700">{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-700">{copy.coreRoutines}</p>
                    <ul className="mt-2 space-y-2">
                      {agent.twinProfile.coreRoutines.map((item) => (
                        <li key={item} className="text-sm leading-relaxed text-slate-700">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            ) : null}

            <section className="rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
              <h2 className="text-sm font-semibold text-foreground">{copy.inputRequirements}</h2>
              <ul className="mt-4 space-y-3">
                {agent.inputRequirements.map((req) => (
                  <li key={req} className="flex items-start gap-2 text-sm leading-relaxed text-slate-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {req}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
              <h2 className="text-sm font-semibold text-foreground">{copy.deliverableShape}</h2>
              <ul className="mt-4 space-y-3">
                {agent.outputFormat.map((fmt) => (
                  <li key={fmt} className="flex items-start gap-2 text-sm leading-relaxed text-slate-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-700" />
                    {fmt}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
              <h2 className="text-sm font-semibold text-foreground">{copy.exampleTasks}</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {agent.exampleTasks.map((task) => (
                  <Link
                    key={task}
                    href={getLocalizedHref(locale, '/signup')}
                    className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4 text-sm leading-relaxed text-foreground transition-colors hover:border-primary/25 hover:bg-slate-50"
                  >
                    {task}
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
              <h2 className="text-sm font-semibold text-foreground">{copy.suggestedPrompts}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {agent.suggestedPrompts.map((prompt) => (
                  <Link
                    key={prompt}
                    href={getLocalizedHref(locale, '/signup')}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 transition-colors hover:border-primary/25 hover:bg-slate-50 hover:text-slate-950"
                  >
                    {prompt}
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-5">
            <div className="sticky top-24 rounded-2xl border border-slate-900/10 bg-[linear-gradient(135deg,#0f172a,#111827_55%,#334155)] p-6 text-white shadow-[0_20px_80px_rgba(15,23,42,0.18)]">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/14 px-3 py-1 text-xs font-medium text-white/90">
                <Sparkles size={12} />
                {copy.readyToRun}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-200">{copy.readyBody}</p>
              <div className="mt-5 rounded-2xl border border-white/14 bg-white/14 p-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/88">{copy.requiredPlan}</p>
                <div className="mt-3">
                  <PlanBadge plan={agent.planRequired} />
                </div>
              </div>
              <div className="mt-5 space-y-2">
                <Link href={getLocalizedHref(locale, '/signup')} className="inline-flex w-full items-center justify-center rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-950 hover:bg-slate-100">
                  {copy.runThisTwin} <ArrowRight size={14} className="ml-1.5" />
                </Link>
                <Link href={getLocalizedHref(locale, '/login')} className="inline-flex w-full items-center justify-center rounded-lg border border-white/24 bg-white/14 px-3 py-2 text-sm font-medium text-white hover:bg-white/18">
                  {copy.signIn}
                </Link>
              </div>
            </div>

            {relatedAgents.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                  {copy.relatedAgents}
                </h3>
                <div className="mt-4 space-y-3">
                  {relatedAgents.map((related) => (
                    <Link
                      key={related.id}
                      href={getLocalizedAgentHref(locale, related.slug)}
                      className="group flex items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4 transition-colors hover:border-primary/25 hover:bg-slate-50"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground group-hover:text-primary">
                          {related.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-700">{related.division}</p>
                      </div>
                      <ArrowRight size={12} className="mt-1 shrink-0 text-slate-700" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  )
}
