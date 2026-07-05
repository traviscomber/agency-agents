import { openai } from '@ai-sdk/openai'
import { generateText, streamText, LanguageModel } from 'ai'

// Use best available models
const DEFAULT_MODEL = openai('gpt-4o') // Best model for intelligence and speed
const FAST_MODEL = openai('gpt-4-turbo') // Faster for real-time interactions

/**
 * Generate intelligent text using the best available model
 * Used for: smart suggestions, recommendations, analysis
 */
export async function generateSmartText(prompt: string, context?: Record<string, any>) {
  const systemPrompt = buildSystemPrompt(context)

  const result = await generateText({
    model: DEFAULT_MODEL,
    system: systemPrompt,
    prompt,
    temperature: 0.7,
    topP: 0.95,
  })

  return result.text
}

/**
 * Stream intelligent text for real-time interactions
 * Used for: chat, live suggestions, dynamic content
 */
export async function streamSmartText(prompt: string, context?: Record<string, any>) {
  const systemPrompt = buildSystemPrompt(context)

  return streamText({
    model: FAST_MODEL,
    system: systemPrompt,
    prompt,
    temperature: 0.7,
    topP: 0.95,
  })
}

/**
 * Generate structured data with AI
 * Used for: form suggestions, agent recommendations, analysis
 */
export async function generateStructuredData<T>(
  prompt: string,
  schema: any,
  context?: Record<string, any>
) {
  const systemPrompt = buildSystemPrompt(context)

  const result = await generateText({
    model: DEFAULT_MODEL,
    system: systemPrompt,
    prompt,
    temperature: 0.3, // Lower temp for structured output
    topP: 0.9,
  })

  try {
    return JSON.parse(result.text) as T
  } catch {
    throw new Error('Failed to parse structured response')
  }
}

/**
 * Build intelligent system prompt based on context
 */
function buildSystemPrompt(context?: Record<string, any>): string {
  let prompt = `You are an exceptionally intelligent, helpful AI assistant for N3uralia AgencyOS.
You are an expert in:
- Business operations and workflow optimization
- Financial management and cobranza (debt collection)
- Labor compliance and HR operations
- Bid/tender management (licitaciones)
- Growth strategy and business development
- Technology implementation and automation

You provide expert, actionable advice. Be concise, smart, and direct.
Focus on practical solutions that drive real business value.`

  if (context?.userRole) {
    prompt += `\n\nThe user is a ${context.userRole}.`
  }

  if (context?.industry) {
    prompt += `\n\nThe user works in: ${context.industry}`
  }

  if (context?.tone) {
    prompt += `\n\nUse a ${context.tone} tone.`
  }

  return prompt
}

/**
 * Generate agent recommendations based on user context
 */
export async function recommendAgents(userContext: {
  pain_points: string[]
  business_type: string
  team_size: number
}) {
  const prompt = `Based on this business context, recommend the top 3 N3uralia agents that would help most:

Business Type: ${userContext.business_type}
Team Size: ${userContext.team_size}
Main Pain Points:
${userContext.pain_points.map((p) => `- ${p}`).join('\n')}

Recommend 3 agents with:
1. Agent name
2. How it solves their pain points
3. Expected ROI/time savings
4. Implementation difficulty (Easy/Medium/Hard)

Format as JSON array of objects with keys: name, description, roi, difficulty`

  return generateStructuredData(prompt, null, {
    tone: 'professional',
    userRole: 'Business Owner',
  })
}

/**
 * Generate smart copy for any section
 */
export async function generateSmartCopy(
  section: string,
  context: Record<string, any>
): Promise<string> {
  const prompt = `Write compelling, persuasive copy for a ${section} section.

Context:
${Object.entries(context)
  .map(([key, value]) => `${key}: ${value}`)
  .join('\n')}

Requirements:
- Professional and authoritative tone
- Focus on business value and ROI
- Include specific, measurable benefits
- Keep it concise but impactful
- Use active voice`

  return generateSmartText(prompt, { tone: 'persuasive', userRole: 'Marketing' })
}

/**
 * Analyze user input for intelligent routing
 */
export async function analyzeUserIntent(userInput: string) {
  const prompt = `Analyze this user input and determine their intent:

Input: "${userInput}"

Respond with JSON containing:
{
  "intent": "the primary intent (search/request/question/feedback)",
  "topic": "what topic they're interested in",
  "sentiment": "positive/neutral/negative",
  "confidence": 0-1
}`

  return generateStructuredData(userInput, null)
}
