import { PlanBadge } from '@/components/shared/PlanBadge'
import { Button } from '@/components/ui/button'
import type { UserProfile, PlanId } from '@/lib/types'

const MOCK_USERS: UserProfile[] = [
  { id: 'u1', email: 'demo@agencyos.app', fullName: 'Demo User', company: 'Acme Inc.', role: 'Founder', plan: 'free', isAdmin: false, onboardingCompleted: true, createdAt: '2024-01-15T10:00:00Z' },
  { id: 'u2', email: 'alex@buildfast.co', fullName: 'Alex Chen', company: 'BuildFast', role: 'CTO', plan: 'pro', isAdmin: false, onboardingCompleted: true, createdAt: '2024-01-10T08:00:00Z' },
  { id: 'u3', email: 'sarah@launchpad.io', fullName: 'Sarah Kim', company: 'Launchpad', role: 'Product Lead', plan: 'starter', isAdmin: false, onboardingCompleted: true, createdAt: '2024-01-12T14:00:00Z' },
  { id: 'u4', email: 'james@consultco.com', fullName: 'James Owens', company: 'Consult Co.', role: 'Consultant', plan: 'pro', isAdmin: false, onboardingCompleted: true, createdAt: '2024-01-14T11:30:00Z' },
  { id: 'u5', email: 'nina@studio23.design', fullName: 'Nina Park', company: 'Studio 23', role: 'Designer', plan: 'starter', isAdmin: false, onboardingCompleted: false, createdAt: '2024-01-18T09:00:00Z' },
  { id: 'admin', email: 'admin@agencyos.app', fullName: 'Admin User', plan: 'enterprise', isAdmin: true, onboardingCompleted: true, createdAt: '2024-01-01T00:00:00Z' },
]

const planCounts: Record<PlanId, number> = { free: 0, starter: 0, pro: 0, team: 0, enterprise: 0 }
MOCK_USERS.forEach((u) => { planCounts[u.plan] = (planCounts[u.plan] || 0) + 1 })

export default function AdminUsersPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-foreground mb-1">Users</h1>
          <p className="text-sm text-muted-foreground">
            {MOCK_USERS.length} users · {planCounts.free} free · {planCounts.starter} starter · {planCounts.pro} pro
          </p>
        </div>
      </div>

      {/* Plan distribution */}
      <div className="grid grid-cols-5 gap-3 mb-8">
        {(['free', 'starter', 'pro', 'team', 'enterprise'] as PlanId[]).map((planId) => (
          <div key={planId} className="p-4 rounded-lg border border-border bg-white text-center">
            <PlanBadge plan={planId} size="sm" className="justify-center mb-2" />
            <p className="text-xl font-semibold text-foreground">{planCounts[planId]}</p>
          </div>
        ))}
      </div>

      {/* Users table */}
      <div className="rounded-lg border border-border bg-white overflow-hidden">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-4 py-2.5 border-b border-border bg-muted/30">
          <span className="text-xs font-medium text-muted-foreground">User</span>
          <span className="text-xs font-medium text-muted-foreground">Company</span>
          <span className="text-xs font-medium text-muted-foreground">Plan</span>
          <span className="text-xs font-medium text-muted-foreground">Joined</span>
          <span className="text-xs font-medium text-muted-foreground">Actions</span>
        </div>

        {MOCK_USERS.map((user, i) => (
          <div
            key={user.id}
            className={`grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-4 py-3.5 items-center ${
              i < MOCK_USERS.length - 1 ? 'border-b border-border' : ''
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-foreground shrink-0">
                {user.fullName.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user.fullName}
                  {user.isAdmin && (
                    <span className="ml-1.5 text-[10px] font-medium bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
                      admin
                    </span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground truncate">{user.company || '—'}</p>
            <PlanBadge plan={user.plan} size="sm" />
            <p className="text-xs text-muted-foreground">
              {new Date(user.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </p>
            <div className="flex gap-1.5">
              <Button variant="outline" size="sm" className="text-xs h-7">View</Button>
              <Button variant="outline" size="sm" className="text-xs h-7 text-destructive border-destructive/30 hover:bg-destructive/5">
                Suspend
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
