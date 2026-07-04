import { PlanBadge } from '@/components/shared/PlanBadge'
import { Button } from '@/components/ui/button'
import type { UserProfile, PlanId } from '@/lib/types'
import { Mail, Building2 } from 'lucide-react'

const MOCK_USERS: UserProfile[] = [
  { id: 'u1', email: 'demo@n3uralia.com', fullName: 'Demo User', company: 'Acme Inc.', role: 'Founder', plan: 'free', isAdmin: false, onboardingCompleted: true, createdAt: '2024-01-15T10:00:00Z' },
  { id: 'u2', email: 'alex@buildfast.co', fullName: 'Alex Chen', company: 'BuildFast', role: 'CTO', plan: 'pro', isAdmin: false, onboardingCompleted: true, createdAt: '2024-01-10T08:00:00Z' },
  { id: 'u3', email: 'sarah@launchpad.io', fullName: 'Sarah Kim', company: 'Launchpad', role: 'Product Lead', plan: 'starter', isAdmin: false, onboardingCompleted: true, createdAt: '2024-01-12T14:00:00Z' },
  { id: 'u4', email: 'james@consultco.com', fullName: 'James Owens', company: 'Consult Co.', role: 'Consultant', plan: 'pro', isAdmin: false, onboardingCompleted: true, createdAt: '2024-01-14T11:30:00Z' },
  { id: 'u5', email: 'nina@studio23.design', fullName: 'Nina Park', company: 'Studio 23', role: 'Designer', plan: 'starter', isAdmin: false, onboardingCompleted: false, createdAt: '2024-01-18T09:00:00Z' },
  { id: 'admin', email: 'admin@n3uralia.com', fullName: 'Admin User', plan: 'enterprise', isAdmin: true, onboardingCompleted: true, createdAt: '2024-01-01T00:00:00Z' },
]

const planCounts: Record<PlanId, number> = { free: 0, starter: 0, pro: 0, team: 0, enterprise: 0 }
MOCK_USERS.forEach((u) => {
  planCounts[u.plan] = (planCounts[u.plan] || 0) + 1
})

export default function AdminUsersPage() {
  const onboarded = MOCK_USERS.filter((user) => user.onboardingCompleted).length
  const admins = MOCK_USERS.filter((user) => user.isAdmin).length

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-light tracking-[-0.02em] text-[#173634]">Users</h1>
        <p className="mt-2 text-base text-[#555a56]">User registry with plan visibility and account health.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4 mb-8">
        {[
          ['Total users', String(MOCK_USERS.length)],
          ['Admins', String(admins)],
          ['Onboarded', String(onboarded)],
          ['Pending', String(MOCK_USERS.length - onboarded)],
        ].map(([label, value]) => (
          <div key={label} className="space-y-3 rounded-none border border-[#d8e5e2] bg-white px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#555a56]">{label}</p>
            <p className="text-3xl font-semibold text-[#173634]">{value}</p>
          </div>
        ))}
      </div>

      {/* Plan breakdown */}
      <div className="grid gap-3 sm:grid-cols-5 mb-8">
        {(['free', 'starter', 'pro', 'team', 'enterprise'] as PlanId[]).map((planId) => (
          <div key={planId} className="space-y-2 rounded-none border border-[#d8e5e2] bg-white px-5 py-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#555a56]">{planId}</p>
            <p className="text-2xl font-semibold text-[#173634]">{planCounts[planId]}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-none border border-[#d8e5e2] bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#d8e5e2] bg-[#f1f6f4]">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.16em] text-[#555a56]">User</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.16em] text-[#555a56]">Company</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.16em] text-[#555a56]">Plan</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.16em] text-[#555a56]">Joined</th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.16em] text-[#555a56]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_USERS.map((user, idx) => (
              <tr key={user.id} className={idx < MOCK_USERS.length - 1 ? 'border-b border-[#d8e5e2]' : ''}>
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-[#173634]">
                    {user.fullName}
                    {user.isAdmin && <span className="ml-2 text-[10px] font-semibold text-[#8fb2aa] uppercase">Admin</span>}
                  </p>
                  <p className="flex items-center gap-1 text-xs text-[#555a56] mt-1">
                    <Mail size={12} />
                    {user.email}
                  </p>
                </td>
                <td className="px-6 py-4">
                  {user.company ? (
                    <p className="flex items-center gap-1.5 text-xs text-[#173634]">
                      <Building2 size={12} />
                      {user.company}
                    </p>
                  ) : (
                    <p className="text-xs text-[#555a56]">—</p>
                  )}
                </td>
                <td className="px-6 py-4">
                  <PlanBadge plan={user.plan} size="sm" />
                </td>
                <td className="px-6 py-4 text-xs text-[#555a56]">
                  {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })}
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="sm" className="text-sm text-[#8fb2aa] hover:bg-[#f1f6f4]">
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
