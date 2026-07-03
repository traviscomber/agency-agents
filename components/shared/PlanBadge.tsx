import { cn } from '@/lib/utils'
import type { PlanId } from '@/lib/types'

interface PlanBadgeProps {
  plan: PlanId
  size?: 'sm' | 'default'
  className?: string
}

const PLAN_STYLES: Record<PlanId, string> = {
  free:       'border-[#d8e5e2] bg-[#f1f6f4] text-[#52605d]',
  starter:    'border-[#d8e5e2] bg-[#edf4f1] text-[#173634]',
  pro:        'border-[#8fb2aa]/40 bg-[#8fb2aa]/10 text-[#173634]',
  team:       'border-[#173634]/20 bg-[#173634]/8 text-[#173634]',
  enterprise: 'border-[#173634]/30 bg-[#173634] text-[#f5fbfa]',
}

const PLAN_LABELS: Record<PlanId, string> = {
  free:       'Free',
  starter:    'Starter',
  pro:        'Pro',
  team:       'Team',
  enterprise: 'Enterprise',
}

export function PlanBadge({ plan, size = 'default', className }: PlanBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center border font-semibold uppercase tracking-[0.18em]',
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-[10px]',
        PLAN_STYLES[plan],
        className
      )}
    >
      {PLAN_LABELS[plan]}
    </span>
  )
}
