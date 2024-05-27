import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function JavaScript() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/')
  }

  return (
    <div>
      <h1>JavaScript</h1>
    </div>
  )
}
