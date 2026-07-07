import { Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Slack connector | N3uralia Twin OS',
  description: 'Route Slack messages into supervised Twin OS operating routines.',
}

export default function SlackIntegrationPage() {
  const isConnected = false

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <header className="mb-10 border-b border-[#d8e5e2] pb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Connectors</p>
        <h1 className="mt-2 text-3xl font-light tracking-tight text-[#173634]">Slack operating connector</h1>
        <p className="mt-3 text-sm leading-7 text-[#52605d]">
          Turn channel context into supervised twin routines, project memory, handoff packets, and reviewable deliverables.
        </p>
      </header>

      {!isConnected ? (
        <div className="space-y-6">
          <div className="rounded-none border border-[#d8e5e2] bg-white px-6 py-10 text-center">
            <Zap size={32} className="mx-auto mb-4 text-[#8fb2aa]" />
            <h2 className="text-lg font-semibold text-[#173634]">Connect Slack to Twin OS programs</h2>
            <p className="mt-2 text-sm text-[#173634]/60">
              Trigger role twins from Slack messages, slash commands, or app mentions while keeping outputs tied to the right program, owner, and approval boundary.
            </p>
            <Button className="mt-6 bg-[#8fb2aa] text-white hover:bg-[#7a9a91]">
              Connect Slack
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-[#173634]">Capabilities</h3>
            <ul className="space-y-2">
              {[
                'Run gemelos digitales from approved channel context',
                'Use /run-twin to start a supervised operating routine',
                'Post deliverables back with owner, next step, and approval status',
                'Notify channels when scheduled routines need human review',
                'Keep Slack output linked to program memory and saved artifacts',
              ].map((cap) => (
                <li key={cap} className="flex items-start gap-3 text-sm text-[#173634]/80">
                  <span className="mt-1 h-2 w-2 bg-[#8fb2aa]" />
                  {cap}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-none border border-[#d8e5e2] bg-[#f1f6f4] px-6 py-4">
            <p className="text-sm font-semibold text-[#173634]">Connected workspace: n3uralia-ops</p>
            <p className="mt-1 text-xs text-[#173634]/60">Connected on Mar 15, 2024</p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-[#173634]">Commands</h3>
            <div className="space-y-2">
              {[
                  { cmd: '/run-twin [gemelo-slug]', desc: 'Start a supervised twin routine from Slack' },
                  { cmd: '@n3uralia run [gemelo-slug]', desc: 'Run a gemelo with channel context and handoff tracking' },
              ].map((item) => (
                <div key={item.cmd} className="rounded-none border border-[#d8e5e2] bg-white px-4 py-3">
                  <p className="font-mono text-sm font-semibold text-[#173634]">{item.cmd}</p>
                  <p className="mt-1 text-xs text-[#173634]/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
