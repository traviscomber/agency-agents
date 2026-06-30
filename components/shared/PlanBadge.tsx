import { cn } from '@/lib/utils'
import type { PlanId } from '@/lib/types'

interface PlanBadgeProps {
  plan: PlanId
  size?: 'sm' | 'default'
  className?: string
}

const PLAN_STYLES: Record<PlanId, string> = {
  free: 'bg-zinc-100 text-zinc-600 border border-zinc-200',
  starter: 'bg-blue-50 text-blue-700 border border-blue-200',
  pro: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
  team: 'bg-violet-50 text-violet-700 border border-violet-200',
  enterprise: 'bg-amber-50 text-amber-700 border border-amber-200',
}

const PLAN_LABELS: Record<PlanId, string> = {
  free: 'Free',
  starter: 'Starter',
  pro: 'Pro',
  team: 'Team',
  enterprise: 'Enterprise',
}

export function PlanBadge({ plan, size = 'default', className }: PlanBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded',
        size === 'sm' ? 'px-1.5 py-0.5 text-[11px]' : 'px-2 py-0.5 text-xs',
        PLAN_STYLES[plan],
        className
      )}
    >
      {PLAN_LABELS[plan]}
    </span>
  )
}
