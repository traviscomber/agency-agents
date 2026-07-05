'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CreditCard, AlertCircle, Check, Calendar, TrendingUp } from 'lucide-react'
import { Card } from '@/components/shared/CardStyled'
import { Button } from '@/components/shared/ButtonStyled'
import { H2Section, H3, Body } from '@/components/shared/Typography'

interface Subscription {
  id: string
  status: string
  billing_cycle: string
  current_period_start: string
  current_period_end: string
  next_billing_date: string
  subscription_plans: {
    name: string
    description: string
    price_monthly: number | null
    price_annual: number | null
    features: string[]
  }
}

interface Usage {
  projects_used: number
  runs_used: number
  agents_used: number
}

interface Limits {
  projects: number | null
  runs_per_month: number | null
  agents: number | null
}

export function BillingDashboard() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [usage, setUsage] = useState<Usage | null>(null)
  const [limits, setLimits] = useState<Limits | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBillingData() {
      try {
        const [subRes, statusRes] = await Promise.all([
          fetch('/api/billing/subscribe'),
          fetch('/api/billing/status'),
        ])

        const subData = await subRes.json()
        const statusData = await statusRes.json()

        setSubscription(subData)
        setUsage(statusData.usage)
        setLimits(statusData.limits)
      } catch (error) {
        console.error('[v0] Failed to fetch billing data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBillingData()
  }, [])

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-[#789b96]">Loading billing information...</p>
      </div>
    )
  }

  if (!subscription) {
    return (
      <Card variant="light" className="p-8 text-center">
        <AlertCircle className="mx-auto mb-4 text-[#5fa99e]" size={32} />
        <H3 className="mb-2">No Active Subscription</H3>
        <Body className="text-[#789b96] mb-6">
          You don&apos;t have an active subscription. Choose a plan to get started.
        </Body>
        <Button as={Link} href="/pricing" variant="primary">
          View Pricing Plans
        </Button>
      </Card>
    )
  }

  const plan = subscription.subscription_plans
  const currentPrice = subscription.billing_cycle === 'monthly' ? plan.price_monthly : plan.price_annual
  const periodStart = new Date(subscription.current_period_start)
  const periodEnd = new Date(subscription.current_period_end)
  const daysRemaining = Math.ceil((periodEnd.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

  return (
    <div className="space-y-8">
      {/* Current Plan */}
      <Card variant="primary" className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <H2Section className="mb-2">{plan.name} Plan</H2Section>
            <Body className="text-[#789b96]">{plan.description}</Body>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-[#173634]">
              ${currentPrice?.toFixed(2)}
            </div>
            <div className="text-sm text-[#789b96]">
              per {subscription.billing_cycle === 'monthly' ? 'month' : 'year'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 py-6 border-t border-b border-[#d8e5e2]">
          <div>
            <div className="text-sm text-[#789b96] mb-1">Billing Cycle</div>
            <div className="font-semibold text-[#173634] capitalize">{subscription.billing_cycle}</div>
          </div>
          <div>
            <div className="text-sm text-[#789b96] mb-1">Days Remaining</div>
            <div className="font-semibold text-[#173634]">{daysRemaining} days</div>
          </div>
        </div>

        {subscription.status === 'active' && (
          <Button as={Link} href="/pricing" variant="outline" className="w-full justify-center">
            Change Plan
          </Button>
        )}

        {subscription.status === 'canceled' && (
          <div className="bg-red-50 border border-red-300 rounded-lg p-4">
            <p className="text-sm text-red-700">
              Your subscription will end on {periodEnd.toLocaleDateString()}
            </p>
          </div>
        )}
      </Card>

      {/* Usage */}
      {usage && limits && (
        <Card variant="light" className="p-8">
          <H2Section className="mb-6">Current Usage</H2Section>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-[#789b96] mb-2">Projects</div>
              <div className="text-2xl font-bold text-[#173634]">{usage.projects_used}</div>
              {limits.projects && (
                <div className="text-xs text-[#789b96] mt-1">
                  of {limits.projects} available
                </div>
              )}
              {limits.projects && (
                <div className="w-full bg-[#d8e5e2] rounded-full h-2 mt-3">
                  <div
                    className="bg-[#5fa99e] h-2 rounded-full transition-all"
                    style={{
                      width: `${(usage.projects_used / limits.projects) * 100}%`,
                    }}
                  />
                </div>
              )}
            </div>

            <div>
              <div className="text-sm text-[#789b96] mb-2">Runs This Month</div>
              <div className="text-2xl font-bold text-[#173634]">{usage.runs_used}</div>
              {limits.runs_per_month && (
                <div className="text-xs text-[#789b96] mt-1">
                  of {limits.runs_per_month} available
                </div>
              )}
              {limits.runs_per_month && (
                <div className="w-full bg-[#d8e5e2] rounded-full h-2 mt-3">
                  <div
                    className="bg-[#5fa99e] h-2 rounded-full transition-all"
                    style={{
                      width: `${(usage.runs_used / limits.runs_per_month) * 100}%`,
                    }}
                  />
                </div>
              )}
            </div>

            <div>
              <div className="text-sm text-[#789b96] mb-2">Active Agents</div>
              <div className="text-2xl font-bold text-[#173634]">{usage.agents_used}</div>
              {limits.agents && (
                <div className="text-xs text-[#789b96] mt-1">
                  of {limits.agents} available
                </div>
              )}
              {limits.agents && (
                <div className="w-full bg-[#d8e5e2] rounded-full h-2 mt-3">
                  <div
                    className="bg-[#5fa99e] h-2 rounded-full transition-all"
                    style={{
                      width: `${(usage.agents_used / limits.agents) * 100}%`,
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Features */}
      <Card variant="light" className="p-8">
        <H2Section className="mb-6">Plan Features</H2Section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plan.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <Check size={20} className="text-[#5fa99e] flex-shrink-0" />
              <span className="text-sm text-[#52605d]">{feature}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Billing History */}
      <Card variant="light" className="p-8">
        <H2Section className="mb-6">Billing History</H2Section>

        <div className="text-center py-8">
          <CreditCard size={32} className="mx-auto mb-4 text-[#d8e5e2]" />
          <Body className="text-[#789b96]">
            No invoices yet. Your first invoice will be generated on {new Date(subscription.next_billing_date).toLocaleDateString()}.
          </Body>
        </div>
      </Card>
    </div>
  )
}
