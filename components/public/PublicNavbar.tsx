'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getLocaleFromPathname, getLocalizedHref, publicNavbarCopy } from '@/lib/marketing-i18n'

export function PublicNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname) ?? 'en'
  const copy = publicNavbarCopy[locale]
  const homeHref = getLocalizedHref(locale, '/')

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#1e3431] bg-[#060a10]/92 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.75rem] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">

        <Link href={homeHref} className="flex items-center gap-3 shrink-0">
          <img src="/logo-n3uralia.png" alt="N3uralia Studio" className="h-8 w-8" />
          <div className="leading-tight">
            <span className="block text-sm font-semibold tracking-tight text-[#f5fbfa]">N3uralia</span>
            <span className="block text-[9px] uppercase tracking-[0.26em] text-[#789b96]">{copy.brandSubline}</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {copy.navItems.map(({ href, label }) => {
            const localizedHref = getLocalizedHref(locale, href)
            return (
            <Link
              key={href}
              href={localizedHref}
              className={cn(
                'rounded-full px-3 py-2 text-sm font-medium transition-colors',
                pathname === localizedHref
                  ? 'bg-[#142522] text-[#f5fbfa]'
                  : 'text-[#9db7b1] hover:bg-[#142522] hover:text-[#f5fbfa]'
              )}
            >
              {label}
            </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center border border-[#1e3431] bg-[#0b1117] p-1">
            {(['es', 'en'] as const).map((code) => (
              <Link
                key={code}
                href={code === 'es' ? '/es' : '/en'}
                className={cn(
                  'px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] border border-[#1e3431]',
                  locale === code ? 'bg-[#142522] text-[#f5fbfa]' : 'text-[#9db7b1] hover:text-[#f5fbfa]',
                )}
              >
                {code}
              </Link>
            ))}
          </div>
          <Link
            href={getLocalizedHref(locale, '/login')}
            className="text-sm font-medium text-[#9db7b1] transition-colors hover:text-[#f5fbfa]"
          >
            {copy.login}
          </Link>
          <Link
            href={getLocalizedHref(locale, '/signup')}
            className="bg-[#8fb2aa] px-5 py-2.5 text-sm font-semibold text-[#060a10] transition-colors hover:bg-[#d9e3e0] border border-[#8fb2aa]"
          >
            {copy.cta}
          </Link>
        </div>

        <button
          className="flex items-center justify-center border border-[#1e3431] bg-[#0b1117] p-2 text-[#9db7b1] transition-colors hover:text-[#f5fbfa] md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#1e3431] bg-[#060a10] px-5 py-5 md:hidden">
          <nav className="flex flex-col gap-1">
            {copy.navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={getLocalizedHref(locale, href)}
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
          <div className="mt-4 flex items-center gap-2">
            {(['es', 'en'] as const).map((code) => (
              <Link
                key={code}
                href={`/${code}`}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'rounded-full border border-[#1e3431] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em]',
                  locale === code ? 'bg-[#142522] text-[#f5fbfa]' : 'text-[#9db7b1]',
                )}
              >
                {code}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2 border-t border-[#1e3431] pt-4">
            <Link
              href={getLocalizedHref(locale, '/login')}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 text-sm font-medium text-[#9db7b1] hover:text-[#f5fbfa]"
            >
              {copy.login}
            </Link>
            <Link
              href={getLocalizedHref(locale, '/signup')}
              onClick={() => setMobileOpen(false)}
              className="bg-[#8fb2aa] px-4 py-2.5 text-sm font-semibold text-[#060a10] text-center"
            >
              {copy.cta}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
