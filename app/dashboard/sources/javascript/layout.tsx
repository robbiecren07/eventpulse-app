import { Menu } from './Menu'

export default function JavaScriptLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full h-full flex flex-1 flex-col gap-4 lg:gap-8">
      <Menu />
      {children}
    </div>
  )
}
