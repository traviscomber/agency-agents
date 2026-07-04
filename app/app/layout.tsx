import { AppSidebar } from '@/components/app/AppSidebar'
import { AppHeader } from '@/components/app/AppHeader'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="n3-app-shell relative flex min-h-screen overflow-hidden" style={{ backgroundColor: '#f1f6f4' }}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top_left,_rgba(143,178,170,0.22),_transparent_58%)]" />
        <div className="absolute right-[-10%] top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(23,54,52,0.08),_transparent_70%)] blur-3xl" />
      </div>
      <AppSidebar />
      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <AppHeader />
        <main className="relative flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
