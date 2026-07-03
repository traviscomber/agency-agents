import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const userId = req.headers.get('x-user-id')
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // TODO: Fetch chains from Supabase
  const chains = [
    {
      id: '1',
      name: 'Content Pipeline',
      description: 'Draft → Review → Publish',
      agents: ['content-writer', 'editor', 'publisher'],
      is_active: true,
    },
  ]

  return NextResponse.json({ chains })
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get('x-user-id')
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { name, description, agents } = body

  // TODO: Save to Supabase
  const newChain = {
    id: Math.random().toString(),
    name,
    description,
    agents,
    is_active: true,
  }

  return NextResponse.json({ chain: newChain }, { status: 201 })
}
