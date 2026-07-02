'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MOCK_USER } from '@/lib/data/mock-store'
import { Sparkles } from 'lucide-react'

export default function SettingsPage() {
  const [fullName, setFullName] = useState(MOCK_USER.fullName)
  const [email] = useState(MOCK_USER.email)
  const [company, setCompany] = useState(MOCK_USER.company || '')
  const [role, setRole] = useState(MOCK_USER.role || '')
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#ffffff_54%,#f8fafc_100%)] p-6 shadow-[0_18px_60px_-44px_rgba(15,23,42,0.45)] sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-600">
          <Sparkles size={12} className="text-primary" />
          Brandbook aligned settings
        </div>
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">Preferences</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Settings tuned for the workspace owner.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Update profile details, manage security, and keep the default experience aligned with how the team works.
        </p>
      </section>

      <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)] sm:p-6">
        <Tabs defaultValue="profile">
          <TabsList className="mb-8 grid w-full grid-cols-3 rounded-2xl bg-slate-100 p-1">
            <TabsTrigger value="profile" className="rounded-xl text-xs text-slate-600 data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow-sm">
              Profile
            </TabsTrigger>
            <TabsTrigger value="account" className="rounded-xl text-xs text-slate-600 data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow-sm">
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-xl text-xs text-slate-600 data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow-sm">
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-foreground">Profile information</h2>
              <div className="mt-4 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="fullName" className="text-sm font-medium">Full name</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="h-10 bg-white text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <Input
                      id="email"
                      value={email}
                      disabled
                      className="h-10 bg-slate-100 text-sm"
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="company" className="text-sm font-medium">Company</Label>
                    <Input
                      id="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Inc."
                      className="h-10 bg-white text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="role" className="text-sm font-medium">Role</Label>
                    <Input
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="Founder, Developer..."
                      className="h-10 bg-white text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-foreground">Avatar</h2>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-lg font-semibold text-foreground ring-1 ring-slate-200">
                  {fullName.charAt(0)}
                </div>
                <div>
                  <Button variant="outline" size="sm" className="h-9 bg-white text-xs">
                    Upload image
                  </Button>
                  <p className="mt-1.5 text-xs text-slate-500">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className={`text-xs ${saved ? 'text-emerald-700' : 'text-transparent'}`}>Changes saved.</p>
              <Button size="sm" onClick={handleSave}>
                Save changes
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-foreground">Password</h2>
              <div className="mt-4 max-w-sm space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Current password</Label>
                  <Input type="password" placeholder="password" className="h-10 bg-white text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">New password</Label>
                  <Input type="password" placeholder="password" className="h-10 bg-white text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Confirm new password</Label>
                  <Input type="password" placeholder="password" className="h-10 bg-white text-sm" />
                </div>
                <Button size="sm">Update password</Button>
              </div>
            </div>

            <Separator />

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-foreground">Danger zone</h2>
              <p className="mt-2 text-sm text-slate-600">
                Permanently delete your account and all data. This cannot be undone.
              </p>
              <Button variant="outline" size="sm" className="mt-4 border-destructive/30 text-xs text-destructive hover:bg-destructive/5">
                Delete account
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-foreground">Email notifications</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="accent-foreground" />
                  Run completed
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="accent-foreground" />
                  Run failed
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="accent-foreground" />
                  Billing reminders
                </label>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
