import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Shield, Lock, Trash2, Copy } from 'lucide-react'

export default function AdminSettingsPage() {
  const auditLogs = [
    { id: '1', action: 'User login', user: 'sarah@acme.com', timestamp: '2024-01-15 14:23', ip: '192.168.1.100' },
    { id: '2', action: 'Agent deployed', user: 'john@acme.com', timestamp: '2024-01-15 13:45', ip: '192.168.1.102' },
    { id: '3', action: 'Settings changed', user: 'admin@agencyos.app', timestamp: '2024-01-15 12:10', ip: '203.0.113.5' },
  ]
  
  const ipWhitelist = ['192.168.1.0/24', '203.0.113.0/24']
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

        <Separator />

        {/* Security Section */}
        <section className="space-y-4 rounded-none border border-[#d8e5e2] bg-white px-6 py-5">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-[#8fb2aa]" />
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#173634]">Security</h2>
          </div>

          {/* IP Whitelist */}
          <div className="space-y-3 border-t border-[#d8e5e2] pt-4">
            <div>
              <Label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#555a56]">IP Whitelist (CIDR)</Label>
              <p className="text-[10px] text-[#555a56] mt-1">Restrict access to specific IP addresses. Leave empty to allow all.</p>
            </div>
            <div className="space-y-2">
              {ipWhitelist.map((ip, idx) => (
                <div key={idx} className="flex items-center gap-2 justify-between border border-[#d8e5e2] bg-[#f1f6f4] px-3 py-2 rounded-none">
                  <span className="text-sm font-mono text-[#173634]">{ip}</span>
                  <Button variant="ghost" size="sm" className="h-6 rounded-none px-2 text-[#d8e5e2] hover:bg-red-50 hover:text-red-600">
                    <Trash2 size={12} />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input placeholder="192.168.1.0/24" className="h-9 rounded-none border-[#d8e5e2] bg-white text-sm" />
              <Button className="h-9 rounded-none bg-[#173634] px-4 text-xs font-semibold uppercase tracking-[0.12em] text-white hover:bg-[#1e3431]">
                Add IP
              </Button>
            </div>
          </div>

          {/* SSO */}
          <div className="space-y-3 border-t border-[#d8e5e2] pt-4">
            <div>
              <Label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#555a56]">Single Sign-On (SSO)</Label>
              <p className="text-[10px] text-[#555a56] mt-1">SAML 2.0 and OpenID Connect support for enterprise customers.</p>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-none border border-[#d8e5e2] bg-[#f1f6f4] px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-[#173634]">Enable SAML SSO</p>
                <p className="text-xs text-[#555a56]">Configure SAML metadata and login endpoint.</p>
              </div>
              <button className="relative h-6 w-11 shrink-0 rounded-full border border-[#d8e5e2] bg-white">
                <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-[#8fb2aa]/60" />
              </button>
            </div>
          </div>

          {/* Audit Logs */}
          <div className="space-y-3 border-t border-[#d8e5e2] pt-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#555a56]">Audit Log</Label>
                <p className="text-[10px] text-[#555a56] mt-1">All system and user actions are logged for compliance.</p>
              </div>
              <Button variant="outline" className="h-8 rounded-none border-[#d8e5e2] px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#173634] hover:bg-[#f1f6f4]">
                Export CSV
              </Button>
            </div>
            <div className="border border-[#d8e5e2] bg-white rounded-none overflow-hidden">
              <table className="w-full text-sm">
                <thead className="border-b border-[#d8e5e2] bg-[#f1f6f4]">
                  <tr>
                    <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase text-[#555a56] tracking-[0.08em]">Action</th>
                    <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase text-[#555a56] tracking-[0.08em]">User</th>
                    <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase text-[#555a56] tracking-[0.08em]">Timestamp</th>
                    <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase text-[#555a56] tracking-[0.08em]">IP Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d8e5e2]">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-[#f1f6f4]">
                      <td className="px-3 py-2 text-[10px] text-[#173634]">{log.action}</td>
                      <td className="px-3 py-2 text-[10px] text-[#173634]/60">{log.user}</td>
                      <td className="px-3 py-2 text-[10px] text-[#173634]/60 font-mono">{log.timestamp}</td>
                      <td className="px-3 py-2 text-[10px] text-[#173634]/60 font-mono">{log.ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
