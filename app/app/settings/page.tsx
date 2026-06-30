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
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground mb-1">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account and preferences.</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="mb-8">
          <TabsTrigger value="profile" className="text-xs">Profile</TabsTrigger>
          <TabsTrigger value="account" className="text-xs">Account</TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs">Notifications</TabsTrigger>
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile" className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-foreground mb-4">Profile information</h2>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName" className="text-sm font-medium">Full name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="text-sm h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <Input
                    id="email"
                    value={email}
                    disabled
                    className="text-sm h-9 bg-muted/50"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="company" className="text-sm font-medium">Company</Label>
                  <Input
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Inc."
                    className="text-sm h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="role" className="text-sm font-medium">Role</Label>
                  <Input
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Founder, Developer..."
                    className="text-sm h-9"
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Avatar */}
          <div>
            <h2 className="text-sm font-semibold text-foreground mb-3">Avatar</h2>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-lg font-semibold text-foreground">
                {fullName.charAt(0)}
              </div>
              <div>
                <Button variant="outline" size="sm" className="text-xs h-8">
                  Upload image
                </Button>
                <p className="text-xs text-muted-foreground mt-1.5">
                  JPG, PNG or GIF. Max 2MB.
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <p className={`text-xs ${saved ? 'text-green-600' : 'text-transparent'}`}>
              Changes saved.
            </p>
            <Button size="sm" onClick={handleSave}>
              Save changes
            </Button>
          </div>
        </TabsContent>

        {/* Account */}
        <TabsContent value="account" className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-foreground mb-4">Password</h2>
            <div className="space-y-3 max-w-sm">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Current password</Label>
                <Input type="password" placeholder="••••••••" className="text-sm h-9" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">New password</Label>
                <Input type="password" placeholder="••••••••" className="text-sm h-9" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Confirm new password</Label>
                <Input type="password" placeholder="••••••••" className="text-sm h-9" />
              </div>
              <Button size="sm">Update password</Button>
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="text-sm font-semibold text-foreground mb-1">Danger zone</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Permanently delete your account and all data. This cannot be undone.
            </p>
            <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/5 text-xs">
              Delete account
            </Button>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-foreground mb-4">Email notifications</h2>
            <div className="space-y-4">
              {[
                { label: 'Run completed', desc: 'When an agent run finishes successfully.' },
                { label: 'Usage alert', desc: 'When you reach 80% of your monthly run limit.' },
                { label: 'Product updates', desc: 'New agents, features, and improvements.' },
                { label: 'Billing reminders', desc: 'Upcoming renewals and invoices.' },
              ].map(({ label, desc }) => (
                <div key={label} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                  <button className="relative w-9 h-5 rounded-full bg-primary shrink-0 mt-0.5">
                    <span className="absolute right-1 top-1 w-3 h-3 rounded-full bg-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <Separator />
          <Button size="sm">Save preferences</Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}
