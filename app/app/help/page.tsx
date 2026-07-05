'use client'

import { useState } from 'react'
import { ChevronDown, Lightbulb, Zap, BookOpen, AlertCircle } from 'lucide-react'

const FAQ_ITEMS = [
  {
    category: 'Getting Started',
    items: [
      {
        q: 'What is a Program (Project)?',
        a: 'A program is a piece of work with multiple steps. Each step can be assigned to a different agent. For example, a sales program might have steps for prospecting, proposal creation, and follow-up. Programs help you organize work and track progress.',
      },
      {
        q: 'What is an Agent (Twin)?',
        a: 'An agent is a digital worker trained for a specific role. Each agent has a job like sales prospecting, recruiting, or handling collections. You assign agents to steps in your programs to automate work.',
      },
      {
        q: 'How do I run an agent?',
        a: '1) Go to Projects → select your program 2) Click "Run Agent" on a step 3) Select the agent you want 4) Review the output in History. Each run is logged so you can track what happened.',
      },
    ],
  },
  {
    category: 'Understanding Results',
    items: [
      {
        q: 'What does Replacement Score mean?',
        a: 'Replacement Score shows what % of the job the agent can do autonomously (80%+), with management, or as an assistant. Higher scores mean the agent can handle more of the work without human intervention.',
      },
      {
        q: 'What is Supervision Level?',
        a: 'Low = agent can move forward with spot checks. Medium = needs regular review before decisions. High = should stay under explicit human approval. This helps you manage risk.',
      },
      {
        q: 'Why would an agent run fail?',
        a: 'Failures happen when the agent hits an edge case it wasn\'t trained for. Check the History tab to see error details, then try a different agent or adjust the inputs.',
      },
    ],
  },
  {
    category: 'Best Practices',
    items: [
      {
        q: 'Should I save outputs?',
        a: 'Yes! Save important outputs to create a library of reusable work. This helps when you need similar work done again - you can reference past outputs.',
      },
      {
        q: 'How many steps should a program have?',
        a: 'Start with 2-3 steps. Too many steps makes programs complex. Think of each step as a decision point or handoff to a different agent.',
      },
      {
        q: 'Can I run the same agent twice?',
        a: 'Yes. Some workflows need the same agent at different points. Each run is independent and creates a new history entry.',
      },
    ],
  },
  {
    category: 'Troubleshooting',
    items: [
      {
        q: 'Agent keeps failing - what do I do?',
        a: 'Check the error message in History. Common issues: unclear instructions, missing context, or wrong agent for the task. Try a different agent or adjust your program brief.',
      },
      {
        q: 'How do I see what happened in a run?',
        a: 'Go to History → click the run → view full details including inputs, outputs, and any errors. Use this to understand what the agent did.',
      },
      {
        q: 'Can I delete or undo a run?',
        a: 'Runs are immutable for audit trails, but you can create a new program or step to try again. This keeps a clean history of what was attempted.',
      },
    ],
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left"
    >
      <div className="flex items-start justify-between gap-4 border border-[#edf4f1] bg-white px-4 py-3 hover:bg-[#f1f6f4]">
        <p className="text-sm font-medium text-[#173634]">{q}</p>
        <ChevronDown
          size={16}
          className={`shrink-0 text-[#8fb2aa] transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </div>
      {open && (
        <div className="border border-t-0 border-[#edf4f1] bg-white px-4 py-3">
          <p className="text-sm leading-6 text-[#52605d]">{a}</p>
        </div>
      )}
    </button>
  )
}

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      <header className="border-b border-[#d8e5e2] pb-8 mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Documentation</p>
        <h1 className="mt-2 text-3xl font-light text-[#173634]">How to use Twin OS</h1>
        <p className="mt-2 text-sm leading-relaxed text-[#52605d] max-w-2xl">
          Everything you need to know about creating programs, running agents, and understanding your results.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-8">
          {FAQ_ITEMS.map((category) => (
            <section key={category.category}>
              <h2 className="text-lg font-semibold text-[#173634] mb-3">{category.category}</h2>
              <div className="space-y-2">
                {category.items.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-6 lg:h-fit">
          <div className="border border-[#d8e5e2] bg-[#fbfbfa] p-4 rounded-none">
            <div className="flex items-center gap-2 text-[#8fb2aa] mb-3">
              <Lightbulb size={16} />
              <p className="text-xs font-semibold uppercase tracking-[0.16em]">Pro Tip</p>
            </div>
            <p className="text-sm text-[#52605d] leading-relaxed">
              Save outputs from successful runs. You can reference them in future programs to help agents understand the quality you expect.
            </p>
          </div>

          <div className="border border-[#d8e5e2] bg-[#fbfbfa] p-4 rounded-none">
            <div className="flex items-center gap-2 text-[#8fb2aa] mb-3">
              <Zap size={16} />
              <p className="text-xs font-semibold uppercase tracking-[0.16em]">Quick Start</p>
            </div>
            <ol className="space-y-2 text-sm text-[#52605d]">
              <li>1. Create a program</li>
              <li>2. Add 2-3 workflow steps</li>
              <li>3. Assign agents to steps</li>
              <li>4. Run and review results</li>
            </ol>
          </div>

          <div className="border border-amber-200 bg-amber-50 p-4 rounded-none">
            <div className="flex items-center gap-2 text-amber-600 mb-3">
              <AlertCircle size={16} />
              <p className="text-xs font-semibold uppercase tracking-[0.16em]">Remember</p>
            </div>
            <p className="text-sm text-amber-700 leading-relaxed">
              Agents work best with clear, specific instructions. The more context you provide, the better the output.
            </p>
          </div>
        </aside>
      </div>

      <div className="mt-12 border-t border-[#d8e5e2] pt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8fb2aa] mb-3">Need more help?</p>
        <p className="text-sm text-[#52605d]">
          Check the onboarding tips on each page, or reach out to support@n3uralia.com
        </p>
      </div>
    </div>
  )
}
