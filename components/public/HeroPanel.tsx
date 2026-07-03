'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Clock, ArrowRight, Sparkles, FileText, BarChart3, Users, Shield } from 'lucide-react'

const RUNS = [
  {
    agent: 'Strategic Brief Writer',
    division: 'Strategy',
    status: 'complete',
    output: 'Q3 positioning brief — 6 pages, 4 sections, ready for review.',
    time: '2m ago',
    icon: FileText,
  },
  {
    agent: 'Market Research Analyst',
    division: 'Intelligence',
    status: 'running',
    output: 'Scanning 14 competitive signals across LATAM SaaS...',
    time: 'just now',
    icon: BarChart3,
  },
  {
    agent: 'Hiring Brief Specialist',
    division: 'Talent',
    status: 'complete',
    output: 'Senior PM brief drafted — requirements, team fit, 3 screening Qs.',
    time: '8m ago',
    icon: Users,
  },
  {
    agent: 'Risk Assessment Officer',
    division: 'Legal',
    status: 'complete',
    output: 'Vendor contract flagged: 3 clauses need legal review.',
    time: '14m ago',
    icon: Shield,
  },
]

const STATS = [
  { value: '10+', label: 'Specialist agents' },
  { value: '4', label: 'Divisions' },
  { value: '24/7', label: 'Availability' },
  { value: '100%', label: 'Structured output' },
]

function RunningDots() {
  return (
    <span className="inline-flex items-center gap-[3px]">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block h-1 w-1 rounded-full bg-amber-400"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </span>
  )
}

export function HeroPanel() {
  const [activeRun, setActiveRun] = useState(1)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(0)
      setActiveRun((prev) => (prev + 1) % RUNS.length)
    }, 3200)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let raf: number
    let start: number | null = null
    const duration = 3200

    function step(ts: number) {
      if (!start) start = ts
      const elapsed = ts - start
      setProgress(Math.min(elapsed / duration, 1))
      if (elapsed < duration) raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [activeRun])

  return (
    <div className="relative w-full max-w-[520px]">
      {/* Glow halo behind the card */}
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,_rgba(148,163,184,0.18),_transparent_66%)] blur-2xl" />

      <div className="overflow-hidden rounded-[1.75rem] border border-white/12 bg-[rgba(8,12,28,0.94)] shadow-[0_32px_96px_rgba(0,0,0,0.52)] backdrop-blur-xl">
        {/* Header */}
        <div className="border-b border-white/12 px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
              </div>
              <span className="ml-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/60">
                AgencyOS Workspace
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/8 px-2.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-semibold text-emerald-400">Live</span>
            </div>
          </div>
        </div>

        {/* Run list */}
        <div className="space-y-2 p-4">
          <AnimatePresence initial={false}>
            {RUNS.map((run, idx) => {
              const Icon = run.icon
              const isActive = idx === activeRun
              const isComplete = run.status === 'complete'

              return (
                <motion.div
                  key={run.agent}
                  layout
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`relative rounded-[1.1rem] border p-3.5 transition-colors ${
                    isActive
                      ? 'border-white/16 bg-white/10'
                      : 'border-white/10 bg-white/5'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                        isActive && !isComplete
                          ? 'bg-amber-400/14 text-amber-400'
                          : 'bg-white/10 text-white/72'
                      }`}
                    >
                      <Icon size={14} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`text-xs font-semibold leading-none ${isActive ? 'text-white' : 'text-white/78'}`}>
                          {run.agent}
                        </p>
                        <span className="shrink-0 text-[10px] text-white/50">{run.time}</span>
                      </div>
                      <p className={`mt-1.5 text-xs leading-relaxed ${isActive ? 'text-white/86' : 'text-white/50'}`}>
                        {isActive && idx === 1 ? (
                          <span className="inline-flex items-center gap-2">
                            {run.output} <RunningDots />
                          </span>
                        ) : (
                          run.output
                        )}
                      </p>

                      {/* Division tag */}
                      <div className="mt-2 flex items-center gap-2">
                        <span className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] ${
                          isActive ? 'bg-white/10 text-white/78' : 'bg-white/6 text-white/40'
                        }`}>
                          {run.division}
                        </span>
                        {isComplete && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-400/80">
                            <CheckCircle2 size={9} /> Done
                          </span>
                        )}
                        {isActive && !isComplete && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-400/80">
                            <Clock size={9} /> Running
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Active progress bar */}
                  {isActive && !isComplete && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-[1.1rem] overflow-hidden bg-white/12">
                      <motion.div
                        className="h-full bg-amber-400"
                        style={{ width: `${progress * 100}%` }}
                      />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Stats footer */}
        <div className="border-t border-white/12 px-4 py-3">
          <div className="grid grid-cols-4 divide-x divide-white/12">
            {STATS.map(({ value, label }) => (
              <div key={label} className="px-2 text-center first:pl-0 last:pr-0">
                <p className="text-sm font-semibold text-white">{value}</p>
                <p className="mt-0.5 text-[9px] uppercase tracking-[0.16em] text-white/50">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <motion.div
        className="absolute -bottom-4 -left-4 flex items-center gap-2.5 rounded-2xl border border-white/14 bg-[rgba(8,12,28,0.92)] px-4 py-3 shadow-[0_12px_36px_rgba(0,0,0,0.4)] backdrop-blur-xl"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-400/12">
          <Sparkles size={12} className="text-emerald-400" />
        </div>
        <div>
          <p className="text-[10px] font-semibold text-white">4 runs completed today</p>
          <p className="text-[9px] text-white/44">Across Strategy, Legal, Talent</p>
        </div>
      </motion.div>
    </div>
  )
}
