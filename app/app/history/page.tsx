import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MOCK_RUNS } from '@/lib/data/mock-store'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { Bot, FolderOpen, ArrowRight, Calendar } from 'lucide-react'

export default function HistoryPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground mb-1">Run history</h1>
        <p className="text-sm text-muted-foreground">
          All {MOCK_RUNS.length} agent runs from your workspace.
        </p>
      </div>

      {MOCK_RUNS.length === 0 ? (
        <div className="rounded-lg border border-border bg-white p-12 text-center">
          <Bot size={32} className="mx-auto text-muted-foreground/40 mb-3" />
          <h3 className="text-sm font-medium text-foreground mb-2">No runs yet</h3>
          <p className="text-xs text-muted-foreground mb-5">
            Run an agent to see your history here.
          </p>
          <Button size="sm" asChild>
            <Link href="/app/agents">Browse agents</Link>
          </Button>
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-white overflow-hidden">
          <div className="grid grid-cols-[1fr_auto] items-center px-4 py-2.5 border-b border-border bg-muted/30">
            <span className="text-xs font-medium text-muted-foreground">Run</span>
            <span className="text-xs font-medium text-muted-foreground">Date</span>
          </div>
          {MOCK_RUNS.map((run, i) => (
            <div
              key={run.id}
              className={`flex items-start gap-3 px-4 py-4 ${
                i < MOCK_RUNS.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <div className="w-8 h-8 rounded bg-muted flex items-center justify-center shrink-0">
                <Bot size={14} className="text-muted-foreground" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-2 mb-1">
                  <p className="text-sm font-medium text-foreground">{run.agentName}</p>
                  <DivisionBadge division={run.agentDivision} size="sm" />
                  <span
                    className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                      run.status === 'completed'
                        ? 'bg-green-50 text-green-700'
                        : run.status === 'failed'
                        ? 'bg-red-50 text-red-600'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {run.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate mb-1">{run.task}</p>
                {run.projectName && (
                  <p className="text-xs text-muted-foreground/60 flex items-center gap-1">
                    <FolderOpen size={10} />
                    {run.projectName}
                  </p>
                )}
              </div>

              <div className="shrink-0 flex flex-col items-end gap-2">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar size={10} />
                  {new Date(run.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                {run.status === 'completed' && (
                  <Link
                    href={`/app/run/${run.agentId}`}
                    className="text-xs text-primary flex items-center gap-0.5 hover:underline"
                  >
                    Re-run <ArrowRight size={10} />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
