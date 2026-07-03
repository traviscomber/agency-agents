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
import { ArrowRight, Calendar, FolderOpen, Plus } from 'lucide-react'

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date))
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS)
  const [showNew, setShowNew] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  function handleCreate() {
    if (!name.trim()) return
    const now = new Date().toISOString()
    setProjects((prev) => [
      {
        id: `proj-${Date.now()}`,
        userId: 'user-demo-001',
        name: name.trim(),
        description: description.trim(),
        status: 'active',
        createdAt: now,
        updatedAt: now,
        runCount: 0,
        savedCount: 0,
      },
      ...prev,
    ])
    setName('')
    setDescription('')
    setShowNew(false)
  }

  const totals = projects.reduce((acc, p) => ({ runs: acc.runs + p.runCount, saved: acc.saved + p.savedCount }), { runs: 0, saved: 0 })

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-10 border-b border-[#d8e5e2] pb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Workspace</p>
        <div className="mt-2 flex items-center justify-between gap-4">
          <h1 className="text-3xl font-light tracking-tight text-[#173634]">Projects.</h1>
          <Button
            onClick={() => setShowNew(true)}
            className="h-9 rounded-none bg-[#173634] px-4 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#1e3431]"
          >
            <Plus size={13} className="mr-1.5" /> New
          </Button>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-[#173634]/60">
          Organize agent work by initiative. Track runs and save outputs in context.
        </p>
      </header>

      {/* Stats */}
      <div className="mb-10 grid grid-cols-3 gap-px border border-[#d8e5e2] bg-[#d8e5e2]">
        {[
          { label: 'Projects', value: projects.length },
          { label: 'Total runs', value: totals.runs },
          { label: 'Saved outputs', value: totals.saved },
        ].map(({ label, value }) => (
          <div key={label} className="bg-[#fbfbfa] px-5 py-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">{label}</p>
            <p className="mt-2 text-3xl font-light text-[#173634]">{value}</p>
          </div>
        ))}
      </div>

      {projects.length === 0 ? (
        <div className="border border-[#d8e5e2] px-8 py-16 text-center">
          <p className="text-sm font-medium text-[#173634]">No projects yet</p>
          <p className="mt-1 text-xs text-[#173634]/45">Create a project to group runs and saved outputs.</p>
          <Button
            onClick={() => setShowNew(true)}
            className="mt-6 h-9 rounded-none bg-[#173634] px-5 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#1e3431]"
          >
            <Plus size={13} className="mr-1.5" /> Create first project
          </Button>
        </div>
      ) : (
        <div className="grid gap-px border border-[#d8e5e2] bg-[#d8e5e2] sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <article key={project.id} className="flex flex-col bg-[#fbfbfa] p-5 hover:bg-[#f1f6f4]">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#d8e5e2] bg-white text-[#8fb2aa]">
                    <FolderOpen size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#173634]/38">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                  </div>
                </div>
                <span className="border border-[#d8e5e2] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8fb2aa]">
                  {project.status}
                </span>
              </div>

              <h2 className="text-sm font-medium text-[#173634]">{project.name}</h2>
              <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-[#173634]/50">
                {project.description || 'No description.'}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-px border-t border-[#d8e5e2] bg-[#d8e5e2] pt-px">
                {[
                  { label: 'Runs', value: project.runCount },
                  { label: 'Saved', value: project.savedCount },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[#fbfbfa] px-3 py-2">
                    <p className="text-[10px] text-[#173634]/38">{label}</p>
                    <p className="text-lg font-light text-[#173634]">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between gap-3 text-[10px] text-[#173634]/38">
                <span className="inline-flex items-center gap-1">
                  <Calendar size={9} /> {formatDate(project.updatedAt)}
                </span>
                <Link href="/app/history" className="inline-flex items-center gap-1 text-[#8fb2aa] hover:text-[#173634]">
                  Runs <ArrowRight size={9} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      <Dialog open={showNew} onOpenChange={setShowNew}>
        <DialogContent className="rounded-none border-[#d8e5e2] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-light text-[#173634]">New project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-[0.16em] text-[#173634]/55">Name</Label>
              <Input
                placeholder="e.g. Q2 Product Launch"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.nativeEvent.isComposing) handleCreate() }}
                className="h-10 rounded-none border-[#d8e5e2] bg-[#fbfbfa] text-sm focus-visible:ring-[#8fb2aa]"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-[0.16em] text-[#173634]/55">
                Description <span className="normal-case font-normal text-[#173634]/35">(optional)</span>
              </Label>
              <Textarea
                placeholder="What is this project about?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="resize-none rounded-none border-[#d8e5e2] bg-[#fbfbfa] text-sm focus-visible:ring-[#8fb2aa]"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowNew(false)} className="h-9 rounded-none border-[#d8e5e2] text-xs font-semibold uppercase tracking-[0.14em] text-[#173634]">
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={!name.trim()} className="h-9 rounded-none bg-[#173634] px-5 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#1e3431]">
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
