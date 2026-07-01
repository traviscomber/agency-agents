'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, Sparkles, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PublicNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-white/82 backdrop-blur-xl supports-[backdrop-filter]:bg-white/72">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/10">
              <Sparkles size={15} />
            </span>
            <div className="leading-tight">
              <span className="block text-sm font-semibold tracking-tight text-foreground">
                AgencyOS
              </span>
              <span className="block text-[11px] text-muted-foreground">
                Specialist workspace
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            <Link href="/agents" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Agents
            </Link>
            <Link href="/pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Pricing
            </Link>
            <Link href="/app" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Dashboard
            </Link>
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button size="sm" asChild className="shadow-sm shadow-primary/10">
              <Link href="/signup">Start free</Link>
            </Button>
          </div>

          <button
            className={cn(
              'inline-flex items-center justify-center rounded-lg border border-border bg-white p-2 text-muted-foreground transition-colors hover:text-foreground md:hidden'
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-border/70 py-4 md:hidden">
            <nav className="flex flex-col gap-3">
              <Link href="/agents" className="text-sm text-muted-foreground hover:text-foreground">
                Agents
              </Link>
              <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link href="/app" className="text-sm text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
            </nav>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" asChild className="flex-1">
                <Link href="/login">Log in</Link>
              </Button>
              <Button size="sm" asChild className="flex-1">
                <Link href="/signup">Start free</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
