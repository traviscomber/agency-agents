import { AppSidebar } from '@/components/app/AppSidebar'
import { AppHeader } from '@/components/app/AppHeader'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader />
        <main className="flex-1 bg-[radial-gradient(circle_at_top_right,_rgba(15,23,42,0.04),_transparent_32%)]">
          {children}
        </main>
      </div>
    </div>
  )
}
