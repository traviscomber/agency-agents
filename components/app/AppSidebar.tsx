'use client'

import Link from 'next/link'
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
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { UsageMeter } from '@/components/shared/UsageMeter'
import { MOCK_USER } from '@/lib/data/mock-store'

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

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border/70 bg-white/90 backdrop-blur xl:flex">
      <div className="border-b border-border/70 p-5">
        <Link href="/app" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-slate-950 text-white shadow-sm">
            <Sparkles size={16} />
          </span>
          <div className="leading-tight">
            <span className="block text-sm font-semibold tracking-tight text-foreground">AgencyOS</span>
            <span className="block text-[11px] text-muted-foreground">Operational workspace</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/app' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors',
                isActive
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'text-muted-foreground hover:bg-slate-50 hover:text-foreground'
              )}
            >
              <Icon size={15} className={cn(isActive ? 'text-white' : 'text-slate-500')} />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border/70 p-4">
        <UsageMeter used={3} limit={5} plan={MOCK_USER.plan} compact />
      </div>

      <div className="border-t border-border/70 p-4">
        <div className="mb-3 flex items-center gap-3 rounded-2xl border border-border bg-slate-50 p-3">
          <div className="flex size-9 items-center justify-center rounded-full bg-slate-950 text-xs font-semibold text-white">
            {MOCK_USER.fullName.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-foreground">{MOCK_USER.fullName}</p>
            <p className="truncate text-[11px] text-muted-foreground">{MOCK_USER.email}</p>
          </div>
        </div>
        <Link
          href="/login"
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-slate-50 hover:text-foreground"
        >
          <LogOut size={13} />
          Sign out
        </Link>
      </div>
    </aside>
  )
}
