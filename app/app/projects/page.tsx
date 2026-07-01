'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { MOCK_PROJECTS } from '@/lib/data/mock-store'
import type { Project } from '@/lib/types'
import { ArrowRight, Bot, Bookmark, Calendar, FolderOpen, Plus } from 'lucide-react'

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS)
  const [showNew, setShowNew] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  function handleCreate() {
    if (!name.trim()) return

    const now = new Date().toISOString()
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      userId: 'user-demo-001',
      name: name.trim(),
      description: description.trim(),
      status: 'active',
      createdAt: now,
      updatedAt: now,
      runCount: 0,
      savedCount: 0,
    }

    setProjects((prev) => [newProject, ...prev])
    setName('')
    setDescription('')
    setShowNew(false)
  }

  const totals = projects.reduce(
    (acc, project) => {
      acc.runs += project.runCount
      acc.saved += project.savedCount
      return acc
    },
    { runs: 0, saved: 0 }
  )

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <div className="rounded-[28px] border border-border/70 bg-gradient-to-br from-white via-white to-muted/30 p-6 sm:p-8 shadow-[0_18px_60px_-44px_rgba(15,23,42,0.45)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground mb-3">
              Workspace
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              Projects that keep the run history readable.
            </h1>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl">
              Organize agent work by initiative, track what shipped, and keep saved outputs tied to the right context.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="grid grid-cols-3 gap-3 sm:min-w-[360px]">
              <div className="rounded-2xl border border-border bg-white/80 p-3">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Projects</p>
                <p className="mt-1 text-2xl font-semibold text-foreground">{projects.length}</p>
              </div>
              <div className="rounded-2xl border border-border bg-white/80 p-3">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Runs</p>
                <p className="mt-1 text-2xl font-semibold text-foreground">{totals.runs}</p>
              </div>
              <div className="rounded-2xl border border-border bg-white/80 p-3">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Saved</p>
                <p className="mt-1 text-2xl font-semibold text-foreground">{totals.saved}</p>
              </div>
            </div>

            <Button size="sm" onClick={() => setShowNew(true)} className="sm:self-stretch">
              <Plus size={14} className="mr-1.5" /> New project
            </Button>
          </div>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="mt-6 rounded-[28px] border border-border bg-white p-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-muted/40">
            <FolderOpen size={26} className="text-muted-foreground" />
          </div>
          <h3 className="text-base font-semibold text-foreground">No projects yet</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Create a project to group runs, save outputs, and keep the workspace organized.
          </p>
          <Button size="sm" onClick={() => setShowNew(true)} className="mt-6">
            <Plus size={13} className="mr-1.5" /> Create first project
          </Button>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group rounded-[24px] border border-border bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-muted/70 text-foreground">
                    <FolderOpen size={18} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-semibold text-foreground">{project.name}</h2>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      Project {String(index + 1).padStart(2, '0')}
                    </p>
                  </div>
                </div>
                <span className="rounded-full border border-border bg-muted/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {project.status}
                </span>
              </div>

              <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
                {project.description || 'No description provided yet.'}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-border bg-muted/30 p-3">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Runs</p>
                  <p className="mt-1 text-xl font-semibold text-foreground">{project.runCount}</p>
                </div>
                <div className="rounded-2xl border border-border bg-muted/30 p-3">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Saved</p>
                  <p className="mt-1 text-xl font-semibold text-foreground">{project.savedCount}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar size={11} />
                  Updated {formatDate(project.updatedAt)}
                </span>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" asChild>
                  <Link href="/app/history">
                    View runs <ArrowRight size={12} className="ml-1" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="mt-6 rounded-[24px] border border-border bg-white p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Recommended flow</p>
            <h3 className="mt-1 text-sm font-semibold text-foreground">Start from a project, then branch into runs and saves.</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/app/agents">
                Browse agents <Bot size={12} className="ml-1" />
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/app/saved">
                Review saved <Bookmark size={12} className="ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showNew} onOpenChange={setShowNew}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">New project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="proj-name" className="text-sm font-medium">
                Name
              </Label>
              <Input
                id="proj-name"
                placeholder="e.g. Q2 Product Launch"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.nativeEvent.isComposing) handleCreate()
                }}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="proj-desc" className="text-sm font-medium">
                Description <span className="text-xs font-normal text-muted-foreground">(optional)</span>
              </Label>
              <Textarea
                id="proj-desc"
                placeholder="What is this project about?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="resize-none text-sm"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setShowNew(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleCreate} disabled={!name.trim()}>
              Create project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
