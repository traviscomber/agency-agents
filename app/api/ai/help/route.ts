import { streamSmartText } from '@/lib/ai/client'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return new Response('Prompt required', { status: 400 })
    }

    const encoder = new TextEncoder()
    let buffer = ''

    const stream = await streamSmartText(prompt, {
      tone: 'helpful and knowledgeable',
      userRole: 'N3uralia User',
      context: 'You are helping a user with N3uralia AgencyOS platform',
    })

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream.fullStream) {
            if (chunk.type === 'text-delta') {
              const data = JSON.stringify({ chunk: chunk.delta })
              buffer += chunk.delta
              controller.enqueue(encoder.encode(`data: ${data}\n\n`))
            }
          }
          controller.close()
        } catch (error) {
          controller.error(error)
        }
      },
    })

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('[AI Help] Error:', error)
    return new Response('Help system error', { status: 500 })
  }
}
