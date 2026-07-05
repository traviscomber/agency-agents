import { generateSmartText } from '@/lib/ai/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { prompt, context } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const result = await generateSmartText(prompt, context)

    return NextResponse.json({ result }, { status: 200 })
  } catch (error) {
    console.error('[AI] Generation error:', error)
    return NextResponse.json(
      { error: 'AI generation failed' },
      { status: 500 }
    )
  }
}
