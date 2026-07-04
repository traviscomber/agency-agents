'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { MOCK_SAVED_OUTPUTS } from '@/lib/data/mock-store'
import type { SavedOutput } from '@/lib/types'
import { ArrowRight, Bookmark, FolderOpen, Search, Sparkles, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getAllSavedOutputs } from '@/lib/project-memory'

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date))
}

function SavedPageContent() {
  const searchParams = useSearchParams()
  const [savedOutputs, setSavedOutputs] = useState<SavedOutput[]>(MOCK_SAVED_OUTPUTS)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<SavedOutput | null>(null)

  useEffect(() => {
    void (async () => {
      const allSavedOutputs = await getAllSavedOutputs(MOCK_SAVED_OUTPUTS)
      setSavedOutputs(allSavedOutputs)

      const selectedId = searchParams.get('selected')
      if (selectedId) {
        setSelected(allSavedOutputs.find((item) => item.id === selectedId) ?? null)
      }
    })()
  }, [searchParams])

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return savedOutputs

    return savedOutputs.filter((item) =>
      item.title.toLowerCase().includes(query) ||
      item.agentName.toLowerCase().includes(query) ||
      item.projectName?.toLowerCase().includes(query),
    )
  }, [savedOutputs, search])

  const active = selected && filtered.some((item) => item.id === selected.id) ? selected : filtered[0] ?? null
  const projectLinked = savedOutputs.filter((item) => item.projectId).length

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <header className="overflow-hidden border border-[#d8e5e2] bg-[#fbfbfa]">
        <div className="grid gap-px bg-[#d8e5e2] lg:grid-cols-[1.15fr_0.85fr]">
          <div className="bg-[linear-gradient(135deg,_rgba(23,54,52,0.05),_rgba(143,178,170,0.02))] px-6 py-8 sm:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Output library</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-light tracking-[-0.04em] text-[#173634]">
              Saved deliverables should feel like reusable assets, not leftovers.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#52605d]">
              This library is where execution becomes cumulative: each retained result should point back to a source run
              and, when relevant, to the project that owns it.
            </p>
          </div>

          <div className="grid gap-px bg-[#d8e5e2] sm:grid-cols-3 lg:grid-cols-1">
            {[
              { label: 'Saved outputs', value: savedOutputs.length, note: 'available artifacts' },
              { label: 'Project-linked', value: projectLinked, note: 'attached to workstreams' },
              { label: 'Standalone', value: savedOutputs.length - projectLinked, note: 'library-only items' },
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

      <section className="mt-8 border border-[#d8e5e2] bg-[#fbfbfa]">
        <div className="flex flex-col gap-4 border-b border-[#d8e5e2] bg-[#f1f6f4] px-5 py-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">Archive browser</p>
            <p className="mt-1 text-sm text-[#52605d]">Find outputs by deliverable name, specialist, or project.</p>
          </div>
          <div className="relative w-full max-w-md">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8fb2aa]" />
            <Input
              placeholder="Search saved outputs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 rounded-none border-[#d8e5e2] bg-[#fbfbfa] pl-9 text-sm text-[#173634] placeholder:text-[#173634]/35 focus-visible:ring-[#8fb2aa]"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="px-8 py-16 text-center">
            <p className="text-sm font-medium text-[#173634]">{search ? 'No matching deliverables' : 'No deliverables saved yet'}</p>
            <p className="mt-1 text-xs text-[#52605d]">
              {search ? 'Try a different search term.' : 'Save a deliverable from any completed run.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-px bg-[#d8e5e2] xl:grid-cols-[320px_1fr]">
            <div className="divide-y divide-[#d8e5e2] bg-[#fbfbfa]">
              {filtered.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className={cn(
                    'w-full px-5 py-4 text-left transition-colors hover:bg-[#f1f6f4]',
                    active?.id === item.id && 'bg-[#f1f6f4]',
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#d8e5e2] bg-[#fbfbfa] text-[#8fb2aa]">
                      <Bookmark size={13} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate text-sm font-medium text-[#173634]">{item.title}</p>
                        {active?.id === item.id && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fb2aa]">
                            <Sparkles size={10} />
                            Active
                          </span>
                        )}
                      </div>
                      <p className="mt-1 truncate text-[11px] text-[#52605d]">{item.agentName}</p>
                      <p className="mt-1 text-[11px] text-[#52605d]">{formatDate(item.createdAt)}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {active && (
              <div className="min-w-0 bg-[#fbfbfa] p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">Selected artifact</p>
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#52605d]">{active.agentName}</p>
                    <h2 className="mt-1 text-2xl font-light tracking-[-0.03em] text-[#173634]">{active.title}</h2>
                  </div>
                  <button onClick={() => setSelected(null)} className="shrink-0 text-[#8fb2aa] transition-colors hover:text-[#173634]">
                    <X size={16} />
                  </button>
                </div>

                <div className="mt-5 grid gap-px border border-[#d8e5e2] bg-[#d8e5e2] sm:grid-cols-3">
                  <div className="bg-[#f1f6f4] px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8fb2aa]">Saved on</p>
                    <p className="mt-1 text-sm text-[#173634]">{formatDate(active.createdAt)}</p>
                  </div>
                  <div className="bg-[#f1f6f4] px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8fb2aa]">Format</p>
                    <p className="mt-1 text-sm capitalize text-[#173634]">{active.format}</p>
                  </div>
                  <div className="bg-[#f1f6f4] px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8fb2aa]">Project</p>
                    <p className="mt-1 text-sm text-[#173634]">{active.projectName || 'Unassigned'}</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-4 border-y border-[#d8e5e2] py-3 text-[11px] text-[#52605d]">
                  {active.projectName && (
                    <span className="inline-flex items-center gap-1">
                      <FolderOpen size={10} />
                      {active.projectName}
                    </span>
                  )}
                  <Link href={`/app/history/${active.agentRunId}`} className="inline-flex items-center gap-1 font-semibold uppercase tracking-[0.16em] text-[#8fb2aa] transition-colors hover:text-[#173634]">
                    Source run <ArrowRight size={10} />
                  </Link>
                </div>

                <div className="mt-6 whitespace-pre-wrap text-sm leading-7 text-[#173634]/78">
                  {active.content}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  )
}

export default function SavedPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="border border-[#d8e5e2] bg-[#fbfbfa] px-6 py-12 text-sm text-[#52605d]">
            Loading saved deliverables...
          </div>
        </div>
      }
    >
      <SavedPageContent />
    </Suspense>
  )
}
