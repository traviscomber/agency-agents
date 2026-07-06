'use client'

import { useState } from 'react'
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useAIStream } from '@/lib/hooks/useAI'

interface OnboardingStep {
  id: string
  question: string
  type: 'text' | 'select' | 'multi-select'
  options?: string[]
  placeholder?: string
}

interface RecommendedAgent {
  name: string
  description: string
  whyYou: string
  implementationTime: string
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'role',
    question: 'What is your role in the business?',
    type: 'select',
    options: ['Owner', 'Finance Manager', 'Operations Manager', 'Sales Manager', 'HR Manager', 'Other']
  },
  {
    id: 'industry',
    question: 'What industry are you in?',
    type: 'select',
    options: ['Retail', 'Services', 'Manufacturing', 'Consulting', 'E-commerce', 'Other']
  },
  {
    id: 'team-size',
    question: 'How many employees does your company have?',
    type: 'select',
    options: ['1-10', '11-50', '51-100', '100+']
  },
  {
    id: 'pain-points',
    question: 'What are your biggest business challenges? (select all that apply)',
    type: 'multi-select',
    options: [
      'Late payments from clients',
      'Hiring and retention',
      'Regulatory compliance',
      'Time management',
      'Marketing and sales',
      'Financial planning',
      'Customer service',
      'Supply chain'
    ]
  },
  {
    id: 'goals',
    question: 'What are your top 3 goals for the next 12 months?',
    type: 'text',
    placeholder: 'e.g., Reduce Days Sales Outstanding, improve team efficiency...'
  }
]

export function SmartOnboarding({ onComplete }: { onComplete: (recommendations: RecommendedAgent[]) => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<Record<string, any>>({})
  const [recommendations, setRecommendations] = useState<RecommendedAgent[]>([])
  const [analyzing, setAnalyzing] = useState(false)
  const [completed, setCompleted] = useState(false)
  const { streamText } = useAIStream()

  const step = ONBOARDING_STEPS[currentStep]

  const handleAnswer = (value: any) => {
    const newResponses = { ...responses, [step.id]: value }
    setResponses(newResponses)

    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      analyzeAndRecommend(newResponses)
    }
  }

  const analyzeAndRecommend = async (allResponses: Record<string, any>) => {
    setAnalyzing(true)

    try {
      const response = await fetch('/api/ai/recommend-agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: allResponses.role,
          industry: allResponses.industry,
          teamSize: allResponses['team-size'],
          painPoints: allResponses['pain-points'],
          goals: allResponses.goals,
          context: 'Chilean SMB business optimization'
        })
      })

      if (!response.ok) throw new Error('Failed to get recommendations')

      const data = await response.json()
      const parsed = JSON.parse(data.text)

      setRecommendations(Array.isArray(parsed) ? parsed : [parsed])
      setCompleted(true)
      onComplete(parsed)
    } catch (err) {
      console.error('Failed to analyze:', err)
      setRecommendations([])
    } finally {
      setAnalyzing(false)
    }
  }

  if (analyzing) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
          <Sparkles className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">AI Analysis</h2>
          <p className="text-gray-600 text-sm">
            Analyzing your business to recommend the right gemelos digitales...
          </p>
        </div>
      </div>
    )
  }

  if (completed) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-gray-900">Perfect!</h2>
          <p className="text-gray-600 mt-2">
            Based on your profile, these gemelos digitales best match your Chile/Latam operating needs:
          </p>
        </div>

        <div className="space-y-4">
          {recommendations.map((agent, idx) => (
            <div key={idx} className="border border-blue-200 bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 text-lg">{agent.name}</h3>
              <p className="text-gray-700 text-sm mt-2">{agent.description}</p>
              
              <div className="mt-3 p-3 bg-white rounded border border-blue-100">
                <p className="text-xs font-semibold text-blue-900 mb-1">Why this gemelo for you:</p>
                <p className="text-sm text-gray-700">{agent.whyYou}</p>
              </div>

              <div className="mt-3 text-xs text-gray-600">
                <span className="font-semibold">Implementation: </span>
                {agent.implementationTime}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            setCurrentStep(0)
            setResponses({})
            setCompleted(false)
            setRecommendations([])
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Start Over
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">AI Onboarding</h1>
        <span className="text-sm text-gray-500 ml-auto">
          {currentStep + 1} / {ONBOARDING_STEPS.length}
        </span>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{step.question}</h2>

        {step.type === 'select' && (
          <div className="space-y-2">
            {step.options?.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="w-full text-left p-3 border border-gray-300 rounded hover:bg-blue-50 hover:border-blue-400 transition"
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {step.type === 'multi-select' && (
          <div className="space-y-2">
            {step.options?.map((option) => (
              <label key={option} className="flex items-center p-3 border border-gray-300 rounded hover:bg-blue-50 cursor-pointer">
                <input
                  type="checkbox"
                  value={option}
                  checked={(responses[step.id] || []).includes(option)}
                  onChange={(e) => {
                    const current = responses[step.id] || []
                    const updated = e.target.checked
                      ? [...current, option]
                      : current.filter((v: string) => v !== option)
                    setResponses({ ...responses, [step.id]: updated })
                  }}
                  className="mr-3"
                />
                {option}
              </label>
            ))}
            <button
              onClick={() => handleAnswer(responses[step.id] || [])}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded flex items-center justify-center gap-2"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step.type === 'text' && (
          <div className="space-y-3">
            <textarea
              value={responses[step.id] || ''}
              onChange={(e) => setResponses({ ...responses, [step.id]: e.target.value })}
              placeholder={step.placeholder}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
            <button
              onClick={() => handleAnswer(responses[step.id] || '')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded flex items-center justify-center gap-2"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all"
          style={{ width: `${((currentStep + 1) / ONBOARDING_STEPS.length) * 100}%` }}
        />
      </div>
    </div>
  )
}
