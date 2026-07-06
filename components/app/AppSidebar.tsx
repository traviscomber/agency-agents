'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Bot, FolderOpen, History, Bookmark,
  BarChart2, CreditCard, Settings, LogOut, ArrowUpRight, Clock, TrendingUp,
  Zap, Workflow, Cpu, Store, Database, Award, HelpCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { UsageMeter } from '@/components/shared/UsageMeter'
import { MOCK_USER } from '@/lib/data/mock-store'

const NAV_MAIN = [
  { href: '/app',          label: 'Dashboard', icon: LayoutDashboard },
  { href: '/app/agents',   label: 'Gemelos',   icon: Bot },
  { href: '/app/projects', label: 'Programas', icon: FolderOpen },
  { href: '/app/history',  label: 'Historial', icon: History },
  { href: '/app/saved',    label: 'Entregables', icon: Bookmark },
]

const NAV_AUTOMATION = [
  { href: '/app/scheduled-runs', label: 'Rutinas', icon: Clock },
  { href: '/app/analytics',      label: 'ROI y metricas', icon: TrendingUp },
]

const NAV_ADVANCED = [
  { href: '/app/chains',         label: 'Handoffs', icon: Workflow },
  { href: '/app/fine-tuning',    label: 'Memoria del rol', icon: Cpu },
  { href: '/app/integrations/slack', label: 'Conectores', icon: Zap },
]

const NAV_MONETIZATION = [
  { href: '/app/marketplace',    label: 'Twin Exchange', icon: Store },
  { href: '/app/batch',          label: 'Lotes operativos', icon: Database },
  { href: '/app/white-label',    label: 'Partners', icon: Award },
]

const NAV_ACCOUNT = [
  { href: '/app/usage',    label: 'Uso', icon: BarChart2 },
  { href: '/app/billing',  label: 'Plan', icon: CreditCard },
  { href: '/app/settings', label: 'Ajustes', icon: Settings },
  { href: '/app/help',     label: 'Ayuda', icon: HelpCircle },
]

export function AppSidebar() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/app' ? pathname === href : pathname.startsWith(href)

  const NavLink = ({ href, label, icon: Icon }: { href: string; label: string; icon: typeof Bot }) => (
    <Link
      href={href}
      className={cn(
        'group flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors',
        isActive(href)
          ? 'bg-[#173634] text-[#f5fbfa]'
          : 'text-[#52605d] hover:bg-[#edf4f1] hover:text-[#173634]'
      )}
    >
      <span className={cn(
        'flex h-7 w-7 items-center justify-center transition-colors',
        isActive(href)
          ? 'bg-[#8fb2aa]/20 text-[#d9e3e0]'
          : 'text-[#789b96] group-hover:text-[#173634]'
      )}>
        <Icon size={14} />
      </span>
      {label}
    </Link>
  )

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-[#d8e5e2] xl:flex" style={{ backgroundColor: '#fbfbfa' }}>

      {/* Logo */}
      <div className="border-b border-[#d8e5e2] px-5 py-4">
        <Link href="/app" className="flex items-center gap-3">
          <img src="/logo-n3uralia.png" alt="N3uralia Studio" className="h-8 w-8" />
          <div className="leading-tight">
            <span className="block text-sm font-semibold text-[#173634]">N3uralia</span>
            <span className="block text-[9px] uppercase tracking-[0.26em] text-[#789b96]">Twin OS</span>
          </div>
        </Link>

        {/* Quick action */}
        <Link
          href="/app/agents"
          className="mt-4 flex items-center justify-between border border-[#1e3431] bg-[#173634] px-3.5 py-2.5 text-xs font-semibold text-[#d9e3e0] transition-colors hover:bg-[#0d1f1d]"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Ejecutar gemelo</span>
          <ArrowUpRight size={12} className="text-[#8fb2aa]" />
        </Link>
      </div>

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <p className="mb-1 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#a7b9b4]">
          Twin OS
        </p>
        {NAV_MAIN.map((item) => <NavLink key={item.href} {...item} />)}

        <div className="my-3 border-t border-[#d8e5e2]" />

        <p className="mb-1 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#a7b9b4]">
          Operacion
        </p>
        {NAV_AUTOMATION.map((item) => <NavLink key={item.href} {...item} />)}

        <div className="my-3 border-t border-[#d8e5e2]" />

        <p className="mb-1 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#a7b9b4]">
          Sistema
        </p>
        {NAV_ADVANCED.map((item) => <NavLink key={item.href} {...item} />)}

        <div className="my-3 border-t border-[#d8e5e2]" />

        <p className="mb-1 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#a7b9b4]">
          Expansion
        </p>
        {NAV_MONETIZATION.map((item) => <NavLink key={item.href} {...item} />)}

        <div className="my-3 border-t border-[#d8e5e2]" />

        <p className="mb-1 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#a7b9b4]">
          Cuenta
        </p>
        {NAV_ACCOUNT.map((item) => <NavLink key={item.href} {...item} />)}
      </nav>

      {/* Usage meter */}
      <div className="border-t border-[#d8e5e2] px-4 py-4">
        <UsageMeter used={3} limit={5} plan={MOCK_USER.plan} compact />
      </div>

      {/* User row */}
      <div className="border-t border-[#d8e5e2] px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#173634] text-xs font-semibold text-[#f5fbfa]">
            {MOCK_USER.fullName.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-[#173634]">{MOCK_USER.fullName}</p>
            <p className="truncate text-[10px] text-[#789b96]">{MOCK_USER.email}</p>
          </div>
          <Link
            href="/login"
            className="flex h-7 w-7 items-center justify-center border border-[#d8e5e2] text-[#789b96] transition-colors hover:border-[#8fb2aa]/40 hover:text-[#173634]"
            title="Sign out"
          >
            <LogOut size={12} />
          </Link>
        </div>
      </div>
    </aside>
  )
}
