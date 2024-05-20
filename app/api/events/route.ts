import { createServiceClient } from '@/utils/supabase/service'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { apiKey, event, eventData } = await req.json()

  if (!apiKey || !event || !eventData) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Create Supabase client using the service role
  const supabase = createServiceClient()

  // Verify API Key
  const { data: user, error: userError } = await supabase
    .from('api_keys')
    .select('user_id')
    .eq('api_key', apiKey)
    .single()

  if (userError || !user) {
    return NextResponse.json({ error: 'Invalid API key', details: userError ? userError.message : 'No user found' }, { status: 401 })
  }

  const rawData = {
    ...eventData,
    context: {
      ...eventData.context,
      ip: req.ip,
    },
    geo: {
      city: req.geo?.city,
      country: req.geo?.country,
      latitude: req.geo?.latitude,
      longitude: req.geo?.longitude,
      region: req.geo?.region,
    },
  }

  // Insert event into database
  const { error: insertError } = await supabase
    .from('events')
    .insert({
        user_id: user.user_id,
        event_name: event,
        event_data: rawData
      })

  if (insertError) {
    return NextResponse.json({ error: 'Error storing event data', details: insertError ? insertError.message : 'No user found' }, { status: 500 })
  }

  return NextResponse.json({ message: 'Event stored successfully' }, { status: 200 })
}
