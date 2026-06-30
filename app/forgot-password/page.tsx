import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <Link href="/" className="text-sm font-semibold text-foreground mb-8 inline-block">
          AgencyOS
        </Link>
        <h1 className="text-2xl font-semibold text-foreground mb-2">Reset your password</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Enter your email and we will send you a link to reset your password.
        </p>
        <form className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-sm">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" className="h-9" />
          </div>
          <Button className="w-full" type="submit">Send reset link</Button>
        </form>
        <p className="mt-6 text-sm text-center">
          <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
