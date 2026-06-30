import type { Plan } from '@/lib/types'

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    priceLabel: '$0',
    monthlyRunLimit: 5,
    maxProjects: 1,
    features: [
      '5 agent runs per month',
      'Basic agents only',
      'Limited run history',
      'Community support',
    ],
    cta: 'Start free',
    highlighted: false,
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 19,
    priceLabel: '$19',
    monthlyRunLimit: 100,
    maxProjects: 5,
    features: [
      '100 agent runs per month',
      'Core agents included',
      'Saved outputs',
      'Project folders',
      'Basic export',
      'Email support',
    ],
    cta: 'Start Starter',
    highlighted: false,
    stripePriceId: process.env.STRIPE_PRICE_STARTER,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 49,
    priceLabel: '$49',
    monthlyRunLimit: 500,
    maxProjects: 20,
    features: [
      '500 agent runs per month',
      'All public agents',
      'Full run history',
      'Advanced output formats',
      'Priority access',
      'Priority support',
    ],
    cta: 'Go Pro',
    highlighted: true,
    stripePriceId: process.env.STRIPE_PRICE_PRO,
  },
  {
    id: 'team',
    name: 'Team',
    price: 149,
    priceLabel: '$149',
    monthlyRunLimit: 1500,
    maxProjects: 50,
    features: [
      '1,500 runs per month',
      '5 seats included',
      'Shared workspace',
      'Team projects',
      'Admin controls',
      'Dedicated support',
    ],
    cta: 'Start Team',
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
      'Custom run limits',
      'Private agents',
      'White-label option',
      'Dedicated onboarding',
      'Custom security',
      'SLA guarantee',
    ],
    cta: 'Contact us',
    highlighted: false,
  },
]

export function getPlanById(id: string): Plan | undefined {
  return PLANS.find((p) => p.id === id)
}

export const PLAN_RUN_LIMITS: Record<string, number> = {
  free: 5,
  starter: 100,
  pro: 500,
  team: 1500,
  enterprise: 99999,
}
