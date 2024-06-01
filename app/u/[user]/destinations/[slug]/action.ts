'use server'

import { revalidatePath } from 'next/cache'
import { createServiceClient } from '@/utils/supabase/service'
import { BigQuery } from '@google-cloud/bigquery'
import { Destination } from '@/types/custom'

export async function syncData(
  prevState: {
    message: string
  },
  formData: FormData
) {
  const sourceSlug = formData.get('source_slug') as string
  const path = formData.get('path') as string

  const supabase = createServiceClient()

  try {
    // Fetch user-specific BigQuery credentials from Supabase
    const { data: source, error: sourceError } = await supabase
      .from('sources')
      .select('destination')
      .eq('source_slug', sourceSlug)
      .single()

    if (sourceError) {
      return { message: 'Failed to connect to BigQuery.' }
    }

    const destination = source.destination as unknown as Destination
    const { projectId, datasetId, tableId, credentials } = destination

    if (!credentials) {
      return { message: 'BigQuery credentials not found' }
    }

    // Initialize BigQuery client with user-provided credentials
    const bigquery = new BigQuery({
      projectId,
      credentials,
    })

    // Define the schema
    const schema = [
      { name: 'event_name', type: 'STRING', mode: 'REQUIRED' },
      { name: 'event_data', type: 'JSON', mode: 'REQUIRED' },
    ]

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
      return { message: 'No events found to sync.' }
    }

    // Insert each event into BigQuery
    const rows = events.map((event) => ({
      event_name: event.event_name,
      event_data: JSON.stringify(event.event_data),
    }))

    try {
      await dataset.table(tableId).insert(rows)
      revalidatePath(path)
      return { message: 'Events sent to BigQuery successfully!' }
    } catch (error: any) {
      if (error.name === 'PartialFailureError') {
        return { message: `Partial failure occurred: ${JSON.stringify(error, null, 2)}` }
      } else {
        return { message: `Error sending events to BigQuery: ${error}` }
      }
    }
  } catch (e) {
    return { message: `Error sending events to BigQuery: ${e}` }
  }
}
