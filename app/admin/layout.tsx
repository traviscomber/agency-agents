import Link from 'next/link'
import { LayoutDashboard, Bot, Users, History, Settings, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PublicNavbar } from '@/components/public/PublicNavbar'

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
    <>
      <PublicNavbar />
      <div className="flex h-[calc(100vh-4.75rem)]" style={{ backgroundColor: '#fbfbfa' }}>
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-[#d8e5e2] bg-white lg:flex">
        {/* Logo */}
        <div className="border-b border-[#d8e5e2] px-6 py-5">
          <Link href="/admin" className="flex items-center gap-2">
            <Shield size={16} className="text-[#8fb2aa]" />
            <span className="text-xs font-semibold tracking-[0.12em] text-[#173634]">ADMIN</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-px px-3 py-4">
          {ADMIN_NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 border-l-2 border-transparent px-4 py-3 text-sm font-light text-[#555a56] transition-all hover:border-[#8fb2aa] hover:bg-[#f1f6f4] hover:text-[#173634]"
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Back to app */}
        <div className="border-t border-[#d8e5e2] px-3 py-3">
          <Link
            href="/app"
            className="flex items-center gap-2 border-l-2 border-transparent px-4 py-2.5 text-xs font-light tracking-[0.12em] text-[#555a56] transition-all hover:border-[#8fb2aa] hover:bg-[#f1f6f4] hover:text-[#173634]"
          >
            ← Back
          </Link>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
      </div>
    </>
  )
}
