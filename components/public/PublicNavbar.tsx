'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/agents',  label: 'Agents' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/app',     label: 'Dashboard' },
]

export function PublicNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#1e3431] bg-[#060a10]/92 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.75rem] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <img src="/logo-n3uralia.png" alt="N3uralia Studio" className="h-8 w-8" />
          <div className="leading-tight">
            <span className="block text-sm font-semibold tracking-tight text-[#f5fbfa]">N3uralia</span>
            <span className="block text-[9px] uppercase tracking-[0.26em] text-[#789b96]">Studio</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                pathname === href
                  ? 'bg-[#142522] text-[#f5fbfa]'
                  : 'text-[#9db7b1] hover:bg-[#142522] hover:text-[#f5fbfa]'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="text-sm font-medium text-[#9db7b1] transition-colors hover:text-[#f5fbfa]"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-[#8fb2aa] px-5 py-2.5 text-sm font-semibold text-[#060a10] transition-colors hover:bg-[#d9e3e0]"
          >
            Start free
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex items-center justify-center border border-[#1e3431] bg-[#0b1117] p-2 text-[#9db7b1] transition-colors hover:text-[#f5fbfa] md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-[#1e3431] bg-[#060a10] px-5 py-5 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'px-3 py-2.5 text-sm font-medium transition-colors',
                  pathname === href
                    ? 'bg-[#142522] text-[#f5fbfa]'
                    : 'text-[#9db7b1] hover:bg-[#142522] hover:text-[#f5fbfa]'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2 border-t border-[#1e3431] pt-4">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 text-sm font-medium text-[#9db7b1] hover:text-[#f5fbfa]"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className="bg-[#8fb2aa] px-4 py-2.5 text-sm font-semibold text-[#060a10] text-center"
            >
              Start free
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
