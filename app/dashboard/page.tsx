import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import ApiKeyForm from '@/components/api-key-form'

export default async function Dashboard() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  const { data: api_keys } = await supabase
    .from('api_keys')
    .select('*')
    .eq('user_id', data.user.id)

  return (
    <>
      <p>Hello {data.user.email}</p>
      <ApiKeyForm apiKeys={api_keys} />
    </>
  )
}
