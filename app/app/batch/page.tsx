import { Upload, CheckCircle, Clock, AlertCircle, Plus } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Batch Processing | N3uralia Studio',
  description: 'Process large batches of data with agents at scale.',
}

export default function BatchPage() {
  const jobs = [
    {
      id: '1',
      agent_slug: 'content-writer',
      status: 'complete',
      total_items: 500,
      processed: 500,
      cost: 75.00,
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: '2',
      agent_slug: 'seo-optimizer',
      status: 'processing',
      total_items: 1000,
      processed: 342,
      cost: 427.50,
      created_at: new Date().toISOString(),
    },
  ]

  const statusIcons = {
    complete: <CheckCircle size={14} className="text-green-600" />,
    processing: <Clock size={14} className="text-blue-600 animate-spin" />,
    failed: <AlertCircle size={14} className="text-red-600" />,
    pending: <Clock size={14} className="text-gray-600" />,
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-10 border-b border-[#d8e5e2] pb-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Processing</p>
            <h1 className="mt-2 text-3xl font-light tracking-tight text-[#173634]">Batch Jobs</h1>
            <p className="mt-2 text-sm leading-relaxed text-[#173634]/60">
              Process 100s-1000s of items with a single agent. Pricing: $0.50 base + $0.01 per item.
            </p>
          </div>
          <Button asChild className="rounded-lg bg-[#8fb2aa] text-white hover:bg-[#7a9a91]">
            <Link href="/app/batch/new">
              <Plus size={14} className="mr-2" />
              New Job
            </Link>
          </Button>
        </div>
      </header>

      <div className="space-y-3">
        {jobs.length === 0 ? (
          <div className="rounded-none border border-[#d8e5e2] bg-[#f1f6f4] px-6 py-10 text-center">
            <Upload size={32} className="mx-auto mb-3 text-[#8fb2aa]" />
            <p className="text-sm text-[#173634]/60">No batch jobs yet. Upload a CSV or JSON file to get started.</p>
          </div>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="rounded-none border border-[#d8e5e2] bg-white p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[#173634]">{job.agent_slug}</h3>
                    <div className="flex items-center gap-1">
                      {statusIcons[job.status as keyof typeof statusIcons]}
                      <span className="text-xs font-medium text-[#173634]/60 capitalize">{job.status}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-[#173634]/60">
                    {job.processed} of {job.total_items} items processed
                  </p>
                  <div className="mt-3 h-2 w-full bg-[#d8e5e2]">
                    <div
                      className="h-2 bg-[#8fb2aa] transition-all"
                      style={{ width: `${(job.processed / job.total_items) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#173634]">${job.cost.toFixed(2)}</p>
                  <p className="text-xs text-[#173634]/60">Estimated cost</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
