import { SEED_AGENTS } from '@/lib/data/seed-agents'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { PlanBadge } from '@/components/shared/PlanBadge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, XCircle } from 'lucide-react'

export default function AdminAgentsPage() {
  const active = SEED_AGENTS.filter((agent) => agent.isActive).length
  const featured = SEED_AGENTS.filter((agent) => agent.isFeatured).length

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-light tracking-[-0.02em] text-[#173634]">Agent Catalog</h1>
        <p className="mt-2 text-base text-[#555a56]">Manage agents, divisions, and availability.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4 mb-8">
        {[
          ['Agents', String(SEED_AGENTS.length)],
          ['Active', String(active)],
          ['Featured', String(featured)],
          ['Inactive', String(SEED_AGENTS.length - active)],
        ].map(([label, value]) => (
          <div key={label} className="space-y-3 border border-[#d8e5e2] bg-white px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#555a56]">{label}</p>
            <p className="text-3xl font-semibold text-[#173634]">{value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-[#d8e5e2] bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#d8e5e2] bg-[#f1f6f4]">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.16em] text-[#555a56]">Agent</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.16em] text-[#555a56]">Division</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.16em] text-[#555a56]">Plan</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.16em] text-[#555a56]">Status</th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.16em] text-[#555a56]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {SEED_AGENTS.map((agent, idx) => (
              <tr key={agent.id} className={idx < SEED_AGENTS.length - 1 ? 'border-b border-[#d8e5e2]' : ''}>
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-[#173634]">{agent.name}</p>
                  <p className="text-xs text-[#555a56]">{agent.shortDescription}</p>
                </td>
                <td className="px-6 py-4">
                  <DivisionBadge division={agent.division} size="sm" />
                </td>
                <td className="px-6 py-4">
                  <PlanBadge plan={agent.planRequired} size="sm" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    {agent.isActive ? (
                      <>
                        <CheckCircle2 size={14} className="text-emerald-600" />
                        <span className="text-xs font-semibold text-emerald-700">Active</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={14} className="text-[#555a56]" />
                        <span className="text-xs font-semibold text-[#555a56]">Inactive</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="sm" className="text-sm text-[#8fb2aa] hover:bg-[#f1f6f4]">
                    Edit
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
