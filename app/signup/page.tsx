'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const BENEFITS = [
  '5 free agent runs per month',
  'Access to core specialist agents',
  'Save outputs to projects',
  'No credit card required',
]

export default function SignupPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullName }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Signup failed')
        return
      }

      router.push('/onboarding')
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#060a10' }}>
      <div className="mx-auto grid min-h-screen max-w-6xl gap-px px-0 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">

        {/* ── Left — dark brand panel ── */}
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
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#789b96]">Start a workspace</p>
            <h1 className="mt-4 text-4xl font-light leading-tight text-[#f5fbfa]">
              Create your AgencyOS account and begin with structure.
            </h1>
            <p className="mt-4 text-sm leading-7 text-[#9db7b1]">
              Set up a workspace for specialist agents, shared context, and outputs your team can reuse.
            </p>
            <ul className="mt-8 space-y-3">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2.5">
                  <CheckCircle2 size={13} className="shrink-0 text-[#8fb2aa]" />
                  <span className="text-sm text-[#d9e3e0]">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-[#52605d]">&copy; {new Date().getFullYear()} AgencyOS</p>
        </aside>

        {/* ── Right — light form ── */}
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
                <span className="h-1.5 w-1.5 bg-[#8fb2aa]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#789b96]">Free to start</span>
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-[#173634]">Create your account</h2>
              <p className="mt-1.5 text-sm text-[#65706d]">
                Already have one?{' '}
                <Link href="/login" className="font-semibold text-[#173634] hover:underline">Sign in</Link>
              </p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4 border border-[#d8e5e2] bg-[#f1f6f4] p-6">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#52605d]">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-10 w-full border border-[#d8e5e2] bg-[#fbfbfa] px-3 text-sm text-[#173634] outline-none placeholder:text-[#a7b9b4] focus:border-[#8fb2aa]"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#52605d]">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 w-full border border-[#d8e5e2] bg-[#fbfbfa] px-3 text-sm text-[#173634] outline-none placeholder:text-[#a7b9b4] focus:border-[#8fb2aa]"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="password" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#52605d]">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10 w-full border border-[#d8e5e2] bg-[#fbfbfa] px-3 text-sm text-[#173634] outline-none placeholder:text-[#a7b9b4] focus:border-[#8fb2aa]"
                  required
                />
              </div>
              {error && <div className="rounded text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-2">{error}</div>}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-10 w-full items-center justify-center gap-2 bg-[#173634] text-sm font-semibold text-[#f5fbfa] transition-colors hover:bg-[#0d1f1d] disabled:opacity-50"
              >
                {loading ? 'Creating account...' : <>Create account <ArrowRight size={13} /></>}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-[#a7b9b4]">
              By creating an account you agree to our{' '}
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
