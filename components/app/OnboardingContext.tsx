'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface OnboardingStep {
  id: string
  completed: boolean
  skipped: boolean
}

interface OnboardingContextType {
  steps: Record<string, OnboardingStep>
  completeStep: (id: string) => void
  skipStep: (id: string) => void
  isFirstVisit: boolean
}

const OnboardingCtx = createContext<OnboardingContextType | undefined>(
  undefined
)

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [steps, setSteps] = useState<Record<string, OnboardingStep>>({})
  const [isFirstVisit, setIsFirstVisit] = useState(false)

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem('onboarding_steps')
    if (!stored) {
      setIsFirstVisit(true)
      localStorage.setItem(
        'onboarding_steps',
        JSON.stringify({
          select_agent: { id: 'select_agent', completed: false, skipped: false },
          run_agent: { id: 'run_agent', completed: false, skipped: false },
          review_results: { id: 'review_results', completed: false, skipped: false },
          deploy_agent: { id: 'deploy_agent', completed: false, skipped: false },
        })
      )
    } else {
      setSteps(JSON.parse(stored))
    }
  }, [])

  const completeStep = (id: string) => {
    const updated = {
      ...steps,
      [id]: { ...steps[id], completed: true },
    }
    setSteps(updated)
    localStorage.setItem('onboarding_steps', JSON.stringify(updated))
  }

  const skipStep = (id: string) => {
    const updated = {
      ...steps,
      [id]: { ...steps[id], skipped: true },
    }
    setSteps(updated)
    localStorage.setItem('onboarding_steps', JSON.stringify(updated))
  }

  return (
    <OnboardingCtx.Provider value={{ steps, completeStep, skipStep, isFirstVisit }}>
      {children}
    </OnboardingCtx.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingCtx)
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider')
  }
  return context
}
