'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MOCK_USER } from '@/lib/data/mock-store'
import { cn } from '@/lib/utils'

type Tab = 'profile' | 'account' | 'notifications'

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>('profile')
  const [fullName, setFullName] = useState(MOCK_USER.fullName)
  const [email] = useState(MOCK_USER.email)
  const [company, setCompany] = useState(MOCK_USER.company || '')
  const [role, setRole] = useState(MOCK_USER.role || '')
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'profile', label: 'Profile' },
    { id: 'account', label: 'Account' },
    { id: 'notifications', label: 'Notifications' },
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
    </div>
  )
}
