import { createClient } from '@/lib/supabase/server'

export interface AnalyticsEvent {
  event_name: string
  user_id?: string
  properties?: Record<string, any>
  timestamp?: string
}

export interface UserMetrics {
  total_users: number
  active_users: number
  new_users: number
  retention_rate: number
}

export interface EngagementMetrics {
  avg_daily_active: number
  total_projects_created: number
  total_runs_executed: number
  avg_runs_per_user: number
}

export interface SystemMetrics {
  api_response_time: number
  error_rate: number
  uptime_percentage: number
  ai_calls_processed: number
}

// Track custom events
export async function trackEvent(event: AnalyticsEvent) {
  try {
    const supabase = await createClient()
    
    const { error } = await supabase
      .from('analytics_events')
      .insert({
        event_name: event.event_name,
        user_id: event.user_id,
        properties: event.properties || {},
        created_at: event.timestamp || new Date().toISOString(),
      })

    if (error) throw error
  } catch (error) {
    console.error('[v0] Error tracking event:', error)
  }
}

// Get user metrics
export async function getUserMetrics(): Promise<UserMetrics> {
  const supabase = await createClient()
  
  try {
    // Get total users
    const { count: totalCount } = await supabase
      .from('profiles')
      .select('*', { count: 'exact' })

    // Get active users (logged in last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const { count: activeCount } = await supabase
      .from('runs')
      .select('id', { count: 'exact' })
      .gte('created_at', sevenDaysAgo.toISOString())

    // Get new users (created last 24 hours)
    const oneDayAgo = new Date()
    oneDayAgo.setDate(oneDayAgo.getDate() - 1)

    const { count: newCount } = await supabase
      .from('profiles')
      .select('id', { count: 'exact' })
      .gte('created_at', oneDayAgo.toISOString())

    return {
      total_users: totalCount || 0,
      active_users: activeCount || 0,
      new_users: newCount || 0,
      retention_rate: totalCount ? ((activeCount || 0) / totalCount) * 100 : 0,
    }
  } catch (error) {
    console.error('[v0] Error getting user metrics:', error)
    return {
      total_users: 0,
      active_users: 0,
      new_users: 0,
      retention_rate: 0,
    }
  }
}

// Get engagement metrics
export async function getEngagementMetrics(): Promise<EngagementMetrics> {
  const supabase = await createClient()
  
  try {
    // Total projects
    const { count: projectCount } = await supabase
      .from('projects')
      .select('id', { count: 'exact' })

    // Total runs
    const { count: runCount } = await supabase
      .from('runs')
      .select('id', { count: 'exact' })

    // Active users today
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const { data: uniqueUsersToday } = await supabase
      .from('runs')
      .select('user_id')
      .gte('created_at', today.toISOString())

    const uniqueToday = new Set(uniqueUsersToday?.map(r => r.user_id) || []).size

    // Get total users for average
    const { count: totalUsers } = await supabase
      .from('profiles')
      .select('id', { count: 'exact' })

    return {
      avg_daily_active: uniqueToday,
      total_projects_created: projectCount || 0,
      total_runs_executed: runCount || 0,
      avg_runs_per_user: totalUsers ? (runCount || 0) / totalUsers : 0,
    }
  } catch (error) {
    console.error('[v0] Error getting engagement metrics:', error)
    return {
      avg_daily_active: 0,
      total_projects_created: 0,
      total_runs_executed: 0,
      avg_runs_per_user: 0,
    }
  }
}

// Get system health metrics
export async function getSystemMetrics(): Promise<SystemMetrics> {
  // In production, these would come from monitoring tools
  // For now, return placeholder metrics
  
  return {
    api_response_time: 145, // ms
    error_rate: 0.02, // 0.02%
    uptime_percentage: 99.97,
    ai_calls_processed: Math.floor(Math.random() * 10000) + 5000,
  }
}

// Record API performance
export async function recordApiMetric(endpoint: string, responseTime: number, success: boolean) {
  try {
    await trackEvent({
      event_name: 'api_call',
      properties: {
        endpoint,
        response_time: responseTime,
        success,
      },
    })
  } catch (error) {
    console.error('[v0] Error recording API metric:', error)
  }
}

// Get revenue metrics
export async function getRevenueMetrics() {
  const supabase = await createClient()
  
  try {
    const { data: subscriptions } = await supabase
      .from('subscriptions')
      .select(`
        *,
        subscription_plans(price_monthly, price_annual)
      `)
      .eq('status', 'active')

    const mrr = (subscriptions || []).reduce((total, sub) => {
      const plan = sub.subscription_plans as any
      const price = sub.billing_cycle === 'monthly' 
        ? plan.price_monthly 
        : (plan.price_annual ? plan.price_annual / 12 : 0)
      return total + (price || 0)
    }, 0)

    const { count: activeSubscriptions } = await supabase
      .from('subscriptions')
      .select('id', { count: 'exact' })
      .eq('status', 'active')

    return {
      monthly_recurring_revenue: Math.round(mrr * 100) / 100,
      active_subscriptions: activeSubscriptions || 0,
      churn_rate: 0.02, // Placeholder
    }
  } catch (error) {
    console.error('[v0] Error getting revenue metrics:', error)
    return {
      monthly_recurring_revenue: 0,
      active_subscriptions: 0,
      churn_rate: 0,
    }
  }
}
