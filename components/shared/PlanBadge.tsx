import { cn } from '@/lib/utils'
import type { PlanId } from '@/lib/types'

interface PlanBadgeProps {
  plan: PlanId
  size?: 'sm' | 'default'
  className?: string
}

const PLAN_STYLES: Record<PlanId, string> = {
  free: 'bg-zinc-100 text-zinc-600 border border-zinc-200',
  starter: 'bg-sky-50 text-sky-700 border border-sky-200',
  pro: 'bg-slate-100 text-slate-700 border border-slate-200',
  team: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
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
