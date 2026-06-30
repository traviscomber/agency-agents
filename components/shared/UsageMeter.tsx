'use client'

import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import Link from 'next/link'

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

  if (compact) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground">
            {used}/{limit} runs
          </span>
          {isWarning && !isCritical && (
            <span className="text-xs text-amber-600 font-medium">Near limit</span>
          )}
          {isCritical && (
            <Link href="/app/billing" className="text-xs text-red-600 font-medium hover:underline">
              Upgrade
            </Link>
          )}
        </div>
        <Progress
          value={pct}
          className={cn(
            'h-1',
            isWarning && !isCritical && '[&>div]:bg-amber-500',
            isCritical && '[&>div]:bg-red-500'
          )}
        />
      </div>
    )
  }

  return (
    <div className="p-4 rounded-lg border bg-card">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-sm font-medium text-foreground">Monthly runs</p>
          <p className="text-xs text-muted-foreground capitalize">{plan} plan</p>
        </div>
        <span className={cn('text-2xl font-semibold', isCritical ? 'text-red-600' : isWarning ? 'text-amber-600' : 'text-foreground')}>
          {used}
          <span className="text-base font-normal text-muted-foreground">/{limit}</span>
        </span>
      </div>
      <Progress
        value={pct}
        className={cn(
          'h-2',
          isWarning && !isCritical && '[&>div]:bg-amber-500',
          isCritical && '[&>div]:bg-red-500'
        )}
      />
      {isCritical && (
        <p className="mt-2 text-xs text-red-600">
          You have reached your monthly limit.{' '}
          <Link href="/app/billing" className="font-medium underline">
            Upgrade your plan
          </Link>
        </p>
      )}
      {isWarning && !isCritical && (
        <p className="mt-2 text-xs text-amber-700">
          You are approaching your monthly limit.{' '}
          <Link href="/app/billing" className="font-medium underline">
            Upgrade for more runs
          </Link>
        </p>
      )}
    </div>
  )
}
