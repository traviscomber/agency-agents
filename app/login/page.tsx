import Link from 'next/link'
import { ArrowRight, Shield } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#060a10' }}>
      <div className="mx-auto grid min-h-screen max-w-6xl gap-px px-0 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">

        {/* ── Left panel — dark brand ── */}
        <aside
          className="hidden flex-col justify-between border-r border-[#1e3431] px-10 py-14 lg:flex"
          style={{ backgroundColor: '#060a10' }}
        >
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center border border-[#28413d] bg-[#0d1f1d] text-[11px] font-semibold tracking-tight text-[#8fb2aa]">
              AO
            </span>
            <div className="leading-tight">
              <span className="block text-sm font-semibold text-[#f5fbfa]">AgencyOS</span>
              <span className="block text-[9px] uppercase tracking-[0.26em] text-[#789b96]">AgencyOS</span>
            </div>
          </Link>

          <div className="max-w-xs">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#789b96]">Command access</p>
            <h1 className="mt-4 text-4xl font-light leading-tight text-[#f5fbfa]">
              Sign in to resume the next specialist run.
            </h1>
            <p className="mt-4 text-sm leading-7 text-[#9db7b1]">
              Agents, projects, and deliverables stay linked so your team can pick up work without re-explaining it.
            </p>

            <div className="mt-10 space-y-3">
              {[
                ['Specialist flows', 'Focused paths for agents and projects.'],
                ['Traceable by default', 'Every run is stored, visible, and structured.'],
              ].map(([title, desc]) => (
                <div key={title} className="border border-[#1e3431] bg-[#0d1f1d] p-4">
                  <p className="text-xs font-semibold text-[#d9e3e0]">{title}</p>
                  <p className="mt-1 text-xs leading-6 text-[#9db7b1]">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-[#52605d]">&copy; {new Date().getFullYear()} AgencyOS</p>
        </aside>

        {/* ── Right panel — light form ── */}
        <main
          className="flex min-h-screen items-center justify-center px-6 py-16 lg:px-12"
          style={{ backgroundColor: '#fbfbfa' }}
        >
          <div className="w-full max-w-sm">
            {/* Mobile logo */}
            <Link href="/" className="mb-8 flex items-center gap-3 lg:hidden">
              <span className="flex h-8 w-8 items-center justify-center border border-[#d8e5e2] bg-[#f1f6f4] text-[11px] font-semibold tracking-tight text-[#173634]">
                AO
              </span>
              <span className="text-sm font-semibold text-[#173634]">AgencyOS</span>
            </Link>

            <div className="mb-8">
              <div className="mb-4 inline-flex items-center gap-2 border border-[#d8e5e2] bg-[#f1f6f4] px-2.5 py-1">
                <Shield size={11} className="text-[#789b96]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#789b96]">Secure access</span>
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-[#173634]">Sign in</h2>
              <p className="mt-1.5 text-sm text-[#65706d]">
                No account?{' '}
                <Link href="/signup" className="font-semibold text-[#173634] hover:underline">Start free</Link>
              </p>
            </div>

            <form className="space-y-4 border border-[#d8e5e2] bg-[#f1f6f4] p-6">
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#52605d]">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-10 w-full border border-[#d8e5e2] bg-[#fbfbfa] px-3 text-sm text-[#173634] outline-none placeholder:text-[#a7b9b4] focus:border-[#8fb2aa]"
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#52605d]">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-xs text-[#789b96] hover:text-[#173634]">
                    Forgot?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="h-10 w-full border border-[#d8e5e2] bg-[#fbfbfa] px-3 text-sm text-[#173634] outline-none placeholder:text-[#a7b9b4] focus:border-[#8fb2aa]"
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-10 w-full items-center justify-center gap-2 bg-[#173634] text-sm font-semibold text-[#f5fbfa] transition-colors hover:bg-[#0d1f1d]"
              >
                Sign in <ArrowRight size={13} />
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-[#a7b9b4]">
              By signing in you agree to our{' '}
              <Link href="/terms" className="hover:text-[#173634] hover:underline">Terms</Link>
              {' '}and{' '}
              <Link href="/privacy" className="hover:text-[#173634] hover:underline">Privacy Policy</Link>.
            </p>
          </div>
        </main>

      </div>
    </div>
  )
}
