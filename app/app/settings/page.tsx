'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MOCK_USER } from '@/lib/data/mock-store'

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <div className="rounded-[28px] border border-border/70 bg-gradient-to-br from-white via-white to-muted/30 p-6 sm:p-8 shadow-[0_18px_60px_-44px_rgba(15,23,42,0.45)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground mb-3">
          Preferences
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">Settings tuned for the workspace owner.</h1>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl">
          Update profile details, manage security, and keep the default experience aligned with how the team works.
        </p>
      </div>

      <div className="mt-6 rounded-[28px] border border-border bg-white p-5 sm:p-6">
        <Tabs defaultValue="profile">
          <TabsList className="mb-8 grid w-full grid-cols-3 rounded-2xl bg-muted/40 p-1">
            <TabsTrigger value="profile" className="rounded-xl text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Profile
            </TabsTrigger>
            <TabsTrigger value="account" className="rounded-xl text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-xl text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="rounded-2xl border border-border bg-muted/20 p-5">
              <h2 className="text-sm font-semibold text-foreground">Profile information</h2>
              <div className="mt-4 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="fullName" className="text-sm font-medium">Full name</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="text-sm h-10 bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <Input
                      id="email"
                      value={email}
                      disabled
                      className="text-sm h-10 bg-muted/40"
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
                      className="text-sm h-10 bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="role" className="text-sm font-medium">Role</Label>
                    <Input
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="Founder, Developer..."
                      className="text-sm h-10 bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="rounded-2xl border border-border bg-muted/20 p-5">
              <h2 className="text-sm font-semibold text-foreground">Avatar</h2>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-lg font-semibold text-foreground ring-1 ring-border">
                  {fullName.charAt(0)}
                </div>
                <div>
                  <Button variant="outline" size="sm" className="text-xs h-9 bg-white">
                    Upload image
                  </Button>
                  <p className="mt-1.5 text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className={`text-xs ${saved ? 'text-emerald-600' : 'text-transparent'}`}>Changes saved.</p>
              <Button size="sm" onClick={handleSave}>
                Save changes
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <div className="rounded-2xl border border-border bg-muted/20 p-5">
              <h2 className="text-sm font-semibold text-foreground">Password</h2>
              <div className="mt-4 max-w-sm space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Current password</Label>
                  <Input type="password" placeholder="password" className="text-sm h-10 bg-white" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">New password</Label>
                  <Input type="password" placeholder="password" className="text-sm h-10 bg-white" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Confirm new password</Label>
                  <Input type="password" placeholder="password" className="text-sm h-10 bg-white" />
                </div>
                <Button size="sm">Update password</Button>
              </div>
            </div>

            <Separator />

            <div className="rounded-2xl border border-border bg-muted/20 p-5">
              <h2 className="text-sm font-semibold text-foreground">Danger zone</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Permanently delete your account and all data. This cannot be undone.
              </p>
              <Button variant="outline" size="sm" className="mt-4 text-destructive border-destructive/30 hover:bg-destructive/5 text-xs">
                Delete account
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="rounded-2xl border border-border bg-muted/20 p-5">
              <h2 className="text-sm font-semibold text-foreground">Email notifications</h2>
              <div className="mt-4 space-y-3 text-sm text-muted-foreground">
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
