import Link from 'next/link'
import { ArrowRight, Zap, Lock, Layers } from 'lucide-react'

export const metadata = {
  title: 'AgencyOS | AI Agent Workspace',
  description: 'Build, manage, and scale specialist AI agents. No credit card required.',
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fbfbfa] to-[#f1f6f4]">
      {/* Navigation */}
      <nav className="border-b border-[#d8e5e2] bg-[#fbfbfa]">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center border border-[#8fb2aa] bg-[#f1f6f4] text-[11px] font-semibold text-[#173634]">
                AO
              </span>
              <span className="font-semibold text-[#173634]">AgencyOS</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/pricing" className="text-sm text-[#555a56] hover:text-[#173634]">
                Pricing
              </Link>
              <Link href="/login" className="text-sm font-semibold text-[#173634] hover:underline">
                Sign in
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded bg-[#173634] px-4 py-2 text-sm font-semibold text-[#f5fbfa] hover:bg-[#0d1f1d]"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-6 inline-flex items-center gap-2 border border-[#d8e5e2] bg-[#f1f6f4] px-3 py-1.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8fb2aa]" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#555a56]">Introducing AgencyOS</span>
          </div>

          <h1 className="text-5xl font-light tracking-tight text-[#173634] sm:text-6xl">
            Build AI agents that work for you
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#555a56]">
            No code required. Deploy specialist agents in minutes. Manage teams, automate workflows, and scale your operations.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded bg-[#173634] px-6 py-3 font-semibold text-[#f5fbfa] hover:bg-[#0d1f1d]"
            >
              Start free <ArrowRight size={16} />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded border border-[#d8e5e2] px-6 py-3 font-semibold text-[#173634] hover:bg-[#f1f6f4]"
            >
              View pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="rounded border border-[#d8e5e2] bg-white p-6">
            <Zap size={24} className="mb-4 text-[#8fb2aa]" />
            <h3 className="mb-2 text-lg font-semibold text-[#173634]">Instant Deployment</h3>
            <p className="text-sm text-[#555a56]">
              Create powerful agents in seconds. No infrastructure setup or complex configurations needed.
            </p>
          </div>

          <div className="rounded border border-[#d8e5e2] bg-white p-6">
            <Lock size={24} className="mb-4 text-[#8fb2aa]" />
            <h3 className="mb-2 text-lg font-semibold text-[#173634]">Secure & Private</h3>
            <p className="text-sm text-[#555a56]">
              Enterprise-grade security with full data encryption and role-based access control.
            </p>
          </div>

          <div className="rounded border border-[#d8e5e2] bg-white p-6">
            <Layers size={24} className="mb-4 text-[#8fb2aa]" />
            <h3 className="mb-2 text-lg font-semibold text-[#173634]">Scale Seamlessly</h3>
            <p className="text-sm text-[#555a56]">
              From hobby projects to enterprise workloads. Pay only for what you use.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-[#d8e5e2] bg-white p-8 text-center sm:p-12">
          <h2 className="text-3xl font-semibold text-[#173634]">Ready to get started?</h2>
          <p className="mt-4 text-[#555a56]">20 free agent runs per month. No credit card required.</p>
          <Link
            href="/signup"
            className="mt-6 inline-flex items-center gap-2 rounded bg-[#173634] px-6 py-3 font-semibold text-[#f5fbfa] hover:bg-[#0d1f1d]"
          >
            Create your workspace <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#d8e5e2] bg-[#fbfbfa] py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-4">
            <div>
              <h4 className="font-semibold text-[#173634]">Product</h4>
              <ul className="mt-4 space-y-2 text-sm text-[#555a56]">
                <li><Link href="/pricing" className="hover:text-[#173634]">Pricing</Link></li>
                <li><Link href="/agents" className="hover:text-[#173634]">Agents</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#173634]">Legal</h4>
              <ul className="mt-4 space-y-2 text-sm text-[#555a56]">
                <li><Link href="/terms" className="hover:text-[#173634]">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-[#173634]">Privacy</Link></li>
              </ul>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs text-[#a7b9b4]">&copy; {new Date().getFullYear()} AgencyOS. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
