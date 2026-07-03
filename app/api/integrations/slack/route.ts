import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { type, user_id, trigger_id, actions, text } = await req.json()

  if (type === 'url_verification') {
    return NextResponse.json({ challenge: req.body?.challenge })
  }

  if (type === 'event_callback') {
    const event = req.body?.event
    
    if (event?.type === 'app_mention') {
      // Parse agent command from mention
      const agentMatch = text?.match(/@agent\s+(\w+)/)
      if (agentMatch) {
        const agentSlug = agentMatch[1]
        // TODO: Queue agent run, post result to Slack
        return NextResponse.json({ ok: true })
      }
    }
  }

  if (type === 'slash_command') {
    const { command, text } = await req.json()
    
    if (command === '/run-agent') {
      // TODO: Parse agent slug from text, execute, respond
      return NextResponse.json({
        text: `Running agent: ${text}`,
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
