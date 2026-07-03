'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { MOCK_SAVED_OUTPUTS } from '@/lib/data/mock-store'
import type { SavedOutput } from '@/lib/types'
import { Bookmark, FolderOpen, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date))
}

export default function SavedPage() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<SavedOutput | null>(null)

  const filtered = MOCK_SAVED_OUTPUTS.filter((item) =>
    !search ||
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.agentName.toLowerCase().includes(search.toLowerCase())
  )

  const active = selected && filtered.some((i) => i.id === selected.id) ? selected : filtered[0] ?? null

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-10 border-b border-[#d8e5e2] pb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Deliverable archive</p>
        <h1 className="mt-2 text-3xl font-light tracking-tight text-[#173634]">Saved deliverables.</h1>
        <p className="mt-2 text-sm leading-relaxed text-[#173634]/60">
          {MOCK_SAVED_OUTPUTS.length} deliverable{MOCK_SAVED_OUTPUTS.length !== 1 ? 's' : ''} available across all runs.
        </p>
      </header>

      <div className="relative mb-6 w-full max-w-xs">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8fb2aa]" />
        <Input
          placeholder="Search deliverables..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 rounded-none border-[#d8e5e2] bg-[#fbfbfa] pl-9 text-sm text-[#173634] placeholder:text-[#173634]/35 focus-visible:ring-[#8fb2aa]"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="border border-[#d8e5e2] px-8 py-16 text-center">
          <p className="text-sm font-medium text-[#173634]">{search ? 'No results found' : 'No deliverables saved yet'}</p>
          <p className="mt-1 text-xs text-[#173634]/45">
            {search ? 'Try a different search term.' : 'Save a deliverable from any completed run.'}
          </p>
        </div>
      ) : (
        <div className="flex gap-px border border-[#d8e5e2] bg-[#d8e5e2]">
          {/* List */}
          <div className="w-64 shrink-0 divide-y divide-[#d8e5e2] bg-[#fbfbfa]">
            {filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected(item)}
                className={cn(
                  'w-full px-4 py-4 text-left transition-colors hover:bg-[#f1f6f4]',
                  active?.id === item.id && 'bg-[#f1f6f4]'
                )}
              >
                <div className="flex items-start gap-2.5">
                  <Bookmark size={12} className={cn('mt-0.5 shrink-0', active?.id === item.id ? 'text-[#8fb2aa]' : 'text-[#d8e5e2]')} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[#173634]">{item.title}</p>
                    <p className="mt-0.5 truncate text-[10px] text-[#173634]/45">{item.agentName}</p>
                    <p className="mt-0.5 text-[10px] text-[#173634]/30">{formatDate(item.createdAt)}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Detail */}
          {active && (
            <div className="min-w-0 flex-1 bg-[#fbfbfa] p-6">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8fb2aa]">{active.agentName}</p>
                  <h2 className="mt-1 text-xl font-light text-[#173634]">{active.title}</h2>
                </div>
                <button onClick={() => setSelected(null)} className="shrink-0 text-[#d8e5e2] transition-colors hover:text-[#173634]">
                  <X size={16} />
                </button>
              </div>

              <div className="mb-5 flex flex-wrap items-center gap-4 border-y border-[#d8e5e2] py-3 text-[11px] text-[#173634]/40">
                <span>Saved {formatDate(active.createdAt)}</span>
                {active.projectName && (
                  <span className="inline-flex items-center gap-1">
                    <FolderOpen size={10} />{active.projectName}
                  </span>
                )}
              </div>

              <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#173634]/75">{active.content}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
