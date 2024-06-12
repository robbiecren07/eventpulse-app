import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const supabase = createClient()

  const { data: user } = await supabase.from('users').select('*').single()

  if (!user) return redirect('/login')

  const cookieStore = cookies()

  const subscriptionLevelCookie = cookieStore.get('subscription_level')

  if (!subscriptionLevelCookie) {
    // Set subscription level cookie
    cookieStore.set('subscription_level', user.subscription_level, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      httpOnly: false,
    })
  }

  return redirect(`/u/${user.user_slug}/home`)
}
