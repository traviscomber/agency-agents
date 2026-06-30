import { MOCK_RUNS } from '@/lib/data/mock-store'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { Bot, Calendar, FolderOpen } from 'lucide-react'

export default function AdminRunsPage() {
  const completed = MOCK_RUNS.filter((r) => r.status === 'completed').length
  const failed = MOCK_RUNS.filter((r) => r.status === 'failed').length

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground mb-1">All runs</h1>
        <p className="text-sm text-muted-foreground">
          {MOCK_RUNS.length} total · {completed} completed · {failed} failed
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="p-4 rounded-lg border border-border bg-white">
          <p className="text-xs text-muted-foreground mb-1">Total runs</p>
          <p className="text-2xl font-semibold text-foreground">{MOCK_RUNS.length}</p>
        </div>
        <div className="p-4 rounded-lg border border-border bg-white">
          <p className="text-xs text-muted-foreground mb-1">Completed</p>
          <p className="text-2xl font-semibold text-green-600">{completed}</p>
        </div>
        <div className="p-4 rounded-lg border border-border bg-white">
          <p className="text-xs text-muted-foreground mb-1">Failed</p>
          <p className="text-2xl font-semibold text-destructive">{failed}</p>
        </div>
      </div>

      {/* Runs table */}
      <div className="rounded-lg border border-border bg-white overflow-hidden">
        <div className="grid grid-cols-[auto_2fr_1fr_1fr_auto] gap-4 px-4 py-2.5 border-b border-border bg-muted/30">
          <span className="text-xs font-medium text-muted-foreground">Agent</span>
          <span className="text-xs font-medium text-muted-foreground">Task</span>
          <span className="text-xs font-medium text-muted-foreground">Division</span>
          <span className="text-xs font-medium text-muted-foreground">Date</span>
          <span className="text-xs font-medium text-muted-foreground">Status</span>
        </div>

        {MOCK_RUNS.map((run, i) => (
          <div
            key={run.id}
            className={`grid grid-cols-[auto_2fr_1fr_1fr_auto] gap-4 px-4 py-3.5 items-start ${
              i < MOCK_RUNS.length - 1 ? 'border-b border-border' : ''
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded bg-muted flex items-center justify-center shrink-0">
                <Bot size={12} className="text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground whitespace-nowrap">{run.agentName}</p>
            </div>

            <div className="min-w-0">
              <p className="text-xs text-foreground truncate">{run.task}</p>
              {run.projectName && (
                <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                  <FolderOpen size={9} /> {run.projectName}
                </p>
              )}
            </div>

            <DivisionBadge division={run.agentDivision} size="sm" />

            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar size={10} />
              {new Date(run.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </p>

            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded whitespace-nowrap ${
                run.status === 'completed'
                  ? 'bg-green-50 text-green-700'
                  : run.status === 'failed'
                  ? 'bg-red-50 text-red-600'
                  : run.status === 'running'
                  ? 'bg-blue-50 text-blue-600'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {run.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
