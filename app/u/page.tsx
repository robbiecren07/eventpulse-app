import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function UserDashboard() {
  const supabase = createClient()

  const { data: user } = await supabase
    .from('users')
    .select('user_slug')
    .single()

  if (!user) return redirect('/login')

  return redirect(`/u/${user.user_slug}/home`)
}
