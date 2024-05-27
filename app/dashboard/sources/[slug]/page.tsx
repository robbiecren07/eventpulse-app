import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Menu } from './Menu'

export default async function JavaScript({
  params,
}: {
  params: { slug: string }
}) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/')
  }

  return (
    <div className="w-full h-full flex flex-1 flex-col gap-4 lg:gap-8">
      <Menu sourceSlug={params.slug} />
      <h1></h1>
    </div>
  )
}
