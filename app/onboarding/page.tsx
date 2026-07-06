'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [diagnosisRole, setDiagnosisRole] = useState<string | null>(null)

  useEffect(() => {
    const raw = window.localStorage.getItem('n3uralia.diagnosis')
    if (!raw) return
    try {
      const parsed = JSON.parse(raw) as { role?: string }
      setDiagnosisRole(parsed.role ?? null)
    } catch {
      window.localStorage.removeItem('n3uralia.diagnosis')
    }
  }, [])

  const handleNext = () => {
    if (step === 3) {
      router.push(diagnosisRole ? '/app/projects?diagnosis=1' : '/app')
    } else {
      setStep(step + 1)
    }
  }

  return (
    <div className="min-h-screen px-4 py-12" style={{ backgroundColor: '#fbfbfa' }}>
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-light tracking-tight text-[#173634]">Welcome to N3uralia Studio</h1>
          <p className="mt-2 text-sm text-[#173634]/60">Set up the operating layer in 3 steps</p>
          {diagnosisRole ? (
            <div className="mx-auto mt-5 max-w-md border border-[#d8e5e2] bg-white px-4 py-3 text-left">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#789b96]">Diagnosis ready</p>
              <p className="mt-1 text-sm font-semibold text-[#173634]">{diagnosisRole}</p>
              <p className="mt-1 text-xs leading-5 text-[#52605d]">
                Finish onboarding and we will create the first operating program with this gemelo digital attached.
              </p>
            </div>
          ) : null}
          <div className="mt-6 flex items-center justify-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 w-8 transition-colors ${
                  s <= step ? 'bg-[#8fb2aa]' : 'bg-[#d8e5e2]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Initiative Name */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-[#173634]">Step 1: Name the workstream</h2>
              <p className="mt-2 text-sm text-[#173634]/60">Give the initiative a clear operating record</p>
            </div>

            <div className="space-y-3 border border-[#d8e5e2] bg-white p-6">
              <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#555a56]">
                Initiative name
              </label>
              <input
                type="text"
                placeholder="My Agency"
                className="w-full border border-[#d8e5e2] bg-[#fbfbfa] px-4 py-3 text-sm text-[#173634] outline-none focus:border-[#8fb2aa]"
              />
            </div>

            <button
              onClick={handleNext}
              className="w-full flex items-center justify-center gap-2 h-10 bg-[#8fb2aa] text-white font-semibold hover:bg-[#7a9a91] transition-colors"
            >
              Next <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* Step 2: Plan Selection */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-[#173634]">Step 2: Pick the operating plan</h2>
              <p className="mt-2 text-sm text-[#173634]/60">Choose the level of volume and continuity you need now</p>
            </div>

            <div className="space-y-3">
              {[
                { id: 'free', name: 'Starter', price: '$0/mo', runs: '5 runs/month', features: ['Core specialists', 'Save deliverables', 'Email support'] },
                { id: 'pro', name: 'Growth', price: '$99/mo', runs: 'Unlimited runs', features: ['All starter features', 'Advanced specialists', 'Priority support', 'API access'] },
              ].map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full text-left border-2 px-6 py-4 transition-all ${
                    selectedPlan === plan.id
                      ? 'border-[#8fb2aa] bg-[#f1f6f4]'
                      : 'border-[#d8e5e2] bg-white hover:border-[#8fb2aa]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-[#173634]">{plan.name}</h3>
                      <p className="mt-1 text-sm text-[#173634]/60">{plan.price}</p>
                    </div>
                    <span className="text-xs font-semibold text-[#8fb2aa]">{plan.runs}</span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-[#173634]">
                        <CheckCircle2 size={12} className="text-[#8fb2aa]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 h-10 border border-[#d8e5e2] text-[#173634] font-semibold hover:bg-[#f1f6f4]"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!selectedPlan}
                className="flex-1 h-10 bg-[#8fb2aa] text-white font-semibold hover:bg-[#7a9a91] disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="space-y-6 text-center">
            <div className="mx-auto w-12 h-12 flex items-center justify-center bg-[#f1f6f4]">
              <CheckCircle2 size={24} className="text-[#8fb2aa]" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[#173634]">You&apos;re all set!</h2>
              <p className="mt-2 text-sm text-[#173634]/60">
                {diagnosisRole
                  ? 'Your operating space is ready. Next, create the first program from your diagnosis.'
                  : 'Your operating space is ready. Start with the dashboard, the project record, and the next specialist run.'}
              </p>
            </div>

            <button
              onClick={handleNext}
              className="w-full h-10 bg-[#8fb2aa] text-white font-semibold hover:bg-[#7a9a91] flex items-center justify-center gap-2"
            >
              Open workspace <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
