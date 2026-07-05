'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { MOCK_PROJECTS } from '@/lib/data/mock-store'
import type { Project, ProjectType } from '@/lib/types'
import { ArrowRight, Bookmark, Calendar, FolderOpen, Plus } from 'lucide-react'
import { getAgentBySlug, getFeaturedAgents } from '@/lib/data/seed-agents'
import { buildProjectHandoffPacket, createStoredProject, getMergedProjects, getProjectCurrentWorkflowStep, getProjectTypeLabel, PROJECT_TYPE_OPTIONS } from '@/lib/project-memory'

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date))
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS)
  const [showNew, setShowNew] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [projectType, setProjectType] = useState<ProjectType>('operations')
  const [replacementFilter, setReplacementFilter] = useState<'all' | '70' | '80'>('all')
  const [supervisionFilter, setSupervisionFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all')

  useEffect(() => {
    void (async () => {
      setProjects(await getMergedProjects(MOCK_PROJECTS))
    })()
  }, [])

  async function handleCreate() {
    if (!name.trim()) return
    const project = await createStoredProject(name.trim(), description.trim(), projectType)
    setProjects((prev) => [project, ...prev.filter((item) => item.id !== project.id)])
    setName('')
    setDescription('')
    setProjectType('operations')
    setShowNew(false)
  }

  const totals = projects.reduce((acc, p) => ({ runs: acc.runs + (p.runCount ?? 0), saved: acc.saved + (p.savedCount ?? 0) }), { runs: 0, saved: 0 })
  const featuredTwinProfiles = getFeaturedAgents()
    .map((agent) => agent.twinProfile)
    .filter(Boolean)
  const averageReplacement = featuredTwinProfiles.length
    ? Math.round(
        featuredTwinProfiles.reduce((total, profile) => total + (profile?.operationalReplacementScore ?? 0), 0) /
        featuredTwinProfiles.length,
      )
    : 0
  const projectRows = projects.map((project, index) => {
    const packet = buildProjectHandoffPacket(project)
    const activeStep = getProjectCurrentWorkflowStep(project.workflow)
    const mappedTwin = activeStep?.recommendedAgentSlug ? getAgentBySlug(activeStep.recommendedAgentSlug) : null
    const twinProfile = mappedTwin?.twinProfile ?? featuredTwinProfiles[index % Math.max(featuredTwinProfiles.length, 1)]
    const replacementScore = twinProfile?.operationalReplacementScore ?? averageReplacement
    const supervisionLevel = twinProfile?.supervisionLevel ?? 'medium'

    return {
      project,
      index,
      packet,
      activeStep,
      mappedTwin,
      twinProfile,
      replacementScore,
      supervisionLevel,
    }
  })
  const filteredProjectRows = projectRows.filter(({ replacementScore, supervisionLevel }) => {
    const matchesReplacement =
      replacementFilter === 'all' ||
      (replacementFilter === '70' && replacementScore >= 70) ||
      (replacementFilter === '80' && replacementScore >= 80)
    const matchesSupervision = supervisionFilter === 'all' || supervisionLevel === supervisionFilter

    return matchesReplacement && matchesSupervision
  })
  const mappedTwinCount = projectRows.filter((row) => row.twinProfile).length
  const projectReplacementAverage = projectRows.length
    ? Math.round(projectRows.reduce((total, row) => total + row.replacementScore, 0) / projectRows.length)
    : averageReplacement
  const highSupervisionCount = projectRows.filter((row) => row.supervisionLevel === 'high').length

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <header className="n3-panel overflow-hidden">
        <div className="grid gap-px bg-[#d8e5e2] lg:grid-cols-[1.2fr_0.8fr]">
          <div className="bg-[linear-gradient(135deg,_rgba(23,54,52,0.05),_rgba(143,178,170,0.02))] px-6 py-8 sm:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Twin program portfolio</p>
            <div className="mt-3 flex items-center justify-between gap-4">
              <h1 className="text-4xl font-light tracking-[-0.04em] text-[#173634]">Every project should expose who can replace the work and where human supervision stays mandatory.</h1>
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#52605d]">
              This portfolio is not just a list of initiatives. It should read like a control surface for program-level digital twins, replacement capacity, and supervision load across active operating tracks.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                onClick={() => setShowNew(true)}
                className="h-10 rounded-none bg-[#173634] px-5 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-[#1e3431]"
              >
                <Plus size={13} className="mr-1.5" /> New project
              </Button>
              <Button asChild variant="outline" className="h-10 rounded-none border-[#d8e5e2] px-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#173634] hover:bg-[#f1f6f4]">
                <Link href="/app/history">Inspect run history</Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-px bg-[#d8e5e2] sm:grid-cols-3 lg:grid-cols-1">
            {[
              { label: 'Projects', value: projects.length, note: 'tracked initiatives' },
              { label: 'Total runs', value: totals.runs, note: 'execution records' },
              { label: 'Saved deliverables', value: totals.saved, note: 'retained outputs' },
            ].map(({ label, value, note }) => (
              <div key={label} className="bg-[#f1f6f4] px-5 py-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">{label}</p>
                <p className="mt-2 text-3xl font-light tracking-[-0.04em] text-[#173634]">{value}</p>
                <p className="mt-1 text-xs text-[#52605d]">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="mt-6 grid gap-px border border-[#d8e5e2] bg-[#d8e5e2] lg:grid-cols-3">
        {[
          {
            label: 'Twin coverage',
            value: `${mappedTwinCount}/${projectRows.length || 0} programs`,
            note: 'Projects currently reading with an attached twin program or featured fallback.',
          },
          {
            label: 'Replacement average',
            value: `${projectReplacementAverage}%`,
            note: 'Average repeatable load absorbable across the active project portfolio.',
          },
          {
            label: 'High supervision',
            value: `${highSupervisionCount} roles`,
            note: 'Programs that should preserve tighter human approval before execution.',
          },
        ].map(({ label, value, note }) => (
          <div key={label} className="bg-[#fbfbfa] px-5 py-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">{label}</p>
            <p className="mt-2 text-3xl font-light tracking-[-0.04em] text-[#173634]">{value}</p>
            <p className="mt-1 text-xs leading-6 text-[#52605d]">{note}</p>
          </div>
        ))}
      </section>

      <div className="mt-8 flex items-center justify-between gap-4">
        <div>
          <p className="n3-eyebrow">Program board</p>
          <p className="mt-1 text-sm text-[#52605d]">Filter the portfolio by automation depth and human oversight before you assign the next operating load.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="min-w-[180px]">
            <Label className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#52605d]">Replacement</Label>
            <Select value={replacementFilter} onValueChange={(value) => setReplacementFilter(value as 'all' | '70' | '80')}>
              <SelectTrigger className="mt-2 h-9 rounded-none border-[#d8e5e2] bg-[#fbfbfa] text-xs text-[#173634]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All thresholds</SelectItem>
                <SelectItem value="70">70% or more</SelectItem>
                <SelectItem value="80">80% or more</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="min-w-[180px]">
            <Label className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#52605d]">Supervision</Label>
            <Select value={supervisionFilter} onValueChange={(value) => setSupervisionFilter(value as 'all' | 'low' | 'medium' | 'high')}>
              <SelectTrigger className="mt-2 h-9 rounded-none border-[#d8e5e2] bg-[#fbfbfa] text-xs capitalize text-[#173634]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All levels</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={() => setShowNew(true)}
            className="h-9 rounded-none bg-[#173634] px-4 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#1e3431]"
          >
            <Plus size={13} className="mr-1.5" /> New project
          </Button>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="mt-6 border border-[#d8e5e2] px-8 py-16 text-center">
          <p className="text-sm font-medium text-[#173634]">No projects yet</p>
          <p className="mt-1 text-xs text-[#173634]/45">Create a project to keep each run, its context, and its deliverables together.</p>
          <Button
            onClick={() => setShowNew(true)}
            className="mt-6 h-9 rounded-none bg-[#173634] px-5 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#1e3431]"
          >
            <Plus size={13} className="mr-1.5" /> Create first project
          </Button>
        </div>
      ) : filteredProjectRows.length === 0 ? (
        <div className="mt-6 border border-[#d8e5e2] bg-[#fbfbfa] px-8 py-16 text-center">
          <p className="text-sm font-medium text-[#173634]">No programs match the active filters</p>
          <p className="mt-1 text-xs text-[#52605d]">Relax the replacement or supervision threshold to inspect the rest of the portfolio.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-px border border-[#d8e5e2] bg-[#d8e5e2] sm:grid-cols-2 xl:grid-cols-3">
          {filteredProjectRows.map(({ project, index, packet, twinProfile, replacementScore, supervisionLevel }) => (
            (() => {
              return (
                <article key={project.id} className="n3-card n3-panel flex flex-col p-5 transition-colors hover:bg-[#f1f6f4]">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#d8e5e2] bg-[#f1f6f4] text-[#8fb2aa]">
                        <FolderOpen size={15} />
                      </div>
                      <div>
                        <p className="n3-eyebrow">
                          {getProjectTypeLabel(project.projectType)}
                        </p>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#173634]/38">
                          Workstream {String(index + 1).padStart(2, '0')}
                        </p>
                        <p className="mt-1 text-sm font-medium text-[#173634]">{project.name}</p>
                      </div>
                    </div>
                    <span className="n3-chip-soft">
                      {project.status}
                    </span>
                  </div>

                  <p className="line-clamp-3 text-sm leading-6 text-[#52605d]">
                    {packet?.summary || project.description || 'No description yet. Tighten the brief so future runs inherit stronger context.'}
                  </p>

                  <div className="mt-4 grid gap-3">
                    <div className="n3-subpanel">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">Operator brief</p>
                        {packet ? <span className="n3-chip-soft">{packet.executionMode}</span> : null}
                      </div>
                      <p className="mt-2 text-sm font-medium text-[#173634]">{packet?.currentStep || 'No step configured yet'}</p>
                      <p className="mt-1 text-xs leading-5 text-[#52605d]">{packet?.currentStepDetail || 'Define the current operator state so the next run is not guesswork.'}</p>
                    </div>

                    <div className="n3-subpanel">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">Risk note</p>
                      <p className="mt-2 text-sm leading-6 text-[#52605d]">
                        {packet?.riskNote || 'This project still needs a stronger operating packet to preserve continuity.'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-px border border-[#d8e5e2] bg-[#d8e5e2]">
                    {[
                      { label: 'Runs', value: project.runCount },
                      { label: 'Saved', value: project.savedCount },
                    ].map(({ label, value }) => (
                      <div key={label} className="n3-subpanel bg-[#f1f6f4] px-4 py-3">
                        <p className="n3-eyebrow">{label}</p>
                        <p className="mt-1 text-2xl font-light tracking-[-0.04em] text-[#173634]">{value}</p>
                      </div>
                    ))}
                  </div>

                  {twinProfile ? (
                    <div className="mt-4 grid grid-cols-2 gap-px border border-[#d8e5e2] bg-[#d8e5e2]">
                      <div className="n3-subpanel bg-[#eef5f2] px-4 py-3">
                        <p className="n3-eyebrow">Replacement</p>
                        <p className="mt-1 text-2xl font-light tracking-[-0.04em] text-[#173634]">
                          {replacementScore}%
                        </p>
                        <p className="mt-1 text-xs leading-5 text-[#52605d]">{twinProfile.roleLabel}</p>
                      </div>
                      <div className="n3-subpanel bg-[#eef5f2] px-4 py-3">
                        <p className="n3-eyebrow">Supervision</p>
                        <p className="mt-1 text-2xl font-light capitalize tracking-[-0.04em] text-[#173634]">
                          {supervisionLevel}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-[#52605d]">Required review before higher-risk moves.</p>
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-4 flex items-start justify-between gap-3 text-[11px] text-[#52605d]">
                    <div className="space-y-1">
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={10} /> Updated {formatDate(project.updatedAt)}
                      </span>
                      {packet?.nextStep ? (
                        <span className="flex items-start gap-1.5">
                          <Bookmark size={10} className="mt-0.5 text-[#8fb2aa]" />
                          Next: {packet.nextStep}
                        </span>
                      ) : null}
                    </div>
                    <Link href={`/app/projects/${project.id}`} className="inline-flex items-center gap-1 font-semibold uppercase tracking-[0.16em] text-[#8fb2aa] hover:text-[#173634]">
                      Open <ArrowRight size={10} />
                    </Link>
                  </div>
                </article>
              )
            })()
          ))}
        </div>
      )}

      <Dialog open={showNew} onOpenChange={setShowNew}>
        <DialogContent className="n3-panel rounded-none sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-light text-[#173634]">New project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <p className="text-xs leading-relaxed text-[#173634]/55">
              Give each initiative a home for the run, the source context, and the deliverables that come out of it.
            </p>
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-[0.16em] text-[#173634]/55">Operating template</Label>
              <div className="grid gap-2 sm:grid-cols-2">
                {PROJECT_TYPE_OPTIONS.map((option) => {
                  const isSelected = projectType === option.value

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setProjectType(option.value)}
                      className={`border px-3 py-3 text-left transition ${
                        isSelected
                          ? 'border-[#173634] bg-[#eef5f2]'
                          : 'border-[#d8e5e2] bg-[#fbfbfa] hover:border-[#8fb2aa] hover:bg-[#f4f8f6]'
                      }`}
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#173634]">{option.label}</p>
                      <p className="mt-1 text-xs leading-5 text-[#52605d]">{option.description}</p>
                    </button>
                  )
                })}
              </div>
            </div>
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
                placeholder="What work does this project collect?"
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
              Create project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
