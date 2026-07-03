import { cn } from '@/lib/utils'

interface DivisionBadgeProps {
  division: string
  size?: 'sm' | 'default'
  className?: string
}

// All divisions use the N3uralia sage-teal / border-light system
// Dark variant for dark-bg contexts, light for light-bg
const DIVISION_BASE = 'border-[#d8e5e2] bg-[#f1f6f4] text-[#52605d]'

const DIVISION_DARK: Record<string, string> = {
  Engineering: 'border-[#1e3431] bg-[#8fb2aa]/12 text-[#9db7b1]',
  Design:      'border-[#1e3431] bg-[#8fb2aa]/10 text-[#9db7b1]',
  Product:     'border-[#1e3431] bg-[#8fb2aa]/12 text-[#9db7b1]',
  Sales:       'border-[#1e3431] bg-[#0d1f1d] text-[#a7b9b4]',
  Security:    'border-[#1e3431] bg-[#0d1f1d] text-[#a7b9b4]',
  Strategy:    'border-[#28413d] bg-[#102218] text-[#8fb2aa]',
  Marketing:   'border-[#1e3431] bg-[#8fb2aa]/10 text-[#9db7b1]',
  Finance:     'border-[#1e3431] bg-[#8fb2aa]/12 text-[#9db7b1]',
  Research:    'border-[#28413d] bg-[#0d1f1d] text-[#a7b9b4]',
  Operations:  'border-[#1e3431] bg-[#0d1f1d] text-[#a7b9b4]',
}

export function DivisionBadge({
  division,
  size = 'default',
  className,
}: DivisionBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center border font-semibold uppercase tracking-[0.18em]',
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-[10px]',
        DIVISION_BASE,
        className
      )}
    >
      {division}
    </span>
  )
}

/** Variant for dark-background panels (sidebar, dark hero sections) */
export function DivisionBadgeDark({
  division,
  size = 'default',
  className,
}: DivisionBadgeProps) {
  const style = DIVISION_DARK[division] || 'border-[#1e3431] bg-[#0d1f1d] text-[#a7b9b4]'
  return (
    <span
      className={cn(
        'inline-flex items-center border font-semibold uppercase tracking-[0.18em]',
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-[10px]',
        style,
        className
      )}
    >
      {division}
    </span>
  )
}
