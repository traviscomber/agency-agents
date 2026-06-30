import { NextRequest, NextResponse } from 'next/server'
import { getAgentBySlug } from '@/lib/data/seed-agents'
import { runMockAgent } from '@/lib/ai/mock-provider'
import { PLAN_RUN_LIMITS } from '@/lib/data/plans'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { agentSlug, task, context, desiredOutput, detailLevel, userPlan } = body

    if (!agentSlug || !task) {
      return NextResponse.json({ error: 'agentSlug and task are required' }, { status: 400 })
    }

    const agent = getAgentBySlug(agentSlug)
    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
    }

    // Server-side plan check
    const plan = (userPlan as string) || 'free'
    const planHierarchy = ['free', 'starter', 'pro', 'team', 'enterprise']
    const userPlanIndex = planHierarchy.indexOf(plan)
    const agentPlanIndex = planHierarchy.indexOf(agent.planRequired)

    if (userPlanIndex < agentPlanIndex) {
      return NextResponse.json(
        { error: 'upgrade_required', requiredPlan: agent.planRequired },
        { status: 403 }
      )
    }

    // Run the agent (mock or real provider)
    const output = await runMockAgent(agent, { task, context, desiredOutput, detailLevel })

    return NextResponse.json({
      success: true,
      agentId: agent.id,
      agentName: agent.name,
      output,
      creditsUsed: 1,
      modelUsed: 'mock-provider',
    })
  } catch (error) {
    console.error('[AgentRuns] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
