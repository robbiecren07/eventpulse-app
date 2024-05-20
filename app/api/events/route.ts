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

  // Get IP address with fallback to headers
  const ip = req.ip || req.headers.get('x-forwarded-for')?.split(',').shift()?.trim() || req.headers.get('x-real-ip') || 'unknown'

  // Get geo information with fallbacks
  const geo = {
    city: req.geo?.city || 'unknown',
    country: req.geo?.country || 'unknown',
    latitude: req.geo?.latitude || 'unknown',
    longitude: req.geo?.longitude || 'unknown',
    region: req.geo?.region || 'unknown',
  }

  const rawData = {
    ...eventData,
    context: {
      ...eventData.context,
      ip,
    },
    geo,
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
