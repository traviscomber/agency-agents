import type { AgentRun, Project, ProjectMemoryEntry, ProjectOverlayState, ProjectWorkflowStep, SavedOutput } from '@/lib/types'

const STORAGE_PREFIX = 'agencyos.project-overlay.'

function getStorageKey(projectId: string) {
  return `${STORAGE_PREFIX}${projectId}`
}

export function buildProjectContext(project?: Project) {
  if (!project?.operatingBrief) return ''

  const brief = project.operatingBrief
  const latestMemory = project.memory?.[0]
  const activeStep = project.workflow?.find((step) => step.status === 'active') ?? project.workflow?.find((step) => step.status === 'next')

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

export function loadProjectOverlay(projectId: string): ProjectOverlayState | null {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(getStorageKey(projectId))
  if (!raw) return null

  try {
    return JSON.parse(raw) as ProjectOverlayState
  } catch {
    return null
  }
}

export function saveProjectOverlay(projectId: string, overlay: ProjectOverlayState) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(getStorageKey(projectId), JSON.stringify(overlay))
}

export function buildProjectOverlay(project: Project): ProjectOverlayState {
  return {
    projectId: project.id,
    memory: [...(project.memory ?? [])],
    workflow: [...(project.workflow ?? [])],
    runs: [],
    savedOutputs: [],
  }
}

export function getProjectOverlay(project: Project): ProjectOverlayState {
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

export function advanceWorkflowAfterRun(workflow: ProjectWorkflowStep[], runId: string, runLabel: string, completedAt: string) {
  const activeIndex = workflow.findIndex((step) => step.status === 'active')
  const nextIndex = activeIndex >= 0 ? activeIndex : workflow.findIndex((step) => step.status === 'next')
  if (nextIndex < 0) return workflow

  return workflow.map((step, index) => {
    if (index === nextIndex) {
      return {
        ...step,
        status: 'done',
        linkedRunId: runId,
        linkedRunLabel: runLabel,
        completedAt,
      }
    }

    if (index === nextIndex + 1 && step.status === 'next') {
      return {
        ...step,
        status: 'active',
      }
    }

    return step
  })
}
