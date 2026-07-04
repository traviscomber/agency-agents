import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function AdminSettingsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-light tracking-[-0.02em] text-[#173634]">Platform Settings</h1>
        <p className="mt-2 text-base text-[#555a56]">Configure AI providers, billing, and platform behavior.</p>
      </div>

      <div className="space-y-8">
        {/* AI Provider Section */}
        <section className="space-y-4 rounded-none border border-[#d8e5e2] bg-white px-6 py-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#173634]">AI Provider</h2>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#555a56]">OpenAI API Key</Label>
              <Input type="password" placeholder="sk-..." className="h-10 rounded-none border-[#d8e5e2] bg-white text-sm font-mono" />
              <p className="text-xs text-[#555a56]">Leave empty to use mock provider for testing.</p>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#555a56]">Default Model</Label>
              <Input defaultValue="gpt-4o-mini" className="h-10 rounded-none border-[#d8e5e2] bg-white text-sm font-mono" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#555a56]">Max Tokens</Label>
              <Input defaultValue="2000" type="number" className="h-10 w-40 rounded-none border-[#d8e5e2] bg-white text-sm" />
            </div>
            <Button className="rounded-lg bg-[#8fb2aa] text-white hover:bg-[#7a9a91] text-sm font-semibold">
              Save AI Settings
            </Button>
          </div>
        </section>

        <Separator />

        {/* Platform Section */}
        <section className="space-y-4 rounded-none border border-[#d8e5e2] bg-white px-6 py-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#173634]">Platform</h2>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#555a56]">Platform Name</Label>
              <Input defaultValue="AgencyOS" className="h-10 rounded-none border-[#d8e5e2] bg-white text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#555a56]">Support Email</Label>
              <Input defaultValue="hello@agencyos.app" type="email" className="h-10 rounded-none border-[#d8e5e2] bg-white text-sm" />
            </div>
            <div className="flex items-center justify-between gap-4 rounded-none border border-[#d8e5e2] bg-[#f1f6f4] px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-[#173634]">Maintenance Mode</p>
                <p className="text-xs text-[#555a56]">Block all non-admin users from accessing the app.</p>
              </div>
              <button className="relative h-6 w-11 shrink-0 rounded-full border border-[#d8e5e2] bg-white">
                <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-[#8fb2aa]/60" />
              </button>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-none border border-[#d8e5e2] bg-[#f1f6f4] px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-[#173634]">Allow Signups</p>
                <p className="text-xs text-[#555a56]">Enable new user registrations. Disable for invite-only mode.</p>
              </div>
              <button className="relative h-6 w-11 shrink-0 rounded-full bg-[#8fb2aa]">
                <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white" />
              </button>
            </div>
            <Button className="rounded-lg bg-[#8fb2aa] text-white hover:bg-[#7a9a91] text-sm font-semibold">
              Save Platform Settings
            </Button>
          </div>
        </section>

        <Separator />

        {/* Stripe Section */}
        <section className="space-y-4 rounded-none border border-[#d8e5e2] bg-white px-6 py-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#173634]">Stripe</h2>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#555a56]">Secret Key</Label>
              <Input type="password" placeholder="sk_live_..." className="h-10 rounded-none border-[#d8e5e2] bg-white text-sm font-mono" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#555a56]">Webhook Secret</Label>
              <Input type="password" placeholder="whsec_..." className="h-10 rounded-none border-[#d8e5e2] bg-white text-sm font-mono" />
            </div>
            <p className="text-xs text-[#555a56]">
              Set via environment variables: <code className="font-mono">STRIPE_SECRET_KEY</code>, <code className="font-mono">STRIPE_WEBHOOK_SECRET</code>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
