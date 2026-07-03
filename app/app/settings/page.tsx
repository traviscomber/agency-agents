'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MOCK_USER } from '@/lib/data/mock-store'
import { cn } from '@/lib/utils'

import { Users, Shield, Zap, Copy, Trash2 } from 'lucide-react'

type Tab = 'profile' | 'account' | 'notifications' | 'team' | 'white-label'

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>('profile')
  const [fullName, setFullName] = useState(MOCK_USER.fullName)
  const [email] = useState(MOCK_USER.email)
  const [company, setCompany] = useState(MOCK_USER.company || '')
  const [role, setRole] = useState(MOCK_USER.role || '')
  const [saved, setSaved] = useState(false)

  const teamMembers = [
    { id: '1', email: 'sarah@acme.com', role: 'Admin', status: 'active', joinedAt: '2024-01-15' },
    { id: '2', email: 'john@acme.com', role: 'Editor', status: 'active', joinedAt: '2024-02-20' },
    { id: '3', email: 'emma@acme.com', role: 'Viewer', status: 'pending', joinedAt: 'invited' },
  ]

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'profile', label: 'Profile' },
    { id: 'account', label: 'Account' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'team', label: 'Team' },
    { id: 'white-label', label: 'White-Label' },
  ]

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <header className="mb-10 border-b border-[#d8e5e2] pb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Preferences</p>
        <h1 className="mt-2 text-3xl font-light tracking-tight text-[#173634]">Settings.</h1>
        <p className="mt-2 text-sm leading-relaxed text-[#173634]/60">
          Profile, account security, and notification preferences.
        </p>
      </header>

      {/* Tab bar */}
      <div className="mb-8 flex border-b border-[#d8e5e2]">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={cn(
              '-mb-px border-b-2 px-5 pb-3 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors',
              tab === id
                ? 'border-[#173634] text-[#173634]'
                : 'border-transparent text-[#173634]/40 hover:text-[#173634]/70'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Profile tab */}
      {tab === 'profile' && (
        <div className="space-y-8">
          <section className="border border-[#d8e5e2]">
            <div className="border-b border-[#d8e5e2] px-5 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#173634]/45">Profile information</p>
            </div>
            <div className="p-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName" className="text-xs font-semibold uppercase tracking-[0.16em] text-[#173634]/55">Full name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-10 rounded-none border-[#d8e5e2] bg-[#fbfbfa] text-sm text-[#173634] focus-visible:ring-[#8fb2aa]"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.16em] text-[#173634]/55">Email</Label>
                  <Input
                    id="email"
                    value={email}
                    disabled
                    className="h-10 rounded-none border-[#d8e5e2] bg-[#f1f6f4] text-sm text-[#173634]/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="company" className="text-xs font-semibold uppercase tracking-[0.16em] text-[#173634]/55">Company</Label>
                  <Input
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Inc."
                    className="h-10 rounded-none border-[#d8e5e2] bg-[#fbfbfa] text-sm text-[#173634] focus-visible:ring-[#8fb2aa]"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="role" className="text-xs font-semibold uppercase tracking-[0.16em] text-[#173634]/55">Role</Label>
                  <Input
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Founder, Developer..."
                    className="h-10 rounded-none border-[#d8e5e2] bg-[#fbfbfa] text-sm text-[#173634] focus-visible:ring-[#8fb2aa]"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="border border-[#d8e5e2]">
            <div className="border-b border-[#d8e5e2] px-5 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#173634]/45">Avatar</p>
            </div>
            <div className="flex items-center gap-5 p-5">
              <div className="flex h-14 w-14 items-center justify-center border border-[#d8e5e2] bg-[#f1f6f4] text-lg font-semibold text-[#173634]">
                {fullName.charAt(0)}
              </div>
              <div>
                <Button variant="outline" className="h-9 rounded-none border-[#d8e5e2] px-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#173634]">
                  Upload image
                </Button>
                <p className="mt-1.5 text-[10px] text-[#173634]/40">JPG, PNG or GIF. Max 2MB.</p>
              </div>
            </div>
          </section>

          <div className="flex items-center justify-between">
            <p className={cn('text-xs transition-opacity', saved ? 'text-[#8fb2aa] opacity-100' : 'opacity-0')}>Changes saved.</p>
            <Button
              onClick={handleSave}
              className="h-9 rounded-none bg-[#173634] px-5 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#1e3431]"
            >
              Save changes
            </Button>
          </div>
        </div>
      )}

      {/* Account tab */}
      {tab === 'account' && (
        <div className="space-y-8">
          <section className="border border-[#d8e5e2]">
            <div className="border-b border-[#d8e5e2] px-5 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#173634]/45">Password</p>
            </div>
            <div className="max-w-sm space-y-4 p-5">
              {['Current password', 'New password', 'Confirm new password'].map((label) => (
                <div key={label} className="space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-[0.16em] text-[#173634]/55">{label}</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-10 rounded-none border-[#d8e5e2] bg-[#fbfbfa] text-sm focus-visible:ring-[#8fb2aa]"
                  />
                </div>
              ))}
              <Button className="h-9 rounded-none bg-[#173634] px-5 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#1e3431]">
                Update password
              </Button>
            </div>
          </section>

          <section className="border border-red-200">
            <div className="border-b border-red-200 bg-red-50 px-5 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-red-500">Danger zone</p>
            </div>
            <div className="p-5">
              <p className="text-sm text-[#173634]/60">Permanently delete your account and all data. This cannot be undone.</p>
              <Button
                variant="outline"
                className="mt-4 h-9 rounded-none border-red-200 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-red-500 hover:bg-red-50"
              >
                Delete account
              </Button>
            </div>
          </section>
        </div>
      )}

      {/* Notifications tab */}
      {tab === 'notifications' && (
        <section className="border border-[#d8e5e2]">
          <div className="border-b border-[#d8e5e2] px-5 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#173634]/45">Email notifications</p>
          </div>
          <div className="divide-y divide-[#d8e5e2]">
            {['Run completed', 'Run failed', 'Billing reminders', 'Product updates'].map((item) => (
              <label key={item} className="flex items-center justify-between px-5 py-4 hover:bg-[#f1f6f4]">
                <span className="text-sm text-[#173634]">{item}</span>
                <input type="checkbox" defaultChecked className="accent-[#173634]" />
              </label>
            ))}
          </div>
        </section>
      )}

      {/* Team tab */}
      {tab === 'team' && (
        <div className="space-y-8">
          <section className="border border-[#d8e5e2]">
            <div className="border-b border-[#d8e5e2] bg-[#f1f6f4] px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-[#8fb2aa]" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#173634]/45">Team members</p>
              </div>
              <Button className="h-7 rounded-none bg-[#173634] px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-[#1e3431]">
                Invite member
              </Button>
            </div>
            <div className="divide-y divide-[#d8e5e2]">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between px-5 py-4 hover:bg-[#f1f6f4]">
                  <div>
                    <p className="font-medium text-[#173634]">{member.email}</p>
                    <div className="mt-1 flex items-center gap-2 text-[10px] text-[#173634]/50">
                      <span className="capitalize">{member.role}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] ${
                        member.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {member.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <select className="rounded-none border border-[#d8e5e2] bg-[#fbfbfa] px-2 py-1 text-[10px] font-semibold text-[#173634] focus:outline-none">
                      <option>Admin</option>
                      <option>Editor</option>
                      <option>Viewer</option>
                    </select>
                    <Button variant="ghost" size="sm" className="h-6 rounded-none px-2 text-[#d8e5e2] hover:bg-red-50 hover:text-red-600">
                      <Trash2 size={12} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* White-Label tab */}
      {tab === 'white-label' && (
        <div className="space-y-8">
          <section className="border border-[#d8e5e2]">
            <div className="border-b border-[#d8e5e2] bg-[#f1f6f4] px-5 py-3 flex items-center gap-2">
              <Zap size={16} className="text-[#8fb2aa]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#173634]/45">White-Label Program</p>
            </div>
            <div className="p-5 space-y-5">
              <div>
                <p className="text-sm font-semibold text-[#173634] mb-2">Custom Domain</p>
                <div className="flex gap-2">
                  <Input
                    placeholder="agents.yourcompany.com"
                    className="h-10 rounded-none border-[#d8e5e2] bg-[#fbfbfa] text-sm text-[#173634]"
                  />
                  <Button className="h-10 rounded-none bg-[#173634] px-4 text-xs font-semibold uppercase tracking-[0.12em] text-white hover:bg-[#1e3431]">
                    Configure
                  </Button>
                </div>
                <p className="mt-2 text-[10px] text-[#173634]/50">Requires $299-999/month white-label plan</p>
              </div>

              <div className="border-t border-[#d8e5e2] pt-5">
                <p className="text-sm font-semibold text-[#173634] mb-3">Reseller Program</p>
                <p className="text-xs text-[#173634]/60 mb-4">
                  Enable reseller mode to sell AgencyOS instances to your customers. You&apos;ll receive 30-40% commission per sale.
                </p>
                <Button variant="outline" className="h-9 rounded-none border-[#d8e5e2] px-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#173634] hover:bg-[#f1f6f4]">
                  Enable Reseller Mode
                </Button>
              </div>

              <div className="border-t border-[#d8e5e2] pt-5">
                <p className="text-sm font-semibold text-[#173634] mb-3">Branding</p>
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs font-semibold uppercase tracking-[0.16em] text-[#173634]/55">Logo URL</Label>
                    <Input
                      placeholder="https://..."
                      className="mt-1 h-10 rounded-none border-[#d8e5e2] bg-[#fbfbfa] text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold uppercase tracking-[0.16em] text-[#173634]/55">Primary Color</Label>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="h-10 w-16 rounded border border-[#d8e5e2]" style={{ backgroundColor: '#8fb2aa' }} />
                      <Input placeholder="#8fb2aa" className="h-10 flex-1 rounded-none border-[#d8e5e2] bg-[#fbfbfa] text-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
