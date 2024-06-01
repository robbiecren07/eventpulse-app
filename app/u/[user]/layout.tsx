import Header from '@/components/Header'
import SideBar from '@/components/SideBar'

export default async function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {
    user: string
  }
}) {
  const { user } = params
  return (
    <section className="grid h-screen w-full lg:grid-cols-[280px_1fr]">
      <SideBar userSlug={user} />
      <div className="flex flex-col overflow-hidden">
        <Header />
        <main className="w-full h-full flex-1 overflow-y-auto">{children}</main>
      </div>
    </section>
  )
}
