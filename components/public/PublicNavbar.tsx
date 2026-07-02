'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, Sparkles, X, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/agents', label: 'Agents' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
  { href: '/app', label: 'Dashboard' },
]

export function PublicNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.92))] backdrop-blur-xl supports-[backdrop-filter]:bg-white/84">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="group flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0f172a,#1e293b_55%,#334155)] text-white shadow-[0_12px_30px_-14px_rgba(15,23,42,0.85)] transition-transform duration-200 group-hover:-translate-y-0.5">
              <Sparkles size={15} />
            </span>
            <div className="leading-tight">
              <span className="block text-sm font-semibold tracking-tight text-foreground">AgencyOS</span>
              <span className="block text-[10px] uppercase tracking-[0.24em] text-slate-600">
                AI specialist workspace
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {NAV_ITEMS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[0.22em] transition-colors',
                  pathname === href
                    ? 'bg-slate-950 text-white shadow-[0_10px_26px_-18px_rgba(15,23,42,0.85)]'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button size="sm" asChild className="shadow-sm shadow-primary/10">
              <Link href="/signup">
                Start free <ArrowRight size={12} className="ml-1" />
              </Link>
            </Button>
          </div>

          <button
            className={cn(
              'inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition-colors hover:border-slate-300 hover:text-slate-950 md:hidden'
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-slate-200 py-4 md:hidden">
            <nav className="flex flex-col gap-3">
              {NAV_ITEMS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'rounded-2xl px-3 py-2 text-sm font-medium transition-colors',
                    pathname === href
                      ? 'bg-slate-950 text-white shadow-[0_10px_26px_-18px_rgba(15,23,42,0.85)]'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                  )}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" asChild className="flex-1">
                <Link href="/login">Log in</Link>
              </Button>
              <Button size="sm" asChild className="flex-1">
                <Link href="/signup">
                  Start free <ArrowRight size={12} className="ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
