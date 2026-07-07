import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const userId = req.headers.get('x-user-id')
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // TODO: Fetch operating handoff chains from Supabase
  const chains = [
    {
      id: '1',
      name: 'Ventas a implementacion',
      description: 'Discovery - propuesta - kickoff - handoff de riesgos',
      agents: ['ejecutivo-comercial-b2b-chile', 'propuestas-comerciales-chile', 'pm-implementacion-chile'],
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
