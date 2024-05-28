'use server'

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { v4 as uuidv4 } from 'uuid'

export async function createJavaScriptSource(formData: FormData) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User not found')
  }

  const apiKey = uuidv4()

  const  { error } = await supabase.from('sources').insert({
    user_id: user.id,
    source_name: formData.get('name') as string || 'JavaScript',
    api_key: apiKey,
    type: 'javascript',
    connection_type: 'Event Streams',
    category: 'Website',
    website_url: formData.get('website') as string,
  })

  if (error) {
    throw new Error('Error generating API key')
  }

  redirect('/dashboard/sources/javascript')
}