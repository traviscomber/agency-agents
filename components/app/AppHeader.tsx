'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Bot, FolderOpen, History, Bookmark,
  BarChart2, CreditCard, Settings, LogOut, Menu, X, ArrowUpRight, Moon, Sun,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/app',          label: 'Dashboard', icon: LayoutDashboard },
  { href: '/app/agents',   label: 'Agents',    icon: Bot },
  { href: '/app/projects', label: 'Projects',  icon: FolderOpen },
  { href: '/app/history',  label: 'History',   icon: History },
  { href: '/app/saved',    label: 'Saved',     icon: Bookmark },
  { href: '/app/usage',    label: 'Usage',     icon: BarChart2 },
  { href: '/app/billing',  label: 'Billing',   icon: CreditCard },
  { href: '/app/settings', label: 'Settings',  icon: Settings },
]

const TITLE_MAP: Record<string, string> = {
  '/app':          'Dashboard',
  '/app/agents':   'Agents',
  '/app/projects': 'Projects',
  '/app/history':  'History',
  '/app/saved':    'Saved',
  '/app/usage':    'Usage',
  '/app/billing':  'Billing',
  '/app/settings': 'Settings',
}

interface AppHeaderProps {
  title?: string
}

export function AppHeader({ title }: AppHeaderProps) {
  const [open, setOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const pathname = usePathname()
  const currentTitle = useMemo(() => title ?? TITLE_MAP[pathname] ?? 'AgencyOS', [pathname, title])

  const toggleTheme = () => {
    setIsDark(!isDark)
    if (isDark) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
  }

  const isActive = (href: string) => href === '/app' ? pathname === href : pathname.startsWith(href)

  return (
    <header
      className="sticky top-0 z-40 border-b border-[#d8e5e2] xl:hidden"
      style={{ backgroundColor: '#fbfbfa' }}
    >
      <div className="flex h-14 items-center justify-between gap-3 px-4">
        {/* Left: hamburger + logo + title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(!open)}
            className="flex h-8 w-8 items-center justify-center border border-[#d8e5e2] bg-[#f1f6f4] text-[#52605d] transition-colors hover:border-[#8fb2aa]/40 hover:text-[#173634]"
            aria-label="Toggle navigation"
          >
            {open ? <X size={15} /> : <Menu size={15} />}
          </button>

          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center border border-[#d8e5e2] bg-[#edf4f1] text-[10px] font-semibold text-[#173634]">
              AO
            </span>
            <div className="leading-tight">
              <p className="text-[9px] uppercase tracking-[0.26em] text-[#a7b9b4]">AgencyOS</p>
              <p className="text-xs font-semibold text-[#173634]">{currentTitle}</p>
            </div>
          </div>
        </div>

        {/* Right: theme toggle + quick action */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center border border-[#d8e5e2] bg-[#f1f6f4] text-[#8fb2aa] transition-colors hover:bg-[#edf4f1]"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <Link
            href="/app/agents"
            className="inline-flex items-center gap-1.5 border border-[#1e3431] bg-[#173634] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d9e3e0] transition-colors hover:bg-[#0d1f1d]"
          >
            Run agent <ArrowUpRight size={11} />
          </Link>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {open && (
        <div className="border-t border-[#d8e5e2] px-2 py-3" style={{ backgroundColor: '#fbfbfa' }}>
          <nav className="space-y-0.5">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive(href)
                    ? 'bg-[#173634] text-[#f5fbfa]'
                    : 'text-[#52605d] hover:bg-[#edf4f1] hover:text-[#173634]'
                )}
              >
                <span className={cn(
                  'flex h-7 w-7 items-center justify-center',
                  isActive(href) ? 'text-[#d9e3e0]' : 'text-[#789b96]'
                )}>
                  <Icon size={14} />
                </span>
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-2 border-t border-[#d8e5e2] pt-2">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-[#789b96] transition-colors hover:text-[#173634]"
            >
              <LogOut size={14} />
              Sign out
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
