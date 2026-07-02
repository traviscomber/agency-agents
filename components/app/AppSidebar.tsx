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
  ArrowUpRight,
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
    <aside className="sticky top-0 hidden h-screen w-[18.5rem] shrink-0 flex-col border-r border-slate-200/90 bg-white/88 backdrop-blur-xl xl:flex">
      <div className="border-b border-slate-200/90 p-5">
        <Link href="/app" className="group flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0f172a,#334155)] text-white shadow-[0_12px_30px_-14px_rgba(15,23,42,0.85)] transition-transform duration-200 group-hover:-translate-y-0.5">
            <Sparkles size={17} />
          </span>
          <div className="min-w-0 leading-tight">
            <span className="block text-sm font-semibold tracking-tight text-foreground">AgencyOS</span>
            <span className="block text-[11px] uppercase tracking-[0.22em] text-slate-500">
              Agency workspace
            </span>
          </div>
        </Link>

        <div className="mt-4 rounded-2xl border border-slate-900/10 bg-gradient-to-br from-slate-950 to-slate-800 p-4 text-white shadow-[0_16px_50px_-28px_rgba(15,23,42,0.7)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/68">Brandbook</p>
              <p className="mt-1 text-sm font-medium">Visual system v2</p>
            </div>
            <span className="rounded-full border border-white/16 bg-white/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/86">
              Live
            </span>
          </div>
          <Link
            href="/app/projects"
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-white/90 transition-colors hover:text-white"
          >
            Explore workspace
            <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
          Navigation
        </p>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/app' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-all duration-200',
                isActive
                  ? 'bg-slate-950 text-white shadow-[0_10px_30px_-18px_rgba(15,23,42,0.9)]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
              )}
            >
              <span
                className={cn(
                  'flex size-8 items-center justify-center rounded-xl transition-colors',
                  isActive ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-white group-hover:text-slate-950'
                )}
              >
                <Icon size={15} />
              </span>
              <span className="font-medium">{label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-slate-200/90 px-4 py-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_30px_-26px_rgba(15,23,42,0.55)]">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Usage</p>
              <p className="mt-1 text-sm font-semibold text-foreground">Current plan activity</p>
            </div>
            <span className="rounded-full bg-slate-950 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
              {MOCK_USER.plan}
            </span>
          </div>
          <UsageMeter used={3} limit={5} plan={MOCK_USER.plan} compact />
        </div>
      </div>

      <div className="border-t border-slate-200/90 p-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_30px_-26px_rgba(15,23,42,0.55)]">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
              {MOCK_USER.fullName.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">{MOCK_USER.fullName}</p>
              <p className="truncate text-xs text-slate-500">{MOCK_USER.email}</p>
            </div>
          </div>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-950"
          >
            <LogOut size={13} />
            Sign out
          </Link>
        </div>
      </div>
    </aside>
  )
}
