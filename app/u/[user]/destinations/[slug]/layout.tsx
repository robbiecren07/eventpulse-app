export default async function SlugLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {
    user: string
    slug: string
  }
}) {
  return <div className="flex-1 flex flex-col h-full">{children}</div>
}
