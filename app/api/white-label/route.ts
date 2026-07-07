import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const userId = req.headers.get('x-user-id')
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // TODO: Fetch partner details from Supabase
  const partner = {
    id: '1',
    brand_name: 'N3 Partner Studio',
    custom_domain: 'twins.partner.cl',
    logo_url: '/partner-logo.png',
    color_primary: '#8fb2aa',
    monthly_fee: 799,
    revenue_split: 0,
    status: 'active',
  }

  return NextResponse.json({ partner })
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get('x-user-id')
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { brand_name, custom_domain, color_primary } = await req.json()

  // TODO: Validate domain, create DNS records, save partner workspace to DB
  const partner = {
    id: Math.random().toString(),
    partner_id: userId,
    brand_name,
    custom_domain,
    color_primary,
    monthly_fee: 799,
    revenue_split: 0,
    is_active: true,
  }

  return NextResponse.json({ partner }, { status: 201 })
}
