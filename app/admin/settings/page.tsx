import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Sparkles } from 'lucide-react'

export default function AdminSettingsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#ffffff_56%,#f8fafc_100%)] p-6 shadow-[0_18px_60px_-44px_rgba(15,23,42,0.45)] sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-600">
          <Sparkles size={12} className="text-primary" />
          Platform settings
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Configure the platform with clear defaults.</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
          Keep the operational switches visible, make provider credentials readable, and avoid burying critical settings in low-contrast containers.
        </p>
      </section>

      <div className="mt-6 space-y-8">
        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
          <h2 className="mb-4 text-sm font-semibold text-foreground">AI provider</h2>
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">OpenAI API key</Label>
              <Input type="password" placeholder="sk-..." className="h-10 text-sm font-mono" />
              <p className="text-xs text-slate-600">
                Used for all live agent runs. Leave empty to use mock provider.
              </p>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Default model</Label>
              <Input defaultValue="gpt-4o-mini" className="h-10 text-sm font-mono" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Max tokens per run</Label>
              <Input defaultValue="2000" type="number" className="h-10 w-32 text-sm" />
            </div>
            <Button size="sm">Save AI settings</Button>
          </div>
        </section>

        <Separator />

        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Platform</h2>
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Platform name</Label>
              <Input defaultValue="AgencyOS" className="h-10 text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Support email</Label>
              <Input defaultValue="hello@agencyos.app" type="email" className="h-10 text-sm" />
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
              <div>
                <p className="text-sm font-medium text-foreground">Maintenance mode</p>
                <p className="text-xs text-slate-600">Block all non-admin users from accessing the app.</p>
              </div>
              <button className="relative h-5 w-9 shrink-0 rounded-full border border-slate-200 bg-slate-100">
                <span className="absolute left-1 top-1 h-3 w-3 rounded-full bg-slate-500/60" />
              </button>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
              <div>
                <p className="text-sm font-medium text-foreground">New user signups</p>
                <p className="text-xs text-slate-600">Allow new users to register. Disable for invite-only mode.</p>
              </div>
              <button className="relative h-5 w-9 shrink-0 rounded-full bg-primary">
                <span className="absolute right-1 top-1 h-3 w-3 rounded-full bg-white" />
              </button>
            </div>
            <Button size="sm">Save platform settings</Button>
          </div>
        </section>

        <Separator />

        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Stripe</h2>
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Stripe secret key</Label>
              <Input type="password" placeholder="sk_live_..." className="h-10 text-sm font-mono" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Webhook secret</Label>
              <Input type="password" placeholder="whsec_..." className="h-10 text-sm font-mono" />
            </div>
            <p className="text-xs text-slate-600">
              Set these via environment variables: <code className="font-mono">STRIPE_SECRET_KEY</code>,{' '}
              <code className="font-mono">STRIPE_WEBHOOK_SECRET</code>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
