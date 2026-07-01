'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
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
  ArrowUpRight,
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

const TITLE_MAP: Record<string, string> = {
  '/app': 'Dashboard',
  '/app/agents': 'Agents',
  '/app/projects': 'Projects',
  '/app/history': 'History',
  '/app/saved': 'Saved',
  '/app/usage': 'Usage',
  '/app/billing': 'Billing',
  '/app/settings': 'Settings',
}

export function AppHeader({ title }: AppHeaderProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const currentTitle = useMemo(() => {
    if (title) return title
    return TITLE_MAP[pathname] || 'Workspace'
  }, [pathname, title])

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-white/82 backdrop-blur-xl xl:hidden">
      <div className="border-b border-border/50 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 px-4 py-2 text-white">
        <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.24em] text-white/70">
          <span className="inline-flex items-center gap-2">
            <Sparkles size={13} className="text-white" />
            AgencyOS
          </span>
          <span>Visual system v2</span>
        </div>
      </div>

      <div className="flex h-16 items-center justify-between gap-3 px-4">
        <div className="flex min-w-0 items-center gap-3">
          <button
            onClick={() => setOpen(!open)}
            className="rounded-xl border border-border bg-white p-2 text-muted-foreground transition-colors hover:bg-slate-50 hover:text-foreground"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Workspace</p>
            <p className="truncate text-sm font-semibold tracking-tight text-foreground">{currentTitle}</p>
          </div>
        </div>
        <Button size="sm" asChild className="text-xs shadow-sm">
          <Link href="/app/agents">
            Run agent
            <ArrowUpRight size={12} className="ml-1" />
          </Link>
        </Button>
      </div>

      {open && (
        <div className="border-t border-border/70 bg-white/98 px-3 py-3 shadow-[0_24px_50px_-28px_rgba(15,23,42,0.45)]">
          <nav className="space-y-1">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href || (href !== '/app' && pathname.startsWith(href))
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-all duration-200',
                    isActive
                      ? 'bg-slate-950 text-white shadow-[0_10px_30px_-18px_rgba(15,23,42,0.9)]'
                      : 'text-muted-foreground hover:bg-slate-50 hover:text-foreground'
                  )}
                >
                  <span
                    className={cn(
                      'flex size-8 items-center justify-center rounded-xl',
                      isActive ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-500'
                    )}
                  >
                    <Icon size={15} />
                  </span>
                  {label}
                </Link>
              )
            })}
          </nav>
          <div className="mt-3 rounded-2xl border border-border bg-slate-50 px-3 py-2.5">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <LogOut size={15} />
              Sign out
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
