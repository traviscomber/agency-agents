import { AppSidebar } from '@/components/app/AppSidebar'
import { AppHeader } from '@/components/app/AppHeader'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate flex min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_26%),radial-gradient(circle_at_top_right,_rgba(201,213,225,0.32),_transparent_28%),linear-gradient(to_bottom,_#f8fafc,_#ffffff_24%,_#f8fafc_100%)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(to_bottom,rgba(15,23,42,0.05),transparent)]" />
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader />
        <main className="relative flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
