'use client'

import Link from 'next/link'
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

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/92 backdrop-blur-xl supports-[backdrop-filter]:bg-white/84">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="group flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#0f172a,#334155)] text-white shadow-[0_12px_30px_-14px_rgba(15,23,42,0.85)] transition-transform duration-200 group-hover:-translate-y-0.5">
              <Sparkles size={15} />
            </span>
            <div className="leading-tight">
              <span className="block text-sm font-semibold tracking-tight text-foreground">AgencyOS</span>
              <span className="block text-[10px] uppercase tracking-[0.24em] text-slate-500">
                AI specialist workspace
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {NAV_ITEMS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-xs font-medium uppercase tracking-[0.22em] text-slate-600 transition-colors hover:text-slate-950"
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
              'inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition-colors hover:text-slate-950 md:hidden'
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
                  className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
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
