'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MOCK_SAVED_OUTPUTS } from '@/lib/data/mock-store'
import type { SavedOutput } from '@/lib/types'
import { Bookmark, FolderOpen, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground mb-1">Saved outputs</h1>
        <p className="text-sm text-muted-foreground">
          {MOCK_SAVED_OUTPUTS.length} saved deliverables from your agent runs.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-sm mb-6">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search saved outputs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-9 text-sm"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-border bg-white p-12 text-center">
          <Bookmark size={32} className="mx-auto text-muted-foreground/40 mb-3" />
          <h3 className="text-sm font-medium text-foreground mb-2">
            {search ? 'No results' : 'No saved outputs yet'}
          </h3>
          <p className="text-xs text-muted-foreground mb-5">
            {search
              ? 'Try a different search term.'
              : 'Save agent outputs during a run to find them here.'}
          </p>
          {!search && (
            <Button size="sm" asChild>
              <Link href="/app/agents">Run an agent</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className={cn('grid gap-4', selected ? 'lg:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3')}>
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(selected?.id === item.id ? null : item)}
              className={cn(
                'text-left flex flex-col p-5 rounded-lg border bg-white transition-all hover:shadow-sm',
                selected?.id === item.id
                  ? 'border-primary ring-1 ring-primary/20'
                  : 'border-border hover:border-primary/30'
              )}
            >
              <div className="flex items-start gap-2 mb-2">
                <Bookmark size={14} className="text-muted-foreground shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground truncate mb-0.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{item.agentName}</p>
                </div>
              </div>

              {item.projectName && (
                <p className="text-xs text-muted-foreground/60 flex items-center gap-1 mb-2">
                  <FolderOpen size={10} />
                  {item.projectName}
                </p>
              )}

              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                {item.content}
              </p>

              <p className="text-[11px] text-muted-foreground mt-3">
                {new Date(item.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </button>
          ))}

          {/* Detail panel */}
          {selected && (
            <div className="lg:col-span-1 rounded-lg border border-border bg-white p-6 self-start sticky top-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-0.5">{selected.title}</h3>
                  <p className="text-xs text-muted-foreground">{selected.agentName}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-1 text-muted-foreground hover:text-foreground"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="prose prose-sm max-w-none">
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {selected.content}
                </p>
              </div>
              {selected.projectName && (
                <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1 pt-4 border-t border-border">
                  <FolderOpen size={10} />
                  {selected.projectName}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
