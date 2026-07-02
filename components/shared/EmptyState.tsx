import type { ReactNode } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
  icon?: ReactNode
}

export function EmptyState({ title, description, actionLabel, actionHref, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.3)]">
          {icon}
        </div>
      )}
      <h3 className="mb-1 text-sm font-semibold text-foreground">{title}</h3>
      <p className="mb-6 max-w-xs text-sm leading-relaxed text-slate-600">{description}</p>
      {actionLabel && actionHref && (
        <Button asChild size="sm">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  )
}
