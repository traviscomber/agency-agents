import { runMockAgent } from '@/lib/ai/mock-provider'
import type { Agent, AgentOutput } from '@/lib/types'

interface RunInput {
  task: string
  context?: string
  desiredOutput?: string
  detailLevel?: string
}

interface RunResult {
  output: AgentOutput
  modelUsed: string
}

interface OpenAIResponsePayload {
  output?: Array<{
    type?: string
    content?: Array<{
      type?: string
      text?: string
    }>
  }>
  output_text?: string
}

const DEFAULT_OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-5.5'
const OUTPUT_SCHEMA = {
  type: 'object',
  properties: {
    summary: { type: 'string' },
    mainResult: { type: 'string' },
    actionSteps: {
      type: 'array',
      items: { type: 'string' },
    },
    risksNotes: {
      type: 'array',
      items: { type: 'string' },
    },
    suggestedNextStep: { type: 'string' },
    relatedAgents: {
      type: 'array',
      items: { type: 'string' },
    },
  },
  required: ['summary', 'mainResult', 'actionSteps', 'risksNotes', 'suggestedNextStep', 'relatedAgents'],
  additionalProperties: false,
} as const

function buildUserPrompt(agent: Agent, input: RunInput) {
  return [
    `Agent: ${agent.name}`,
    `Division: ${agent.division}`,
    `Role: ${agent.role}`,
    `Mission: ${agent.mission}`,
    `Desired output shape: ${input.desiredOutput || 'analysis'}`,
    `Detail level: ${input.detailLevel || 'standard'}`,
    '',
    `Task: ${input.task}`,
    input.context ? `Context:\n${input.context}` : 'Context: none provided',
    '',
    'Return valid JSON only with this exact shape:',
    '{',
    '  "summary": "string",',
    '  "mainResult": "string",',
    '  "actionSteps": ["string"],',
    '  "risksNotes": ["string"],',
    '  "suggestedNextStep": "string",',
    '  "relatedAgents": ["slug-string"]',
    '}',
    '',
    `Only suggest related agents from this list: ${agent.exampleTasks.length ? 'Use relevant platform specialists only.' : 'Keep the list empty if none apply.'}`,
  ].join('\n')
}

function extractTextResponse(payload: OpenAIResponsePayload) {
  if (typeof payload.output_text === 'string' && payload.output_text.trim()) {
    return payload.output_text.trim()
  }

  const collected = payload.output
    ?.flatMap((item) => item.content ?? [])
    .filter((item) => item.type === 'output_text' && typeof item.text === 'string')
    .map((item) => item.text?.trim())
    .filter(Boolean)

  return collected?.join('\n').trim() || ''
}

function parseAgentOutput(rawText: string): AgentOutput {
  const normalized = rawText.trim()
  const fencedMatch = normalized.match(/```json\s*([\s\S]*?)```/i)
  const candidate = fencedMatch?.[1]?.trim() || normalized
  const parsed = JSON.parse(candidate) as Partial<AgentOutput>

  return {
    summary: typeof parsed.summary === 'string' ? parsed.summary : 'No summary returned.',
    mainResult: typeof parsed.mainResult === 'string' ? parsed.mainResult : 'No result returned.',
    actionSteps: Array.isArray(parsed.actionSteps) ? parsed.actionSteps.filter((item): item is string => typeof item === 'string') : [],
    risksNotes: Array.isArray(parsed.risksNotes) ? parsed.risksNotes.filter((item): item is string => typeof item === 'string') : [],
    suggestedNextStep: typeof parsed.suggestedNextStep === 'string' ? parsed.suggestedNextStep : 'Review the output and decide the next action.',
    relatedAgents: Array.isArray(parsed.relatedAgents) ? parsed.relatedAgents.filter((item): item is string => typeof item === 'string') : [],
  }
}

async function runOpenAIAgent(agent: Agent, input: RunInput): Promise<RunResult> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured')
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  }

  const baseBody = {
    model: DEFAULT_OPENAI_MODEL,
    store: false,
    input: [
      {
        role: 'system',
        content: [
          {
            type: 'input_text',
            text: `${agent.systemPrompt}\nYou are operating inside AgencyOS. Return only the requested data structure.`,
          },
        ],
      },
      {
        role: 'user',
        content: [
          {
            type: 'input_text',
            text: buildUserPrompt(agent, input),
          },
        ],
      },
    ],
  }

  const structuredResponse = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      ...baseBody,
      text: {
        format: {
          type: 'json_schema',
          name: 'agency_agent_output',
          strict: true,
          schema: OUTPUT_SCHEMA,
        },
      },
    }),
  })

  if (structuredResponse.ok) {
    const payload = (await structuredResponse.json()) as OpenAIResponsePayload
    const rawText = extractTextResponse(payload)
    if (!rawText) {
      throw new Error('OpenAI returned an empty structured response')
    }

    return {
      output: parseAgentOutput(rawText),
      modelUsed: DEFAULT_OPENAI_MODEL,
    }
  }

  const structuredErrorText = await structuredResponse.text()
  console.error('[AIProvider] Structured output request failed, retrying with free-form parsing:', structuredErrorText)

  const fallbackResponse = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers,
    body: JSON.stringify(baseBody),
  })

  if (!fallbackResponse.ok) {
    const errorText = await fallbackResponse.text()
    throw new Error(`OpenAI request failed (${fallbackResponse.status}): ${errorText}`)
  }

  const payload = (await fallbackResponse.json()) as OpenAIResponsePayload
  const rawText = extractTextResponse(payload)
  if (!rawText) {
    throw new Error('OpenAI returned an empty response')
  }

  return {
    output: parseAgentOutput(rawText),
    modelUsed: DEFAULT_OPENAI_MODEL,
  }
}

export async function runAgent(agent: Agent, input: RunInput): Promise<RunResult> {
  try {
    return await runOpenAIAgent(agent, input)
  } catch (error) {
    console.error('[AIProvider] Falling back to mock provider:', error)
    return {
      output: await runMockAgent(agent, input),
      modelUsed: 'mock-provider',
    }
  }
}
