import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import Form from './Form'

export default async function Page() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/')
  }

  return (
    <div className="w-full max-w-3xl h-full flex flex-1 flex-col gap-4 lg:gap-8 p-4 lg:p-12">
      <h1 className="text-xl font-semibold">Source setup</h1>
      <Form />
    </div>
  )
}
