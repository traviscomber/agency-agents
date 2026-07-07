export const MARKETING_LOCALES = ['es', 'en'] as const

export type MarketingLocale = (typeof MARKETING_LOCALES)[number]

export function isMarketingLocale(value: string): value is MarketingLocale {
  return MARKETING_LOCALES.includes(value as MarketingLocale)
}

export function getLocaleFromPathname(pathname: string): MarketingLocale | null {
  const [firstSegment] = pathname.split('/').filter(Boolean)
  return firstSegment && isMarketingLocale(firstSegment) ? firstSegment : null
}

export function getLocalizedHref(locale: MarketingLocale, href: string) {
  if (href === '/') return `/${locale}`
  if (href === '/agents') return `/${locale}/agents`
  if (href === '/pricing') return `/${locale}/pricing`
  if (href === '/chile') return locale === 'es' ? '/es/chile' : '/en/latam'
  if (href === '/industries') return locale === 'es' ? '/es/industrias' : '/en/industries'
  if (href === '/roles') return `/${locale}/roles`
  if (href === '/demo') return `/${locale}/demo`
  if (href === '/playbooks') return `/${locale}/playbooks`
  if (href === '/implementation') return locale === 'es' ? '/es/implementacion' : '/en/implementation'
  if (href === '/trust') return locale === 'es' ? '/es/seguridad' : '/en/trust'
  if (href === '/roi') return locale === 'es' ? '/es/calculadora-roi' : '/en/roi'
  if (href === '/diagnosis') return locale === 'es' ? '/es/diagnostico' : '/en/diagnosis'
  if (href === '/signup') return `/${locale}/signup`
  if (href === '/login') return `/${locale}/login`
  if (href === '/forgot-password') return `/${locale}/forgot-password`
  if (href === '/signup-success') return `/${locale}/signup-success`
  if (href === '/privacy') return locale === 'es' ? '/es/privacidad' : '/en/privacy'
  if (href === '/terms') return locale === 'es' ? '/es/terminos' : '/en/terms'
  if (href === '/contact') return `/${locale}/contact`
  return href
}

export function getLocalizedAgentHref(locale: MarketingLocale, slug: string) {
  return `/${locale}/agents/${slug}`
}

export function buildLocaleAlternates(pathByLocale: Record<MarketingLocale, string>) {
  return {
    canonical: pathByLocale.es,
    languages: {
      'es-CL': pathByLocale.es,
      es: pathByLocale.es,
      'en-US': pathByLocale.en,
      en: pathByLocale.en,
      'x-default': pathByLocale.es,
    },
  }
}

export const publicNavbarCopy = {
  es: {
    brandSubline: 'Twin OS Latam',
    navItems: [
      { href: '/chile', label: 'Chile' },
      { href: '/industries', label: 'Industrias' },
      { href: '/roles', label: 'Roles' },
      { href: '/demo', label: 'Demo' },
      { href: '/implementation', label: 'Implementacion' },
      { href: '/trust', label: 'Confianza' },
      { href: '/playbooks', label: 'Playbooks' },
      { href: '/roi', label: 'ROI' },
      { href: '/diagnosis', label: 'Diagnostico' },
      { href: '/agents', label: 'Twins' },
      { href: '/pricing', label: 'Planes' },
    ],
    login: 'Ingresar',
    cta: 'Diagnostico',
  },
  en: {
    brandSubline: 'Twin OS Latam',
    navItems: [
      { href: '/chile', label: 'Latam' },
      { href: '/industries', label: 'Industries' },
      { href: '/roles', label: 'Roles' },
      { href: '/demo', label: 'Demo' },
      { href: '/implementation', label: 'Implementation' },
      { href: '/trust', label: 'Trust' },
      { href: '/playbooks', label: 'Playbooks' },
      { href: '/roi', label: 'ROI' },
      { href: '/diagnosis', label: 'Diagnosis' },
      { href: '/agents', label: 'Twins' },
      { href: '/pricing', label: 'Pricing' },
    ],
    login: 'Log in',
    cta: 'Create diagnosis',
  },
} satisfies Record<
  MarketingLocale,
  {
    brandSubline: string
    navItems: Array<{ href: string; label: string }>
    login: string
    cta: string
  }
>

export const publicFooterCopy = {
  es: {
    groups: {
      Producto: [
        { href: '/chile', label: 'Chile y Latam' },
        { href: '/industries', label: 'Industrias' },
        { href: '/roles', label: 'Roles operativos' },
        { href: '/implementation', label: 'Implementacion 30 dias' },
        { href: '/trust', label: 'Seguridad y supervision' },
        { href: '/roi', label: 'Calculadora ROI' },
        { href: '/diagnosis', label: 'Diagnostico operativo' },
        { href: '/agents', label: 'Twins' },
        { href: '/pricing', label: 'Planes' },
        { href: '/app', label: 'Workspace' },
      ],
      Cuenta: [
        { href: '/signup', label: 'Crear cuenta' },
        { href: '/login', label: 'Ingresar' },
        { href: '/forgot-password', label: 'Recuperar acceso' },
      ],
      Region: [
        { href: '/es', label: 'Chile y Latam' },
        { href: '/en', label: 'English site' },
      ],
      Legal: [
        { href: '/terms', label: 'Terminos' },
        { href: '/privacy', label: 'Privacidad' },
      ],
    },
    description:
      'Un sistema operativo para trabajo digital supervisado en Chile y Latam: twins por rol, memoria operativa, handoffs y entregables reutilizables.',
    rights: 'Todos los derechos reservados.',
  },
  en: {
    groups: {
      Product: [
        { href: '/chile', label: 'Chile and Latam' },
        { href: '/industries', label: 'Industries' },
        { href: '/roles', label: 'Operating roles' },
        { href: '/implementation', label: '30-day implementation' },
        { href: '/trust', label: 'Trust and supervision' },
        { href: '/roi', label: 'ROI calculator' },
        { href: '/diagnosis', label: 'Operating diagnosis' },
        { href: '/agents', label: 'Twins' },
        { href: '/pricing', label: 'Pricing' },
        { href: '/app', label: 'Workspace' },
      ],
      Account: [
        { href: '/signup', label: 'Create account' },
        { href: '/login', label: 'Log in' },
        { href: '/forgot-password', label: 'Reset password' },
      ],
      Region: [
        { href: '/es', label: 'Sitio en espanol' },
        { href: '/en', label: 'Chile and Latam focus' },
      ],
      Legal: [
        { href: '/terms', label: 'Terms' },
        { href: '/privacy', label: 'Privacy' },
      ],
    },
    description:
      'An operating system for supervised digital work in Chile and Latam: role twins, workflow memory, handoffs, and reusable deliverables.',
    rights: 'All rights reserved.',
  },
} satisfies Record<
  MarketingLocale,
  {
    groups: Record<string, Array<{ href: string; label: string }>>
    description: string
    rights: string
  }
>

export const landingCopy = {
  es: {
    metaTitle: 'N3uralia Twin OS | Gemelos digitales para Chile y Latam',
    metaDescription:
      'N3uralia Studio convierte roles digitales repetibles en twins supervisados para Chile y Latam, con memoria operativa, KPIs, handoffs y alcance de replacement visible.',
    badge: 'N3uralia Twin OS para Chile y Latam',
    heroTitle: 'Despliega trabajadores digitales supervisados para ventas, cobranza, licitaciones e implementacion.',
    heroBody:
      'N3uralia Studio convierte trabajos recurrentes en twins supervisados con memoria, KPIs, handoffs y replacement visible para ventas, licitaciones, cobranza, implementación y reclutamiento.',
    heroPrimary: 'Desplegar primer gemelo',
    heroSecondary: 'Ver roles disponibles',
    heroSignals: [
      ['Cobertura por rol', 'Twin por cargo, vertical y rutina'],
      ['Memoria operativa', 'Estado reutilizable por cuenta o proyecto'],
      ['Handoffs supervisados', 'Escalamiento humano explícito'],
    ],
    controlSurfaceBadges: ['Twin control surface', 'Chile y Latam ready workflows'],
    deployable: 'Desplegable',
    controlRows: [
      ['Replacement score', '72% a 86% según rol'],
      ['Supervisión', 'Media por defecto, alta en excepciones'],
      ['Siguiente movimiento', 'Asignar el twin correcto con contexto heredado'],
    ],
    whyThisMattersTitle: 'Por qué importa',
    whyThisMattersBody:
      'Los equipos no necesitan más IA genérica. Necesitan replicar roles operativos con contexto, controles y límites visibles. Esta superficie vuelve eso desplegable.',
    differentiators: [
      ['No vendemos agentes', 'Vendemos capacidad operativa digital: roles desplegables para trabajo real en Chile y Latam, no una caja en blanco para prompts genericos.'],
      ['Replicable por cargo', 'Cada twin trae rutinas, KPIs, límites y formatos de salida conectados a un puesto concreto.'],
      ['Medible como operación', 'Replacement, supervision y execution history hacen el sistema legible para líderes y operadores.'],
      ['Diseñado para ejecución supervisada', 'Los twins absorben carga repetitiva mientras la decisión legal, comercial o estratégica sigue explícitamente en humanos.'],
    ],
    loopEyebrow: 'Loop operativo del twin',
    loopTitle: 'El producto debe replicar trabajo, no solo generar respuestas.',
    loopBody:
      'La promesa comercial es replacement supervisado: cada twin debe absorber carga repetible y dejar un estado operativo más fuerte detrás.',
    sequence: [
      ['01', 'Selecciona el twin del rol', 'Parte desde un rol replicable con rutinas, KPIs y límites locales, no desde un chat genérico.'],
      ['02', 'Carga cuenta y proceso', 'Entrega cliente, oportunidad, workflow y restricciones para que la ejecución herede el estado correcto.'],
      ['03', 'Ejecuta la rutina con memoria', 'Deja que el twin haga follow-up, screening, coordinación o trabajo documental preservando outputs y decisiones.'],
      ['04', 'Escala lo que siga siendo humano', 'Mantén aprobaciones, excepciones y decisiones estratégicas en una persona mientras la carga repetitiva se automatiza.'],
    ],
    winsEyebrow: 'Por qué gana',
    winsTitle: 'Diseñado alrededor de roles que puedes desplegar, supervisar y escalar.',
    proofStack: [
      ['Sistema de roles', 'Cada twin tiene un trabajo a replicar, un market fit y un operating envelope visible.', 'Eso mueve el producto desde tooling de IA hacia despliegue de trabajo digital por rol.'],
      ['Control', 'Cada programa muestra lo que el twin puede absorber y lo que aún necesita supervisión.', 'Eso hace medible el replacement.'],
      ['Handoff', 'El siguiente humano o twin hereda memoria, outputs y decisiones pendientes.', 'La continuidad es parte del producto.'],
    ],
    cases: [
      ['Ventas B2B Chile y Latam', 'Despliega un twin comercial que mantenga pipeline, follow-up y próximos pasos disciplinados por cuenta activa.'],
      ['Licitaciones y documentos', 'Usa un twin de licitaciones para clasificar oportunidades, ordenar requisitos y surfacer riesgos antes del sign-off humano.'],
      ['Cobranza e implementación', 'Corre rutinas repetitivas de cobranza y coordinación con reglas explícitas de escalamiento.'],
    ],
    featuredEyebrow: 'Twins destacados',
    featuredTitle: 'Empieza por los trabajos que los equipos repiten cada semana.',
    featuredCta: 'Ver todos los twins',
    workspaceEyebrow: 'Workspace listo para operar',
    workspaceTitle: 'Si el output desaparece después de una corrida, todavía no es operativo.',
    workspaceBody:
      'Puedes partir con un twin. El valor compuesto aparece cuando brief, workflow, packet, archivo de entregables y próximo movimiento viven en el mismo sistema.',
    workspacePrimary: 'Crear cuenta',
    workspaceSecondary: 'Ver planes',
  },
  en: {
    metaTitle: 'N3uralia Studio | Twin OS for operating roles in Chile and Latam',
    metaDescription:
      'N3uralia Studio turns repeatable digital work into supervised twins for Chile and Latam, with operating memory, KPIs, handoffs, and visible replacement scope.',
    badge: 'Twin OS for operating roles in Chile and Latam',
    heroTitle: 'Deploy digital twins for real operating roles in Chile and Latam.',
    heroBody:
      'N3uralia Studio turns recurring jobs into supervised twins with memory, KPIs, handoffs, and visible replacement scope across sales, tenders, collections, implementation, and recruiting.',
    heroPrimary: 'Deploy the first twin',
    heroSecondary: 'Inspect Twin OS',
    heroSignals: [
      ['Role coverage', 'Twin by role, vertical, and routine'],
      ['Operational memory', 'Reusable state per account or project'],
      ['Supervised handoffs', 'Explicit human escalation'],
    ],
    controlSurfaceBadges: ['Twin control surface', 'Chile and Latam ready workflows'],
    deployable: 'Deployable',
    controlRows: [
      ['Replacement score', '72% to 86% by role'],
      ['Supervision', 'Medium by default, high for exceptions'],
      ['Next move', 'Route the right twin with inherited context'],
    ],
    whyThisMattersTitle: 'Why this matters',
    whyThisMattersBody:
      'Teams do not need more generic AI. They need to replicate operating roles with context, controls, and visible limits. This surface makes that deployable.',
    differentiators: [
      ['Not another agent builder', 'The differentiator is a deployable role system for real work in Chile and Latam, not a blank canvas for generic prompts.'],
      ['Replicable by role', 'Each twin ships with routines, KPIs, boundaries, and output formats tied to a specific job.'],
      ['Measured like an operation', 'Replacement, supervision, and execution history make the system legible for leaders and operators.'],
      ['Built for supervised execution', 'Twins absorb repetitive load while legal, commercial, or strategic calls remain explicitly human.'],
    ],
    loopEyebrow: 'Twin operating loop',
    loopTitle: 'The product should replicate work, not just generate answers.',
    loopBody:
      'The commercial promise is supervised replacement: each twin should absorb repeatable load and leave a stronger operating state behind.',
    sequence: [
      ['01', 'Select the role twin', 'Start from a replicable role with local routines, KPIs, and boundaries instead of a generic chat box.'],
      ['02', 'Load account and process context', 'Pass the client, opportunity, workflow, and constraints so execution inherits the right state.'],
      ['03', 'Execute the routine with memory', 'Let the twin run follow-up, screening, coordination, or document work while preserving outputs and decisions.'],
      ['04', 'Escalate what still needs a human', 'Keep approvals, exceptions, and strategic calls with a person while repetitive load stays automated.'],
    ],
    winsEyebrow: 'Why this wins',
    winsTitle: 'Built around roles you can deploy, supervise, and scale.',
    proofStack: [
      ['Role system', 'Every twin has a job to replicate, a market fit, and a visible operating envelope.', 'That moves the product from AI tooling into deployable digital labor by role.'],
      ['Control', 'Each program exposes what the twin can absorb and what still needs supervision.', 'That makes replacement measurable.'],
      ['Handoff', 'The next human or twin inherits memory, outputs, and pending decisions.', 'Continuity is built into the product.'],
    ],
    cases: [
      ['B2B sales in Chile and Latam', 'Deploy a commercial twin that keeps pipeline, follow-up, and next actions disciplined across active accounts.'],
      ['Tenders and document work', 'Use a tenders twin to classify opportunities, organize requirements, and surface risks before human sign-off.'],
      ['Collections and implementation', 'Run repetitive collections and delivery coordination routines with explicit escalation rules.'],
    ],
    featuredEyebrow: 'Featured twins',
    featuredTitle: 'Start from the jobs teams repeat every week.',
    featuredCta: 'Browse all twins',
    workspaceEyebrow: 'Operator-ready workspace',
    workspaceTitle: 'If the output disappears after one run, it is not operational yet.',
    workspaceBody:
      'You can start with one twin. The compound value appears when the brief, workflow, packet, deliverable archive, and next move live in the same system.',
    workspacePrimary: 'Create account',
    workspaceSecondary: 'View plans',
  },
} satisfies Record<MarketingLocale, any>

export const chileLatamPageCopy = {
  es: {
    metaTitle: 'Gemelos digitales para empresas chilenas | N3uralia Studio',
    metaDescription:
      'Replica puestos criticos con gemelos digitales supervisados para ventas, licitaciones, operaciones, cobranza e implementacion en Chile y Latam.',
    eyebrow: 'Gemelos digitales para Chile y Latam',
    title: 'Convierte cargos criticos de tu empresa en gemelos digitales supervisados.',
    body:
      'N3uralia ayuda a empresas chilenas a capturar la forma real de trabajar de sus mejores personas y convertirla en capacidad digital repetible, medible y supervisada.',
    primary: 'Calcular ROI en CLP',
    secondary: 'Ver roles replicables',
    proof: [
      ['Menos dependencia del duenio', 'El conocimiento operativo queda documentado como rutinas, criterios y entregables reutilizables.'],
      ['Mas capacidad sin agrandar estructura', 'Los gemelos digitales ejecutan seguimiento, analisis, preparacion y handoffs con supervision humana.'],
      ['Chile primero', 'El lenguaje, los roles y los casos estan pensados para pymes, proveedores, servicios e industrias de Chile y Latam.'],
    ],
    industriesTitle: 'Casos aplicados a perfiles del mercado chileno',
    industries: [
      ['Proveedores industriales y mineria', 'Licitaciones, reportes, seguimiento comercial, soporte documental y continuidad de proyectos.'],
      ['Construccion e inmobiliaria', 'Coordinacion de obra, seguimiento de pendientes, postventa, compras y control de compromisos.'],
      ['Servicios profesionales', 'Diagnosticos, propuestas, entregables, investigacion y coordinacion de clientes.'],
      ['Logistica y distribucion', 'Incidencias, coordinacion, priorizacion de cuentas, cobranza y comunicacion operativa.'],
    ],
    operatingModelTitle: 'Modelo de venta: diagnostico, gemelo, supervision y mejora',
    operatingModel: [
      ['1. Diagnostico del cargo', 'Identificamos tareas repetibles, criterio experto, riesgos y datos necesarios.'],
      ['2. Gemelo digital inicial', 'Creamos un perfil operativo con instrucciones, limites, outputs y rutina semanal.'],
      ['3. Supervision humana', 'Definimos que ejecuta solo, que requiere aprobacion y que queda fuera de alcance.'],
      ['4. Medicion de ROI', 'Medimos horas recuperadas, velocidad de respuesta, calidad de entregables y dependencia reducida.'],
    ],
  },
  en: {
    metaTitle: 'Digital twins for Chile and Latam companies | N3uralia Studio',
    metaDescription:
      'Replicate critical work roles with supervised digital twins for sales, tenders, operations, collections, and implementation across Chile and Latam.',
    eyebrow: 'Digital twins for Chile and Latam',
    title: 'Turn critical work roles into supervised digital twins.',
    body:
      'N3uralia helps Chile and Latam companies capture how their best people work and turn that operating knowledge into repeatable, measurable, supervised digital capacity.',
    primary: 'Calculate ROI',
    secondary: 'View replicable roles',
    proof: [
      ['Less founder dependency', 'Operating knowledge becomes documented routines, criteria, and reusable deliverables.'],
      ['More capacity without more structure', 'Digital twins execute follow-up, analysis, preparation, and handoffs with human supervision.'],
      ['Built for Latam', 'The language, roles, and use cases map to SMEs, suppliers, services, and industrial teams in Chile and Latam.'],
    ],
    industriesTitle: 'Applied use cases for Chile and Latam profiles',
    industries: [
      ['Industrial and mining suppliers', 'Tenders, reports, commercial follow-up, documentation support, and project continuity.'],
      ['Construction and real estate', 'Site coordination, task follow-up, post-sale service, procurement, and commitment tracking.'],
      ['Professional services', 'Diagnostics, proposals, deliverables, research, and client coordination.'],
      ['Logistics and distribution', 'Incidents, coordination, account prioritization, collections, and operating communication.'],
    ],
    operatingModelTitle: 'Sales model: diagnosis, twin, supervision, and improvement',
    operatingModel: [
      ['1. Role diagnosis', 'We identify repeatable tasks, expert judgment, risks, and required inputs.'],
      ['2. Initial digital twin', 'We create an operating profile with instructions, limits, outputs, and weekly routines.'],
      ['3. Human supervision', 'We define what runs autonomously, what needs approval, and what remains out of scope.'],
      ['4. ROI measurement', 'We measure recovered hours, response speed, deliverable quality, and reduced dependency.'],
    ],
  },
} satisfies Record<MarketingLocale, any>

export const rolesPageCopy = {
  es: {
    metaTitle: 'Roles replicables con gemelos digitales | N3uralia Studio',
    metaDescription:
      'Explora cargos chilenos que pueden convertirse en gemelos digitales supervisados con alcance de reemplazo, supervision y ahorro estimado.',
    eyebrow: 'Biblioteca de roles replicables',
    title: 'Cargos que una empresa chilena puede convertir en gemelos digitales.',
    body:
      'No vendemos agentes sueltos: modelamos puestos de trabajo completos con rutinas, outputs, limites, supervision y metricas de capacidad.',
    cta: 'Crear diagnostico gratis',
    tableHeaders: ['Rol', 'Que replica', 'Supervision', 'Ahorro potencial'],
    roles: [
      ['Ejecutivo comercial B2B', 'Follow-up, discovery, recap de reuniones, avance de pipeline y propuestas iniciales.', 'Media', '35 a 55 horas/mes'],
      ['Analista de licitaciones', 'Lectura de bases, go/no-go, checklist documental, riesgos y plan de respuesta.', 'Alta', '25 a 45 horas/mes'],
      ['Cobranza pyme', 'Priorizacion de cuentas, promesas de pago, mensajes y trazabilidad.', 'Media', '30 a 50 horas/mes'],
      ['PM de implementacion', 'Hitos, bloqueos, responsables, minutas, handoffs y seguimiento semanal.', 'Media', '40 a 70 horas/mes'],
      ['Reclutador operativo', 'Screening, pauta de entrevistas, shortlist, seguimiento y reportes.', 'Alta', '25 a 45 horas/mes'],
    ],
  },
  en: {
    metaTitle: 'Replicable roles with digital twins | N3uralia Studio',
    metaDescription:
      'Explore Chile and Latam work roles that can become supervised digital twins with replacement scope, supervision, and estimated savings.',
    eyebrow: 'Replicable role library',
    title: 'Work roles a Chile or Latam company can turn into digital twins.',
    body:
      'We do not sell loose agents. We model full work roles with routines, outputs, limits, supervision, and capacity metrics.',
    cta: 'Create free diagnosis',
    tableHeaders: ['Role', 'What it replicates', 'Supervision', 'Potential savings'],
    roles: [
      ['B2B sales executive', 'Follow-up, discovery, meeting recaps, pipeline movement, and initial proposals.', 'Medium', '35 to 55 hours/month'],
      ['Tender analyst', 'Document review, go/no-go, requirement checklist, risks, and response plan.', 'High', '25 to 45 hours/month'],
      ['SME collections analyst', 'Account prioritization, payment promises, messages, and traceability.', 'Medium', '30 to 50 hours/month'],
      ['Implementation PM', 'Milestones, blockers, owners, minutes, handoffs, and weekly follow-up.', 'Medium', '40 to 70 hours/month'],
      ['Operations recruiter', 'Screening, interview guides, shortlists, follow-up, and reports.', 'High', '25 to 45 hours/month'],
    ],
  },
} satisfies Record<MarketingLocale, any>

export const roiPageCopy = {
  es: {
    metaTitle: 'Calculadora ROI de gemelos digitales en CLP | N3uralia Studio',
    metaDescription:
      'Calcula horas recuperadas y ahorro mensual estimado al convertir cargos operativos en gemelos digitales para empresas chilenas.',
    eyebrow: 'ROI en CLP',
    title: 'Calcula cuanto valor puede recuperar un gemelo digital por cargo.',
    body:
      'Usa esta calculadora como primera estimacion comercial. El diagnostico real define alcance, supervision y datos necesarios por cargo.',
    salaryLabel: 'Costo mensual del cargo en CLP',
    hoursLabel: 'Horas repetibles por mes',
    automationLabel: 'Porcentaje replicable por gemelo digital',
    monthlySavings: 'Ahorro mensual estimado',
    yearlySavings: 'Ahorro anual estimado',
    recoveredHours: 'Horas recuperadas al mes',
    cta: 'Agendar diagnostico',
    assumption:
      'Supuesto: el ahorro combina horas recuperadas y reduccion de dependencia operativa. No reemplaza evaluacion legal, laboral ni financiera.',
  },
  en: {
    metaTitle: 'Digital twin ROI calculator for Chile and Latam | N3uralia Studio',
    metaDescription:
      'Estimate recovered hours and monthly savings when converting operating roles into supervised digital twins.',
    eyebrow: 'ROI calculator',
    title: 'Estimate how much value a digital twin can recover per role.',
    body:
      'Use this calculator as an initial commercial estimate. A real diagnosis defines scope, supervision, and required data per role.',
    salaryLabel: 'Monthly role cost in CLP',
    hoursLabel: 'Repeatable hours per month',
    automationLabel: 'Percentage replicable by digital twin',
    monthlySavings: 'Estimated monthly savings',
    yearlySavings: 'Estimated yearly savings',
    recoveredHours: 'Recovered hours per month',
    cta: 'Book diagnosis',
    assumption:
      'Assumption: savings combine recovered hours and lower operating dependency. This is not legal, labor, or financial advice.',
  },
} satisfies Record<MarketingLocale, any>

export const diagnosisPageCopy = {
  es: {
    metaTitle: 'Diagnostico de gemelos digitales para Chile | N3uralia Studio',
    metaDescription:
      'Evalua que cargo conviene convertir primero en gemelo digital supervisado y estima el ROI operativo en CLP.',
    eyebrow: 'Diagnostico operativo',
    title: 'Encuentra el primer gemelo digital que deberias desplegar.',
    body:
      'Responde cuatro variables simples y recibe una recomendacion comercial: rol prioritario, supervision, horas recuperables y siguiente paso.',
    companyLabel: 'Tipo de empresa',
    pressureLabel: 'Presion operativa principal',
    teamLabel: 'Tamano del equipo',
    monthlyCostLabel: 'Costo mensual aproximado del cargo',
    resultEyebrow: 'Gemelo recomendado',
    supervision: 'Nivel de supervision',
    recoveredHours: 'Horas recuperables',
    estimatedSavings: 'Ahorro mensual estimado',
    nextStep: 'Siguiente paso',
    primary: 'Crear cuenta y guardar diagnostico',
    secondary: 'Ver detalle del gemelo',
    options: {
      company: [
        ['services', 'Servicios profesionales'],
        ['industrial', 'Proveedor industrial/mineria'],
        ['construction', 'Construccion/inmobiliaria'],
        ['logistics', 'Logistica/distribucion'],
        ['saas', 'SaaS o B2B digital'],
      ],
      pressure: [
        ['sales', 'Ventas y seguimiento comercial'],
        ['collections', 'Cobranza y cuentas pendientes'],
        ['tenders', 'Licitaciones y documentos'],
        ['implementation', 'Implementacion y coordinacion'],
        ['recruiting', 'Reclutamiento operativo'],
      ],
      team: [
        ['small', '1 a 10 personas'],
        ['mid', '11 a 50 personas'],
        ['growth', '51 a 200 personas'],
      ],
    },
    recommendations: {
      sales: {
        role: 'Twin de Ejecutivo Comercial B2B Chile',
        slug: 'twin-ejecutivo-comercial-b2b-chile',
        summary: 'Absorbe follow-up, recap de reuniones, priorizacion de pipeline y propuestas iniciales.',
        supervision: 'Media',
        hours: '35 a 55 h/mes',
        savingsFactor: 0.42,
        next: 'Cargar pipeline activo, pricing, objeciones frecuentes y ultimas conversaciones comerciales.',
      },
      collections: {
        role: 'Twin de Cobranza Pyme Chile',
        slug: 'twin-cobranza-pyme-chile',
        summary: 'Prioriza cuentas, prepara mensajes, registra promesas de pago y escala excepciones.',
        supervision: 'Media',
        hours: '30 a 50 h/mes',
        savingsFactor: 0.38,
        next: 'Cargar aging de deuda, politicas de cobranza, historial de contacto y reglas de escalamiento.',
      },
      tenders: {
        role: 'Twin de Analista de Licitaciones Chile',
        slug: 'twin-analista-licitaciones-chile',
        summary: 'Lee bases, arma go/no-go, checklist documental, riesgos y plan de respuesta.',
        supervision: 'Alta',
        hours: '25 a 45 h/mes',
        savingsFactor: 0.34,
        next: 'Cargar bases, criterios de adjudicacion, capacidades de la empresa y deadlines.',
      },
      implementation: {
        role: 'Twin de PM de Implementacion Chile',
        slug: 'twin-pm-implementacion-chile',
        summary: 'Mantiene hitos, bloqueos, responsables, minutas, handoffs y seguimiento semanal.',
        supervision: 'Media',
        hours: '40 a 70 h/mes',
        savingsFactor: 0.45,
        next: 'Cargar proyecto activo, stakeholders, hitos, riesgos y compromisos pendientes.',
      },
      recruiting: {
        role: 'Twin de Reclutador Operativo Chile',
        slug: 'twin-reclutador-operativo-chile',
        summary: 'Ordena screening, pautas de entrevista, shortlist, seguimiento y reportes.',
        supervision: 'Alta',
        hours: '25 a 45 h/mes',
        savingsFactor: 0.32,
        next: 'Cargar perfil del cargo, CVs, criterios de filtro y etapas del proceso.',
      },
    },
  },
  en: {
    metaTitle: 'Digital twin diagnosis for Chile and Latam | N3uralia Studio',
    metaDescription:
      'Evaluate which role should become your first supervised digital twin and estimate operating ROI in CLP.',
    eyebrow: 'Operating diagnosis',
    title: 'Find the first digital twin you should deploy.',
    body:
      'Answer four simple variables and get a commercial recommendation: priority role, supervision, recoverable hours, and next step.',
    companyLabel: 'Company type',
    pressureLabel: 'Main operating pressure',
    teamLabel: 'Team size',
    monthlyCostLabel: 'Approximate monthly role cost',
    resultEyebrow: 'Recommended twin',
    supervision: 'Supervision level',
    recoveredHours: 'Recoverable hours',
    estimatedSavings: 'Estimated monthly savings',
    nextStep: 'Next step',
    primary: 'Create account and save diagnosis',
    secondary: 'View twin detail',
    options: {
      company: [
        ['services', 'Professional services'],
        ['industrial', 'Industrial/mining supplier'],
        ['construction', 'Construction/real estate'],
        ['logistics', 'Logistics/distribution'],
        ['saas', 'SaaS or digital B2B'],
      ],
      pressure: [
        ['sales', 'Sales and commercial follow-up'],
        ['collections', 'Collections and pending accounts'],
        ['tenders', 'Tenders and documents'],
        ['implementation', 'Implementation and coordination'],
        ['recruiting', 'Operations recruiting'],
      ],
      team: [
        ['small', '1 to 10 people'],
        ['mid', '11 to 50 people'],
        ['growth', '51 to 200 people'],
      ],
    },
    recommendations: {
      sales: {
        role: 'B2B Sales Executive Twin Chile',
        slug: 'twin-ejecutivo-comercial-b2b-chile',
        summary: 'Absorbs follow-up, meeting recaps, pipeline prioritization, and initial proposals.',
        supervision: 'Medium',
        hours: '35 to 55 h/month',
        savingsFactor: 0.42,
        next: 'Load active pipeline, pricing, frequent objections, and recent commercial conversations.',
      },
      collections: {
        role: 'SME Collections Twin Chile',
        slug: 'twin-cobranza-pyme-chile',
        summary: 'Prioritizes accounts, drafts messages, records payment promises, and escalates exceptions.',
        supervision: 'Medium',
        hours: '30 to 50 h/month',
        savingsFactor: 0.38,
        next: 'Load debt aging, collections policy, contact history, and escalation rules.',
      },
      tenders: {
        role: 'Tender Analyst Twin Chile',
        slug: 'twin-analista-licitaciones-chile',
        summary: 'Reads tender docs, prepares go/no-go, requirement checklist, risks, and response plan.',
        supervision: 'High',
        hours: '25 to 45 h/month',
        savingsFactor: 0.34,
        next: 'Load tender docs, award criteria, company capabilities, and deadlines.',
      },
      implementation: {
        role: 'Implementation PM Twin Chile',
        slug: 'twin-pm-implementacion-chile',
        summary: 'Keeps milestones, blockers, owners, minutes, handoffs, and weekly follow-up moving.',
        supervision: 'Medium',
        hours: '40 to 70 h/month',
        savingsFactor: 0.45,
        next: 'Load active project, stakeholders, milestones, risks, and pending commitments.',
      },
      recruiting: {
        role: 'Operations Recruiter Twin Chile',
        slug: 'twin-reclutador-operativo-chile',
        summary: 'Organizes screening, interview guides, shortlist, follow-up, and reports.',
        supervision: 'High',
        hours: '25 to 45 h/month',
        savingsFactor: 0.32,
        next: 'Load job profile, CVs, filter criteria, and process stages.',
      },
    },
  },
} satisfies Record<MarketingLocale, any>

export const industriesPageCopy = {
  es: {
    metaTitle: 'Industrias chilenas para gemelos digitales | N3uralia Studio',
    metaDescription:
      'Casos por industria para desplegar gemelos digitales en proveedores industriales, construccion, servicios profesionales, logistica y SaaS B2B.',
    eyebrow: 'Casos por industria',
    title: 'Gemelos digitales aplicados a mercados que ya compran operacion en Chile.',
    body:
      'La venta cambia cuando el comprador ve su propio dolor: seguimiento comercial, licitaciones, cobranza, coordinacion, reportes y memoria operativa por cuenta.',
    primary: 'Hacer diagnostico',
    secondary: 'Ver roles replicables',
    cases: [
      {
        industry: 'Proveedores industriales y mineria',
        pressure: 'Licitaciones, reportes tecnicos, seguimiento comercial y continuidad documental.',
        twins: ['Analista de Licitaciones Chile', 'Ejecutivo Comercial B2B Chile', 'PM de Implementacion Chile'],
        roi: 'Reduce horas perdidas revisando bases, preparando checklists y recuperando contexto por oportunidad.',
        firstMove: 'Cargar bases, pipeline de oportunidades, capacidades tecnicas y fechas criticas.',
      },
      {
        industry: 'Construccion e inmobiliaria',
        pressure: 'Coordinacion de obra, postventa, compras, minutas, compromisos y control de pendientes.',
        twins: ['PM de Implementacion Chile', 'Cobranza Pyme Chile', 'Reclutador Operativo Chile'],
        roi: 'Recupera capacidad administrativa y baja riesgo de compromisos invisibles entre obra, cliente y proveedores.',
        firstMove: 'Cargar proyecto activo, responsables, hitos, pendientes, minutas y reglas de escalamiento.',
      },
      {
        industry: 'Servicios profesionales',
        pressure: 'Diagnosticos, propuestas, entregables, investigacion, seguimiento de clientes y handoffs.',
        twins: ['Ejecutivo Comercial B2B Chile', 'PM de Implementacion Chile', 'Analista de Licitaciones Chile'],
        roi: 'Convierte criterio experto en rutinas repetibles para vender, entregar y documentar sin partir desde cero.',
        firstMove: 'Cargar propuesta tipo, brief de cliente, entregables historicos y formato de salida esperado.',
      },
      {
        industry: 'Logistica y distribucion',
        pressure: 'Incidencias, coordinacion diaria, cobranza, cuentas criticas y comunicacion operativa.',
        twins: ['Cobranza Pyme Chile', 'PM de Implementacion Chile', 'Ejecutivo Comercial B2B Chile'],
        roi: 'Acelera seguimiento de cuentas e incidencias con trazabilidad, mensajes sugeridos y escalamiento humano claro.',
        firstMove: 'Cargar cartera, aging, incidencias recurrentes, SLAs y reglas de priorizacion.',
      },
      {
        industry: 'SaaS y B2B digital',
        pressure: 'Pipeline, onboarding, expansion, soporte comercial y documentacion de implementacion.',
        twins: ['Ejecutivo Comercial B2B Chile', 'PM de Implementacion Chile', 'Reclutador Operativo Chile'],
        roi: 'Estandariza discovery, follow-up y onboarding para crecer sin depender de memoria informal del equipo.',
        firstMove: 'Cargar CRM, ICP, pricing, playbook comercial, tickets y etapas de onboarding.',
      },
    ],
    headers: {
      twins: 'Gemelos recomendados',
      roi: 'Palanca ROI',
      firstMove: 'Primer movimiento',
    },
  },
  en: {
    metaTitle: 'Chile and Latam industries for digital twins | N3uralia Studio',
    metaDescription:
      'Industry cases for deploying digital twins in industrial suppliers, construction, professional services, logistics, and B2B SaaS.',
    eyebrow: 'Industry cases',
    title: 'Digital twins applied to markets that already buy operational capacity in Chile and Latam.',
    body:
      'The sale changes when buyers see their own pain: commercial follow-up, tenders, collections, coordination, reporting, and account-level operating memory.',
    primary: 'Run diagnosis',
    secondary: 'View replicable roles',
    cases: [
      {
        industry: 'Industrial and mining suppliers',
        pressure: 'Tenders, technical reports, commercial follow-up, and documentation continuity.',
        twins: ['Tender Analyst Twin Chile', 'B2B Sales Executive Twin Chile', 'Implementation PM Twin Chile'],
        roi: 'Reduces hours lost reviewing tender docs, preparing checklists, and recovering context by opportunity.',
        firstMove: 'Load tender docs, opportunity pipeline, technical capabilities, and critical dates.',
      },
      {
        industry: 'Construction and real estate',
        pressure: 'Site coordination, post-sale service, procurement, minutes, commitments, and task control.',
        twins: ['Implementation PM Twin Chile', 'SME Collections Twin Chile', 'Operations Recruiter Twin Chile'],
        roi: 'Recovers administrative capacity and lowers the risk of invisible commitments between site, client, and suppliers.',
        firstMove: 'Load active project, owners, milestones, pending tasks, minutes, and escalation rules.',
      },
      {
        industry: 'Professional services',
        pressure: 'Diagnostics, proposals, deliverables, research, client follow-up, and handoffs.',
        twins: ['B2B Sales Executive Twin Chile', 'Implementation PM Twin Chile', 'Tender Analyst Twin Chile'],
        roi: 'Turns expert judgment into repeatable routines for selling, delivering, and documenting without starting from zero.',
        firstMove: 'Load proposal templates, client brief, historical deliverables, and expected output format.',
      },
      {
        industry: 'Logistics and distribution',
        pressure: 'Incidents, daily coordination, collections, critical accounts, and operating communication.',
        twins: ['SME Collections Twin Chile', 'Implementation PM Twin Chile', 'B2B Sales Executive Twin Chile'],
        roi: 'Accelerates account and incident follow-up with traceability, suggested messages, and clear human escalation.',
        firstMove: 'Load portfolio, debt aging, recurring incidents, SLAs, and prioritization rules.',
      },
      {
        industry: 'SaaS and digital B2B',
        pressure: 'Pipeline, onboarding, expansion, commercial support, and implementation documentation.',
        twins: ['B2B Sales Executive Twin Chile', 'Implementation PM Twin Chile', 'Operations Recruiter Twin Chile'],
        roi: 'Standardizes discovery, follow-up, and onboarding so the company can grow without informal team memory.',
        firstMove: 'Load CRM, ICP, pricing, sales playbook, tickets, and onboarding stages.',
      },
    ],
    headers: {
      twins: 'Recommended twins',
      roi: 'ROI lever',
      firstMove: 'First move',
    },
  },
} satisfies Record<MarketingLocale, any>

export const agentsPageCopy = {
  es: {
    eyebrow: 'Twins digitales para roles operativos',
    title: 'Elige la replica correcta para el programa operativo actual en Chile y Latam.',
    summary:
      'profilesCount perfiles en divisionsCount divisiones. Parte con twins para ventas, licitaciones, cobranza o implementacion y expande luego hacia un sistema operativo por rol.',
    curationSignals: [
      ['Diseñado para workflow', 'Cada twin debe dejar más claro el siguiente movimiento, no solo generar un documento.'],
      ['Diseñado para confianza', 'El sistema prioriza forma de output, claridad de handoff y estado recuperable por sobre novedad vacía.'],
      ['Diseñado para sistemas', 'Los especialistas viven dentro de memoria de proyecto, condición de workflow y entregables guardados.'],
    ],
    searchPlaceholder: 'Buscar twins, industrias o roles...',
    visibleProfiles: 'perfiles visibles',
    all: 'Todos',
    noResults: 'No hay perfiles que coincidan con tu búsqueda.',
    bestUsedWhen: 'Mejor cuando',
    twinFit: 'Calce del twin',
    replacement: 'Replacement',
    supervision: 'Supervision',
    primaryOutput: 'Output principal',
    inspect: 'Inspeccionar',
    openRun: 'Abrir corrida',
    upgrade: 'Subir plan para desbloquear',
    digitalTwin: 'Digital twin',
  },
  en: {
    eyebrow: 'Digital twins for operating roles',
    title: 'Choose the right role replica for the current Chile and Latam operating program.',
    summary:
      'profilesCount profiles across divisionsCount divisions. Start with twins for sales, tenders, collections, or implementation, then expand into a broader operating system by role.',
    curationSignals: [
      ['Built for workflow', 'Every twin should make the next move clearer, not just generate a document.'],
      ['Built for trust', 'The system favors output shape, handoff clarity, and recoverable state over raw novelty.'],
      ['Built for systems', 'Role twins live inside project memory, workflow condition, and saved deliverables.'],
    ],
    searchPlaceholder: 'Search twins, industries or roles...',
    visibleProfiles: 'profiles visible',
    all: 'All',
    noResults: 'No profiles match your search.',
    bestUsedWhen: 'Best used when',
    twinFit: 'Twin fit',
    replacement: 'Replacement',
    supervision: 'Supervision',
    primaryOutput: 'Primary output',
    inspect: 'Inspect',
    openRun: 'Open run',
    upgrade: 'Upgrade to unlock',
    digitalTwin: 'Digital twin',
  },
} satisfies Record<MarketingLocale, any>

export const pricingPageCopy = {
  es: {
    eyebrow: 'Pricing Twin OS',
    title: 'Precio del trabajo digital por rol, no solo de corridas aisladas.',
    summary:
      'Parte gratis y sube de plan cuando necesites mas gemelos digitales activos, memoria mas fuerte, automatizacion mas profunda y supervision mas clara en roles operativos de Chile y Latam.',
    valueStack: [
      ['Pagas por capacidad de gemelos activa', 'Los planes escalan cuando necesitas mas roles desplegados, mas rutinas concurrentes y mas memoria operativa por cuenta.'],
      ['Pagas por replacement supervisado', 'El valor no es solo mas corridas. Es mas control sobre lo que el gemelo digital absorbe y lo que aun necesita aprobacion.'],
      ['Pagas por orquestacion', 'Los planes altos desbloquean secuencias, automatizaciones y programas multi-rol que se acumulan en el tiempo.'],
    ],
    metrics: [
      ['Gemelos', 'Replicas activas en produccion'],
      ['Memoria', 'Estado operativo guardado y continuidad por cuenta'],
      ['Supervision', 'Handoffs, controles y cobertura de escalamiento'],
    ],
    bestFit: 'Mejor calce para programa de gemelos',
    twinCapacity: 'Capacidad de gemelos',
    unlimitedTwinExecution: 'Ejecucion de gemelos ilimitada',
    runsPerMonth: 'corridas por mes',
    unlimitedPrograms: 'Programas operativos ilimitados',
    activePrograms: 'programas activos',
    faqEyebrow: 'Preguntas comunes',
    faqTitle: 'El plan debe calzar con tu ambicion de replacement, no con el hype.',
    readyEyebrow: 'Listo para empezar',
    readyTitle: 'Despliega el primer gemelo digital antes de escalar el sistema operativo.',
    readyPrimary: 'Comenzar gratis',
    readySecondary: 'Ingresar',
    faq: [
      ['Puedo partir sin tarjeta?', 'Si. El plan free da espacio suficiente para evaluar uno o dos gemelos digitales antes de ampliar cobertura operativa.'],
      ['Que pasa al llegar al limite?', 'Starter o superior soportan cobro por sobreuso. Free se detiene en el limite mensual.'],
      ['Hay descuento anual?', 'Si. Para Enterprise puedes contactar ventas y revisar facturacion anual o descuentos por volumen.'],
      ['Que plan incluye automatizacion programada?', 'Starter y superiores. Usalo cuando el gemelo digital necesita reporting recurrente, monitoreo o pases operativos repetibles.'],
      ['Puedo usar programas multi-step?', 'Si, en Professional o superior. Encadena gemelos digitales y aprobaciones humanas cuando el trabajo requiere revision y handoff.'],
      ['Que significa despliegue partner?', 'Clientes Enterprise o partners pueden operar Twin OS con dominio, identidad, gobierno y revenue-share acordado.'],
    ],
  },
  en: {
    eyebrow: 'Twin OS pricing',
    title: 'Price digital labor by role, not just isolated runs.',
    summary:
      'Start with a diagnosis, then upgrade when you need more active twins, stronger memory, deeper automation, and clearer supervision across Chile and Latam operating roles.',
    valueStack: [
      ['Pay for active twin capacity', 'Plans scale when you need more deployed roles, more concurrent routines, and more operating memory by account.'],
      ['Pay for supervised replacement', 'The value is not only more runs. It is clearer control over what the twin can absorb and what still needs approval.'],
      ['Pay for orchestration', 'Higher plans unlock sequencing, automation, and multi-role twin programs that compound over time.'],
    ],
    metrics: [
      ['Twins', 'Active role replicas in production'],
      ['Memory', 'Saved operating state and account continuity'],
      ['Supervision', 'Handoffs, controls, and escalation coverage'],
    ],
    bestFit: 'Best twin program fit',
    twinCapacity: 'Twin capacity',
    unlimitedTwinExecution: 'Unlimited twin execution',
    runsPerMonth: 'runs per month',
    unlimitedPrograms: 'Unlimited operating programs',
    activePrograms: 'active programs',
    faqEyebrow: 'Common questions',
    faqTitle: 'The plan should match your replacement ambition, not the hype.',
    readyEyebrow: 'Ready to start',
    readyTitle: 'Deploy the first twin before you scale the operating system.',
    readyPrimary: 'Create diagnosis',
    readySecondary: 'Log in',
    faq: [
      ['Can I start without a credit card?', 'Yes. The free plan gives you enough room to evaluate one or two role twins before expanding operational coverage.'],
      ['What happens when I hit the run limit?', 'Starter and higher plans support overage pricing at $0.50 per run. Free stops at the monthly limit.'],
      ['Do you offer annual discounts?', 'Yes. Contact sales for Enterprise plans to discuss annual billing and volume discounts.'],
      ['Which plan includes scheduled automation?', 'Starter and higher. Use scheduled runs when the twin needs recurring reporting, monitoring, or repeatable operational passes.'],
      ['Can I use multi-step twin programs?', 'Yes, on Professional and higher. Chain twins and human approvals when the work requires review, handoff, or sequencing rather than a single run.'],
      ['What is partner deployment?', 'Enterprise customers or partners can operate Twin OS with custom domain, identity, governance, and agreed revenue-share.'],
    ],
  },
} satisfies Record<MarketingLocale, any>

export const authPageCopy = {
  signup: {
    es: {
      badge: 'Gratis para empezar',
      leftEyebrow: 'Activa el sistema operativo',
      leftTitle: 'Crea tu cuenta y empieza con continuidad.',
      leftBody: 'Configura un workspace para ejecución de twins, contexto heredado, estado de workflow y outputs reutilizables por tu equipo.',
      benefits: [
        '5 corridas twin gratis al mes',
        'Memoria de proyecto y continuidad de workflow',
        'Guardar entregables en programas operativos reutilizables',
        'Sin tarjeta de crédito',
      ],
      formTitle: 'Crea tu cuenta',
      formAlt: '¿Ya tienes una?',
      formAltCta: 'Ingresa',
      fullName: 'Nombre completo',
      fullNamePlaceholder: 'Tu nombre',
      email: 'Email',
      password: 'Contraseña',
      passwordPlaceholder: 'Al menos 8 caracteres',
      submit: 'Crear cuenta',
      loading: 'Creando cuenta...',
      legal: 'Al crear una cuenta aceptas nuestros',
      legalTerms: 'Terminos',
      legalPrivacy: 'Politica de privacidad',
    },
    en: {
      badge: 'Free to start',
      leftEyebrow: 'Start the operating system',
      leftTitle: 'Create your account and begin with continuity.',
      leftBody: 'Set up a workspace for twin execution, inherited context, workflow state, and outputs your team can reuse.',
      benefits: [
        '5 free twin runs per month',
        'Project memory and workflow continuity',
        'Save deliverables into reusable operating programs',
        'No credit card required',
      ],
      formTitle: 'Create your account',
      formAlt: 'Already have one?',
      formAltCta: 'Sign in',
      fullName: 'Full name',
      fullNamePlaceholder: 'Your name',
      email: 'Email',
      password: 'Password',
      passwordPlaceholder: 'At least 8 characters',
      submit: 'Create account',
      loading: 'Creating account...',
      legal: 'By creating an account you agree to our',
      legalTerms: 'Terms',
      legalPrivacy: 'Privacy Policy',
    },
  },
  login: {
    es: {
      badge: 'Acceso seguro',
      leftEyebrow: 'Acceso al comando',
      leftTitle: 'Ingresa para retomar la siguiente secuencia operativa.',
      leftBody: 'Especialistas, workflows y entregables permanecen conectados para que el equipo recupere contexto sin re-briefear el sistema.',
      leftSignals: [
        ['Continuidad operativa', 'Cada corrida queda unida a owners, handoffs y al paso actual.'],
        ['Trazabilidad por defecto', 'Entregables, memoria y estado del workflow siguen visibles después de la corrida.'],
      ],
      formTitle: 'Ingresa',
      formAlt: '¿No tienes cuenta?',
      formAltCta: 'Comienza gratis',
      email: 'Email',
      password: 'Contraseña',
      forgot: '¿Olvidaste?',
      passwordPlaceholder: 'Ingresa tu contraseña',
      submit: 'Ingresar',
      legal: 'Al ingresar aceptas nuestros',
      legalTerms: 'Terminos',
      legalPrivacy: 'Politica de privacidad',
    },
    en: {
      badge: 'Secure access',
      leftEyebrow: 'Command access',
      leftTitle: 'Sign in to resume the next operating sequence.',
      leftBody: 'Role twins, workflows, and deliverables stay linked so your team can recover context without re-briefing the system.',
      leftSignals: [
        ['Operational continuity', 'Each run stays attached to owners, handoffs, and the current step.'],
        ['Traceable by default', 'Deliverables, memory, and workflow state stay visible after the run ends.'],
      ],
      formTitle: 'Sign in',
      formAlt: 'No account?',
      formAltCta: 'Create diagnosis',
      email: 'Email',
      password: 'Password',
      forgot: 'Forgot?',
      passwordPlaceholder: 'Enter your password',
      submit: 'Sign in',
      legal: 'By signing in you agree to our',
      legalTerms: 'Terms',
      legalPrivacy: 'Privacy Policy',
    },
  },
} satisfies Record<string, Record<MarketingLocale, any>>

export const contactPageCopy = {
  es: {
    badge: 'Contacta a N3uralia',
    title: 'Habla con el equipo por el canal que mejor calce con la presion operativa.',
    body: 'N3uralia se construye alrededor de diagnostico, despliegue de gemelos digitales y continuidad operativa. Cuentanos el problema y enroutamos la conversacion a la ruta correcta: diagnostico, implementacion o partnership.',
    primary: 'Escribenos',
    secondary: 'Ver planes',
    signals: [
      ['Ruta por presion', 'Producto, diagnostico e implementacion se dirigen al punto de partida correcto.'],
      ['Calce operativo primero', 'La primera conversacion se acota por riesgo, ownership y la siguiente capa util a construir.'],
    ],
    channels: [
      ['Email', 'hello@n3uralia.com', 'Mejor para preguntas de producto, alianzas y seguimiento de implementacion.', 'mailto:hello@n3uralia.com', 'Enviar email'],
      ['WhatsApp', '+56 9 6316 0187', 'Mejor para coordinacion urgente o preguntas sensibles al tiempo.', 'https://wa.me/56963160187', 'Hablar por WhatsApp'],
      ['Diagnostico', 'Agenda una revision operativa', 'Usalo si necesitas walkthrough guiado, fit check o conversacion acotada sobre el primer programa operativo.', 'mailto:hello@n3uralia.com?subject=N3uralia%20operating%20diagnosis', 'Solicitar diagnostico'],
    ],
    gridSignals: [
      ['Tiempo de respuesta', 'Buscamos responder en menos de 24 horas habiles.'],
      ['Mejor para', 'Diagnostico, onboarding, implementacion y alianzas.'],
      ['Privacidad', 'Solo usamos tu mensaje para responder y gestionar la solicitud.'],
      ['Fit check', 'Si hace falta, derivamos la conversacion a diagnostico, implementacion o partnership.'],
    ],
    diagnosisEyebrow: 'Agenda un diagnostico',
    diagnosisTitle: 'Si necesitas un camino mas claro, te ayudamos a decidir que gemelo digital construir primero.',
    diagnosisBody: 'La primera conversacion no es un pitch de ventas. Es un filtro de fit, alcance, datos disponibles y punto de partida correcto.',
    diagnosisItems: ['Diagnostico operativo', 'Guia de planes y pricing', 'Oportunidades de partnership', 'Preguntas de implementacion'],
  },
  en: {
    badge: 'Contact N3uralia',
    title: 'Reach the team through the channel that matches the operational pressure.',
    body: 'N3uralia is built around diagnosis, digital twin deployment, and operating continuity. Reach out with the problem, and we route the conversation to the right path: diagnosis, implementation, or partnership.',
    primary: 'Email us',
    secondary: 'See plans',
    signals: [
      ['Route by pressure', 'Product, diagnosis, and implementation requests are directed to the right starting point.'],
      ['Operational fit first', 'The first conversation is scoped around risk, ownership, and the next useful layer to build.'],
    ],
    channels: [
      ['Email', 'hello@n3uralia.com', 'Best for product questions, partnership requests, and implementation follow-up.', 'mailto:hello@n3uralia.com', 'Send email'],
      ['WhatsApp', '+56 9 6316 0187', 'Best for urgent coordination or time-sensitive questions.', 'https://wa.me/56963160187', 'Chat on WhatsApp'],
      ['Diagnosis', 'Book an operating review', 'Use this if you want a guided walkthrough, fit check, or a scoped conversation around the first workflow to build.', 'mailto:hello@n3uralia.com?subject=N3uralia%20operating%20diagnosis', 'Request diagnosis'],
    ],
    gridSignals: [
      ['Response time', 'We aim to answer in under 24 business hours.'],
      ['Best for', 'Diagnosis, onboarding, implementation questions, and partnership requests.'],
      ['Privacy', 'We only use your message to respond and handle the request.'],
      ['Fit check', 'If needed, we route the conversation to diagnosis, implementation, or partnership.'],
    ],
    diagnosisEyebrow: 'Book a diagnosis',
    diagnosisTitle: 'If you need a clearer path, we will help you decide what to build next.',
    diagnosisBody: 'The first conversation is not a sales pitch. It is a filter for fit, scope, and the right starting point.',
    diagnosisItems: ['Operational diagnosis', 'Pricing and plan guidance', 'Partnership opportunities', 'Implementation questions'],
  },
} satisfies Record<MarketingLocale, any>
