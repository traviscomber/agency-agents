import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckCircle2 } from 'lucide-react'

const BENEFITS = [
  '5 free agent runs per month',
  'Access to core specialist agents',
  'Save outputs to projects',
  'No credit card required',
]

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-96 bg-white border-r border-border p-10">
        <Link href="/" className="text-sm font-semibold text-foreground">AgencyOS</Link>
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-5">
            Free plan includes
          </p>
          <ul className="space-y-3">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-sm text-foreground">
                <CheckCircle2 size={15} className="text-primary shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <Link href="/" className="text-sm font-semibold text-foreground lg:hidden mb-6 inline-block">
              AgencyOS
            </Link>
            <h1 className="text-2xl font-semibold text-foreground mb-2">Create your account</h1>
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="text-foreground font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          <form className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm">Full name</Label>
              <Input id="name" type="text" placeholder="Your name" className="h-9" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" className="h-9" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm">Password</Label>
              <Input id="password" type="password" placeholder="At least 8 characters" className="h-9" />
            </div>
            <Button className="w-full" type="submit">
              Create account
            </Button>
          </form>

          <p className="mt-6 text-xs text-muted-foreground text-center">
            By creating an account you agree to our{' '}
            <Link href="/terms" className="hover:underline">Terms</Link>
            {' '}and{' '}
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>.
          </p>

          {/* Demo shortcut */}
          <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground mb-2">
              <strong className="text-foreground">Demo mode:</strong> The app runs with mock data. Connect Supabase to enable real auth.
            </p>
            <Button variant="outline" size="sm" className="w-full text-xs h-7" asChild>
              <Link href="/app">Enter demo dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
