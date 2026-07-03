import { MOCK_PROJECTS } from '@/lib/data/mock-store'
import type {
  AgentRun,
  Project,
  ProjectMemoryEntry,
  ProjectOperatingBrief,
  ProjectOverlayState,
  ProjectWorkflowStep,
  SavedOutput,
} from '@/lib/types'

const STORAGE_PREFIX = 'agencyos.project-overlay.'
const STORED_PROJECTS_KEY = 'agencyos.projects'

function getStorageKey(projectId: string) {
  return `${STORAGE_PREFIX}${projectId}`
}

function canUseStorage() {
  return typeof window !== 'undefined'
}

function defaultOperatingBrief(projectName: string): ProjectOperatingBrief {
  return {
    objective: `Define the core objective for ${projectName}.`,
    audience: 'Name the audience this project serves.',
    tone: 'Precise, operational, and high-trust.',
    successDefinition: 'Describe what a completed workflow should produce.',
    constraints: ['Keep the scope explicit.', 'Capture reusable decisions.', 'Turn outputs into deliverables.'],
  }
}

function defaultWorkflow(projectName: string): ProjectWorkflowStep[] {
  return [
    {
      id: `wf-${projectName}-1`,
      name: 'Clarify the brief',
      owner: 'Strategy',
      status: 'active',
      detail: 'Define the objective, audience, and success definition before the first run.',
    },
    {
      id: `wf-${projectName}-2`,
      name: 'Run the first specialist',
      owner: 'Operations',
      status: 'next',
      detail: 'Create the first deliverable and capture reusable context from the result.',
    },
    {
      id: `wf-${projectName}-3`,
      name: 'Review and operationalize',
      owner: 'Lead',
      status: 'next',
      detail: 'Approve the deliverable, extract memory, and queue the next workflow step.',
    },
  ]
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
  if (!canUseStorage()) return null
  const raw = window.localStorage.getItem(getStorageKey(projectId))
  if (!raw) return null

  try {
    return JSON.parse(raw) as ProjectOverlayState
  } catch {
    return null
  }
}

export function saveProjectOverlay(projectId: string, overlay: ProjectOverlayState) {
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

export function loadStoredProjects(): Project[] {
  if (!canUseStorage()) return []
  const raw = window.localStorage.getItem(STORED_PROJECTS_KEY)
  if (!raw) return []

  try {
    return JSON.parse(raw) as Project[]
  } catch {
    return []
  }
}

export function saveStoredProjects(projects: Project[]) {
  if (!canUseStorage()) return
  window.localStorage.setItem(STORED_PROJECTS_KEY, JSON.stringify(projects))
}

export function getMergedProjects(baseProjects: Project[] = MOCK_PROJECTS) {
  const storedProjects = loadStoredProjects()
  const mergedBaseProjects = baseProjects.map((project) => {
    const overlay = getProjectOverlay(project)
    const overlayRuns = mergeProjectRuns([], overlay).length
    const overlaySavedOutputs = mergeProjectSavedOutputs([], overlay).length
    return {
      ...project,
      operatingBrief: mergeProjectBrief(project, overlay),
      memory: mergeProjectMemory(project, overlay),
      workflow: mergeProjectWorkflow(project, overlay),
      runCount: (project.runCount ?? 0) + overlayRuns,
      savedCount: (project.savedCount ?? 0) + overlaySavedOutputs,
    }
  })

  return [...storedProjects, ...mergedBaseProjects]
}

export function createStoredProject(name: string, description: string): Project {
  const now = new Date().toISOString()
  const project: Project = {
    id: `proj-${Date.now()}`,
    userId: 'user-demo-001',
    name,
    description,
    status: 'active',
    createdAt: now,
    updatedAt: now,
    runCount: 0,
    savedCount: 0,
    operatingBrief: defaultOperatingBrief(name),
    memory: [],
    workflow: defaultWorkflow(name),
  }

  const stored = loadStoredProjects()
  saveStoredProjects([project, ...stored])
  saveProjectOverlay(project.id, buildProjectOverlay(project))

  return project
}

export function updateProjectBrief(project: Project, brief: ProjectOperatingBrief) {
  const overlay = getProjectOverlay(project)
  saveProjectOverlay(project.id, {
    ...overlay,
    operatingBrief: brief,
  })
}

export function getAllRuns(baseRuns: AgentRun[]) {
  const projects = getMergedProjects()
  const overlayRuns = projects.flatMap((project) => getProjectOverlay(project).runs)
  return [...overlayRuns, ...baseRuns]
}

export function getAllSavedOutputs(baseSavedOutputs: SavedOutput[]) {
  const projects = getMergedProjects()
  const overlaySavedOutputs = projects.flatMap((project) => getProjectOverlay(project).savedOutputs)
  return [...overlaySavedOutputs, ...baseSavedOutputs]
}
