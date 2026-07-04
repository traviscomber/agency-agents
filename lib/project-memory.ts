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

export async function createStoredProject(name: string, description: string): Promise<Project> {
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
