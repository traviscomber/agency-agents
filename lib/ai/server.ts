import { openai } from '@ai-sdk/openai'
import { generateObject, generateText, streamObject, tool } from 'ai'
import { z } from 'zod'

// Server-side AI for heavy lifting and tool use
const INTELLIGENCE_MODEL = openai('gpt-4o') // Best all-around model
const REASONING_MODEL = openai('gpt-4-turbo') // For complex analysis

/**
 * Intelligent agent execution with tool calling
 * Used for: complex workflows, multi-step processes
 */
export async function executeIntelligentAgent(
  userGoal: string,
  availableTools: Record<string, any>,
  context?: Record<string, any>
) {
  const systemPrompt = buildServerSystemPrompt(context)

  // This would be expanded with actual tool definitions
  return generateText({
    model: INTELLIGENCE_MODEL,
    system: systemPrompt,
    prompt: userGoal,
    temperature: 0.5,
  })
}

/**
 * Analyze complex business scenarios with AI
 */
export async function analyzeBusinessScenario(
  scenario: string,
  type: 'financial' | 'operational' | 'compliance' | 'growth'
) {
  const systemPrompt = `You are an expert business analyst specializing in ${type} analysis.
Provide deep insights, actionable recommendations, and specific next steps.
Use data-driven reasoning and best practices.`

  const result = await generateText({
    model: REASONING_MODEL,
    system: systemPrompt,
    prompt: `Analyze this ${type} scenario and provide recommendations:\n\n${scenario}`,
    temperature: 0.6,
  })

  return result.text
}

/**
 * Generate structured business insights
 */
export async function generateBusinessInsights(
  data: Record<string, any>,
  analysisType: string
) {
  const schema = z.object({
    key_insights: z.array(z.string()),
    recommendations: z.array(
      z.object({
        action: z.string(),
        impact: z.string(),
        priority: z.enum(['high', 'medium', 'low']),
      })
    ),
    metrics: z.object({
      estimated_time_savings: z.string(),
      estimated_cost_savings: z.string(),
      roi: z.string(),
    }),
  })

  const prompt = `Analyze this data and provide structured business insights:

Data: ${JSON.stringify(data, null, 2)}

Analysis Type: ${analysisType}

Provide insights in the structured format requested.`

  const result = await generateObject({
    model: INTELLIGENCE_MODEL,
    schema,
    prompt,
    temperature: 0.5,
  })

  return result.object
}

/**
 * Intelligent project planning with AI
 */
export async function planProject(
  projectGoal: string,
  constraints: {
    budget?: string
    timeline?: string
    team_size?: number
    resources?: string[]
  }
) {
  const schema = z.object({
    phases: z.array(
      z.object({
        name: z.string(),
        duration: z.string(),
        key_tasks: z.array(z.string()),
        deliverables: z.array(z.string()),
        risks: z.array(z.string()),
      })
    ),
    critical_path: z.array(z.string()),
    success_metrics: z.array(z.string()),
  })

  const prompt = `Create a detailed project plan for this goal:

Goal: ${projectGoal}

Constraints:
${Object.entries(constraints)
  .map(([key, value]) => `${key}: ${value}`)
  .join('\n')}

Provide a structured project plan with phases, tasks, and metrics.`

  const result = await generateObject({
    model: INTELLIGENCE_MODEL,
    schema,
    prompt,
    temperature: 0.4,
  })

  return result.object
}

/**
 * Generate smart recommendations for agents
 */
export async function recommendAgentsForUser(userProfile: {
  pain_points: string[]
  business_type: string
  team_size: number
  budget: string
}) {
  const schema = z.object({
    agents: z.array(
      z.object({
        name: z.string(),
        description: z.string(),
        why_relevant: z.string(),
        expected_benefit: z.string(),
        implementation_time: z.string(),
        complexity: z.enum(['easy', 'medium', 'hard']),
        estimated_roi: z.string(),
      })
    ),
    implementation_order: z.array(z.string()),
    quick_wins: z.array(z.string()),
  })

  const prompt = `Based on this user profile, recommend the best agents from N3uralia:

Business: ${userProfile.business_type}
Team Size: ${userProfile.team_size}
Budget: ${userProfile.budget}
Pain Points:
${userProfile.pain_points.map((p) => `- ${p}`).join('\n')}

Available Agents:
- Twin Ejecutivo Comercial B2B (Sales & business development)
- Twin Analista Licitaciones (Bid/tender management)
- Twin Cobranza Pyme (Debt collection & receivables)
- Twin PM Implementación (Project management)
- Twin Reclutador Operativo (HR & recruitment)

Provide personalized recommendations with ROI and implementation strategy.`

  const result = await generateObject({
    model: INTELLIGENCE_MODEL,
    schema,
    prompt,
    temperature: 0.5,
  })

  return result.object
}

/**
 * Build server system prompt with expertise
 */
function buildServerSystemPrompt(context?: Record<string, any>): string {
  let prompt = `You are N3uralia's intelligent AI engine - an expert business operations AI.

You specialize in:
✓ Workflow automation and optimization
✓ Financial management (cobranza, AR optimization)
✓ Labor compliance and HR management
✓ Bid management and procurement
✓ Sales strategy and pipeline management
✓ Business intelligence and analytics

You are:
- Data-driven and analytical
- Focused on ROI and business impact
- Precise with numbers and metrics
- Practical and implementation-focused
- Multilingual (Spanish/English)

Always provide:
1. Clear, actionable recommendations
2. Specific metrics and ROI calculations
3. Implementation steps
4. Risk mitigation
5. Success metrics`

  if (context?.industry) {
    prompt += `\n\nIndustry Context: ${context.industry}`
  }

  if (context?.company_size) {
    prompt += `\nCompany Size: ${context.company_size}`
  }

  return prompt
}

/**
 * Stream intelligent responses for real-time interaction
 */
export async function streamIntelligentAnalysis(
  query: string,
  context: Record<string, any>
) {
  const systemPrompt = buildServerSystemPrompt(context)

  return streamObject({
    model: REASONING_MODEL,
    system: systemPrompt,
    prompt: query,
    schema: z.object({
      analysis: z.string(),
      recommendations: z.array(z.string()),
      next_steps: z.array(z.string()),
    }),
  })
}
