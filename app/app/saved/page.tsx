'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MOCK_SAVED_OUTPUTS } from '@/lib/data/mock-store'
import type { SavedOutput } from '@/lib/types'
import { Bookmark, FolderOpen, Search, Sparkles, X } from 'lucide-react'
import { cn } from '@/lib/utils'

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export default function SavedPage() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<SavedOutput | null>(null)

  const filtered = MOCK_SAVED_OUTPUTS.filter((item) => {
    if (!search) return true
    return item.title.toLowerCase().includes(search.toLowerCase()) || item.agentName.toLowerCase().includes(search.toLowerCase())
  })

  const active = selected && filtered.some((item) => item.id === selected.id) ? selected : filtered[0] ?? null

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#ffffff_56%,#f8fafc_100%)] p-6 shadow-[0_18px_60px_-44px_rgba(15,23,42,0.45)] sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-700">
              <Bookmark size={12} className="text-primary" />
              Library
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-700">
              Knowledge base
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Saved outputs with a stronger sense of hierarchy.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-700 sm:text-base">
              Search outputs, inspect the source run, and keep the most useful deliverables easy to retrieve later.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:min-w-[280px]">
            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-3 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-700">Saved</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">{MOCK_SAVED_OUTPUTS.length}</p>
            </div>
            <div className="rounded-[1.25rem] border border-slate-200 bg-slate-950 p-3 text-white shadow-[0_18px_40px_-24px_rgba(15,23,42,0.9)]">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">Visible</p>
              <p className="mt-1 text-2xl font-semibold">{filtered.length}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">
          <div className="relative max-w-xl">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-700" />
            <Input
              placeholder="Search saved outputs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 bg-white pl-9 text-sm"
            />
          </div>

          {filtered.length === 0 ? (
            <div className="mt-6 rounded-[28px] border border-slate-200 bg-white p-12 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <Bookmark size={26} />
              </div>
              <h3 className="text-base font-semibold text-foreground">{search ? 'No results' : 'No saved outputs yet'}</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-700">
                {search ? 'Try a different search term.' : 'Save agent outputs during a run to find them here.'}
              </p>
              {!search && (
                <Button size="sm" asChild className="mt-6">
                  <Link href="/app/agents">Run an agent</Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {filtered.map((saved) => (
                <article
                  key={saved.id}
                  onClick={() => setSelected(saved)}
                  className={cn(
                    'group cursor-pointer rounded-[24px] border bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)] transition-transform duration-200 hover:-translate-y-0.5',
                    active?.id === saved.id ? 'border-slate-950/40' : 'border-slate-200'
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="truncate text-sm font-semibold text-foreground">{saved.title}</h2>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-700">{saved.agentName}</p>
                    </div>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
                      <Bookmark size={16} />
                    </div>
                  </div>

                  <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-700">{saved.content}</p>

                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-200 pt-4">
                    <span className="flex items-center gap-1.5 text-xs text-slate-700">
                      <FolderOpen size={11} />
                      {saved.projectName || 'No project'}
                    </span>
                    <span className="text-xs text-slate-700">{formatDate(saved.createdAt)}</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <aside className="lg:w-[360px]">
          <div className="sticky top-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.45)]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-700">Preview</p>
            {active ? (
              <div className="mt-4">
                <h3 className="text-base font-semibold text-foreground">{active.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-700">{active.agentName}</p>
                <div className="mt-4 rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-4">
                  <p className="whitespace-pre-wrap text-sm leading-6 text-foreground">{active.content}</p>
                </div>
                <div className="mt-4 space-y-2 border-t border-slate-200 pt-4 text-xs text-slate-700">
                  <p className="flex items-center gap-1.5">
                    <FolderOpen size={11} />
                    {active.projectName || 'No project linked'}
                  </p>
                  <p>{formatDate(active.createdAt)}</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href="/app/history">Open history</Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="px-3" onClick={() => setSelected(null)}>
                    <X size={14} />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 text-sm text-slate-700">
                <div className="mb-2 flex items-center gap-2 font-medium text-foreground">
                  <Sparkles size={14} className="text-primary" />
                  Preview panel
                </div>
                Select a saved output to inspect the preview and the source context.
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
