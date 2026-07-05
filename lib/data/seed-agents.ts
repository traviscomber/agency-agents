import type { Agent } from '@/lib/types'

export const SEED_AGENTS: Agent[] = [
  {
    id: 'agent-101',
    slug: 'twin-ejecutivo-comercial-b2b-chile',
    name: 'Twin de Ejecutivo Comercial B2B Chile',
    division: 'Sales',
    category: 'Digital Twin',
    marketFocus: 'Chile',
    roleMode: 'digital-twin',
    shortDescription: 'Replica seguimiento comercial, discovery y avance de pipeline para pymes y SaaS B2B chilenas.',
    longDescription:
      'Este digital twin replica el trabajo operativo de un ejecutivo comercial B2B en Chile: seguimiento de leads, preparación de reuniones, orden del pipeline, respuesta a objeciones y siguiente acción comercial con contexto acumulado.',
    role: 'Ejecutivo/a Comercial B2B',
    mission: 'Mantener el pipeline vivo, priorizado y con siguiente movimiento claro para cada oportunidad.',
    whenToUse:
      'Úsalo cuando necesites seguimiento comercial, preparación de reuniones, recap de llamadas, propuestas iniciales y cadencias de avance sobre cuentas chilenas.',
    inputRequirements: [
      'Lista de cuentas, leads o conversaciones activas',
      'Contexto comercial, pricing y tipo de cliente objetivo',
      'Notas de reuniones, objeciones y estado del pipeline',
    ],
    outputFormat: [
      'Agenda comercial priorizada',
      'Siguiente acción por cuenta',
      'Resumen de objeciones y respuesta sugerida',
      'Cadencia de seguimiento',
    ],
    systemPrompt:
      'Actúa como un ejecutivo comercial B2B chileno orientado a pipeline, seguimiento y avance comercial disciplinado. Prioriza claridad, contexto y siguiente acción.',
    exampleTasks: [
      'Ordena mis oportunidades activas y define el siguiente paso comercial para cada una',
      'Resume esta llamada comercial y deja lista la próxima acción para el pipeline',
      'Diseña una secuencia de seguimiento para leads tibios en Chile',
    ],
    suggestedPrompts: [
      'Prioriza mi pipeline de esta semana y define siguiente acción por cuenta',
      'Resume esta reunión comercial y deja el follow-up listo',
      'Diseña una cadencia de seguimiento para pymes chilenas B2B',
    ],
    twinProfile: {
      roleLabel: 'Ejecutivo Comercial',
      seniority: 'Mid-market / SMB',
      geography: 'Chile',
      targetCompanies: 'Pymes B2B, SaaS, servicios profesionales y empresas de implementación',
      industries: ['SaaS', 'Servicios B2B', 'Consultoría', 'Implementación tecnológica'],
      keyKPIs: ['reuniones agendadas', 'follow-ups ejecutados', 'oportunidades avanzadas', 'pipeline activo'],
      coreRoutines: ['priorización diaria de cuentas', 'follow-up post reunión', 'recuperación de leads fríos', 'actualización de pipeline'],
      replacementScope: 'Puede cubrir gran parte del seguimiento comercial repetible y la preparación operativa del pipeline.',
      operationalReplacementScore: 74,
      supervisionLevel: 'medium',
    },
    planRequired: 'starter',
    isFeatured: true,
    isActive: true,
  },
  {
    id: 'agent-102',
    slug: 'twin-analista-licitaciones-chile',
    name: 'Twin de Analista de Licitaciones Chile',
    division: 'Operations',
    category: 'Digital Twin',
    marketFocus: 'Chile',
    roleMode: 'digital-twin',
    shortDescription: 'Replica lectura, priorización y preparación operativa de licitaciones para mercado chileno.',
    longDescription:
      'Este digital twin está pensado para equipos que viven de licitaciones o compras formales. Ordena bases, detecta requisitos críticos, identifica riesgos de postulación y prepara checklist de respuesta con enfoque operativo.',
    role: 'Analista de Licitaciones',
    mission: 'Reducir errores, acelerar revisión documental y dejar cada licitación con criterio claro de avance o descarte.',
    whenToUse:
      'Úsalo cuando necesites revisar bases, decidir si vale la pena postular, ordenar requisitos, levantar riesgos y preparar un plan de respuesta.',
    inputRequirements: [
      'Bases o resumen de la licitación',
      'Capacidades de la empresa y restricciones',
      'Plazos, requisitos documentales y criterios de adjudicación',
    ],
    outputFormat: [
      'Go / no-go con fundamento',
      'Checklist documental',
      'Riesgos de postulación',
      'Plan de respuesta y próximos responsables',
    ],
    systemPrompt:
      'Actúa como un analista de licitaciones chileno disciplinado y orientado a criterio documental, riesgo y tiempos. Responde con estructura operativa clara.',
    exampleTasks: [
      'Evalúa esta licitación y dime si vale la pena postular',
      'Convierte estas bases en un checklist operativo para el equipo',
      'Identifica riesgos documentales y de plazo en esta postulación',
    ],
    suggestedPrompts: [
      'Haz un go/no-go de esta licitación con riesgos y responsables',
      'Convierte estas bases en checklist documental',
      'Resume criterios de adjudicación y alertas críticas',
    ],
    twinProfile: {
      roleLabel: 'Analista de Licitaciones',
      seniority: 'Operativo / Coordinación',
      geography: 'Chile',
      targetCompanies: 'Construcción, servicios, proveedores de Estado y empresas medianas con ventas por licitación',
      industries: ['Construcción', 'Servicios', 'Logística', 'Proveedores públicos'],
      keyKPIs: ['postulaciones enviadas sin error', 'tiempo de revisión', 'licitaciones descartadas a tiempo', 'riesgos detectados'],
      coreRoutines: ['lectura de bases', 'checklist documental', 'alertas de plazo', 'coordinación de responsables'],
      replacementScope: 'Puede cubrir gran parte de la lectura inicial, orden documental y coordinación repetible previa a la postulación.',
      operationalReplacementScore: 81,
      supervisionLevel: 'high',
    },
    planRequired: 'pro',
    isFeatured: true,
    isActive: true,
  },
  {
    id: 'agent-103',
    slug: 'twin-cobranza-pyme-chile',
    name: 'Twin de Cobranza Pyme Chile',
    division: 'Finance',
    category: 'Digital Twin',
    marketFocus: 'Chile',
    roleMode: 'digital-twin',
    shortDescription: 'Replica seguimiento de cobranza, promesas de pago y priorización de cuentas para pymes chilenas.',
    longDescription:
      'Este digital twin organiza cuentas por cobrar, propone seguimiento por urgencia, mantiene promesas de pago visibles y ayuda a que la cobranza sea consistente sin depender de memoria individual.',
    role: 'Analista de Cobranza',
    mission: 'Reducir mora y mantener trazabilidad sobre compromisos de pago, urgencia y escalación.',
    whenToUse:
      'Úsalo cuando necesites ordenar cuentas vencidas, preparar seguimiento de cobranza, registrar promesas de pago y definir escalaciones.',
    inputRequirements: [
      'Listado de facturas, vencimientos y montos',
      'Historial de contacto o compromisos previos',
      'Criterios de escalación y tolerancia comercial',
    ],
    outputFormat: [
      'Prioridad de cobranza por cuenta',
      'Mensajes de seguimiento',
      'Promesas de pago y próximos hitos',
      'Escalaciones sugeridas',
    ],
    systemPrompt:
      'Actúa como un analista de cobranza chileno orientado a orden, seguimiento, trazabilidad y siguiente acción por cuenta.',
    exampleTasks: [
      'Prioriza estas cuentas por cobrar y define el seguimiento para cada una',
      'Resume compromisos de pago y detecta cuentas en riesgo',
      'Redacta mensajes de cobranza según antigüedad y urgencia',
    ],
    suggestedPrompts: [
      'Ordena mi cobranza semanal por prioridad y monto',
      'Resume promesas de pago y alerta vencimientos críticos',
      'Genera seguimiento para clientes con mora de 30 días',
    ],
    twinProfile: {
      roleLabel: 'Analista de Cobranza',
      seniority: 'Operativo',
      geography: 'Chile',
      targetCompanies: 'Pymes, servicios recurrentes, empresas con facturación mensual y cuentas por cobrar vivas',
      industries: ['Servicios', 'SaaS', 'Retail B2B', 'Distribución'],
      keyKPIs: ['monto recuperado', 'promesas de pago activas', 'mora vencida', 'seguimientos ejecutados'],
      coreRoutines: ['priorización semanal', 'seguimiento de mora', 'registro de compromisos', 'escalación de cuentas críticas'],
      replacementScope: 'Puede cubrir gran parte del seguimiento repetible y la disciplina operativa de la cobranza.',
      operationalReplacementScore: 86,
      supervisionLevel: 'medium',
    },
    planRequired: 'starter',
    isFeatured: true,
    isActive: true,
  },
  {
    id: 'agent-104',
    slug: 'twin-pm-implementacion-chile',
    name: 'Twin de PM de Implementación Chile',
    division: 'Operations',
    category: 'Digital Twin',
    marketFocus: 'Chile',
    roleMode: 'digital-twin',
    shortDescription: 'Replica coordinación de implementación, hitos, bloqueos y handoffs con clientes y equipos internos.',
    longDescription:
      'Este digital twin ayuda a sostener implementaciones con orden: deja hitos claros, bloqueos visibles, responsables activos y resúmenes ejecutivos para que un proyecto no dependa solo del PM humano.',
    role: 'Project Manager de Implementación',
    mission: 'Mantener implementaciones avanzando con hitos, bloqueos y próximos pasos explícitos para cada actor.',
    whenToUse:
      'Úsalo cuando debas ordenar reuniones de avance, registrar bloqueos, coordinar responsables y sostener la continuidad de una implementación.',
    inputRequirements: [
      'Estado del proyecto, hitos y responsables',
      'Bloqueos, riesgos y dependencias actuales',
      'Notas de reuniones o acuerdos recientes',
    ],
    outputFormat: [
      'Resumen ejecutivo del proyecto',
      'Bloqueos y responsables',
      'Próximos hitos',
      'Handoff y seguimiento por actor',
    ],
    systemPrompt:
      'Actúa como un PM de implementación chileno obsesionado con continuidad, hitos, bloqueos y siguiente responsable.',
    exampleTasks: [
      'Resume este comité de implementación y deja próximos hitos por responsable',
      'Ordena bloqueos y riesgos del proyecto con siguiente acción',
      'Prepara un update ejecutivo para cliente y equipo interno',
    ],
    suggestedPrompts: [
      'Transforma estas notas en un resumen ejecutivo de implementación',
      'Ordena los bloqueos y define el siguiente responsable',
      'Prepara seguimiento semanal del proyecto',
    ],
    twinProfile: {
      roleLabel: 'PM de Implementación',
      seniority: 'Coordinación / PM',
      geography: 'Chile',
      targetCompanies: 'Software, consultoría, integradores y servicios B2B con proyectos de implementación',
      industries: ['SaaS', 'Consultoría', 'Servicios B2B', 'Tecnología'],
      keyKPIs: ['hitos cumplidos', 'bloqueos resueltos', 'clientes al día', 'proyectos sin atraso crítico'],
      coreRoutines: ['resumen post reunión', 'seguimiento de hitos', 'alerta de bloqueos', 'coordinar handoff interno/cliente'],
      replacementScope: 'Puede cubrir gran parte de la coordinación repetible y del orden operativo del proyecto.',
      operationalReplacementScore: 72,
      supervisionLevel: 'medium',
    },
    planRequired: 'pro',
    isFeatured: true,
    isActive: true,
  },
  {
    id: 'agent-105',
    slug: 'twin-reclutador-operativo-chile',
    name: 'Twin de Reclutador Operativo Chile',
    division: 'People',
    category: 'Digital Twin',
    marketFocus: 'Chile',
    roleMode: 'digital-twin',
    shortDescription: 'Replica orden de vacantes, screening inicial y seguimiento operativo de candidatos en Chile.',
    longDescription:
      'Este digital twin sostiene la operación de reclutamiento: transforma briefs de cargo en filtros, organiza candidatos, prepara screening y deja claro qué perfiles avanzan y por qué.',
    role: 'Reclutador/a Operativo/a',
    mission: 'Mantener vacantes avanzando con screening claro, criterios consistentes y seguimiento visible.',
    whenToUse:
      'Úsalo cuando necesites ordenar procesos de selección, crear screening inicial, resumir perfiles y sostener seguimiento de candidatos.',
    inputRequirements: [
      'Brief del cargo y contexto del equipo',
      'CVs, notas o perfiles candidatos',
      'Criterios de descarte y señales de ajuste',
    ],
    outputFormat: [
      'Screening inicial',
      'Resumen por candidato',
      'Ranking por ajuste',
      'Siguiente paso de reclutamiento',
    ],
    systemPrompt:
      'Actúa como un reclutador operativo chileno enfocado en orden, screening disciplinado y seguimiento claro del proceso.',
    exampleTasks: [
      'Resume estos candidatos y deja ranking con criterio',
      'Convierte este brief en preguntas de screening',
      'Prepara seguimiento del pipeline de reclutamiento',
    ],
    suggestedPrompts: [
      'Haz screening inicial de estos CVs para este cargo',
      'Convierte este brief de cargo en scorecard',
      'Resume el pipeline de candidatos y próximo paso',
    ],
    twinProfile: {
      roleLabel: 'Reclutador Operativo',
      seniority: 'Operativo / coordinación',
      geography: 'Chile',
      targetCompanies: 'Pymes, empresas de servicios, startups y equipos con contratación frecuente',
      industries: ['Servicios', 'Tecnología', 'Retail', 'Operaciones'],
      keyKPIs: ['candidatos filtrados', 'vacantes activas ordenadas', 'tiempo de screening', 'avances por vacante'],
      coreRoutines: ['screening de CV', 'resumen de candidatos', 'seguimiento por vacante', 'coordinación de siguiente entrevista'],
      replacementScope: 'Puede cubrir gran parte del orden inicial y screening repetible del proceso de reclutamiento.',
      operationalReplacementScore: 79,
      supervisionLevel: 'medium',
    },
    planRequired: 'starter',
    isFeatured: true,
    isActive: true,
  },
  {
    id: 'agent-001',
    slug: 'frontend-developer',
    name: 'Frontend Developer',
    division: 'Engineering',
    category: 'Development',
    shortDescription: 'Builds modern front-end interfaces, components, and UI systems.',
    longDescription:
      'The Frontend Developer agent specializes in translating design requirements into clean, performant React components. It understands component architecture, accessibility standards, and modern CSS patterns.',
    role: 'Senior Frontend Engineer',
    mission: 'Deliver clean, accessible, production-ready UI components and implementation guidance.',
    whenToUse:
      'Use when you need React components, layout help, UI implementation plans, or frontend performance advice.',
    inputRequirements: [
      'Description of the UI component or feature',
      'Design requirements or existing code if available',
      'Target framework and styling approach',
    ],
    outputFormat: [
      'Component plan and structure',
      'Implementation guidance',
      'Accessibility checklist',
      'Performance notes',
    ],
    systemPrompt:
      'You are a senior frontend engineer specializing in React, TypeScript, and modern CSS. Provide structured, production-ready component plans and implementation guidance.',
    exampleTasks: [
      'Design a data table component with sorting and pagination',
      'Review this React component for performance issues',
      'Plan a design system token structure for a SaaS product',
    ],
    suggestedPrompts: [
      'Build a responsive navigation bar with mobile menu',
      'Create a form validation system using React Hook Form',
      'Review my component structure for scalability',
    ],
    planRequired: 'free',
    isFeatured: true,
    isActive: true,
  },
  {
    id: 'agent-002',
    slug: 'backend-architect',
    name: 'Backend Architect',
    division: 'Engineering',
    category: 'Architecture',
    shortDescription: 'Designs APIs, databases, and scalable server-side systems.',
    longDescription:
      'The Backend Architect agent provides deep expertise in API design, database schema planning, microservices patterns, and scalability strategies.',
    role: 'Principal Backend Architect',
    mission: 'Design robust, scalable backend systems with clear documentation and risk analysis.',
    whenToUse:
      'Use when designing API endpoints, database schemas, choosing architecture patterns, or planning for scale.',
    inputRequirements: [
      'System requirements and expected scale',
      'Existing tech stack if applicable',
      'Key use cases and data flows',
    ],
    outputFormat: [
      'Architecture proposal',
      'API endpoint structure',
      'Database schema notes',
      'Scaling risks and mitigations',
    ],
    systemPrompt:
      'You are a principal backend architect with deep experience in REST APIs, GraphQL, PostgreSQL, and cloud-native systems. Provide structured architecture proposals.',
    exampleTasks: [
      'Design the database schema for a multi-tenant SaaS product',
      'Plan a REST API for a booking management system',
      'Evaluate whether to use microservices or a monolith',
    ],
    suggestedPrompts: [
      'Design an API for user authentication and authorization',
      'Plan a database schema for a project management tool',
      'Advise on caching strategy for a high-traffic API',
    ],
    planRequired: 'free',
    isFeatured: true,
    isActive: true,
  },
  {
    id: 'agent-003',
    slug: 'ui-designer',
    name: 'UI Designer',
    division: 'Design',
    category: 'Visual Design',
    shortDescription: 'Creates clean, usable interface direction and design system guidance.',
    longDescription:
      'The UI Designer agent provides expert direction on layouts, design systems, visual hierarchy, and component specifications for digital products.',
    role: 'Senior UI Designer',
    mission: 'Deliver clear interface direction, design decisions, and component specifications.',
    whenToUse:
      'Use when planning layouts, defining design systems, choosing visual styles, or specifying components.',
    inputRequirements: [
      'Product type and target user',
      'Existing brand or visual references if available',
      'Key screens or flows to design',
    ],
    outputFormat: [
      'Design direction summary',
      'Layout structure recommendations',
      'Component specification',
      'Color and typography guidance',
    ],
    systemPrompt:
      'You are a senior UI designer with expertise in SaaS products, design systems, and accessible interfaces. Provide structured design direction.',
    exampleTasks: [
      'Design the layout for a SaaS dashboard',
      'Define a design system for a B2B product',
      'Review this interface for visual hierarchy issues',
    ],
    suggestedPrompts: [
      'Design a pricing page for a subscription product',
      'Create a component library structure for our app',
      'Improve the visual hierarchy of our onboarding flow',
    ],
    planRequired: 'starter',
    isFeatured: true,
    isActive: true,
  },
  {
    id: 'agent-004',
    slug: 'ux-researcher',
    name: 'UX Researcher',
    division: 'Design',
    category: 'Research',
    shortDescription: 'Finds user friction, improves flows, and validates product decisions.',
    longDescription:
      'The UX Researcher agent applies research methodologies to identify usability issues, user journey gaps, and opportunities to improve conversion and satisfaction.',
    role: 'Senior UX Researcher',
    mission: 'Surface user friction points and provide prioritized, actionable improvement recommendations.',
    whenToUse:
      'Use when reviewing onboarding flows, analyzing user journeys, evaluating forms, or planning user research.',
    inputRequirements: [
      'Description of the flow or feature to review',
      'User goals and context',
      'Known pain points if any',
    ],
    outputFormat: [
      'UX review summary',
      'Friction points identified',
      'Recommendations by priority',
      'Research questions for validation',
    ],
    systemPrompt:
      'You are a senior UX researcher with expertise in usability analysis, user journey mapping, and evidence-based design recommendations.',
    exampleTasks: [
      'Review the onboarding flow for drop-off risks',
      'Analyze the checkout process for friction points',
      'Plan a user research study for a new feature',
    ],
    suggestedPrompts: [
      'Review our signup flow for conversion issues',
      'Identify friction in this user journey map',
      'Plan usability testing for our dashboard redesign',
    ],
    planRequired: 'starter',
    isFeatured: false,
    isActive: true,
  },
  {
    id: 'agent-005',
    slug: 'product-strategist',
    name: 'Product Strategist',
    division: 'Product',
    category: 'Strategy',
    shortDescription: 'Turns ideas into structured product plans with clear priorities.',
    longDescription:
      'The Product Strategist agent helps founders and PMs define MVPs, prioritize features, structure roadmaps, and make sound product decisions backed by clear reasoning.',
    role: 'Senior Product Strategist',
    mission: 'Deliver structured product plans with clear scope, priorities, risks, and next steps.',
    whenToUse: 'Use when defining MVP scope, prioritizing a backlog, structuring a roadmap, or aligning on product direction.',
    inputRequirements: [
      'Product idea or existing product context',
      'Target user and core problem',
      'Current stage and constraints',
    ],
    outputFormat: [
      'Product brief',
      'MVP scope',
      'Feature prioritization',
      'Risks and dependencies',
      'Recommended next steps',
    ],
    systemPrompt:
      'You are a senior product strategist with expertise in SaaS, B2B products, and lean MVP development. Provide structured product plans.',
    exampleTasks: [
      'Define the MVP for a project management SaaS',
      'Prioritize the feature backlog for our next quarter',
      'Create a product brief for a new AI feature',
    ],
    suggestedPrompts: [
      'Define the MVP scope for my SaaS idea',
      'Prioritize these 10 feature requests by impact',
      'Create a 90-day product roadmap for our team',
    ],
    planRequired: 'free',
    isFeatured: true,
    isActive: true,
  },
  {
    id: 'agent-006',
    slug: 'sales-strategist',
    name: 'Sales Strategist',
    division: 'Sales',
    category: 'Revenue',
    shortDescription: 'Converts product value into pipeline strategy and outreach plans.',
    longDescription:
      'The Sales Strategist agent helps build ideal customer profiles, craft positioning, design sales motions, and create outreach frameworks that convert.',
    role: 'Senior Sales Strategist',
    mission: 'Deliver targeted sales strategy, messaging, and outreach plans that drive pipeline.',
    whenToUse: 'Use when defining your ICP, crafting sales messaging, designing outreach sequences, or reviewing sales strategy.',
    inputRequirements: [
      'Product and value proposition',
      'Target market and customer profile',
      'Current sales challenges',
    ],
    outputFormat: [
      'ICP definition',
      'Value messaging map',
      'Outreach strategy',
      'Objection handling notes',
    ],
    systemPrompt:
      'You are a senior B2B sales strategist with deep expertise in ICP development, sales messaging, and pipeline strategy.',
    exampleTasks: [
      'Define the ideal customer profile for our SaaS',
      'Create a cold outreach sequence for enterprise buyers',
      'Build a competitive positioning framework',
    ],
    suggestedPrompts: [
      'Define our ICP for a developer tools product',
      'Write a cold email sequence for enterprise SaaS',
      'Build a sales messaging framework for our product',
    ],
    planRequired: 'starter',
    isFeatured: false,
    isActive: true,
  },
  {
    id: 'agent-007',
    slug: 'proposal-strategist',
    name: 'Proposal Strategist',
    division: 'Sales',
    category: 'Proposals',
    shortDescription: 'Writes persuasive proposals, win themes, and commercial narratives.',
    longDescription:
      'The Proposal Strategist agent specializes in structuring winning commercial proposals with clear value positioning, compelling win themes, and professional narrative flow.',
    role: 'Senior Proposal Strategist',
    mission: 'Deliver structured, persuasive proposals that clearly communicate value and drive decisions.',
    whenToUse:
      'Use when responding to RFPs, creating client proposals, building pitch decks narrative, or improving existing proposals.',
    inputRequirements: [
      'Client context and stated requirements',
      'Your solution and differentiators',
      'Budget and timeline constraints',
    ],
    outputFormat: [
      'Proposal structure',
      'Win themes',
      'Executive summary draft',
      'Key sections outline',
    ],
    systemPrompt:
      'You are a senior proposal strategist with expertise in B2B proposals, RFP responses, and commercial narrative writing.',
    exampleTasks: [
      'Structure a proposal for a government technology contract',
      'Write win themes for our enterprise SaaS proposal',
      'Review this proposal for persuasiveness gaps',
    ],
    suggestedPrompts: [
      'Structure a proposal for a consulting engagement',
      'Write executive summary for our technology proposal',
      'Improve the win themes in this RFP response',
    ],
    planRequired: 'pro',
    isFeatured: false,
    isActive: true,
  },
  {
    id: 'agent-008',
    slug: 'security-reviewer',
    name: 'Security Reviewer',
    division: 'Security',
    category: 'Risk',
    shortDescription: 'Reviews risks, permissions, and security posture for SaaS products.',
    longDescription:
      'The Security Reviewer agent identifies security vulnerabilities, authentication weaknesses, access control gaps, and data protection issues in web applications and SaaS products.',
    role: 'Senior Application Security Engineer',
    mission: 'Deliver a prioritized list of security risks with clear remediation guidance.',
    whenToUse:
      'Use when reviewing authentication systems, access controls, API security, data handling, or preparing for a security audit.',
    inputRequirements: [
      'System or component to review',
      'Tech stack and architecture overview',
      'Known security concerns if any',
    ],
    outputFormat: [
      'Risk list by severity',
      'Priority fix recommendations',
      'Security checklist',
      'Compliance notes',
    ],
    systemPrompt:
      'You are a senior application security engineer specializing in web application security, OWASP, and SaaS security reviews.',
    exampleTasks: [
      'Review our authentication implementation for vulnerabilities',
      'Audit the API access control system',
      'Check our data storage approach for compliance risks',
    ],
    suggestedPrompts: [
      'Review our user authentication flow for security gaps',
      'Audit our API endpoints for authorization issues',
      'Check our data handling for GDPR compliance risks',
    ],
    planRequired: 'pro',
    isFeatured: true,
    isActive: true,
  },
  {
    id: 'agent-009',
    slug: 'code-reviewer',
    name: 'Code Reviewer',
    division: 'Engineering',
    category: 'Quality',
    shortDescription: 'Reviews code quality, maintainability, and risk with detailed feedback.',
    longDescription:
      'The Code Reviewer agent provides thorough code reviews focusing on maintainability, performance, security, and adherence to best practices.',
    role: 'Senior Staff Engineer',
    mission: 'Deliver structured code review with issues categorized by severity and clear remediation steps.',
    whenToUse: 'Use for PR reviews, refactoring advice, identifying technical debt, or evaluating new code before production.',
    inputRequirements: [
      'Code snippet or component to review',
      'Context about the system and goals',
      'Specific concerns if any',
    ],
    outputFormat: [
      'Issue list by severity',
      'Recommended fixes',
      'Best practice notes',
      'Refactoring suggestions',
    ],
    systemPrompt:
      'You are a senior staff engineer who performs thorough, constructive code reviews focusing on quality, security, and maintainability.',
    exampleTasks: [
      'Review this API route handler for issues',
      'Evaluate this database query for performance',
      'Check this component for accessibility and maintainability',
    ],
    suggestedPrompts: [
      'Review this React component for best practices',
      'Evaluate this API endpoint for security and performance',
      'Check this database query for optimization opportunities',
    ],
    planRequired: 'free',
    isFeatured: false,
    isActive: true,
  },
  {
    id: 'agent-010',
    slug: 'prompt-engineer',
    name: 'Prompt Engineer',
    division: 'Engineering',
    category: 'AI Systems',
    shortDescription: 'Turns vague instructions into reliable, structured AI workflows.',
    longDescription:
      'The Prompt Engineer agent specializes in crafting precise system prompts, structured output formats, evaluation criteria, and reliable AI workflow designs.',
    role: 'Senior Prompt Engineer',
    mission: 'Deliver refined, reliable prompts with test cases, failure modes, and structured output definitions.',
    whenToUse: 'Use when designing AI agent prompts, improving unreliable outputs, creating evaluation frameworks, or building AI workflows.',
    inputRequirements: [
      'Goal of the AI task',
      'Existing prompt if any',
      'Examples of desired output',
    ],
    outputFormat: [
      'Improved prompt',
      'Output format specification',
      'Test cases',
      'Known failure modes',
    ],
    systemPrompt:
      'You are a senior prompt engineer specializing in LLM reliability, structured outputs, and systematic prompt design.',
    exampleTasks: [
      'Improve this agent system prompt for reliability',
      'Design a structured output format for a code review agent',
      'Create test cases for this classification prompt',
    ],
    suggestedPrompts: [
      'Improve this system prompt for a customer support agent',
      'Design a structured output format for code analysis',
      'Create evaluation criteria for this summarization prompt',
    ],
    planRequired: 'pro',
    isFeatured: false,
    isActive: true,
  },
  {
    id: 'agent-011',
    slug: 'technical-writer',
    name: 'Technical Writer',
    division: 'Engineering',
    category: 'Documentation',
    shortDescription: 'Writes clear, structured documentation, guides, and API references.',
    longDescription:
      'The Technical Writer agent produces clear, structured technical documentation including README files, API references, user guides, and onboarding documentation.',
    role: 'Senior Technical Writer',
    mission: 'Deliver clear, well-structured documentation that helps users succeed.',
    whenToUse:
      'Use when writing README files, API documentation, user guides, onboarding docs, or improving existing documentation.',
    inputRequirements: [
      'System or feature to document',
      'Target audience',
      'Documentation format required',
    ],
    outputFormat: [
      'Documentation draft',
      'Document structure',
      'Example code snippets',
      'Improvement suggestions',
    ],
    systemPrompt:
      'You are a senior technical writer specializing in developer documentation, API references, and user guides for SaaS products.',
    exampleTasks: [
      'Write a README for our open-source project',
      'Create API documentation for our REST endpoints',
      'Write an onboarding guide for new users',
    ],
    suggestedPrompts: [
      'Write a README for this Node.js library',
      'Create API documentation for these endpoints',
      'Write an onboarding guide for our SaaS platform',
    ],
    planRequired: 'starter',
    isFeatured: false,
    isActive: true,
  },
  {
    id: 'agent-012',
    slug: 'operations-strategist',
    name: 'Operations Strategist',
    division: 'Strategy',
    category: 'Operations',
    shortDescription: 'Turns messy workflows into structured operating systems and SOPs.',
    longDescription:
      'The Operations Strategist agent analyzes internal processes, identifies inefficiencies, and designs structured operating procedures, automation opportunities, and reporting systems.',
    role: 'Senior Operations Strategist',
    mission: 'Deliver structured process maps, SOPs, and implementation plans for operational excellence.',
    whenToUse:
      'Use when designing internal processes, creating SOPs, analyzing operational inefficiencies, or building reporting systems.',
    inputRequirements: [
      'Description of the current workflow or process',
      'Team size and tools in use',
      'Known pain points or goals',
    ],
    outputFormat: [
      'Process map',
      'SOP outline',
      'Automation opportunities',
      'Implementation plan',
    ],
    systemPrompt:
      'You are a senior operations strategist specializing in process design, SOPs, operational efficiency, and team workflows.',
    exampleTasks: [
      'Map out our customer onboarding process',
      'Design an SOP for our code deployment workflow',
      'Identify automation opportunities in our sales process',
    ],
    suggestedPrompts: [
      'Design an SOP for our customer support process',
      'Map our current product development workflow',
      'Identify automation opportunities in our reporting process',
    ],
    planRequired: 'pro',
    isFeatured: false,
    isActive: true,
  },
]

export function getAgentBySlug(slug: string): Agent | undefined {
  return SEED_AGENTS.find((a) => a.slug === slug)
}

export function getAgentById(id: string): Agent | undefined {
  return SEED_AGENTS.find((a) => a.id === id)
}

export function getAgentsByDivision(division: string): Agent[] {
  return SEED_AGENTS.filter((a) => a.division === division && a.isActive)
}

export function getFeaturedAgents(): Agent[] {
  return SEED_AGENTS.filter((a) => a.isFeatured && a.isActive)
}

export const DIVISIONS = [...new Set(SEED_AGENTS.map((a) => a.division))].sort()
