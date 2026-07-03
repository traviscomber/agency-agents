import { Upload, Plus, CheckCircle, Clock, AlertCircle, Zap, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Fine-Tuning | AgencyOS',
  description: 'Train custom models on your proprietary data.',
}

export default function FineTuningPage() {
  const models = [
    {
      id: '1',
      name: 'Content Writer v2',
      agent_slug: 'content-writer',
      status: 'ready',
      samples_count: 150,
      accuracy: 94.2,
      completed_at: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'SEO Optimizer Beta',
      agent_slug: 'seo-optimizer',
      status: 'training',
      samples_count: 85,
      progress: 67,
      eta: '2h 15m',
    },
  ]

  const statusIcons = {
    ready: <CheckCircle size={14} className="text-green-600" />,
    training: <Clock size={14} className="text-blue-600 animate-spin" />,
    failed: <AlertCircle size={14} className="text-red-600" />,
    pending: <Clock size={14} className="text-gray-600" />,
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-10 border-b border-[#d8e5e2] pb-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Advanced</p>
            <h1 className="mt-2 text-3xl font-light tracking-tight text-[#173634]">Fine-Tuning</h1>
            <p className="mt-2 text-sm leading-relaxed text-[#173634]/60">
              Train custom models on your proprietary data to improve accuracy and domain specificity.
            </p>
          </div>
          <Button asChild className="rounded-lg bg-[#8fb2aa] text-white hover:bg-[#7a9a91]">
            <Link href="/app/fine-tuning/new">
              <Plus size={14} className="mr-2" />
              New Model
            </Link>
          </Button>
        </div>
      </header>

      {/* Dataset upload zone */}
      <div className="mb-10 rounded-none border-2 border-dashed border-[#d8e5e2] bg-[#f1f6f4] p-8 text-center">
        <Upload size={24} className="mx-auto text-[#8fb2aa] mb-3" />
        <p className="text-sm font-semibold text-[#173634]">Upload Training Dataset</p>
        <p className="mt-1 text-xs text-[#173634]/50">Drag & drop CSV or JSONL files here, or click to browse</p>
        <Button variant="outline" className="mt-4 h-8 rounded-none border-[#d8e5e2] text-xs font-semibold uppercase tracking-[0.12em] text-[#173634] hover:bg-[#fbfbfa]">
          Select Files
        </Button>
      </div>

      {/* Models list */}
      <div className="space-y-4">
        {models.map((model) => (
          <div key={model.id} className="rounded-none border border-[#d8e5e2] bg-white px-6 py-5">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-[#173634]">{model.name}</h3>
                  <div className="flex items-center gap-1">
                    {statusIcons[model.status as keyof typeof statusIcons]}
                    <span className="text-[10px] font-medium text-[#173634]/60 uppercase tracking-[0.12em]">{model.status}</span>
                  </div>
                </div>
                <p className="mt-1 text-xs text-[#173634]/50">Based on {model.agent_slug}</p>
                
                {/* Progress bar for training models */}
                {model.status === 'training' && 'progress' in model && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-medium text-[#173634]/50">Training Progress</span>
                      <span className="text-[10px] font-bold text-[#8fb2aa]">{model.progress}%</span>
                    </div>
                    <div className="h-1.5 border border-[#d8e5e2] bg-[#fbfbfa]">
                      <div style={{ width: `${model.progress}%` }} className="h-full bg-[#8fb2aa]" />
                    </div>
                    <p className="mt-1 text-[10px] text-[#173634]/40">ETA: {model.eta}</p>
                  </div>
                )}

                {/* Metrics for ready models */}
                {model.status === 'ready' && 'accuracy' in model && (
                  <div className="mt-3 flex gap-6">
                    <div>
                      <p className="text-[10px] text-[#173634]/50">Accuracy</p>
                      <p className="text-sm font-semibold text-[#8fb2aa]">{model.accuracy}%</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#173634]/50">Samples</p>
                      <p className="text-sm font-semibold text-[#173634]">{model.samples_count}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 shrink-0">
                {model.status === 'ready' && (
                  <>
                    <Button variant="outline" className="h-8 rounded-none border-[#d8e5e2] px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#173634] hover:bg-[#f1f6f4]">
                      Test
                    </Button>
                    <Button asChild className="h-8 rounded-none bg-[#173634] px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-[#1e3431]">
                      <Link href={`/app/fine-tuning/${model.id}`}>Deploy</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
