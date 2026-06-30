import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function AdminSettingsPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground mb-1">Platform settings</h1>
        <p className="text-sm text-muted-foreground">Configure global platform options.</p>
      </div>

      <div className="space-y-8">
        {/* AI Provider */}
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-4">AI provider</h2>
          <div className="rounded-lg border border-border bg-white p-5 space-y-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">OpenAI API key</Label>
              <Input
                type="password"
                placeholder="sk-..."
                className="text-sm h-9 font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Used for all live agent runs. Leave empty to use mock provider.
              </p>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Default model</Label>
              <Input
                defaultValue="gpt-4o-mini"
                className="text-sm h-9 font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Max tokens per run</Label>
              <Input
                defaultValue="2000"
                type="number"
                className="text-sm h-9 w-32"
              />
            </div>
            <Button size="sm">Save AI settings</Button>
          </div>
        </div>

        <Separator />

        {/* Platform */}
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-4">Platform</h2>
          <div className="rounded-lg border border-border bg-white p-5 space-y-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Platform name</Label>
              <Input defaultValue="AgencyOS" className="text-sm h-9" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Support email</Label>
              <Input defaultValue="hello@agencyos.app" type="email" className="text-sm h-9" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Maintenance mode</p>
                <p className="text-xs text-muted-foreground">Block all non-admin users from accessing the app.</p>
              </div>
              <button className="relative w-9 h-5 rounded-full bg-muted border border-border shrink-0">
                <span className="absolute left-1 top-1 w-3 h-3 rounded-full bg-muted-foreground/40" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">New user signups</p>
                <p className="text-xs text-muted-foreground">Allow new users to register. Disable for invite-only mode.</p>
              </div>
              <button className="relative w-9 h-5 rounded-full bg-primary shrink-0">
                <span className="absolute right-1 top-1 w-3 h-3 rounded-full bg-white" />
              </button>
            </div>
            <Button size="sm">Save platform settings</Button>
          </div>
        </div>

        <Separator />

        {/* Stripe */}
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-4">Stripe</h2>
          <div className="rounded-lg border border-border bg-white p-5 space-y-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Stripe secret key</Label>
              <Input
                type="password"
                placeholder="sk_live_..."
                className="text-sm h-9 font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Webhook secret</Label>
              <Input
                type="password"
                placeholder="whsec_..."
                className="text-sm h-9 font-mono"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Set these via environment variables: <code className="font-mono">STRIPE_SECRET_KEY</code>,{' '}
              <code className="font-mono">STRIPE_WEBHOOK_SECRET</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
