import { MOCK_PROJECTS } from '@/lib/data/mock-store'
import type {
  AgentOutput,
  AgentRun,
  Project,
  ProjectHandoffPacket,
  ProjectRunPreset,
  ProjectMemoryEntry,
  ProjectOperatingBrief,
  ProjectOverlayState,
  ProjectType,
  ProjectWorkflowStatus,
  ProjectWorkflowStatusSource,
  ProjectWorkflowStep,
  SavedOutput,
} from '@/lib/types'

const STORAGE_PREFIX = 'agencyos.project-overlay.'
const STORED_PROJECTS_KEY = 'agencyos.projects'
const GLOBAL_RUNS_KEY = 'agencyos.runs'
const GLOBAL_SAVED_OUTPUTS_KEY = 'agencyos.saved-outputs'

interface PersistedProjectState {
  projects: Project[]
  overlays: Record<string, ProjectOverlayState>
  runs: AgentRun[]
  savedOutputs: SavedOutput[]
}

interface PersistRunResultArgs {
  project: Project
  run: AgentRun
  savedOutput: SavedOutput
  memoryEntry: ProjectMemoryEntry
  workflow: ProjectWorkflowStep[]
}

interface PersistRunArgs {
  project: Project
  run: AgentRun
}

export interface CreateStoredProjectOptions {
  recommendedAgentSlug?: string
  diagnosisRole?: string
  diagnosisSummary?: string
  diagnosisSupervision?: string
  diagnosisHours?: string
  diagnosisEstimatedSavings?: number
  diagnosisNextStep?: string
}

function upsertRun(runs: AgentRun[], nextRun: AgentRun) {
  return [nextRun, ...runs.filter((item) => item.id !== nextRun.id)]
}

function upsertSavedOutput(savedOutputs: SavedOutput[], nextSavedOutput: SavedOutput) {
  return [nextSavedOutput, ...savedOutputs.filter((item) => item.id !== nextSavedOutput.id)]
}

function upsertMemoryEntry(entries: ProjectMemoryEntry[], nextEntry: ProjectMemoryEntry) {
  return [nextEntry, ...entries.filter((item) => item.id !== nextEntry.id)]
}

function getStorageKey(projectId: string) {
  return `${STORAGE_PREFIX}${projectId}`
}

function canUseStorage() {
  return typeof window !== 'undefined'
}

export function resolveWorkflowRecommendedAgentSlug(step?: ProjectWorkflowStep | null) {
  if (!step) return null
  if (step.recommendedAgentSlug) return step.recommendedAgentSlug

  const ownerMap: Record<string, string> = {
    Strategy: 'product-strategist',
    Operations: 'operations-strategist',
    Lead: 'proposal-strategist',
    Product: 'product-strategist',
    Marketing: 'technical-writer',
    Research: 'ux-researcher',
    Growth: 'sales-strategist',
    Sales: 'proposal-strategist',
    Accounts: 'product-strategist',
    Delivery: 'proposal-strategist',
    Creative: 'proposal-strategist',
  }

  return ownerMap[step.owner] ?? null
}

const WORKFLOW_STATUS_PRIORITY: ProjectWorkflowStatus[] = ['active', 'at-risk', 'blocked', 'awaiting-decision', 'ready']

export function getProjectCurrentWorkflowStep(workflow?: ProjectWorkflowStep[] | null) {
  if (!workflow?.length) return null

  for (const status of WORKFLOW_STATUS_PRIORITY) {
    const step = workflow.find((item) => item.status === status)
    if (step) return step
  }

  return workflow.find((item) => item.status !== 'done') ?? null
}

export function getWorkflowStatusMeta(status: ProjectWorkflowStatus) {
  switch (status) {
    case 'active':
      return { label: 'Active', description: 'Currently being executed.', tone: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' }
    case 'ready':
      return { label: 'Ready', description: 'Clear enough to execute next.', tone: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' }
    case 'awaiting-decision':
      return { label: 'Awaiting decision', description: 'Needs explicit approval or choice.', tone: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200' }
    case 'at-risk':
      return { label: 'At risk', description: 'Work can continue, but a constraint is degrading confidence.', tone: 'bg-orange-50 text-orange-700 ring-1 ring-orange-200' }
    case 'blocked':
      return { label: 'Blocked', description: 'Cannot progress until the blocker is resolved.', tone: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200' }
    case 'done':
    default:
      return { label: 'Done', description: 'Completed and captured.', tone: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200' }
  }
}

export const PROJECT_TYPE_OPTIONS: Array<{
  value: ProjectType
  label: string
  description: string
}> = [
  {
    value: 'launch',
    label: 'Launch',
    description: 'Narrative, offer, and launch assets coordinated as one operating motion.',
  },
  {
    value: 'growth',
    label: 'Growth',
    description: 'Acquisition loops, experimentation, and channel decisions that need tight iteration.',
  },
  {
    value: 'operations',
    label: 'Operations',
    description: 'Internal systems, workflows, and execution hygiene that compound over time.',
  },
  {
    value: 'client-delivery',
    label: 'Client delivery',
    description: 'Service delivery, approvals, and handoffs that need a reusable production rhythm.',
  },
]

const PROJECT_TYPE_LABELS = new Map(PROJECT_TYPE_OPTIONS.map((option) => [option.value, option.label]))

function defaultOperatingBrief(projectName: string, projectType: ProjectType): ProjectOperatingBrief {
  switch (projectType) {
    case 'launch':
      return {
        objective: `Prepare ${projectName} for launch with a clear offer, proof, and execution plan.`,
        audience: 'Define the primary buyer or market segment the launch needs to convert.',
        tone: 'Decisive, sharp, and commercially credible.',
        successDefinition: 'Launch assets, positioning, and rollout sequencing are ready for execution without ambiguity.',
        constraints: ['Keep the offer explicit.', 'Document proof points.', 'Sequence channels before production starts.'],
      }
    case 'growth':
      return {
        objective: `Turn ${projectName} into a measurable growth engine with clear bets and learning loops.`,
        audience: 'Specify the segment, channel audience, or pipeline cohort this work should influence.',
        tone: 'Analytical, focused, and experiment-driven.',
        successDefinition: 'The team has prioritized experiments, decision criteria, and a repeatable review cadence.',
        constraints: ['Tie work to a growth signal.', 'Capture learning after every run.', 'Keep next experiments queue-ready.'],
      }
    case 'client-delivery':
      return {
        objective: `Systematize ${projectName} so delivery stays consistent across approvals, production, and handoff.`,
        audience: 'Define the client stakeholders, operators, and approvers the workflow must satisfy.',
        tone: 'High-trust, explicit, and service-oriented.',
        successDefinition: 'Deliverables, approvals, and handoff materials can move without dropped context.',
        constraints: ['Track owner by step.', 'Store reusable delivery decisions.', 'Leave a clean handoff package after every milestone.'],
      }
    case 'operations':
    default:
      return {
        objective: `Define the core objective for ${projectName}.`,
        audience: 'Name the audience this project serves.',
        tone: 'Precise, operational, and high-trust.',
        successDefinition: 'Describe what a completed workflow should produce.',
        constraints: ['Keep the scope explicit.', 'Capture reusable decisions.', 'Turn outputs into deliverables.'],
      }
  }
}

function defaultWorkflow(projectName: string, projectType: ProjectType): ProjectWorkflowStep[] {
  switch (projectType) {
    case 'launch':
      return [
        {
          id: `wf-${projectName}-1`,
          name: 'Lock the launch narrative',
          owner: 'Strategy',
          status: 'active',
          statusSource: 'default',
          detail: 'Clarify the offer, audience, and proof so every later run inherits the same positioning.',
          recommendedAgentSlug: 'product-strategist',
        },
        {
          id: `wf-${projectName}-2`,
          name: 'Build launch assets',
          owner: 'Creative',
          status: 'ready',
          statusSource: 'default',
          detail: 'Generate the core launch deliverables and document what must stay consistent across channels.',
          recommendedAgentSlug: 'proposal-strategist',
        },
        {
          id: `wf-${projectName}-3`,
          name: 'Sequence rollout',
          owner: 'Operations',
          status: 'awaiting-decision',
          statusSource: 'default',
          detail: 'Turn the narrative and assets into a timed rollout with explicit owners and dependencies.',
          recommendedAgentSlug: 'operations-strategist',
        },
      ]
    case 'growth':
      return [
        {
          id: `wf-${projectName}-1`,
          name: 'Map growth levers',
          owner: 'Strategy',
          status: 'active',
          statusSource: 'default',
          detail: 'Define the metric, channel, and buyer signals that matter before drafting experiments.',
          recommendedAgentSlug: 'product-strategist',
        },
        {
          id: `wf-${projectName}-2`,
          name: 'Design the next experiment',
          owner: 'Growth',
          status: 'ready',
          statusSource: 'default',
          detail: 'Create a focused experiment with hypothesis, execution notes, and expected signal.',
          recommendedAgentSlug: 'operations-strategist',
        },
        {
          id: `wf-${projectName}-3`,
          name: 'Capture learning loop',
          owner: 'Lead',
          status: 'awaiting-decision',
          statusSource: 'default',
          detail: 'Log outcomes, extract reusable insight, and queue the next experiment without losing momentum.',
          recommendedAgentSlug: 'proposal-strategist',
        },
      ]
    case 'client-delivery':
      return [
        {
          id: `wf-${projectName}-1`,
          name: 'Frame the client brief',
          owner: 'Accounts',
          status: 'active',
          statusSource: 'default',
          detail: 'Align objective, stakeholders, and non-negotiables before production work starts.',
          recommendedAgentSlug: 'product-strategist',
        },
        {
          id: `wf-${projectName}-2`,
          name: 'Produce the current deliverable',
          owner: 'Delivery',
          status: 'ready',
          statusSource: 'default',
          detail: 'Generate the asset or plan, then preserve the rationale so revisions do not reset context.',
          recommendedAgentSlug: 'proposal-strategist',
        },
        {
          id: `wf-${projectName}-3`,
          name: 'Prepare approval and handoff',
          owner: 'Operations',
          status: 'awaiting-decision',
          statusSource: 'default',
          detail: 'Package what changed, what was approved, and what the next operator needs to continue cleanly.',
          recommendedAgentSlug: 'operations-strategist',
        },
      ]
    case 'operations':
    default:
      return [
        {
          id: `wf-${projectName}-1`,
          name: 'Clarify the brief',
          owner: 'Strategy',
          status: 'active',
          statusSource: 'default',
          detail: 'Define the objective, audience, and success definition before the first run.',
          recommendedAgentSlug: 'product-strategist',
        },
        {
          id: `wf-${projectName}-2`,
          name: 'Run the first specialist',
          owner: 'Operations',
          status: 'ready',
          statusSource: 'default',
          detail: 'Create the first deliverable and capture reusable context from the result.',
          recommendedAgentSlug: 'operations-strategist',
        },
        {
          id: `wf-${projectName}-3`,
          name: 'Review and operationalize',
          owner: 'Lead',
          status: 'awaiting-decision',
          statusSource: 'default',
          detail: 'Approve the deliverable, extract memory, and queue the next workflow step.',
          recommendedAgentSlug: 'proposal-strategist',
        },
      ]
  }
}

export function getProjectTypeLabel(projectType?: ProjectType) {
  return PROJECT_TYPE_LABELS.get(projectType ?? 'operations') ?? 'Operations'
}

export function buildProjectContext(project?: Project) {
  if (!project?.operatingBrief) return ''

  const brief = project.operatingBrief
  const latestMemory = project.memory?.[0]
  const activeStep = getProjectCurrentWorkflowStep(project.workflow)

  return [
    `Project objective: ${brief.objective}`,
    `Audience: ${brief.audience}`,
    `Tone: ${brief.tone}`,
    `Success definition: ${brief.successDefinition}`,
    `Constraints: ${brief.constraints.join('; ')}`,
    activeStep ? `Current workflow step: ${activeStep.name} - ${activeStep.detail}` : '',
    latestMemory ? `Latest project memory: ${latestMemory.note}` : '',
  ]
    .filter(Boolean)
    .join('\n')
}

export function buildProjectHandoffPacket(
  project: Project,
  latestDeliverable?: SavedOutput | null,
  stepOverride?: ProjectWorkflowStep,
): ProjectHandoffPacket | null {
  const brief = project.operatingBrief
  const activeStep = stepOverride ?? getProjectCurrentWorkflowStep(project.workflow)
  if (!brief || !activeStep) return null

  const latestMemory = project.memory?.[0]
  const currentStepIndex = project.workflow?.findIndex((item) => item.id === activeStep.id) ?? -1
  const nextStep = currentStepIndex >= 0 ? project.workflow?.[currentStepIndex + 1] : undefined
  const recommendedAgentSlug = resolveWorkflowRecommendedAgentSlug(activeStep)
  const projectTypeLabel = getProjectTypeLabel(project.projectType)

  const profile = (() => {
    if (project.projectType === 'launch') {
      return {
        summary: `Package the current launch decision so the next specialist can move from strategy into production without re-briefing.`,
        outputExpectation: 'A launch-ready artifact, decision memo, or sequence recommendation with positioning intact.',
        executionMode: 'Narrative-to-asset handoff',
        handoffChecklist: [
          'Clarify the offer or positioning being protected.',
          'State what must be produced or approved next.',
          'Preserve the most recent strategic decision so asset work stays aligned.',
        ],
        riskNote: 'Launch work degrades quickly when the next operator has to infer positioning from partial context.',
      }
    }

    if (project.projectType === 'growth') {
      return {
        summary: `Translate the current growth step into a testable operating handoff with explicit signal, constraint, and next experiment.`,
        outputExpectation: 'A growth plan, experiment brief, or diagnostic readout tied to a measurable signal.',
        executionMode: 'Signal-to-experiment handoff',
        handoffChecklist: [
          'Name the active growth question or bottleneck.',
          'Keep the key metric or signal visible.',
          'Specify the next experiment, review, or execution owner.',
        ],
        riskNote: 'Growth loops stall when signal, owner, or next experiment criteria are left implicit.',
      }
    }

    if (project.projectType === 'client-delivery') {
      return {
        summary: `Package client context, delivery constraints, and approval logic so production can continue cleanly across revisions.`,
        outputExpectation: 'A client-safe summary, deliverable draft, or revision-ready production note.',
        executionMode: 'Delivery-to-approval handoff',
        handoffChecklist: [
          'Preserve the client objective and approval constraint.',
          'State the current production or revision status.',
          'Make the next deliverable or review action explicit.',
        ],
        riskNote: 'Client delivery breaks trust when rationale and approval constraints are not carried into the next pass.',
      }
    }

    return {
      summary: `Compress the current operating state into a reusable handoff so the next specialist can execute without rediscovering context.`,
      outputExpectation: 'A structured next-action plan, execution brief, or operating summary.',
      executionMode: 'Operating continuity handoff',
      handoffChecklist: [
        'State the objective being advanced.',
        'Define the active step and its owner.',
        'Carry forward the latest decision or memory that should shape execution.',
      ],
      riskNote: 'Operational work loses compounding value when context is scattered across runs instead of preserved as operator-ready state.',
    }
  })()

  return {
    projectId: project.id,
    projectName: project.name,
    projectType: project.projectType,
    projectTypeLabel,
    summary: profile.summary,
    objective: brief.objective,
    audience: brief.audience,
    currentStep: activeStep.name,
    currentStepStatus: activeStep.status,
    currentStepStatusReason: activeStep.statusReason,
    currentStepStatusSource: activeStep.statusSource,
    currentStepOwner: activeStep.owner,
    currentStepDetail: activeStep.detail,
    nextStep: nextStep?.name,
    recommendedAgentSlug,
    recommendedAgentName: recommendedAgentSlug ? getAgentLabelFromSlug(recommendedAgentSlug) : null,
    latestMemory: latestMemory?.note,
    latestDeliverable: latestDeliverable?.title,
    outputExpectation: profile.outputExpectation,
    executionMode: profile.executionMode,
    handoffChecklist: profile.handoffChecklist,
    riskNote: profile.riskNote,
  }
}

export function buildProjectHandoffText(packet: ProjectHandoffPacket) {
  return [
    `Project: ${packet.projectName} (${packet.projectTypeLabel})`,
    `Summary: ${packet.summary}`,
    `Objective: ${packet.objective}`,
    packet.audience ? `Audience: ${packet.audience}` : null,
    `Current step: ${packet.currentStep} owned by ${packet.currentStepOwner}.`,
    `Step detail: ${packet.currentStepDetail}`,
    packet.recommendedAgentName ? `Recommended specialist: ${packet.recommendedAgentName}.` : null,
    packet.latestMemory ? `Latest memory: ${packet.latestMemory}` : 'Latest memory: no explicit memory captured yet.',
    packet.latestDeliverable ? `Latest deliverable: ${packet.latestDeliverable}.` : 'Latest deliverable: no deliverables saved yet.',
    packet.nextStep ? `Next step after this: ${packet.nextStep}.` : 'Next step after this: no further step defined.',
    `Execution mode: ${packet.executionMode}`,
    `Expected output: ${packet.outputExpectation}`,
    `Risk note: ${packet.riskNote}`,
    `Checklist: ${packet.handoffChecklist.join(' | ')}`,
  ]
    .filter(Boolean)
    .join('\n')
}

function getAgentLabelFromSlug(agentSlug: string) {
  const formatted = agentSlug
    .split('-')
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(' ')

  return formatted || agentSlug
}

export function buildProjectRunPreset(project: Project): ProjectRunPreset | null {
  const activeStep = getProjectCurrentWorkflowStep(project.workflow)
  if (!activeStep) return null
  return buildProjectRunPresetForStep(project, activeStep)
}

export function buildProjectRunPresetForStep(project: Project, step: ProjectWorkflowStep): ProjectRunPreset | null {
  const activeStep = step
  const agentSlug = resolveWorkflowRecommendedAgentSlug(activeStep)
  if (!activeStep || !agentSlug) return null

  const latestMemory = project.memory?.[0]
  const nextStep = project.workflow?.[project.workflow.findIndex((item) => item.id === activeStep.id) + 1]
  const handoffPacket = buildProjectHandoffPacket(project, undefined, activeStep)
  const outputProfile = (() => {
    if (project.projectType === 'launch') {
      if (/narrative|brief|position/i.test(activeStep.name)) {
        return { desiredOutput: 'analysis', detailLevel: 'deep', rationale: 'Clarify positioning before any asset production starts.' }
      }
      if (/asset|deliverable|produce/i.test(activeStep.name)) {
        return { desiredOutput: 'draft', detailLevel: 'deep', rationale: 'Produce launch-ready material with reusable framing intact.' }
      }
      return { desiredOutput: 'plan', detailLevel: 'deep', rationale: 'Sequence launch work into an explicit rollout motion.' }
    }

    if (project.projectType === 'growth') {
      if (/experiment|growth|signal/i.test(activeStep.name)) {
        return { desiredOutput: 'plan', detailLevel: 'deep', rationale: 'Translate the current step into a testable growth execution plan.' }
      }
      return { desiredOutput: 'analysis', detailLevel: 'standard', rationale: 'Map the signal, metric, and decision criteria before executing.' }
    }

    if (project.projectType === 'client-delivery') {
      if (/deliverable|produce/i.test(activeStep.name)) {
        return { desiredOutput: 'draft', detailLevel: 'deep', rationale: 'Generate client-facing material while preserving rationale for revisions.' }
      }
      return { desiredOutput: 'summary', detailLevel: 'standard', rationale: 'Package client context and handoff constraints with minimal ambiguity.' }
    }

    if (/review|handoff|operationalize/i.test(activeStep.name)) {
      return { desiredOutput: 'summary', detailLevel: 'standard', rationale: 'Compress what happened into reusable operator context.' }
    }

    return { desiredOutput: 'plan', detailLevel: 'deep', rationale: 'Convert the current workflow step into a structured next action.' }
  })()
  const context = [
    project.operatingBrief?.objective ? `Objective: ${project.operatingBrief.objective}` : null,
    `Current step: ${activeStep.name} owned by ${activeStep.owner}.`,
    `Step detail: ${activeStep.detail}`,
    latestMemory ? `Latest memory: ${latestMemory.note}` : 'Latest memory: no explicit memory captured yet.',
    nextStep ? `Next step after this: ${nextStep.name}.` : 'Next step after this: no further step defined.',
  ]
    .filter(Boolean)
    .join('\n')

  return {
    agentSlug,
    projectId: project.id,
    projectName: project.name,
    projectType: project.projectType,
    stepId: activeStep.id,
    stepName: activeStep.name,
    stepOwner: activeStep.owner,
    task: `${activeStep.name}: ${activeStep.detail}`,
    context,
    desiredOutput: outputProfile.desiredOutput,
    detailLevel: outputProfile.detailLevel,
    rationale: outputProfile.rationale,
    handoffPacket,
  }
}

export function buildProjectRunHref(project: Project) {
  const preset = buildProjectRunPreset(project)
  if (!preset) return null
  return buildProjectRunHrefForPreset(preset)
}

export function buildProjectRunHrefForStep(project: Project, step: ProjectWorkflowStep) {
  const preset = buildProjectRunPresetForStep(project, step)
  if (!preset) return null
  return buildProjectRunHrefForPreset(preset)
}

function buildProjectRunHrefForPreset(preset: ProjectRunPreset) {
  const params = new URLSearchParams({
    task: preset.task,
    context: preset.context,
    desiredOutput: preset.desiredOutput,
    detailLevel: preset.detailLevel,
    projectId: preset.projectId,
    presetStepId: preset.stepId,
    presetStepName: preset.stepName,
    presetStepOwner: preset.stepOwner,
    presetProjectName: preset.projectName,
  })

  if (preset.handoffPacket) {
    params.set('presetPacket', JSON.stringify(preset.handoffPacket))
  }

  return `/app/run/${preset.agentSlug}?${params.toString()}`
}

function loadProjectOverlay(projectId: string): ProjectOverlayState | null {
  if (!canUseStorage()) return null
  const raw = window.localStorage.getItem(getStorageKey(projectId))
  if (!raw) return null

  try {
    return JSON.parse(raw) as ProjectOverlayState
  } catch {
    return null
  }
}

function saveProjectOverlay(projectId: string, overlay: ProjectOverlayState) {
  if (!canUseStorage()) return
  window.localStorage.setItem(getStorageKey(projectId), JSON.stringify(overlay))
}

export function buildProjectOverlay(project: Project): ProjectOverlayState {
  return {
    projectId: project.id,
    operatingBrief: project.operatingBrief,
    memory: [...(project.memory ?? [])],
    workflow: [...(project.workflow ?? [])],
    runs: [],
    savedOutputs: [],
  }
}

function getLocalProjectOverlay(project: Project): ProjectOverlayState {
  return loadProjectOverlay(project.id) ?? buildProjectOverlay(project)
}

export function mergeProjectMemory(project: Project, overlay: ProjectOverlayState) {
  return overlay.memory.length ? overlay.memory : project.memory ?? []
}

export function mergeProjectWorkflow(project: Project, overlay: ProjectOverlayState) {
  return overlay.workflow.length ? overlay.workflow : project.workflow ?? []
}

export function mergeProjectRuns(baseRuns: AgentRun[], overlay: ProjectOverlayState) {
  return [...overlay.runs, ...baseRuns]
}

export function mergeProjectSavedOutputs(baseSavedOutputs: SavedOutput[], overlay: ProjectOverlayState) {
  return [...overlay.savedOutputs, ...baseSavedOutputs]
}

export function mergeProjectBrief(project: Project, overlay: ProjectOverlayState) {
  return overlay.operatingBrief ?? project.operatingBrief
}

export function captureDeliverableMemory(
  agentName: string,
  task: string,
  summary: string,
  createdAt: string,
): ProjectMemoryEntry {
  return {
    id: `mem-${createdAt}`,
    title: `${agentName} deliverable`,
    note: `${summary} Task: ${task}`,
    source: 'deliverable',
    createdAt,
  }
}

function inferNextWorkflowStateAfterRun(
  run?: AgentRun,
  output?: AgentOutput,
  projectType?: ProjectType,
): { status: ProjectWorkflowStatus; reason: string; source: ProjectWorkflowStatusSource } {
  const outputText = [
    output?.summary ?? '',
    output?.suggestedNextStep ?? '',
    ...(output?.risksNotes ?? []),
  ]
    .join(' ')
    .toLowerCase()

  if (/\bblocked\b|\bblocker\b|\bcannot\b|\bcan\'t\b|\bwaiting on\b|\bdependency\b/.test(outputText)) {
    return { status: 'blocked', reason: 'The output signaled a blocker or dependency before the next step can continue.', source: 'auto' }
  }

  if (/\bapproval\b|\bapprove\b|\bdecision\b|\bsign-?off\b|\breview\b/.test(outputText)) {
    return { status: 'awaiting-decision', reason: 'The output suggests review, approval, or an explicit decision before continuing.', source: 'auto' }
  }

  if ((output?.risksNotes.length ?? 0) >= 2 || /\brisk\b|\bunclear\b|\bunknown\b|\bconstraint\b|\balignment\b/.test(outputText)) {
    return { status: 'at-risk', reason: 'The run surfaced multiple risks or unresolved constraints that weaken execution confidence.', source: 'auto' }
  }

  if (projectType === 'client-delivery' && run?.desiredOutput === 'draft') {
    return { status: 'awaiting-decision', reason: 'Client-delivery drafts usually need approval or revision before the next handoff.', source: 'auto' }
  }

  if (projectType === 'launch' && run?.desiredOutput === 'draft') {
    return { status: 'awaiting-decision', reason: 'Launch drafts usually need positioning or asset review before rollout continues.', source: 'auto' }
  }

  if (projectType === 'growth' && run?.desiredOutput === 'plan') {
    return { status: 'ready', reason: 'The run produced an execution plan that leaves the next experiment ready to launch.', source: 'auto' }
  }

  if (projectType === 'operations' && run?.desiredOutput === 'summary') {
    return { status: 'awaiting-decision', reason: 'Operational summaries usually need an explicit owner decision before progressing.', source: 'auto' }
  }

  if (run?.desiredOutput === 'summary') {
    return { status: 'awaiting-decision', reason: 'Summary-style outputs usually need an operator decision before the workflow advances.', source: 'auto' }
  }

  return { status: 'ready', reason: 'The run produced enough context to queue the next step as ready for execution.', source: 'auto' }
}

export function advanceWorkflowAfterRun(
  workflow: ProjectWorkflowStep[],
  runId: string,
  runLabel: string,
  completedAt: string,
  options?: {
    run?: AgentRun
    output?: AgentOutput
    projectType?: ProjectType
  },
) {
  const activeStep = getProjectCurrentWorkflowStep(workflow)
  const nextIndex = activeStep ? workflow.findIndex((step) => step.id === activeStep.id) : -1
  if (nextIndex < 0) return workflow
  const inferredNextState = inferNextWorkflowStateAfterRun(options?.run, options?.output, options?.projectType)

  return workflow.map((step, index) => {
    if (index === nextIndex) {
      return {
        ...step,
        status: 'done',
        statusSource: options?.run ? 'auto' : 'manual',
        linkedRunId: runId,
        linkedRunLabel: runLabel,
        completedAt,
      }
    }

    if (index === nextIndex + 1 && step.status !== 'done') {
      return {
        ...step,
        status: inferredNextState.status,
        statusReason: inferredNextState.reason,
        statusSource: inferredNextState.source,
      }
    }

    return step
  })
}

function loadStoredProjects(): Project[] {
  if (!canUseStorage()) return []
  const raw = window.localStorage.getItem(STORED_PROJECTS_KEY)
  if (!raw) return []

  try {
    return JSON.parse(raw) as Project[]
  } catch {
    return []
  }
}

function saveStoredProjects(projects: Project[]) {
  if (!canUseStorage()) return
  window.localStorage.setItem(STORED_PROJECTS_KEY, JSON.stringify(projects))
}

function buildLocalPersistedState(): PersistedProjectState {
  const projects = loadStoredProjects()
  const overlays = Object.fromEntries(projects.map((project) => [project.id, getLocalProjectOverlay(project)]))

  for (const project of MOCK_PROJECTS) {
    const overlay = loadProjectOverlay(project.id)
    if (overlay) {
      overlays[project.id] = overlay
    }
  }

  return {
    projects,
    overlays,
    runs: loadGlobalRuns(),
    savedOutputs: loadGlobalSavedOutputs(),
  }
}

function loadGlobalRuns() {
  if (!canUseStorage()) return []
  const raw = window.localStorage.getItem(GLOBAL_RUNS_KEY)
  if (!raw) return []

  try {
    return JSON.parse(raw) as AgentRun[]
  } catch {
    return []
  }
}

function saveGlobalRuns(runs: AgentRun[]) {
  if (!canUseStorage()) return
  window.localStorage.setItem(GLOBAL_RUNS_KEY, JSON.stringify(runs))
}

function loadGlobalSavedOutputs() {
  if (!canUseStorage()) return []
  const raw = window.localStorage.getItem(GLOBAL_SAVED_OUTPUTS_KEY)
  if (!raw) return []

  try {
    return JSON.parse(raw) as SavedOutput[]
  } catch {
    return []
  }
}

function saveGlobalSavedOutputs(savedOutputs: SavedOutput[]) {
  if (!canUseStorage()) return
  window.localStorage.setItem(GLOBAL_SAVED_OUTPUTS_KEY, JSON.stringify(savedOutputs))
}

async function fetchPersistedProjectState(): Promise<PersistedProjectState> {
  if (typeof window === 'undefined') {
    return { projects: [], overlays: {}, runs: [], savedOutputs: [] }
  }

  try {
    const response = await fetch('/api/project-state', {
      method: 'GET',
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`Failed to load project state: ${response.status}`)
    }

    return (await response.json()) as PersistedProjectState
  } catch {
    return buildLocalPersistedState()
  }
}

async function postProjectState<T>(body: Record<string, unknown>, fallback: () => T | Promise<T>): Promise<T> {
  if (typeof window === 'undefined') {
    return fallback()
  }

  try {
    const response = await fetch('/api/project-state', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`Failed to persist project state: ${response.status}`)
    }

    const data = (await response.json()) as { result: T }
    return data.result
  } catch {
    return fallback()
  }
}

function saveProjectRunLocally(args: PersistRunArgs) {
  const overlay = getLocalProjectOverlay(args.project)
  const nextOverlay: ProjectOverlayState = {
    ...overlay,
    operatingBrief: args.project.operatingBrief ?? overlay.operatingBrief,
    workflow: args.project.workflow ?? overlay.workflow,
    runs: upsertRun(overlay.runs, args.run),
  }

  saveProjectOverlay(args.project.id, nextOverlay)

  const storedProjects = loadStoredProjects()
  if (storedProjects.some((item) => item.id === args.project.id)) {
    saveStoredProjects(
      storedProjects.map((item) =>
        item.id === args.project.id
          ? {
              ...item,
              updatedAt: args.run.createdAt,
            }
          : item,
      ),
    )
  }

  return nextOverlay
}

function mergeProjectWithOverlay(project: Project, overlay: ProjectOverlayState | undefined): Project {
  const resolvedOverlay = overlay ?? buildProjectOverlay(project)
  const latestOverlayTimestamp = [
    resolvedOverlay.memory[0]?.createdAt,
    resolvedOverlay.runs[0]?.createdAt,
    resolvedOverlay.savedOutputs[0]?.updatedAt,
  ]
    .filter((value): value is string => Boolean(value))
    .sort()
    .at(-1)

  return {
    ...project,
    operatingBrief: mergeProjectBrief(project, resolvedOverlay),
    memory: mergeProjectMemory(project, resolvedOverlay),
    workflow: mergeProjectWorkflow(project, resolvedOverlay),
    runCount: (project.runCount ?? 0) + resolvedOverlay.runs.length,
    savedCount: (project.savedCount ?? 0) + resolvedOverlay.savedOutputs.length,
    updatedAt: latestOverlayTimestamp && latestOverlayTimestamp > project.updatedAt ? latestOverlayTimestamp : project.updatedAt,
  }
}

export async function getProjectOverlay(project: Project): Promise<ProjectOverlayState> {
  const state = await fetchPersistedProjectState()
  return state.overlays[project.id] ?? getLocalProjectOverlay(project)
}

export async function getMergedProjects(baseProjects: Project[] = MOCK_PROJECTS) {
  const state = await fetchPersistedProjectState()
  const mergedProjects = new Map<string, Project>()

  for (const project of baseProjects) {
    mergedProjects.set(project.id, mergeProjectWithOverlay(project, state.overlays[project.id]))
  }

  for (const project of state.projects) {
    mergedProjects.set(project.id, mergeProjectWithOverlay(project, state.overlays[project.id]))
  }

  return Array.from(mergedProjects.values()).sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
}

export async function createStoredProject(
  name: string,
  description: string,
  projectType: ProjectType = 'operations',
  options: CreateStoredProjectOptions = {},
): Promise<Project> {
  const now = new Date().toISOString()
  const baseBrief = defaultOperatingBrief(name, projectType)
  const baseWorkflow = defaultWorkflow(name, projectType)
  const diagnosisMemory = options.recommendedAgentSlug
    ? [
        {
          id: `mem-diagnosis-${Date.now()}`,
          title: 'Diagnosis recommendation',
          note: [
            options.diagnosisRole ? `Recommended gemelo digital: ${options.diagnosisRole}.` : null,
            options.diagnosisSummary,
            options.diagnosisSupervision ? `Supervision: ${options.diagnosisSupervision}.` : null,
            options.diagnosisHours ? `Recoverable hours: ${options.diagnosisHours}.` : null,
            options.diagnosisEstimatedSavings ? `Estimated monthly savings: CLP ${options.diagnosisEstimatedSavings.toLocaleString('es-CL')}.` : null,
            options.diagnosisNextStep ? `Next step: ${options.diagnosisNextStep}` : null,
          ]
            .filter(Boolean)
            .join(' '),
          source: 'decision' as const,
          createdAt: now,
        },
      ]
    : []
  const workflow = options.recommendedAgentSlug
    ? baseWorkflow.map((step, index) =>
        index === 0
          ? {
              ...step,
              name: options.diagnosisRole ? `Deploy ${options.diagnosisRole}` : 'Deploy recommended gemelo digital',
              owner: 'Operations',
              status: 'active' as const,
              detail: options.diagnosisNextStep || options.diagnosisSummary || step.detail,
              recommendedAgentSlug: options.recommendedAgentSlug,
            }
          : step,
      )
    : baseWorkflow
  const project: Project = {
    id: `proj-${Date.now()}`,
    userId: 'user-demo-001',
    name,
    description,
    projectType,
    status: 'active',
    createdAt: now,
    updatedAt: now,
    runCount: 0,
    savedCount: 0,
    operatingBrief: options.recommendedAgentSlug
      ? {
          ...baseBrief,
          objective: description || options.diagnosisSummary || baseBrief.objective,
          successDefinition:
            options.diagnosisRole
              ? `Deploy ${options.diagnosisRole} with clear supervision, reusable outputs, and measurable replacement capacity.`
              : baseBrief.successDefinition,
          constraints: [
            ...baseBrief.constraints,
            'Keep human approval explicit for high-impact decisions.',
            'Preserve diagnosis context inside the program memory.',
          ],
        }
      : baseBrief,
    memory: diagnosisMemory,
    workflow,
  }

  return postProjectState<Project>(
    {
      action: 'create_project',
      project,
    },
    () => {
      const stored = loadStoredProjects()
      saveStoredProjects([project, ...stored.filter((item) => item.id !== project.id)])
      saveProjectOverlay(project.id, buildProjectOverlay(project))
      return project
    },
  )
}

export async function updateProjectBrief(project: Project, brief: ProjectOperatingBrief) {
  return postProjectState<ProjectOverlayState | null>(
    {
      action: 'update_brief',
      projectId: project.id,
      project,
      brief,
    },
    () => {
      const overlay = getLocalProjectOverlay(project)
      const nextOverlay: ProjectOverlayState = {
        ...overlay,
        operatingBrief: brief,
      }

      saveProjectOverlay(project.id, nextOverlay)

      const storedProjects = loadStoredProjects()
      if (storedProjects.some((item) => item.id === project.id)) {
        saveStoredProjects(
          storedProjects.map((item) =>
            item.id === project.id
              ? {
                  ...item,
                  operatingBrief: brief,
                  updatedAt: new Date().toISOString(),
                }
              : item,
          ),
        )
      }

      return nextOverlay
    },
  )
}

export async function persistProjectOperatingState(args: {
  project: Project
  memoryEntry?: ProjectMemoryEntry
  workflow?: ProjectWorkflowStep[]
}) {
  return postProjectState<ProjectOverlayState | null>(
    {
      action: 'update_operating_state',
      projectId: args.project.id,
      project: args.project,
      memoryEntry: args.memoryEntry,
      workflow: args.workflow,
    },
    () => {
      const overlay = getLocalProjectOverlay(args.project)
      const nextOverlay: ProjectOverlayState = {
        ...overlay,
        memory: args.memoryEntry ? upsertMemoryEntry(overlay.memory, args.memoryEntry) : overlay.memory,
        workflow: args.workflow ?? overlay.workflow,
        operatingBrief: args.project.operatingBrief ?? overlay.operatingBrief,
      }

      saveProjectOverlay(args.project.id, nextOverlay)

      const storedProjects = loadStoredProjects()
      if (storedProjects.some((item) => item.id === args.project.id)) {
        const updatedAt = args.memoryEntry?.createdAt ?? new Date().toISOString()
        saveStoredProjects(
          storedProjects.map((item) =>
            item.id === args.project.id
              ? {
                  ...item,
                  updatedAt,
                }
              : item,
          ),
        )
      }

      return nextOverlay
    },
  )
}

export async function persistProjectRunResult(args: PersistRunResultArgs) {
  return postProjectState<ProjectOverlayState>(
    {
      action: 'save_run_result',
      project: args.project,
      run: args.run,
      savedOutput: args.savedOutput,
      memoryEntry: args.memoryEntry,
      workflow: args.workflow,
    },
    () => {
      const overlay = getLocalProjectOverlay(args.project)
      const nextOverlay: ProjectOverlayState = {
        ...overlay,
        operatingBrief: args.project.operatingBrief ?? overlay.operatingBrief,
        memory: upsertMemoryEntry(overlay.memory, args.memoryEntry),
        runs: upsertRun(overlay.runs, args.run),
        savedOutputs: upsertSavedOutput(overlay.savedOutputs, args.savedOutput),
        workflow: args.workflow,
      }

      saveProjectOverlay(args.project.id, nextOverlay)

      const storedProjects = loadStoredProjects()
      if (storedProjects.some((item) => item.id === args.project.id)) {
        saveStoredProjects(
          storedProjects.map((item) =>
            item.id === args.project.id
              ? {
                  ...item,
                  updatedAt: args.run.createdAt,
                }
              : item,
          ),
        )
      }

      return nextOverlay
    },
  )
}

export async function persistProjectRun(args: PersistRunArgs) {
  return postProjectState<ProjectOverlayState>(
    {
      action: 'save_run',
      run: args.run,
      project: args.project,
    },
    () => saveProjectRunLocally(args),
  )
}

export async function persistRun(run: AgentRun, project?: Project) {
  return postProjectState<ProjectOverlayState | AgentRun[]>(
    {
      action: 'save_run',
      run,
      project,
    },
    () => {
      if (project) {
        return saveProjectRunLocally({ project, run })
      }

      const nextRuns = upsertRun(loadGlobalRuns(), run)
      saveGlobalRuns(nextRuns)
      return nextRuns
    },
  )
}

export async function persistSavedOutput(savedOutput: SavedOutput) {
  return postProjectState<SavedOutput[]>(
    {
      action: 'save_saved_output',
      savedOutput,
    },
    () => {
      const nextSavedOutputs = upsertSavedOutput(loadGlobalSavedOutputs(), savedOutput)
      saveGlobalSavedOutputs(nextSavedOutputs)
      return nextSavedOutputs
    },
  )
}

export async function getAllRuns(baseRuns: AgentRun[]) {
  const state = await fetchPersistedProjectState()
  const overlayRuns = Object.values(state.overlays).flatMap((overlay) => overlay.runs)
  return [...state.runs, ...overlayRuns, ...baseRuns]
    .filter((run, index, collection) => collection.findIndex((item) => item.id === run.id) === index)
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
}

export async function getAllSavedOutputs(baseSavedOutputs: SavedOutput[]) {
  const state = await fetchPersistedProjectState()
  const overlaySavedOutputs = Object.values(state.overlays).flatMap((overlay) => overlay.savedOutputs)
  return [...state.savedOutputs, ...overlaySavedOutputs, ...baseSavedOutputs]
    .filter((savedOutput, index, collection) => collection.findIndex((item) => item.id === savedOutput.id) === index)
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
}

export async function getRunById(runId: string, baseRuns: AgentRun[]) {
  const runs = await getAllRuns(baseRuns)
  return runs.find((run) => run.id === runId) ?? null
}

export async function getSavedOutputsForRun(runId: string, baseSavedOutputs: SavedOutput[]) {
  const savedOutputs = await getAllSavedOutputs(baseSavedOutputs)
  return savedOutputs.filter((savedOutput) => savedOutput.agentRunId === runId)
}
