import { createClient } from '@/lib/supabase/server'

export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price_monthly: number | null
  price_annual: number | null
  max_projects: number | null
  max_runs_per_month: number | null
  max_agents: number | null
  includes_analytics: boolean
  includes_priority_support: boolean
  features: string[]
  active: boolean
  display_order: number
}

export interface UserSubscription {
  id: string
  user_id: string
  plan_id: string
  status: 'active' | 'canceled' | 'past_due'
  billing_cycle: 'monthly' | 'annual'
  current_period_start: string
  current_period_end: string
  next_billing_date: string
  canceled_at: string | null
  created_at: string
}

export interface UserUsage {
  projects_used: number
  runs_used: number
  agents_used: number
  storage_used: number
}

// Get all active plans
export async function getSubscriptionPlans() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('subscription_plans')
    .select('*')
    .eq('active', true)
    .order('display_order')

  if (error) throw error
  return data as SubscriptionPlan[]
}

// Get user's current subscription
export async function getUserSubscription(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('subscriptions')
    .select(`
      *,
      subscription_plans(*)
    `)
    .eq('user_id', userId)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data as (UserSubscription & { subscription_plans: SubscriptionPlan }) | null
}

// Get plan details
export async function getPlanDetails(planId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('subscription_plans')
    .select('*')
    .eq('id', planId)
    .single()

  if (error) throw error
  return data as SubscriptionPlan
}

// Create subscription
export async function createSubscription(
  userId: string,
  planId: string,
  billingCycle: 'monthly' | 'annual' = 'monthly'
) {
  const supabase = await createClient()
  const now = new Date()
  const periodEnd = new Date(now)
  billingCycle === 'monthly' ? periodEnd.setMonth(periodEnd.getMonth() + 1) : periodEnd.setFullYear(periodEnd.getFullYear() + 1)

  const { data, error } = await supabase
    .from('subscriptions')
    .insert({
      user_id: userId,
      plan_id: planId,
      billing_cycle: billingCycle,
      current_period_start: now.toISOString(),
      current_period_end: periodEnd.toISOString(),
      next_billing_date: periodEnd.toISOString(),
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// Track usage
export async function trackUsage(userId: string, metricType: string, value: number = 1) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('usage_logs')
    .insert({
      user_id: userId,
      metric_type: metricType,
      metric_value: value,
    })

  if (error) throw error
}

// Get user usage for current period
export async function getUserUsage(userId: string): Promise<UserUsage> {
  const supabase = await createClient()
  
  // Get current period start
  const subscription = await getUserSubscription(userId)
  const periodStart = subscription?.current_period_start || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

  // Get usage counts
  const { data: projectsUsed } = await supabase
    .from('projects')
    .select('id', { count: 'exact' })
    .eq('user_id', userId)

  const { data: runsUsed } = await supabase
    .from('runs')
    .select('id', { count: 'exact' })
    .eq('user_id', userId)
    .gte('created_at', periodStart)

  const { data: agentsUsed } = await supabase
    .from('project_steps')
    .select('agent_id')
    .eq('user_id', userId)

  const uniqueAgents = new Set(agentsUsed?.map(a => a.agent_id) || []).size

  return {
    projects_used: projectsUsed?.length || 0,
    runs_used: runsUsed?.length || 0,
    agents_used: uniqueAgents,
    storage_used: 0,
  }
}

// Check if user has access to feature
export async function hasFeatureAccess(userId: string, feature: string): Promise<boolean> {
  const subscription = await getUserSubscription(userId)
  if (!subscription) return false

  const plan = subscription.subscription_plans as SubscriptionPlan
  return plan.features.includes(feature)
}

// Get subscription status
export async function getSubscriptionStatus(userId: string) {
  const subscription = await getUserSubscription(userId)
  const usage = await getUserUsage(userId)
  const plan = subscription?.subscription_plans as SubscriptionPlan | null

  if (!subscription || !plan) {
    return {
      status: 'no_subscription',
      plan: null,
      usage,
      limits: null,
    }
  }

  return {
    status: subscription.status,
    plan,
    usage,
    limits: {
      projects: plan.max_projects,
      runs_per_month: plan.max_runs_per_month,
      agents: plan.max_agents,
    },
    next_billing_date: subscription.next_billing_date,
  }
}
