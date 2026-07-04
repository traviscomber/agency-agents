import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import type {
  AgentRun,
  Project,
  ProjectMemoryEntry,
  ProjectOperatingBrief,
  ProjectOverlayState,
  SavedOutput,
} from '@/lib/types'

interface PersistedProjectState {
  projects: Project[]
  overlays: Record<string, ProjectOverlayState>
}

const DATA_DIR = path.join(process.cwd(), '.data')
const DATA_FILE = path.join(DATA_DIR, 'project-state.json')

function upsertProject(projects: Project[], nextProject: Project) {
  return [nextProject, ...projects.filter((item) => item.id !== nextProject.id)]
}

function buildOverlay(project: Project): ProjectOverlayState {
  return {
    projectId: project.id,
    operatingBrief: project.operatingBrief,
    memory: [...(project.memory ?? [])],
    workflow: [...(project.workflow ?? [])],
    runs: [],
    savedOutputs: [],
  }
}

async function ensureStateFile() {
  await mkdir(DATA_DIR, { recursive: true })
  try {
    await readFile(DATA_FILE, 'utf8')
  } catch {
    const initialState: PersistedProjectState = { projects: [], overlays: {} }
    await writeFile(DATA_FILE, JSON.stringify(initialState, null, 2), 'utf8')
  }
}

export async function readProjectState(): Promise<PersistedProjectState> {
  await ensureStateFile()
  const raw = await readFile(DATA_FILE, 'utf8')
  return JSON.parse(raw) as PersistedProjectState
}

async function writeProjectState(state: PersistedProjectState) {
  await ensureStateFile()
  await writeFile(DATA_FILE, JSON.stringify(state, null, 2), 'utf8')
}

export async function createProjectState(project: Project) {
  const state = await readProjectState()
  state.projects = upsertProject(state.projects, project)
  state.overlays[project.id] = buildOverlay(project)
  await writeProjectState(state)
  return project
}

export async function updateProjectBriefState(projectId: string, brief: ProjectOperatingBrief, project?: Project) {
  const state = await readProjectState()
  const existingOverlay = state.overlays[projectId] ?? (project ? buildOverlay(project) : null)
  if (!existingOverlay) return null
  const updatedAt = new Date().toISOString()

  state.overlays[projectId] = {
    ...existingOverlay,
    operatingBrief: brief,
  }

  if (project) {
    state.projects = upsertProject(state.projects, {
      ...project,
      operatingBrief: brief,
      updatedAt,
    })
  } else {
    state.projects = state.projects.map((item) =>
      item.id === projectId
        ? {
            ...item,
            operatingBrief: brief,
            updatedAt,
          }
        : item,
    )
  }

  await writeProjectState(state)
  return state.overlays[projectId]
}

export async function saveProjectRunResultState(args: {
  project: Project
  run: AgentRun
  savedOutput: SavedOutput
  memoryEntry: ProjectMemoryEntry
  workflow: ProjectOverlayState['workflow']
}) {
  const state = await readProjectState()
  const overlay = state.overlays[args.project.id] ?? buildOverlay(args.project)
  const updatedAt = args.run.createdAt

  state.overlays[args.project.id] = {
    ...overlay,
    memory: [args.memoryEntry, ...overlay.memory],
    runs: [args.run, ...overlay.runs],
    savedOutputs: [args.savedOutput, ...overlay.savedOutputs],
    workflow: args.workflow,
    operatingBrief: args.project.operatingBrief ?? overlay.operatingBrief,
  }

  state.projects = upsertProject(state.projects, {
    ...args.project,
    updatedAt,
  })

  await writeProjectState(state)
  return state.overlays[args.project.id]
}
