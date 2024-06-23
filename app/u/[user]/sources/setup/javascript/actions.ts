'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

export async function createJavaScriptSource(
  prevState: {
    message: string
  },
  formData: FormData
) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { message: 'Failed to verify user.' }
  }

  const apiKey = uuidv4()

  const { error } = await supabase.from('sources').insert({
    user_id: user.id,
    source_name: (formData.get('name') as string) || 'JavaScript',
    api_key: apiKey,
    type: 'javascript',
    connection_type: 'Event Streams',
    category: 'Website',
    website_url: formData.get('website') as string,
    destination: {},
  })

  if (error) {
    return { message: 'Failed to generate API key.' }
  }

  const { data } = await supabase.from('sources').select('source_slug').eq('api_key', apiKey).single()

  if (!data || !data || !data.source_slug) {
    return { message: 'Failed to create new source.' }
  }

  const userSlug = formData.get('user') as string

  redirect(`/u/${userSlug}/sources/${data.source_slug}`)
}
