import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sparkles } from 'lucide-react'

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-sm items-center px-4 py-10 sm:px-6">
        <div className="w-full">
          <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground">
            <Sparkles size={15} className="text-primary" />
            AgencyOS
          </Link>
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground text-balance">
              Reset your password
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Enter your email and we will send you a link to reset your password.
            </p>
          </div>
          <form className="space-y-4 rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" className="h-10" />
            </div>
            <Button className="w-full" type="submit">Send reset link</Button>
          </form>
          <p className="mt-6 text-center text-sm">
            <Link href="/login" className="text-muted-foreground transition-colors hover:text-foreground">
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
