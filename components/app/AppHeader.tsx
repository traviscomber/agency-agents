'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Bot,
  FolderOpen,
  History,
  Bookmark,
  BarChart2,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/app', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/app/agents', label: 'Agents', icon: Bot },
  { href: '/app/projects', label: 'Projects', icon: FolderOpen },
  { href: '/app/history', label: 'History', icon: History },
  { href: '/app/saved', label: 'Saved', icon: Bookmark },
  { href: '/app/usage', label: 'Usage', icon: BarChart2 },
  { href: '/app/billing', label: 'Billing', icon: CreditCard },
  { href: '/app/settings', label: 'Settings', icon: Settings },
]

interface AppHeaderProps {
  title?: string
}

export function AppHeader({ title }: AppHeaderProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-white/90 backdrop-blur xl:hidden">
      <div className="flex h-16 items-center justify-between gap-3 px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-slate-50 hover:text-foreground"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
          <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground">
            <Sparkles size={15} className="text-primary" />
            AgencyOS
          </span>
        </div>
        {title && <span className="max-w-[180px] truncate text-sm text-muted-foreground">{title}</span>}
        <Button size="sm" asChild className="text-xs">
          <Link href="/app/agents">Run agent</Link>
        </Button>
      </div>

      {open && (
        <div className="border-t border-border/70 bg-white px-3 py-3">
          <nav className="space-y-1">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href || (href !== '/app' && pathname.startsWith(href))
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors',
                    isActive
                      ? 'bg-slate-950 text-white'
                      : 'text-muted-foreground hover:bg-slate-50 hover:text-foreground'
                  )}
                >
                  <Icon size={15} className={cn(isActive ? 'text-white' : 'text-slate-500')} />
                  {label}
                </Link>
              )
            })}
          </nav>
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-slate-50 hover:text-foreground"
          >
            <LogOut size={15} />
            Sign out
          </Link>
        </div>
      )}
    </header>
  )
}
