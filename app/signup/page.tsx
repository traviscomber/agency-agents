'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { H1Hero, H2Section, H3, Eyebrow, Body } from '@/components/shared/Typography'
import { Button } from '@/components/shared/ButtonStyled'
import { Card } from '@/components/shared/CardStyled'
import { Badge } from '@/components/shared/BadgeStyled'
import { createClient } from '@/lib/supabase/client'

const BENEFITS = [
  '5 free twin runs per month',
  'Project memory and workflow continuity',
  'Save deliverables into reusable operating programs',
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
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
            `${window.location.origin}/auth/callback`,
        },
      })

      if (authError) {
        setError(authError.message)
        setLoading(false)
        return
      }

      router.push('/signup-success')
    } catch (err: any) {
      setError(err.message || 'An error occurred')
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
              N3
            </span>
            <div className="leading-tight">
              <span className="block text-sm font-semibold text-[#f5fbfa]">N3uralia Studio</span>
              <span className="block text-[9px] uppercase tracking-[0.26em] text-[#789b96]">Operating workspace</span>
            </div>
          </Link>

          <div className="max-w-xs">
            <Eyebrow className="text-[#789b96]">Start the operating system</Eyebrow>
            <H2Section className="mt-4 text-[#f5fbfa]">
              Create your account and begin with continuity.
            </H2Section>
            <Body variant="dark" className="mt-4 !text-[#9db7b1]">
              Set up a workspace for twin execution, inherited context, workflow state, and outputs your team can reuse.
            </Body>
            <ul className="mt-8 space-y-3">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2.5">
                  <CheckCircle2 size={13} className="shrink-0 text-[#8fb2aa]" />
                  <span className="text-sm text-[#d9e3e0]">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-[#52605d]">&copy; {new Date().getFullYear()} N3uralia Studio</p>
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
                N3
              </span>
              <span className="text-sm font-semibold text-[#173634]">N3uralia Studio</span>
            </Link>

            <div className="mb-8">
              <Badge variant="light" size="md" className="mb-4 inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-[#8fb2aa] rounded-full" />
                Free to start
              </Badge>
              <H2Section className="text-[#173634]">Create your account</H2Section>
              <p className="mt-2 text-sm text-[#65706d]">
                Already have one?{' '}
                <Link href="/login" className="font-semibold text-[#173634] hover:text-[#8fb2aa]">Sign in</Link>
              </p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
            <Card variant="light" className="p-6">
              {error && (
                <div className="mb-4 rounded border border-red-300 bg-red-50 px-3 py-2 text-xs text-red-700">
                  {error}
                </div>
              )}
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
                  disabled={loading}
                  className="h-10 w-full border border-[#d8e5e2] bg-[#fbfbfa] px-3 text-sm text-[#173634] outline-none placeholder:text-[#a7b9b4] focus:border-[#8fb2aa] disabled:opacity-50"
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
                  disabled={loading}
                  className="h-10 w-full border border-[#d8e5e2] bg-[#fbfbfa] px-3 text-sm text-[#173634] outline-none placeholder:text-[#a7b9b4] focus:border-[#8fb2aa] disabled:opacity-50"
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
                  disabled={loading}
                  className="h-10 w-full border border-[#d8e5e2] bg-[#fbfbfa] px-3 text-sm text-[#173634] outline-none placeholder:text-[#a7b9b4] focus:border-[#8fb2aa] disabled:opacity-50"
                  required
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2"
              >
                {loading ? 'Creating account...' : <>Create account <ArrowRight size={13} /></>}
              </Button>
            </Card>
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
