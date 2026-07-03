import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const userId = req.headers.get('x-user-id')
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // TODO: Fetch models from Supabase
  const models = [
    {
      id: '1',
      name: 'Content Writer v2',
      agent_slug: 'content-writer',
      status: 'ready',
      samples_count: 150,
      completed_at: new Date().toISOString(),
    },
  ]

  return NextResponse.json({ models })
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get('x-user-id')
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name, agent_slug, file_url } = await req.json()

  // TODO: Validate file, queue training job with Bull
  const model = {
    id: Math.random().toString(),
    name,
    agent_slug,
    status: 'pending',
    samples_count: 0,
    created_at: new Date().toISOString(),
  }

  return NextResponse.json({ model }, { status: 201 })
}
