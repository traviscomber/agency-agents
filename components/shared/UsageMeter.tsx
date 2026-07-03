'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface UsageMeterProps {
  used: number
  limit: number
  plan: string
  compact?: boolean
}

export function UsageMeter({ used, limit, plan, compact = false }: UsageMeterProps) {
  const pct = Math.min(Math.round((used / limit) * 100), 100)
  const isWarning = pct >= 80
  const isCritical = pct >= 100

  const trackColor = isCritical
    ? 'bg-red-500'
    : isWarning
    ? 'bg-amber-500'
    : 'bg-[#8fb2aa]'

  if (compact) {
    return (
      <div className="w-full">
        <div className="mb-1.5 flex items-center justify-between text-[11px]">
          <span className="text-[#a7b9b4]">{used}/{limit} runs used</span>
          {isCritical && (
            <Link href="/app/billing" className="font-semibold text-red-400 hover:underline">Upgrade</Link>
          )}
          {isWarning && !isCritical && (
            <span className="text-amber-400">Near limit</span>
          )}
        </div>
        <div className="h-1 w-full bg-[#1e3431]">
          <div className={cn('h-1 transition-all', trackColor)} style={{ width: `${pct}%` }} />
        </div>
      </div>
    )
  }

  return (
    <div className="border border-[#d8e5e2] bg-[#fbfbfa] p-5">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#173634]">Monthly runs</p>
          <p className="mt-0.5 text-xs capitalize text-[#65706d]">{plan} plan</p>
        </div>
        <span className={cn('text-2xl font-semibold tracking-tight', isCritical ? 'text-red-600' : isWarning ? 'text-amber-600' : 'text-[#173634]')}>
          {used}<span className="text-base font-normal text-[#65706d]">/{limit}</span>
        </span>
      </div>
      <div className="h-1.5 w-full bg-[#d8e5e2]">
        <div className={cn('h-1.5 transition-all', trackColor)} style={{ width: `${pct}%` }} />
      </div>
      {isCritical && (
        <p className="mt-2.5 text-xs leading-relaxed text-red-600">
          Monthly limit reached.{' '}
          <Link href="/app/billing" className="font-semibold underline">Upgrade your plan</Link>
        </p>
      )}
      {isWarning && !isCritical && (
        <p className="mt-2.5 text-xs leading-relaxed text-amber-700">
          Approaching monthly limit.{' '}
          <Link href="/app/billing" className="font-semibold underline">Upgrade for more runs</Link>
        </p>
      )}
    </div>
  )
}
