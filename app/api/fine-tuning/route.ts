import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const userId = req.headers.get('x-user-id')
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // TODO: Fetch role memory sets from Supabase
  const models = [
    {
      id: '1',
      name: 'Memoria Ejecutivo Comercial B2B Chile',
      agent_slug: 'ejecutivo-comercial-b2b-chile',
      status: 'ready',
      samples_count: 48,
      completed_at: new Date().toISOString(),
    },
  ]

  return NextResponse.json({ models })
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get('x-user-id')
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name, agent_slug, file_url } = await req.json()

  // TODO: Validate source file and queue role-memory ingestion job
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
