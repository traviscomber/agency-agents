'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface QuickRefItem {
  title: string
  steps: string[]
}

const QUICK_REFS: QuickRefItem[] = [
  {
    title: 'How to Run an Agent',
    steps: [
      '1. Go to Agents → select an agent role',
      '2. Click "Run" to execute on your current step',
      '3. Monitor progress in History',
      '4. Review outputs in Saved Deliverables',
    ],
  },
  {
    title: 'Create a New Project',
    steps: [
      '1. Go to Projects → click "New Project"',
      '2. Give it a name and description',
      '3. Add workflow steps (e.g., Sales → Proposal → Follow-up)',
      '4. Assign agents to each step',
    ],
  },
  {
    title: 'Understand Your Dashboard',
    steps: [
      'Active Programs: How many projects are in progress',
      'Execution Quality: Success rate of recent agent runs',
      'Role Coverage: How many different agent types you are using',
      'View details on each card to drill into specifics',
    ],
  },
  {
    title: 'Common Next Steps',
    steps: [
      '→ Run an agent on your first project step',
      '→ Review the results in the History tab',
      '→ Save important outputs for reuse',
      '→ Create a new step for the next agent',
    ],
  },
]

export function QuickReferenceGuide() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="space-y-2 rounded-none border border-[#d8e5e2] bg-[#fbfbfa] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">Quick Reference</p>
      <div className="space-y-1">
        {QUICK_REFS.map((ref) => (
          <button
            key={ref.title}
            onClick={() => setExpanded(expanded === ref.title ? null : ref.title)}
            className="w-full text-left"
          >
            <div className="flex items-center justify-between border border-[#edf4f1] bg-white px-3 py-2 hover:bg-[#f1f6f4]">
              <p className="text-xs font-semibold text-[#173634]">{ref.title}</p>
              <ChevronDown
                size={14}
                className={`text-[#8fb2aa] transition-transform ${
                  expanded === ref.title ? 'rotate-180' : ''
                }`}
              />
            </div>
            {expanded === ref.title && (
              <div className="border border-t-0 border-[#edf4f1] bg-white px-3 py-2">
                {ref.steps.map((step, i) => (
                  <p key={i} className="text-[10px] leading-4 text-[#52605d] py-1">
                    {step}
                  </p>
                ))}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
