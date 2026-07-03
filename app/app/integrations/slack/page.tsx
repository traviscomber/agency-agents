import { Zap, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Slack Integration | AgencyOS',
  description: 'Trigger AgencyOS specialists directly from Slack.',
}

export default function SlackIntegrationPage() {
  const isConnected = false

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <header className="mb-10 border-b border-[#d8e5e2] pb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fb2aa]">Integrations</p>
        <h1 className="mt-2 text-3xl font-light tracking-tight text-[#173634]">Slack</h1>
      </header>

      {!isConnected ? (
        <div className="space-y-6">
          <div className="rounded-none border border-[#d8e5e2] bg-white px-6 py-10 text-center">
            <Zap size={32} className="mx-auto mb-4 text-[#8fb2aa]" />
            <h2 className="text-lg font-semibold text-[#173634]">Connect Slack to AgencyOS</h2>
            <p className="mt-2 text-sm text-[#173634]/60">
              Trigger specialists from Slack messages, slash commands, or app mentions and keep the result tied to the same workspace.
            </p>
            <Button className="mt-6 rounded-lg bg-[#8fb2aa] text-white hover:bg-[#7a9a91]">
              Connect Slack
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-[#173634]">Capabilities</h3>
            <ul className="space-y-2">
              {[
                'Run specialists from @mentions in channels',
                'Use the /run-agent slash command',
                'Get deliverables posted back to Slack',
                'Set up channel notifications for scheduled runs',
                'Share run outputs with the team directly',
              ].map((cap) => (
                <li key={cap} className="flex items-start gap-3 text-sm text-[#173634]/80">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#8fb2aa]" />
                  {cap}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-none border border-[#d8e5e2] bg-[#f1f6f4] px-6 py-4">
            <p className="text-sm font-semibold text-[#173634]">Connected workspace: acme-team</p>
            <p className="mt-1 text-xs text-[#173634]/60">Connected on Mar 15, 2024</p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-[#173634]">Commands</h3>
            <div className="space-y-2">
              {[
                  { cmd: '/run-agent', desc: 'Execute a specialist from Slack' },
                  { cmd: '@agent-os run [agent-slug]', desc: 'Run a specialist via mention' },
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
