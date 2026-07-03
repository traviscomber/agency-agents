import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get('category')
  const sort = req.nextUrl.searchParams.get('sort') || 'rating'

  // TODO: Query from Supabase with filters
  const agents = [
    {
      id: '1',
      slug: 'content-writer-pro',
      title: 'Content Writer Pro',
      creator: 'Sarah Chen',
      price_per_run: 0.75,
      rating: 4.8,
      reviews: 124,
      sales: 2840,
      category: 'content',
    },
    {
      id: '2',
      slug: 'seo-optimizer',
      title: 'SEO Optimizer',
      creator: 'Alex Kumar',
      price_per_run: 1.25,
      rating: 4.6,
      reviews: 89,
      sales: 1240,
      category: 'marketing',
    },
  ]

  return NextResponse.json({ agents })
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get('x-user-id')
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { agent_slug, title, description, price_per_run, category } = await req.json()

  // TODO: Validate and publish to marketplace
  const listing = {
    id: Math.random().toString(),
    slug: agent_slug,
    title,
    description,
    price_per_run,
    category,
    creator_id: userId,
    is_published: true,
  }

  return NextResponse.json({ listing }, { status: 201 })
}
