'use client'

import { useState } from 'react'
import { Sparkles, Check, Loader } from 'lucide-react'
import { useAI } from '@/lib/hooks/useAI'
import { Button } from '@/components/shared/ButtonStyled'
import { Card } from '@/components/shared/CardStyled'
import { Badge } from '@/components/shared/BadgeStyled'
import { H2Section, Body, Eyebrow } from '@/components/shared/Typography'

export function SmartAgentRecommender() {
  const { recommend, loading, result, error } = useAI()
  const [step, setStep] = useState<'intro' | 'questions' | 'results'>('intro')
  const [formData, setFormData] = useState({
    pain_points: [] as string[],
    business_type: 'SME',
    team_size: 5,
    budget: 'medium',
  })

  const painPointOptions = [
    { id: 'dso', label: 'High Days Sales Outstanding (DSO)' },
    { id: 'collections', label: 'Difficult Collections Process' },
    { id: 'compliance', label: 'Labor Law Compliance' },
    { id: 'sales', label: 'Sales Pipeline Management' },
    { id: 'hiring', label: 'Recruitment & Hiring' },
    { id: 'bids', label: 'Tender/Bid Management' },
  ]

  const handlePainPointToggle = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      pain_points: prev.pain_points.includes(id)
        ? prev.pain_points.filter((p) => p !== id)
        : [...prev.pain_points, id],
    }))
  }

  const handleGetRecommendations = async () => {
    if (formData.pain_points.length === 0) {
      alert('Please select at least one pain point')
      return
    }

    try {
      await recommend(formData)
      setStep('results')
    } catch (err) {
      console.error('Recommendation failed:', err)
    }
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-16 sm:px-8">
      <div className="mb-8 text-center">
        <Badge variant="light" size="md" className="mb-4 inline-flex items-center gap-2 justify-center">
          <Sparkles size={13} />
          AI-Powered Recommendations
        </Badge>
        <H2Section className="text-[#173634]">Find Your Perfect Agent</H2Section>
        <Body variant="light" className="mt-3">
          Answer a few questions and let our AI recommend the agents that will have the biggest impact on your business.
        </Body>
      </div>

      <Card variant="light" className="p-8">
        {step === 'intro' && (
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-[#52605d] uppercase tracking-[0.18em] mb-4">
                What are your main pain points? (select all that apply)
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {painPointOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handlePainPointToggle(option.id)}
                    className={`text-left p-3 border rounded transition-colors ${
                      formData.pain_points.includes(option.id)
                        ? 'border-[#8fb2aa] bg-[#f1f6f4] text-[#173634]'
                        : 'border-[#d8e5e2] bg-white text-[#52605d] hover:border-[#8fb2aa]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 border rounded ${
                          formData.pain_points.includes(option.id)
                            ? 'bg-[#8fb2aa] border-[#8fb2aa]'
                            : 'border-[#a7b9b4]'
                        }`}
                      >
                        {formData.pain_points.includes(option.id) && (
                          <Check size={14} className="text-white" />
                        )}
                      </div>
                      <span className="text-sm font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#52605d] uppercase tracking-[0.18em] mb-3">
                Business Type
              </p>
              <select
                value={formData.business_type}
                onChange={(e) => setFormData((prev) => ({ ...prev, business_type: e.target.value }))}
                className="w-full h-10 border border-[#d8e5e2] bg-white px-3 text-sm text-[#173634] outline-none focus:border-[#8fb2aa]"
              >
                <option value="SME">Small/Medium Enterprise (SME)</option>
                <option value="Enterprise">Enterprise</option>
                <option value="Startup">Startup</option>
                <option value="Freelancer">Freelancer/Solo</option>
              </select>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#52605d] uppercase tracking-[0.18em] mb-3">
                Team Size
              </p>
              <input
                type="range"
                min="1"
                max="500"
                value={formData.team_size}
                onChange={(e) => setFormData((prev) => ({ ...prev, team_size: parseInt(e.target.value) }))}
                className="w-full"
              />
              <p className="mt-2 text-sm text-[#789b96]">{formData.team_size} people</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#52605d] uppercase tracking-[0.18em] mb-3">
                Budget Range
              </p>
              <select
                value={formData.budget}
                onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
                className="w-full h-10 border border-[#d8e5e2] bg-white px-3 text-sm text-[#173634] outline-none focus:border-[#8fb2aa]"
              >
                <option value="low">Low ($0-1K/month)</option>
                <option value="medium">Medium ($1-5K/month)</option>
                <option value="high">High ($5K+/month)</option>
              </select>
            </div>

            <Button
              onClick={handleGetRecommendations}
              variant="primary"
              size="md"
              className="w-full inline-flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader size={14} className="animate-spin" />
                  Analyzing Your Needs...
                </>
              ) : (
                <>
                  Get AI Recommendations
                  <Sparkles size={14} />
                </>
              )}
            </Button>
          </div>
        )}

        {step === 'results' && result && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Eyebrow className="text-[#789b96]">Your Personalized Plan</Eyebrow>
              <button
                onClick={() => setStep('intro')}
                className="text-xs font-medium text-[#789b96] hover:text-[#173634]"
              >
                ← Back
              </button>
            </div>

            <div className="prose max-w-none text-sm text-[#52605d]">
              <div
                dangerouslySetInnerHTML={{
                  __html: result.replace(/\n/g, '<br />'),
                }}
              />
            </div>

            <Button
              href="/signup"
              variant="primary"
              size="md"
              className="w-full inline-flex items-center justify-center"
            >
              Start Your Free Trial
            </Button>
          </div>
        )}

        {error && (
          <div className="rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error.message}
          </div>
        )}
      </Card>
    </section>
  )
}
