import { cn } from '@/lib/utils'
import type { PlanId } from '@/lib/types'

interface PlanBadgeProps {
  plan: PlanId
  size?: 'sm' | 'default'
  className?: string
}

const PLAN_STYLES: Record<PlanId, string> = {
  free: 'bg-slate-100 text-slate-700 border border-slate-200',
  starter: 'bg-sky-100 text-sky-800 border border-sky-200',
  pro: 'bg-slate-200 text-slate-800 border border-slate-300',
  team: 'bg-indigo-100 text-indigo-800 border border-indigo-200',
  enterprise: 'bg-amber-100 text-amber-900 border border-amber-200',
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
        'inline-flex items-center rounded-full font-medium tracking-tight',
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-0.5 text-xs',
        PLAN_STYLES[plan],
        className
      )}
    >
      {PLAN_LABELS[plan]}
    </span>
  )
}
