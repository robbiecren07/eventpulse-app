import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/utils/supabase/service'
import { BigQuery } from '@google-cloud/bigquery'
import { Destination } from '@/types/custom'

export async function POST(req: NextRequest) {
  const { sourceSlug } = await req.json()

  const supabase = createServiceClient()

  try {
    // Fetch user-specific BigQuery credentials from Supabase
    const { data: source, error: sourceError } = await supabase
      .from('sources')
      .select('destination')
      .eq('source_slug', sourceSlug)
      .single()

    if (sourceError || !source) {
      throw new Error('Invalid source slug or source not found')
    }

    const destination = source.destination as unknown as Destination
    const { projectId, datasetId, tableId, credentials } = destination

    if (!credentials) {
      throw new Error('BigQuery credentials not found')
    }

    // Initialize BigQuery client with user-provided credentials
    const bigquery = new BigQuery({
      projectId,
      credentials,
    })

    // Define the schema
    const schema = [{ name: 'event_data', type: 'JSON', mode: 'REQUIRED' }]

    // Check if table exists, create if not
    const dataset = bigquery.dataset(datasetId)
    const [tableExists] = await dataset.table(tableId).exists()

    if (!tableExists) {
      await dataset.createTable(tableId, { schema })
    }

    // Fetch all events for the given source
    const { data: events, error: eventsError } = await supabase
      .from('javascript_events')
      .select('*')
      .eq('source_slug', sourceSlug)

    if (eventsError) {
      throw new Error(eventsError.message)
    }

    // Insert each event into BigQuery
    const rows = events.map((event) => ({
      event_data: event.event_data,
    }))

    await bigquery.dataset(datasetId).table(tableId).insert(rows)

    return NextResponse.json({ message: 'Events sent to BigQuery successfully!' }, { status: 200 })
  } catch (error) {
    console.error('Error sending events to BigQuery:', error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
