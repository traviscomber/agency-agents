'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronRight, X } from 'lucide-react'
import { useOnboarding } from './OnboardingContext'

const ONBOARDING_STEPS = [
  {
    number: 1,
    title: 'Create an operating program',
    description: 'Start with one Chile/Latam routine, a clear business outcome, and the human approval boundary.',
    cta: 'Go to Programs',
    href: '/app/projects',
  },
  {
    number: 2,
    title: 'Assign the role twin',
    description: 'Map each routine step to a gemelo that knows the role, expected deliverable, supervision level, and limits.',
    cta: 'Browse Gemelos',
    href: '/app/agents',
  },
  {
    number: 3,
    title: 'Run, audit, and reuse',
    description: 'Execute the twin, audit the deliverable and handoff packet, then save useful work as operating memory.',
    cta: 'View Ledger',
    href: '/app/history',
  },
]

export function OnboardingWelcome() {
  const { isFirstVisit, skipStep } = useOnboarding()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isFirstVisit) {
      const hasSeenWelcome = localStorage.getItem('seen_welcome_modal')
      if (!hasSeenWelcome) {
        setIsOpen(true)
        localStorage.setItem('seen_welcome_modal', 'true')
      }
    }
  }, [isFirstVisit])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="max-w-2xl rounded-none border border-[#d8e5e2] bg-white p-8 shadow-lg">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">First operating loop</p>
            <h2 className="mt-2 text-2xl font-light text-[#173634]">
              Deploy your first supervised role twin in 3 steps
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#52605d]">
              Twin OS turns repetitive work into a controlled loop: program, role twin, deliverable, handoff, and measurable ROI.
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-8 w-8 items-center justify-center text-[#8fb2aa] hover:text-[#173634]"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-6 space-y-3">
          {ONBOARDING_STEPS.map((step) => (
            <div
              key={step.number}
              className="flex gap-4 border border-[#edf4f1] bg-[#fbfbfa] p-4 hover:bg-[#f1f6f4]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#8fb2aa] text-sm font-semibold text-[#8fb2aa]">
                {step.number}
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#173634]">{step.title}</p>
                <p className="mt-1 text-sm text-[#52605d]">{step.description}</p>
              </div>
              <Link
                href={step.href}
                className="flex items-center gap-1.5 border border-[#8fb2aa] px-3 py-2 text-xs font-semibold text-[#8fb2aa] hover:bg-[#8fb2aa]/10"
              >
                {step.cta}
                <ChevronRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => {
              skipStep('onboarding_welcome')
              setIsOpen(false)
            }}
            className="text-xs text-[#8fb2aa] hover:text-[#173634] font-semibold"
          >
            I know the operating loop, skip
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="h-9 border border-[#173634] bg-[#173634] px-4 text-xs font-semibold text-white hover:bg-[#1e3431]"
          >
            Start loop
          </button>
        </div>
      </div>
    </div>
  )
}
