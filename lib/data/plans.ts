import type { Plan } from '@/lib/types'

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free / Demo',
    price: 0,
    priceLabel: '$0',
    monthlyRunLimit: 5,
    maxProjects: 1,
    features: [
      '5 supervised routine executions per month',
      '1 active operating program',
      'Core role twin library',
      'Saved deliverables',
      'Basic replacement preview',
    ],
    cta: 'Create diagnosis',
    highlighted: false,
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 99,
    priceLabel: '$99',
    monthlyRunLimit: 200,
    maxProjects: 3,
    features: [
      '1 deployed operating twin',
      'Basic memory by account or process',
      'Reusable deliverables',
      'Role diagnosis checklist',
      'Email support',
    ],
    cta: 'Start Starter',
    highlighted: false,
    stripePriceId: process.env.STRIPE_PRICE_STARTER,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 299,
    priceLabel: '$299',
    monthlyRunLimit: 1000,
    maxProjects: 10,
    features: [
      '3 deployed operating twins',
      'Weekly automations',
      'Full program and account history',
      'Human handoffs and review states',
      'Replacement dashboard',
      'Priority support',
    ],
    cta: 'Deploy Pro',
    highlighted: true,
    stripePriceId: process.env.STRIPE_PRICE_PRO,
  },
  {
    id: 'team',
    name: 'Business',
    price: 799,
    priceLabel: '$799',
    monthlyRunLimit: 3000,
    maxProjects: 30,
    features: [
      '10 deployed operating twins',
      'Team operating workspace',
      'Connectors for documents, sheets, CRM or ERP',
      'Recurring reporting',
      'Implementation support',
      'Advanced API access',
      'Priority operating reviews',
    ],
    cta: 'Deploy Business',
    highlighted: false,
    stripePriceId: process.env.STRIPE_PRICE_TEAM,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: null,
    priceLabel: 'Custom',
    monthlyRunLimit: 99999,
    maxProjects: 999,
    features: [
      'Custom twin portfolio',
      'Private connectors and integrations',
      'Partner or private-brand deployment option',
      'Advanced security and SSO',
      'SLA and dedicated support',
      'Custom implementation roadmap',
    ],
    cta: 'Contact sales',
    highlighted: false,
  },
]

export function getPlanById(id: string): Plan | undefined {
  return PLANS.find((p) => p.id === id)
}

export const PLAN_RUN_LIMITS: Record<string, number> = {
  free: 5,
  starter: 200,
  pro: 1000,
  team: 3000,
  enterprise: 99999,
}
