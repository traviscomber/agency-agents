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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.10),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(201,213,225,0.35),_transparent_30%),linear-gradient(to_bottom,_#f8fafc,_#ffffff_20%,_#f8fafc_100%)]">
      <div className="grid min-h-screen lg:grid-cols-[0.98fr_1.02fr]">
        <aside className="hidden border-r border-border/70 bg-white p-10 lg:flex lg:flex-col lg:justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground">
            <Sparkles size={15} className="text-primary" />
            AgencyOS
          </Link>
          <div className="max-w-md">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              <Shield size={12} className="text-primary" />
              Free plan includes
            </div>
            <ul className="mt-5 space-y-3">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2.5 text-sm text-foreground">
                  <CheckCircle2 size={15} className="shrink-0 text-primary" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="flex items-center justify-center px-4 py-10 sm:px-6">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground lg:hidden">
                <Sparkles size={15} className="text-primary" />
                AgencyOS
              </Link>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground shadow-sm">
                <Shield size={12} className="text-primary" />
                Create your workspace
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground text-balance">
                Create your account
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-foreground hover:underline">
                  Sign in
                </Link>
              </p>
            </div>

            <form className="space-y-4 rounded-[1.5rem] border border-border bg-white p-6 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm">Full name</Label>
                <Input id="name" type="text" placeholder="Your name" className="h-10 rounded-2xl" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" className="h-10 rounded-2xl" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm">Password</Label>
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
                <div key={item} className="rounded-[1.15rem] border border-border bg-white px-4 py-3 text-sm text-muted-foreground shadow-sm">
                  {item}
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              By creating an account you agree to our{' '}
              <Link href="/terms" className="hover:text-foreground hover:underline">Terms</Link>
              {' '}and{' '}
              <Link href="/privacy" className="hover:text-foreground hover:underline">Privacy Policy</Link>.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
