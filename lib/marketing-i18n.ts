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
  if (href === '/signup') return `/${locale}/signup`
  if (href === '/login') return `/${locale}/login`
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
      { href: '/agents', label: 'Twins' },
      { href: '/pricing', label: 'Planes' },
      { href: '/app', label: 'Workspace' },
    ],
    login: 'Ingresar',
    cta: 'Comenzar',
  },
  en: {
    brandSubline: 'Twin OS Latam',
    navItems: [
      { href: '/agents', label: 'Twins' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/app', label: 'Workspace' },
    ],
    login: 'Log in',
    cta: 'Start free',
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
    },
    description:
      'Un sistema operativo para trabajo digital supervisado en Chile y Latam: twins por rol, memoria operativa, handoffs y entregables reutilizables.',
    rights: 'Todos los derechos reservados.',
  },
  en: {
    groups: {
      Product: [
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
    metaTitle: 'N3uralia Studio | Twin OS para roles operativos en Chile y Latam',
    metaDescription:
      'N3uralia Studio convierte roles digitales repetibles en twins supervisados para Chile y Latam, con memoria operativa, KPIs, handoffs y alcance de replacement visible.',
    badge: 'Twin OS para roles operativos en Chile y Latam',
    heroTitle: 'Despliega twins digitales para roles operativos reales en Chile y Latam.',
    heroBody:
      'N3uralia Studio convierte trabajos recurrentes en twins supervisados con memoria, KPIs, handoffs y replacement visible para ventas, licitaciones, cobranza, implementación y reclutamiento.',
    heroPrimary: 'Desplegar primer twin',
    heroSecondary: 'Explorar Twin OS',
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
      ['No es otro builder de agentes', 'La diferencia es un sistema de roles desplegables para trabajo real en Chile y Latam, no una caja en blanco para prompts genéricos.'],
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
      ['Built for systems', 'Specialists live inside project memory, workflow condition, and saved deliverables.'],
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
      'Parte gratis y sube de plan cuando necesites más twins activos, memoria más fuerte, automatización más profunda y supervisión más clara en roles operativos de Chile y Latam.',
    valueStack: [
      ['Pagas por capacidad twin activa', 'Los planes escalan cuando necesitas más roles desplegados, más rutinas concurrentes y más memoria operativa por cuenta.'],
      ['Pagas por replacement supervisado', 'El valor no es solo más runs. Es más control sobre lo que el twin absorbe y lo que aún necesita aprobación.'],
      ['Pagas por orquestación', 'Los planes altos desbloquean secuencias, automatizaciones y programas multi-rol que se acumulan en el tiempo.'],
    ],
    metrics: [
      ['Twins', 'Replicas activas en producción'],
      ['Memoria', 'Estado operativo guardado y continuidad por cuenta'],
      ['Supervision', 'Handoffs, controles y cobertura de escalamiento'],
    ],
    bestFit: 'Mejor calce para programa twin',
    twinCapacity: 'Capacidad twin',
    unlimitedTwinExecution: 'Ejecución twin ilimitada',
    runsPerMonth: 'corridas por mes',
    unlimitedPrograms: 'Programas operativos ilimitados',
    activePrograms: 'programas activos',
    faqEyebrow: 'Preguntas comunes',
    faqTitle: 'El plan debe calzar con tu ambición de replacement, no con el hype.',
    readyEyebrow: 'Listo para empezar',
    readyTitle: 'Despliega el primer twin antes de escalar el sistema operativo.',
    readyPrimary: 'Comenzar gratis',
    readySecondary: 'Ingresar',
    faq: [
      ['¿Puedo partir sin tarjeta?', 'Sí. El plan free da espacio suficiente para evaluar uno o dos twins antes de ampliar cobertura operativa.'],
      ['¿Qué pasa al llegar al límite?', 'Starter o superior soportan cobro por sobreuso a $0.50 por corrida. Free se detiene en el límite mensual.'],
      ['¿Hay descuento anual?', 'Sí. Para Enterprise puedes contactar ventas y revisar facturación anual o descuentos por volumen.'],
      ['¿Qué plan incluye automatización programada?', 'Starter y superiores. Úsalo cuando el twin necesita reporting recurrente, monitoreo o pases operativos repetibles.'],
      ['¿Puedo usar programas multi-step?', 'Sí, en Professional o superior. Encadena twins y aprobaciones humanas cuando el trabajo requiere revisión y handoff.'],
      ['¿Qué significa white-label?', 'Clientes Enterprise pueden revender el sistema bajo su propia marca con dominio, branding y revenue-share.'],
    ],
  },
  en: {
    eyebrow: 'Twin OS pricing',
    title: 'Price digital labor by role, not just isolated runs.',
    summary:
      'Start free, then upgrade when you need more active twins, stronger memory, deeper automation, and clearer supervision across Chile and Latam operating roles.',
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
    readyPrimary: 'Start free',
    readySecondary: 'Log in',
    faq: [
      ['Can I start without a credit card?', 'Yes. The free plan gives you enough room to evaluate one or two role twins before expanding operational coverage.'],
      ['What happens when I hit the run limit?', 'Starter and higher plans support overage pricing at $0.50 per run. Free stops at the monthly limit.'],
      ['Do you offer annual discounts?', 'Yes. Contact sales for Enterprise plans to discuss annual billing and volume discounts.'],
      ['Which plan includes scheduled automation?', 'Starter and higher. Use scheduled runs when the twin needs recurring reporting, monitoring, or repeatable operational passes.'],
      ['Can I use multi-step twin programs?', 'Yes, on Professional and higher. Chain twins and human approvals when the work requires review, handoff, or sequencing rather than a single run.'],
      ['What is white-label?', 'Enterprise customers can resell the system under their own brand with custom domain, branding, and revenue-share options.'],
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
    },
    en: {
      badge: 'Secure access',
      leftEyebrow: 'Command access',
      leftTitle: 'Sign in to resume the next operating sequence.',
      leftBody: 'Specialists, workflows, and deliverables stay linked so your team can recover context without re-briefing the system.',
      leftSignals: [
        ['Operational continuity', 'Each run stays attached to owners, handoffs, and the current step.'],
        ['Traceable by default', 'Deliverables, memory, and workflow state stay visible after the run ends.'],
      ],
      formTitle: 'Sign in',
      formAlt: 'No account?',
      formAltCta: 'Start free',
      email: 'Email',
      password: 'Password',
      forgot: 'Forgot?',
      passwordPlaceholder: 'Enter your password',
      submit: 'Sign in',
      legal: 'By signing in you agree to our',
    },
  },
} satisfies Record<string, Record<MarketingLocale, any>>

export const contactPageCopy = {
  es: {
    badge: 'Contacta a N3uralia',
    title: 'Habla con el equipo por el canal que mejor calce con la presión operativa.',
    body: 'N3uralia se construye alrededor de diagnóstico, build y continuidad operativa. Cuéntanos el problema y enroutamos la conversación al camino especialista correcto.',
    primary: 'Escríbenos',
    secondary: 'Ver planes',
    signals: [
      ['Ruta por presión', 'Producto, diagnóstico e implementación se dirigen al punto de partida correcto.'],
      ['Calce operativo primero', 'La primera conversación se acota por riesgo, ownership y la siguiente capa útil a construir.'],
    ],
    channels: [
      ['Email', 'hello@n3uralia.com', 'Mejor para preguntas de producto, alianzas y seguimiento de implementación.', 'mailto:hello@n3uralia.com', 'Enviar email'],
      ['WhatsApp', '+56 9 6316 0187', 'Mejor para coordinación urgente o preguntas sensibles al tiempo.', 'https://wa.me/56963160187', 'Hablar por WhatsApp'],
      ['Diagnóstico', 'Agenda una revisión operativa', 'Úsalo si necesitas walkthrough guiado, fit check o conversación acotada sobre el primer workflow.', 'mailto:hello@n3uralia.com?subject=N3uralia%20operating%20diagnosis', 'Solicitar diagnóstico'],
    ],
    gridSignals: [
      ['Tiempo de respuesta', 'Buscamos responder en menos de 24 horas hábiles.'],
      ['Mejor para', 'Diagnóstico, onboarding, implementación y alianzas.'],
      ['Privacidad', 'Solo usamos tu mensaje para responder y gestionar la solicitud.'],
      ['Fit check', 'Si hace falta, derivamos la conversación al camino especialista correcto.'],
    ],
    diagnosisEyebrow: 'Agenda un diagnóstico',
    diagnosisTitle: 'Si necesitas un camino más claro, te ayudamos a decidir qué construir después.',
    diagnosisBody: 'La primera conversación no es un pitch de ventas. Es un filtro de fit, alcance y punto de partida correcto.',
    diagnosisItems: ['Diagnóstico operativo', 'Guía de planes y pricing', 'Oportunidades de partnership', 'Preguntas de implementación'],
  },
  en: {
    badge: 'Contact N3uralia',
    title: 'Reach the team through the channel that matches the operational pressure.',
    body: 'N3uralia is built around diagnosis, build, and operating continuity. Reach out with the problem, and we route the conversation to the right specialist path.',
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
      ['Fit check', 'If needed, we route the conversation to the right specialist path.'],
    ],
    diagnosisEyebrow: 'Book a diagnosis',
    diagnosisTitle: 'If you need a clearer path, we will help you decide what to build next.',
    diagnosisBody: 'The first conversation is not a sales pitch. It is a filter for fit, scope, and the right starting point.',
    diagnosisItems: ['Operational diagnosis', 'Pricing and plan guidance', 'Partnership opportunities', 'Implementation questions'],
  },
} satisfies Record<MarketingLocale, any>
