'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import { H1Hero, H2Section, H3, Body } from '@/components/shared/Typography'
import { Button } from '@/components/shared/ButtonStyled'
import { Card } from '@/components/shared/CardStyled'

interface Plan {
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
}

export function PricingPage() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPlans() {
      try {
        const response = await fetch('/api/billing/plans')
        const data = await response.json()
        setPlans(data)
      } catch (error) {
        console.error('Failed to fetch plans', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPlans()
  }, [])

  const getPrice = (plan: Plan) => {
    return billingCycle === 'monthly' ? plan.price_monthly : plan.price_annual
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="text-center mb-12">
        <H1Hero className="mb-4">Simple, Transparent Pricing</H1Hero>
        <Body className="text-lg text-[#789b96] max-w-2xl mx-auto mb-8">
          Choose the perfect plan for your business. Scale as you grow.
        </Body>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              billingCycle === 'monthly'
                ? 'bg-[#173634] text-white'
                : 'bg-[#f0f3f2] text-[#173634]'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              billingCycle === 'annual'
                ? 'bg-[#173634] text-white'
                : 'bg-[#f0f3f2] text-[#173634]'
            }`}
          >
            Annual <span className="text-xs ml-1">(Save 10%)</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-[#789b96]">Loading pricing plans...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const price = getPrice(plan)
            const isPopular = index === 1
            const isEnterprise = plan.name === 'Enterprise'

            return (
              <Card
                key={plan.id}
                variant={isPopular ? 'primary' : 'light'}
                className={`p-8 relative flex flex-col ${isPopular ? 'ring-2 ring-[#5fa99e] transform scale-105' : ''}`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#173634] text-white px-4 py-1 rounded-full text-xs font-semibold">
                    Most Popular
                  </div>
                )}

                <H3 className="mb-2">{plan.name}</H3>
                <Body className="text-[#789b96] text-sm mb-6">{plan.description}</Body>

                <div className="mb-8">
                  {isEnterprise ? (
                    <div className="text-2xl font-bold text-[#173634]">Custom Pricing</div>
                  ) : (
                    <>
                      <div className="text-4xl font-bold text-[#173634]">
                        ${price?.toFixed(2)}
                      </div>
                      <div className="text-sm text-[#789b96] mt-1">
                        per {billingCycle === 'monthly' ? 'month' : 'year'}
                      </div>
                    </>
                  )}
                </div>

                <Button
                  as={Link}
                  href="/signup"
                  variant={isPopular ? 'primary' : 'outline'}
                  className="w-full mb-8 justify-center"
                >
                  Get Started <ArrowRight size={16} className="ml-2" />
                </Button>

                <div className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check size={20} className="text-[#5fa99e] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#52605d]">{feature}</span>
                    </div>
                  ))}

                  {plan.max_projects && (
                    <div className="flex items-start gap-3 pt-4 border-t border-[#d8e5e2]">
                      <Check size={20} className="text-[#5fa99e] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#52605d]">{plan.max_projects} Projects</span>
                    </div>
                  )}

                  {plan.max_runs_per_month && (
                    <div className="flex items-start gap-3">
                      <Check size={20} className="text-[#5fa99e] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#52605d]">{plan.max_runs_per_month} Runs/month</span>
                    </div>
                  )}

                  {plan.max_agents && (
                    <div className="flex items-start gap-3">
                      <Check size={20} className="text-[#5fa99e] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#52605d]">{plan.max_agents} AI Agents</span>
                    </div>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {/* FAQ Section */}
      <div className="mt-20 pt-12 border-t border-[#d8e5e2]">
        <H2Section className="text-center mb-12">Frequently Asked Questions</H2Section>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <Card variant="light" className="p-6">
            <H3 className="text-base mb-3">Can I change plans anytime?</H3>
            <Body className="text-sm text-[#789b96]">
              Yes! You can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.
            </Body>
          </Card>

          <Card variant="light" className="p-6">
            <H3 className="text-base mb-3">Do you offer custom plans?</H3>
            <Body className="text-sm text-[#789b96]">
              Absolutely. For large teams or special requirements, contact our sales team for a custom plan.
            </Body>
          </Card>

          <Card variant="light" className="p-6">
            <H3 className="text-base mb-3">Is there a free trial?</H3>
            <Body className="text-sm text-[#789b96]">
              Yes! Start with our Starter plan free for 14 days. No credit card required.
            </Body>
          </Card>

          <Card variant="light" className="p-6">
            <H3 className="text-base mb-3">What happens if I exceed limits?</H3>
            <Body className="text-sm text-[#789b96]">
              We'll notify you and provide options to upgrade or manage your usage. We never shut you down unexpectedly.
            </Body>
          </Card>
        </div>
      </div>
    </div>
  )
}
