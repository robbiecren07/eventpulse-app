'use server'

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { v4 as uuidv4 } from 'uuid'

export async function generateApiKey(formData: FormData) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User not found')
  }

  const apiKey = uuidv4()

  const  { error } = await supabase.from('api_keys').insert({
    user_id: user.id,
    api_key: apiKey
  })

  if (error) {
    throw new Error('Error generating API key')
  }

  revalidatePath('/dashboard')
}