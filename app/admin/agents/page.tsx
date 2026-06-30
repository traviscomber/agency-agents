import { SEED_AGENTS } from '@/lib/data/seed-agents'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { PlanBadge } from '@/components/shared/PlanBadge'
import { Button } from '@/components/ui/button'
import { Plus, CheckCircle2, XCircle } from 'lucide-react'

export default function AdminAgentsPage() {
  const active = SEED_AGENTS.filter((a) => a.isActive).length
  const featured = SEED_AGENTS.filter((a) => a.isFeatured).length

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-foreground mb-1">Agents</h1>
          <p className="text-sm text-muted-foreground">
            {active} active · {featured} featured · {SEED_AGENTS.length} total
          </p>
        </div>
        <Button size="sm">
          <Plus size={13} className="mr-1.5" /> Add agent
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-white overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-4 py-2.5 border-b border-border bg-muted/30">
          <span className="text-xs font-medium text-muted-foreground">Agent</span>
          <span className="text-xs font-medium text-muted-foreground">Division</span>
          <span className="text-xs font-medium text-muted-foreground">Plan</span>
          <span className="text-xs font-medium text-muted-foreground">Status</span>
          <span className="text-xs font-medium text-muted-foreground">Actions</span>
        </div>

        {SEED_AGENTS.map((agent, i) => (
          <div
            key={agent.id}
            className={`grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-4 py-3.5 items-center ${
              i < SEED_AGENTS.length - 1 ? 'border-b border-border' : ''
            }`}
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{agent.name}</p>
              <p className="text-xs text-muted-foreground truncate">{agent.shortDescription}</p>
            </div>
            <div>
              <DivisionBadge division={agent.division} size="sm" />
            </div>
            <div>
              <PlanBadge plan={agent.planRequired} size="sm" />
            </div>
            <div className="flex items-center gap-1.5">
              {agent.isActive ? (
                <>
                  <CheckCircle2 size={12} className="text-green-600" />
                  <span className="text-xs text-green-700">Active</span>
                </>
              ) : (
                <>
                  <XCircle size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Inactive</span>
                </>
              )}
              {agent.isFeatured && (
                <span className="ml-1 text-[10px] font-medium bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
                  Featured
                </span>
              )}
            </div>
            <div className="flex gap-1.5">
              <Button variant="outline" size="sm" className="text-xs h-7">Edit</Button>
              <Button variant="outline" size="sm" className="text-xs h-7 text-destructive border-destructive/30 hover:bg-destructive/5">
                {agent.isActive ? 'Deactivate' : 'Activate'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
