import { cn } from '@/lib/utils'

interface DivisionBadgeProps {
  division: string
  size?: 'sm' | 'default'
  className?: string
}

const DIVISION_STYLES: Record<string, string> = {
  Engineering: 'bg-sky-100 text-sky-800 border border-sky-200',
  Design: 'bg-rose-100 text-rose-800 border border-rose-200',
  Product: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
  Sales: 'bg-orange-100 text-orange-800 border border-orange-200',
  Security: 'bg-red-100 text-red-800 border border-red-200',
  Strategy: 'bg-slate-200 text-slate-800 border border-slate-300',
  Marketing: 'bg-cyan-100 text-cyan-800 border border-cyan-200',
  Finance: 'bg-teal-100 text-teal-800 border border-teal-200',
  Research: 'bg-indigo-100 text-indigo-800 border border-indigo-200',
  Operations: 'bg-zinc-200 text-zinc-800 border border-zinc-300',
}

function getStyle(division: string): string {
  return DIVISION_STYLES[division] || 'bg-slate-100 text-slate-700 border border-slate-200'
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
