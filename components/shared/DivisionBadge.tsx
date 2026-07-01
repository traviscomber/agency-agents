import { cn } from '@/lib/utils'

interface DivisionBadgeProps {
  division: string
  size?: 'sm' | 'default'
  className?: string
}

const DIVISION_STYLES: Record<string, string> = {
  Engineering: 'bg-sky-50 text-sky-700 border border-sky-200',
  Design: 'bg-rose-50 text-rose-700 border border-rose-200',
  Product: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  Sales: 'bg-orange-50 text-orange-700 border border-orange-200',
  Security: 'bg-red-50 text-red-700 border border-red-200',
  Strategy: 'bg-slate-100 text-slate-700 border border-slate-200',
  Marketing: 'bg-cyan-50 text-cyan-700 border border-cyan-200',
  Finance: 'bg-teal-50 text-teal-700 border border-teal-200',
  Research: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
  Operations: 'bg-zinc-100 text-zinc-700 border border-zinc-200',
}

function getStyle(division: string): string {
  return DIVISION_STYLES[division] || 'bg-zinc-100 text-zinc-600 border border-zinc-200'
}

export function DivisionBadge({ division, size = 'default', className }: DivisionBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium tracking-tight',
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-0.5 text-xs',
        getStyle(division),
        className
      )}
    >
      {division}
    </span>
  )
}
