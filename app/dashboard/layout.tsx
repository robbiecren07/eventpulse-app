import Header from '@/components/Header'
import SideBar from '@/components/SideBar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <SideBar />
      <div className="flex flex-col overflow-hidden">
        <Header />
        <main className="w-full flex-1">{children}</main>
      </div>
    </section>
  )
}
