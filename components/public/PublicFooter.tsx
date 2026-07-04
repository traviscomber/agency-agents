import Link from 'next/link'

const LINKS = {
  Product: [
    { href: '/agents', label: 'Specialists' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/app', label: 'Workspace' },
  ],
  Account: [
    { href: '/signup', label: 'Create account' },
    { href: '/login', label: 'Log in' },
    { href: '/forgot-password', label: 'Reset password' },
  ],
  Company: [
    { href: '/agents', label: 'Specialist system' },
    { href: '/pricing', label: 'Plans' },
  ],
}

export function PublicFooter() {
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
              An operating system for specialist work: workflow state, project memory, reusable deliverables, and runs that stay attached to the workstream.
            </p>
            <p className="mt-6 text-xs text-[#65706d]">
              &copy; {new Date().getFullYear()} N3uralia Studio. All rights reserved.
            </p>
          </div>

          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#789b96]">
                {group}
              </p>
              <ul className="space-y-3">
                {items.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-[#65706d] transition-colors hover:text-[#173634]">
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
