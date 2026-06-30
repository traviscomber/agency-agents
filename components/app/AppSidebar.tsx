'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Bot, FolderOpen, History, Bookmark,
  BarChart2, CreditCard, Settings, LogOut, ChevronRight,
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
    <aside className="hidden lg:flex flex-col w-56 bg-white border-r border-border h-screen sticky top-0 overflow-y-auto shrink-0">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-border">
        <Link href="/app" className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">AgencyOS</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-0.5">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/app' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 rounded text-sm transition-colors',
                isActive
                  ? 'bg-muted text-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
              )}
            >
              <Icon size={15} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Usage meter */}
      <div className="px-3 py-3 border-t border-border">
        <UsageMeter used={3} limit={5} plan={MOCK_USER.plan} compact />
      </div>

      {/* User */}
      <div className="px-3 py-3 border-t border-border">
        <div className="flex items-center gap-2.5 px-1 mb-2">
          <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-foreground shrink-0">
            {MOCK_USER.fullName.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">{MOCK_USER.fullName}</p>
            <p className="text-[11px] text-muted-foreground truncate">{MOCK_USER.email}</p>
          </div>
        </div>
        <Link
          href="/login"
          className="flex items-center gap-2 px-3 py-1.5 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors w-full"
        >
          <LogOut size={13} />
          Sign out
        </Link>
      </div>
    </aside>
  )
}
