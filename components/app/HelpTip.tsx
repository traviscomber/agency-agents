'use client'

import { LucideIcon } from 'lucide-react'

interface HelpTipProps {
  icon?: LucideIcon
  title: string
  description: string
  variant?: 'info' | 'tip' | 'warning'
  actions?: Array<{
    label: string
    onClick: () => void
  }>
}

const variantStyles = {
  info: {
    bg: 'bg-[#f1f6f4]/50',
    border: 'border-[#8fb2aa]/30',
    icon: 'text-[#8fb2aa]',
    title: 'text-[#173634]',
    text: 'text-[#52605d]',
  },
  tip: {
    bg: 'bg-[#e8f5f2]/50',
    border: 'border-[#8fb2aa]/20',
    icon: 'text-[#789b96]',
    title: 'text-[#173634]',
    text: 'text-[#52605d]',
  },
  warning: {
    bg: 'bg-amber-50/50',
    border: 'border-amber-200/50',
    icon: 'text-amber-600',
    title: 'text-amber-900',
    text: 'text-amber-800',
  },
}

export function HelpTip({
  icon: Icon,
  title,
  description,
  variant = 'tip',
  actions,
}: HelpTipProps) {
  const styles = variantStyles[variant]

  return (
    <div className={`border rounded-none p-4 ${styles.bg} ${styles.border}`}>
      <div className="flex gap-3">
        {Icon && <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${styles.icon}`} />}
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold ${styles.title}`}>{title}</p>
          <p className={`text-sm mt-1 leading-relaxed ${styles.text}`}>
            {description}
          </p>
          {actions && actions.length > 0 && (
            <div className="flex gap-2 mt-3">
              {actions.map((action) => (
                <button
                  key={action.label}
                  onClick={action.onClick}
                  className="text-xs font-semibold px-3 py-1.5 border border-[#8fb2aa] text-[#173634] hover:bg-[#8fb2aa]/10"
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
