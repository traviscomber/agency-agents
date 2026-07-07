'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, ArrowRight } from 'lucide-react'

const ONBOARDING_PLANS = [
  {
    id: 'free',
    name: 'Demo Twin OS',
    price: '$0/mo',
    capacity: '5 twin runs/month',
    fit: 'Validate one role, save the first artifacts, and prove the first operating loop.',
    features: ['1 active operating program', 'Role twin library', 'Saved deliverables', 'Basic replacement preview'],
  },
  {
    id: 'starter',
    name: 'Pilot Program',
    price: '$99/mo',
    capacity: '1 deployed twin',
    fit: 'Start with sales, collections, tenders, or implementation.',
    features: ['Diagnosis checklist', 'Memory by account or process', 'Reusable deliverables', 'Email support'],
  },
  {
    id: 'managed',
    name: 'Managed Deployment',
    price: 'From USD 299/mo',
    capacity: 'Outcome-led program',
    fit: 'For teams that want diagnosis, setup, supervision, and ROI tracking in one rollout.',
    features: ['Operating map', 'Handoff rules', 'Supervision limits', 'Monthly ROI review'],
  },
]

const OPERATING_CHECKPOINTS = ['Role to replicate', 'Inputs available', 'Human approval boundary', 'ROI metric']

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
          <h1 className="text-3xl font-light tracking-tight text-[#173634]">Welcome to N3uralia Twin OS</h1>
          <p className="mt-2 text-sm text-[#173634]/60">Turn one repetitive Chile/Latam role into a supervised operating program with visible ROI, memory, and handoff control.</p>
          {diagnosisRole ? (
            <div className="mx-auto mt-5 max-w-md border border-[#d8e5e2] bg-white px-4 py-3 text-left">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#789b96]">Diagnosis ready</p>
              <p className="mt-1 text-sm font-semibold text-[#173634]">{diagnosisRole}</p>
              <p className="mt-1 text-xs leading-5 text-[#52605d]">
                Finish onboarding and we will create the first operating program with this digital twin attached, ready to run with supervision.
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

        {/* Step 1: Program Name */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-[#173634]">Step 1: Name the operating program</h2>
              <p className="mt-2 text-sm text-[#173634]/60">Pick the real process you want to convert into supervised digital capacity and a clear deliverable.</p>
            </div>

            <div className="space-y-3 border border-[#d8e5e2] bg-white p-6">
              <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#555a56]">
                Program name
              </label>
              <input
                type="text"
                placeholder="Sales follow-up Chile, Tender review, Collections portfolio Latam..."
                className="w-full border border-[#d8e5e2] bg-[#fbfbfa] px-4 py-3 text-sm text-[#173634] outline-none focus:border-[#8fb2aa]"
              />
              <div className="grid gap-3 pt-2 sm:grid-cols-2">
                {OPERATING_CHECKPOINTS.map((label) => (
                  <div key={label} className="border border-[#d8e5e2] bg-[#f8fbfa] px-3 py-2">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#789b96]">{label}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs leading-5 text-[#52605d]">
                Strong programs start with a narrow routine: the twin prepares, prioritizes, summarizes, or follows up while a human keeps approval over sensitive decisions.
              </p>
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
              <p className="mt-2 text-sm text-[#173634]/60">Choose how much support, memory, and supervision the first twin needs to produce a useful first result.</p>
            </div>

            <div className="space-y-3">
              {ONBOARDING_PLANS.map((plan) => (
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
                      <p className="mt-2 text-xs leading-5 text-[#52605d]">{plan.fit}</p>
                    </div>
                    <span className="text-xs font-semibold text-[#8fb2aa]">{plan.capacity}</span>
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
                  ? 'Your operating space is ready. Next, create the first program from your diagnosis and save the first artifact.'
                  : 'Your operating space is ready. Start with the program record, role memory, and the first supervised twin run.'}
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
