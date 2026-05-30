import NavigationBar from '@/components/dashboard/NavigationBar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavigationBar />
      <main className="px-8 py-6">
        {children}
      </main>
    </>
  )
}
