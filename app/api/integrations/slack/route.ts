import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const payload = await req.json()
  const { type, text } = payload as {
    type?: string
    text?: string
    event?: {
      type?: string
      text?: string
    }
    command?: string
  }

  if (type === 'url_verification') {
    return NextResponse.json({ challenge: (payload as { challenge?: string }).challenge })
  }

  if (type === 'event_callback') {
    const event = (payload as { event?: { type?: string; text?: string } }).event
    
    if (event?.type === 'app_mention') {
      // Parse a supervised twin command from a mention.
      const twinMatch = (event.text ?? text)?.match(/@n3uralia\s+run\s+([\w-]+)/)
      if (twinMatch) {
        const twinSlug = twinMatch[1]
        // TODO: Queue a Twin OS routine, preserve channel context, and post a handoff-ready result to Slack.
        return NextResponse.json({ ok: true, twinSlug })
      }
    }
  }

  if (type === 'slash_command') {
    const { command, text: commandText } = payload as { command?: string; text?: string }
    
    if (command === '/run-twin') {
      // TODO: Parse twin slug and program context, execute under supervision rules, and respond with owner/next step.
      return NextResponse.json({
        text: `Starting supervised twin routine: ${commandText ?? ''}`,
        response_type: 'in_channel',
      })
    }
  }

  return NextResponse.json({ ok: true })
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  
  if (!code) {
    return NextResponse.json({ error: 'No auth code' }, { status: 400 })
  }

  // TODO: Exchange code for token, save to DB
  return NextResponse.redirect('/')
}
