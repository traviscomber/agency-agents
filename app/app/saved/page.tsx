'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MOCK_SAVED_OUTPUTS } from '@/lib/data/mock-store'
import type { SavedOutput } from '@/lib/types'
import { Bookmark, FolderOpen, Search, X } from 'lucide-react'
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

  const filtered = MOCK_SAVED_OUTPUTS.filter((s) => {
    if (!search) return true
    return (
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.agentName.toLowerCase().includes(search.toLowerCase())
    )
  })

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <div className="rounded-[28px] border border-border/70 bg-gradient-to-br from-white via-white to-muted/30 p-6 sm:p-8 shadow-[0_18px_60px_-44px_rgba(15,23,42,0.45)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground mb-3">
              Library
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              Saved outputs that feel like a real internal knowledge base.
            </h1>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl">
              Search outputs, inspect the source run, and keep the best deliverables easy to retrieve later.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:min-w-[280px]">
            <div className="rounded-2xl border border-border bg-white/80 p-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Saved</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">{MOCK_SAVED_OUTPUTS.length}</p>
            </div>
            <div className="rounded-2xl border border-border bg-white/80 p-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Visible</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">{filtered.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">
          <div className="relative max-w-xl">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search saved outputs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10 text-sm bg-white"
            />
          </div>

          {filtered.length === 0 ? (
            <div className="mt-6 rounded-[28px] border border-border bg-white p-12 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-muted/40">
                <Bookmark size={26} className="text-muted-foreground" />
              </div>
              <h3 className="text-base font-semibold text-foreground">{search ? 'No results' : 'No saved outputs yet'}</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
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
                    selected?.id === saved.id ? 'border-foreground/40' : 'border-border'
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="truncate text-sm font-semibold text-foreground">{saved.title}</h2>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        {saved.agentName}
                      </p>
                    </div>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-muted/70 text-foreground">
                      <Bookmark size={16} />
                    </div>
                  </div>

                  <p className="mt-4 line-clamp-4 text-sm leading-6 text-muted-foreground">
                    {saved.content}
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <FolderOpen size={11} />
                      {saved.projectName || 'No project'}
                    </span>
                    <span className="text-xs text-muted-foreground">{formatDate(saved.createdAt)}</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <aside className="lg:w-[360px]">
          <div className="sticky top-4 rounded-[28px] border border-border bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Preview</p>
            {selected ? (
              <div className="mt-4">
                <h3 className="text-base font-semibold text-foreground">{selected.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{selected.agentName}</p>
                <div className="mt-4 rounded-2xl border border-border bg-muted/30 p-4">
                  <p className="text-sm leading-6 whitespace-pre-wrap text-foreground">{selected.content}</p>
                </div>
                <div className="mt-4 space-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
                  <p className="flex items-center gap-1.5">
                    <FolderOpen size={11} />
                    {selected.projectName || 'No project linked'}
                  </p>
                  <p>{formatDate(selected.createdAt)}</p>
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
              <div className="mt-4 rounded-2xl border border-dashed border-border bg-muted/20 p-5 text-sm text-muted-foreground">
                Select a saved output to inspect the preview and the source context.
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
