import Link from 'next/link'
import { LayoutDashboard, Bot, Users, History, Settings, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

// NOTE: In production, protect this layout with auth middleware
// checking MOCK_USER.isAdmin or a Supabase session with role check.

const ADMIN_NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/agents', label: 'Agents', icon: Bot },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/runs', label: 'Runs', icon: History },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-slate-900/10 bg-slate-950 lg:flex">
        {/* Logo */}
        <div className="border-b border-white/10 px-4 py-4">
          <Link href="/admin" className="flex items-center gap-2">
            <Shield size={14} className="text-white/75" />
            <span className="text-xs font-semibold text-white">AgencyOS Admin</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-0.5 px-2 py-4">
          {ADMIN_NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 rounded px-3 py-2 text-sm text-white/72 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Icon size={14} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Back to app */}
        <div className="border-t border-white/10 px-3 py-3">
          <Link
            href="/app"
            className="flex items-center gap-2 rounded px-3 py-1.5 text-xs text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            &larr; Back to workspace
          </Link>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
