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
    <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
      {icon && (
        <div className="mb-5 flex h-12 w-12 items-center justify-center border border-[#d8e5e2] bg-[#f1f6f4] text-[#52605d]">
          {icon}
        </div>
      )}
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#173634]">{title}</h3>
      <p className="mb-6 max-w-xs text-sm leading-7 text-[#65706d]">{description}</p>
      {actionLabel && actionHref && (
        <Button asChild size="sm">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  )
}
