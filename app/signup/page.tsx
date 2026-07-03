import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckCircle2, Sparkles, Shield, ArrowRight } from 'lucide-react'

const BENEFITS = [
  '5 free agent runs per month',
  'Access to core specialist agents',
  'Save outputs to projects',
  'No credit card required',
]

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_30%),linear-gradient(to_bottom,_#f8fafc,_#ffffff_22%,_#f8fafc_100%)]">
      <div className="mx-auto grid min-h-screen max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-10">
        <aside className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_60px_-44px_rgba(15,23,42,0.45)] sm:p-8 lg:min-h-[640px] lg:p-10">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground">
            <Sparkles size={15} className="text-primary" />
            AgencyOS
          </Link>
          <div className="mt-10 max-w-md">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-700">
              <Shield size={12} className="text-primary" />
              Free plan includes
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance text-foreground">
              Create your workspace with a clean entry point.
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-slate-700">
              The signup surface should feel fast, legible, and aligned with the rest of the product system.
            </p>
            <ul className="mt-6 space-y-3">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2.5 text-sm text-foreground">
                  <CheckCircle2 size={15} className="shrink-0 text-primary" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground lg:hidden">
                <Sparkles size={15} className="text-primary" />
                AgencyOS
              </Link>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-700 shadow-sm">
                <Shield size={12} className="text-primary" />
                Create your workspace
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground">
                Create your account
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-foreground hover:underline">
                  Sign in
                </Link>
              </p>
            </div>

            <form className="space-y-4 rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm font-medium">Full name</Label>
                <Input id="name" type="text" placeholder="Your name" className="h-10 rounded-2xl" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" className="h-10 rounded-2xl" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <Input id="password" type="password" placeholder="At least 8 characters" className="h-10 rounded-2xl" />
              </div>
              <Button className="w-full" type="submit">
                Create account <ArrowRight size={12} className="ml-1" />
              </Button>
            </form>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                'A crisp signup surface that matches the product system',
                'Quick path into the workspace without extra friction',
              ].map((item) => (
                <div key={item} className="rounded-[1.15rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-4 py-3 text-sm text-slate-700 shadow-sm">
                  {item}
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-xs text-slate-700">
              By creating an account you agree to our{' '}
              <Link href="/terms" className="hover:text-slate-950 hover:underline">Terms</Link>
              {' '}and{' '}
              <Link href="/privacy" className="hover:text-slate-950 hover:underline">Privacy Policy</Link>.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
