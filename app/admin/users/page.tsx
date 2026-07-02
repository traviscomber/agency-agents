import { PlanBadge } from '@/components/shared/PlanBadge'
import { Button } from '@/components/ui/button'
import type { UserProfile, PlanId } from '@/lib/types'
import { Building2, Calendar, Mail, Users } from 'lucide-react'

const MOCK_USERS: UserProfile[] = [
  { id: 'u1', email: 'demo@agencyos.app', fullName: 'Demo User', company: 'Acme Inc.', role: 'Founder', plan: 'free', isAdmin: false, onboardingCompleted: true, createdAt: '2024-01-15T10:00:00Z' },
  { id: 'u2', email: 'alex@buildfast.co', fullName: 'Alex Chen', company: 'BuildFast', role: 'CTO', plan: 'pro', isAdmin: false, onboardingCompleted: true, createdAt: '2024-01-10T08:00:00Z' },
  { id: 'u3', email: 'sarah@launchpad.io', fullName: 'Sarah Kim', company: 'Launchpad', role: 'Product Lead', plan: 'starter', isAdmin: false, onboardingCompleted: true, createdAt: '2024-01-12T14:00:00Z' },
  { id: 'u4', email: 'james@consultco.com', fullName: 'James Owens', company: 'Consult Co.', role: 'Consultant', plan: 'pro', isAdmin: false, onboardingCompleted: true, createdAt: '2024-01-14T11:30:00Z' },
  { id: 'u5', email: 'nina@studio23.design', fullName: 'Nina Park', company: 'Studio 23', role: 'Designer', plan: 'starter', isAdmin: false, onboardingCompleted: false, createdAt: '2024-01-18T09:00:00Z' },
  { id: 'admin', email: 'admin@agencyos.app', fullName: 'Admin User', plan: 'enterprise', isAdmin: true, onboardingCompleted: true, createdAt: '2024-01-01T00:00:00Z' },
]

const planCounts: Record<PlanId, number> = { free: 0, starter: 0, pro: 0, team: 0, enterprise: 0 }
MOCK_USERS.forEach((u) => {
  planCounts[u.plan] = (planCounts[u.plan] || 0) + 1
})

export default function AdminUsersPage() {
  const onboarded = MOCK_USERS.filter((user) => user.onboardingCompleted).length
  const admins = MOCK_USERS.filter((user) => user.isAdmin).length

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#ffffff_48%,#eef2ff_100%)] shadow-[0_18px_60px_-44px_rgba(15,23,42,0.45)]">
        <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:p-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-600">
              <Users size={12} className="text-primary" />
              Admin users
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              User registry with clear ownership and plan visibility.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-700 sm:text-base">
              Review access, spot account health issues, and keep admin actions obvious without burying the main data.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-[1.25rem] border border-slate-200 bg-slate-950 p-4 text-white shadow-[0_18px_40px_-24px_rgba(15,23,42,0.9)]">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">Users</p>
              <p className="mt-3 text-3xl font-semibold">{MOCK_USERS.length}</p>
            </div>
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-600">Admins</p>
              <p className="mt-3 text-3xl font-semibold text-foreground">{admins}</p>
            </div>
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-600">Onboarding</p>
              <p className="mt-3 text-3xl font-semibold text-foreground">{onboarded}</p>
            </div>
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-600">Health</p>
              <p className="mt-3 text-sm font-semibold text-foreground">Visible at a glance</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
        {(['free', 'starter', 'pro', 'team', 'enterprise'] as PlanId[]).map((planId) => (
          <div key={planId} className="rounded-[1.25rem] border border-slate-200 bg-white p-4 text-center shadow-sm">
            <PlanBadge plan={planId} size="sm" className="justify-center mb-2" />
            <p className="text-2xl font-semibold text-foreground">{planCounts[planId]}</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-slate-600">{planId}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-4 py-3">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">User</span>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">Company</span>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">Plan</span>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">Joined</span>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">Actions</span>
        </div>

        {MOCK_USERS.map((user, i) => (
          <div
            key={user.id}
            className={`grid grid-cols-[2fr_1fr_1fr_1fr_auto] items-center gap-4 px-4 py-3.5 ${
              i < MOCK_USERS.length - 1 ? 'border-b border-slate-200' : ''
            }`}
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-semibold text-white">
                {user.fullName.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {user.fullName}
                  {user.isAdmin && (
                    <span className="ml-1.5 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-700">
                      admin
                    </span>
                  )}
                </p>
                <p className="truncate text-xs text-slate-700">
                  <Mail size={10} className="mr-1 inline -translate-y-[1px]" />
                  {user.email}
                </p>
              </div>
            </div>

            <p className="truncate text-xs text-slate-700">
              <Building2 size={10} className="mr-1 inline -translate-y-[1px]" />
              {user.company || '-'}
            </p>

            <PlanBadge plan={user.plan} size="sm" />

            <p className="flex items-center gap-1 text-xs text-slate-700">
              <Calendar size={10} />
              {new Date(user.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </p>

            <div className="flex gap-1.5">
              <Button variant="outline" size="sm" className="h-7 text-xs">
                View
              </Button>
              <Button variant="outline" size="sm" className="h-7 border-destructive/30 text-xs text-destructive hover:bg-destructive/5">
                Suspend
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
