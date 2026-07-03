import Link from 'next/link'

const LINKS = {
  Product: [
    { href: '/agents',  label: 'Agents' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/app',     label: 'Dashboard' },
  ],
  Account: [
    { href: '/signup', label: 'Create account' },
    { href: '/login',  label: 'Log in' },
    { href: '/forgot-password', label: 'Reset password' },
  ],
  Company: [
    { href: '/agents', label: 'Specialist library' },
    { href: '/pricing', label: 'Plans' },
  ],
}

export function PublicFooter() {
  return (
    <footer className="border-t border-[#d8e5e2] bg-[#f1f6f4]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand col */}
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center border border-[#d8e5e2] bg-[#fbfbfa] text-[11px] font-semibold tracking-tight text-[#173634]">
                AO
              </span>
              <span className="text-sm font-semibold text-[#173634]">AgencyOS</span>
            </div>
            <p className="mt-4 max-w-[18rem] text-sm leading-7 text-[#65706d]">
              A structured AI workspace for specialist work — agents, projects, run history, and plan control in one place.
            </p>
            <p className="mt-6 text-xs text-[#65706d]">
              &copy; {new Date().getFullYear()} AgencyOS. All rights reserved.
            </p>
          </div>

          {/* Link cols */}
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#789b96]">
                {group}
              </p>
              <ul className="space-y-3">
                {items.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-[#65706d] transition-colors hover:text-[#173634]"
                    >
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
