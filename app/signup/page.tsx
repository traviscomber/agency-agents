import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckCircle2, Sparkles } from 'lucide-react'

const BENEFITS = [
  '5 free agent runs per month',
  'Access to core specialist agents',
  'Save outputs to projects',
  'No credit card required',
]

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="hidden border-r border-border/70 bg-white p-10 lg:flex lg:flex-col lg:justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground">
            <Sparkles size={15} className="text-primary" />
            AgencyOS
          </Link>
          <div className="max-w-md">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Free plan includes
            </p>
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
          <div className="w-full max-w-sm">
            <div className="mb-8">
              <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground lg:hidden">
                <Sparkles size={15} className="text-primary" />
                AgencyOS
              </Link>
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

            <form className="space-y-4 rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm">Full name</Label>
                <Input id="name" type="text" placeholder="Your name" className="h-10" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" className="h-10" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm">Password</Label>
                <Input id="password" type="password" placeholder="At least 8 characters" className="h-10" />
              </div>
              <Button className="w-full" type="submit">
                Create account
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              By creating an account you agree to our{' '}
              <Link href="/terms" className="hover:text-foreground hover:underline">Terms</Link>
              {' '}and{' '}
              <Link href="/privacy" className="hover:text-foreground hover:underline">Privacy Policy</Link>.
            </p>

            <div className="mt-6 rounded-2xl border border-border bg-slate-50 p-4 shadow-sm">
              <p className="text-xs leading-relaxed text-muted-foreground">
                <strong className="text-foreground">Demo mode:</strong> The app runs with mock data. Connect Supabase to enable real auth.
              </p>
              <Button variant="outline" size="sm" className="mt-3 w-full text-xs" asChild>
                <Link href="/app">Enter demo dashboard</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
