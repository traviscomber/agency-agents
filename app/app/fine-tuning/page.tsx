import { Upload, Plus, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Fine-Tuning | N3uralia',
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
      completed_at: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'SEO Optimizer Beta',
      agent_slug: 'seo-optimizer',
      status: 'training',
      samples_count: 85,
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

      <div className="space-y-3">
        {models.map((model) => (
          <div key={model.id} className="rounded-none border border-[#d8e5e2] bg-white px-6 py-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-[#173634]">{model.name}</h3>
                  <div className="flex items-center gap-1">
                    {statusIcons[model.status as keyof typeof statusIcons]}
                    <span className="text-xs font-medium text-[#173634]/60 capitalize">{model.status}</span>
                  </div>
                </div>
                <p className="mt-1 text-sm text-[#173634]/60">Based on {model.agent_slug}</p>
                <p className="mt-2 text-xs text-[#555a56]">{model.samples_count} training samples</p>
              </div>
              {model.status === 'ready' && (
                <Button
                  asChild
                  className="rounded-lg border border-[#d8e5e2] bg-white text-[#173634] hover:bg-[#f1f6f4]"
                >
                  <Link href={`/app/fine-tuning/${model.id}`}>Deploy</Link>
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
