import { NextRequest, NextResponse } from 'next/server'
import {
  createProjectState,
  readProjectState,
  saveGlobalRunState,
  saveGlobalSavedOutputState,
  saveProjectRunState,
  saveProjectRunResultState,
  updateProjectOperatingState,
  updateProjectBriefState,
} from '@/lib/server/project-state-store'
import type { AgentRun, Project, ProjectMemoryEntry, ProjectOperatingBrief, ProjectWorkflowStep, SavedOutput } from '@/lib/types'

export async function GET() {
  try {
    const state = await readProjectState()
    return NextResponse.json(state)
  } catch (error) {
    console.error('[ProjectState][GET] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    switch (body.action) {
      case 'create_project': {
        const project = body.project as Project | undefined
        if (!project) {
          return NextResponse.json({ error: 'project is required' }, { status: 400 })
        }

        const result = await createProjectState(project)
        return NextResponse.json({ success: true, result })
      }

      case 'update_brief': {
        const projectId = body.projectId as string | undefined
        const project = body.project as Project | undefined
        const brief = body.brief as ProjectOperatingBrief | undefined

        if (!projectId || !brief) {
          return NextResponse.json({ error: 'projectId and brief are required' }, { status: 400 })
        }

        const result = await updateProjectBriefState(projectId, brief, project)
        if (!result) {
          return NextResponse.json({ error: 'Project not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, result })
      }

      case 'save_run_result': {
        const project = body.project as Project | undefined
        const run = body.run as AgentRun | undefined
        const savedOutput = body.savedOutput as SavedOutput | undefined
        const memoryEntry = body.memoryEntry as ProjectMemoryEntry | undefined
        const workflow = body.workflow as ProjectWorkflowStep[] | undefined

        if (!project || !run || !savedOutput || !memoryEntry || !workflow) {
          return NextResponse.json(
            { error: 'project, run, savedOutput, memoryEntry, and workflow are required' },
            { status: 400 },
          )
        }

        const result = await saveProjectRunResultState({
          project,
          run,
          savedOutput,
          memoryEntry,
          workflow,
        })

        return NextResponse.json({ success: true, result })
      }

      case 'save_run': {
        const run = body.run as AgentRun | undefined
        const project = body.project as Project | undefined

        if (!run) {
          return NextResponse.json({ error: 'run is required' }, { status: 400 })
        }

        const result = project
          ? await saveProjectRunState({
              project,
              run,
            })
          : await saveGlobalRunState(run)

        return NextResponse.json({ success: true, result })
      }

      case 'save_saved_output': {
        const savedOutput = body.savedOutput as SavedOutput | undefined

        if (!savedOutput) {
          return NextResponse.json({ error: 'savedOutput is required' }, { status: 400 })
        }

        const result = await saveGlobalSavedOutputState(savedOutput)
        return NextResponse.json({ success: true, result })
      }

      case 'update_operating_state': {
        const projectId = body.projectId as string | undefined
        const project = body.project as Project | undefined
        const memoryEntry = body.memoryEntry as ProjectMemoryEntry | undefined
        const workflow = body.workflow as ProjectWorkflowStep[] | undefined

        if (!projectId) {
          return NextResponse.json({ error: 'projectId is required' }, { status: 400 })
        }

        const result = await updateProjectOperatingState({
          projectId,
          project,
          memoryEntry,
          workflow,
        })

        if (!result) {
          return NextResponse.json({ error: 'Project not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, result })
      }

      default:
        return NextResponse.json({ error: 'Unsupported action' }, { status: 400 })
    }
  } catch (error) {
    console.error('[ProjectState][POST] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
