import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { MOCK_PROJECTS, MOCK_RUNS, MOCK_SAVED_OUTPUTS } from '@/lib/data/mock-store'
import { DivisionBadge } from '@/components/shared/DivisionBadge'
import { ArrowLeft, ArrowRight, Bot, Bookmark, Calendar } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params
  const project = MOCK_PROJECTS.find((p) => p.id === id)
  if (!project) notFound()

  const runs = MOCK_RUNS.filter((r) => r.projectId === id)
  const saved = MOCK_SAVED_OUTPUTS.filter((s) => s.projectId === id)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link
        href="/app/projects"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft size={13} /> Back to projects
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8 pb-6 border-b border-border">
        <div>
          <h1 className="text-xl font-semibold text-foreground mb-1">{project.name}</h1>
          {project.description && (
            <p className="text-sm text-muted-foreground">{project.description}</p>
          )}
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Bot size={11} /> {runs.length} runs
            </span>
            <span className="flex items-center gap-1">
              <Bookmark size={11} /> {saved.length} saved
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={11} />{' '}
              Updated {new Date(project.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>
        <Button size="sm" asChild>
          <Link href="/app/agents">
            <Bot size={13} className="mr-1.5" /> Run agent
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="runs">
        <TabsList className="mb-6">
          <TabsTrigger value="runs" className="text-xs">
            Runs ({runs.length})
          </TabsTrigger>
          <TabsTrigger value="saved" className="text-xs">
            Saved ({saved.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="runs">
          {runs.length === 0 ? (
            <div className="rounded-lg border border-border bg-white p-10 text-center">
              <p className="text-sm text-muted-foreground mb-4">No runs in this project yet.</p>
              <Button size="sm" asChild>
                <Link href="/app/agents">Run an agent</Link>
              </Button>
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-white overflow-hidden">
              {runs.map((run, i) => (
                <div
                  key={run.id}
                  className={`flex items-start gap-3 p-4 ${i < runs.length - 1 ? 'border-b border-border' : ''}`}
                >
                  <div className="w-8 h-8 rounded bg-muted flex items-center justify-center shrink-0">
                    <Bot size={14} className="text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="text-sm font-medium text-foreground">{run.agentName}</p>
                      <DivisionBadge division={run.agentDivision} size="sm" />
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                        run.status === 'completed' ? 'bg-green-50 text-green-700' : 'bg-muted text-muted-foreground'
                      }`}>
                        {run.status}
                      </span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {new Date(run.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{run.task}</p>
                  </div>
                  <Link
                    href={`/app/run/${run.agentId}`}
                    className="shrink-0 p-1.5 text-muted-foreground hover:text-foreground"
                  >
                    <ArrowRight size={13} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="saved">
          {saved.length === 0 ? (
            <div className="rounded-lg border border-border bg-white p-10 text-center">
              <p className="text-sm text-muted-foreground">No saved outputs in this project yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {saved.map((item) => (
                <div key={item.id} className="p-5 rounded-lg border border-border bg-white">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-0.5">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {item.agentName} ·{' '}
                        {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <Bookmark size={14} className="text-muted-foreground shrink-0 mt-0.5" />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
