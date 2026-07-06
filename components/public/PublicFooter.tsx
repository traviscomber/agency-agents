'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getLocaleFromPathname, getLocalizedHref, publicFooterCopy } from '@/lib/marketing-i18n'

export function PublicFooter() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname) ?? 'en'
  const copy = publicFooterCopy[locale]

  return (
    <footer className="border-t border-[#d8e5e2] bg-[#f1f6f4]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center border border-[#d8e5e2] bg-[#fbfbfa] text-[11px] font-semibold tracking-tight text-[#173634]">
                N3
              </span>
              <span className="text-sm font-semibold text-[#173634]">N3uralia Studio</span>
            </div>
            <p className="mt-4 max-w-[19rem] text-sm leading-7 text-[#65706d]">
              {copy.description}
            </p>
            <p className="mt-6 text-xs text-[#65706d]">
              &copy; {new Date().getFullYear()} N3uralia Studio. {copy.rights}
            </p>
          </div>

          {Object.entries(copy.groups).map(([group, items]) => (
            <div key={group}>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#789b96]">
                {group}
              </p>
              <ul className="space-y-3">
                {items.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={getLocalizedHref(locale, href)} className="text-sm text-[#65706d] transition-colors hover:text-[#173634]">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
