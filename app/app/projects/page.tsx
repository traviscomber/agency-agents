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
import { FolderOpen, Plus, ArrowRight, Calendar, Bot, Bookmark } from 'lucide-react'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS)
  const [showNew, setShowNew] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  function handleCreate() {
    if (!name.trim()) return
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      userId: 'user-demo-001',
      name: name.trim(),
      description: description.trim(),
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      runCount: 0,
      savedCount: 0,
    }
    setProjects((prev) => [newProject, ...prev])
    setName('')
    setDescription('')
    setShowNew(false)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-foreground mb-1">Projects</h1>
          <p className="text-sm text-muted-foreground">
            Organize agent runs and saved outputs by project.
          </p>
        </div>
        <Button size="sm" onClick={() => setShowNew(true)}>
          <Plus size={14} className="mr-1.5" /> New project
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-lg border border-border bg-white p-12 text-center">
          <FolderOpen size={32} className="mx-auto text-muted-foreground/40 mb-3" />
          <h3 className="text-sm font-medium text-foreground mb-2">No projects yet</h3>
          <p className="text-xs text-muted-foreground mb-5">
            Create a project to organize your agent runs and saved outputs.
          </p>
          <Button size="sm" onClick={() => setShowNew(true)}>
            <Plus size={13} className="mr-1.5" /> Create first project
          </Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col p-5 rounded-lg border border-border bg-white hover:border-primary/30 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-2 mb-3">
                <FolderOpen size={16} className="text-muted-foreground mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground truncate">{project.name}</h3>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                    project.status === 'active'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>

              {project.description && (
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2 flex-1">
                  {project.description}
                </p>
              )}

              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 mt-auto">
                <span className="flex items-center gap-1">
                  <Bot size={11} /> {project.runCount || 0} runs
                </span>
                <span className="flex items-center gap-1">
                  <Bookmark size={11} /> {project.savedCount || 0} saved
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={11} />{' '}
                  {new Date(project.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex-1 text-xs h-7" asChild>
                  <Link href={`/app/projects/${project.id}`}>
                    Open <ArrowRight size={11} className="ml-1" />
                  </Link>
                </Button>
                <Button size="sm" className="flex-1 text-xs h-7" asChild>
                  <Link href="/app/agents">Run agent</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New project dialog */}
      <Dialog open={showNew} onOpenChange={setShowNew}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold">New project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="proj-name" className="text-sm font-medium">Name</Label>
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
                Description{' '}
                <span className="text-muted-foreground font-normal text-xs">(optional)</span>
              </Label>
              <Textarea
                id="proj-desc"
                placeholder="What is this project about?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
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
