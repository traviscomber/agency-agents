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
      <aside className="hidden lg:flex flex-col w-52 bg-foreground h-screen sticky top-0 shrink-0">
        {/* Logo */}
        <div className="px-4 py-4 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-2">
            <Shield size={14} className="text-white/60" />
            <span className="text-xs font-semibold text-white">AgencyOS Admin</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-0.5">
          {ADMIN_NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 px-3 py-2 rounded text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Icon size={14} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Back to app */}
        <div className="px-3 py-3 border-t border-white/10">
          <Link
            href="/app"
            className="flex items-center gap-2 px-3 py-1.5 rounded text-xs text-white/50 hover:text-white hover:bg-white/10 transition-colors"
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
