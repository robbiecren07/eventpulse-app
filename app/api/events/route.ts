import { createClient } from '@/utils/supabase/server'
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  }

  const { apiKey, event, data } = req.body

  if (!apiKey || !event || !data) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const supabase = createClient()
  
  // Verify API Key
  const { data: user, error: userError } = await supabase
    .from('api_keys')
    .select('user_id')
    .eq('api_key', apiKey)
    .single()

  if (userError || !user) {
    return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
  }

  // Insert event into database
  const { error: insertError } = await supabase
    .from('events')
    .insert([
      {
        user_id: user.user_id,
        event_name: event,
        event_data: data,
      },
    ])

  if (insertError) {
    return NextResponse.json({ error: 'Error storing event data' }, { status: 500 })
  }

  return NextResponse.json({ message: 'Event stored successfully' })
}