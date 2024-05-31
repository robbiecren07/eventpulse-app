'use server'

import { revalidatePath } from 'next/cache'
import { createServiceClient } from '@/utils/supabase/service'
import { z } from 'zod'

export async function addDestination(
  prevState: {
    message: string
  },
  formData: FormData
) {

  const schema = z.object({
    name: z.string().min(1),
    projectID: z.string().min(1),
    datasetID: z.string().min(1),
    tableID: z.string().min(1),
    credentials: z.string().min(1),
  })

  const parse = schema.safeParse({
    name: formData.get('name'),
    projectID: formData.get('projectID'),
    datasetID: formData.get('datasetID'),
    tableID: formData.get('tableID'),
    credentials: formData.get('credentials'),
  })

  if (!parse.success) {
    return { message: 'Failed to create Destination' }
  }

  const data = parse.data

  // Parse credentials JSON string
  let parsedCredentials;
  try {
    parsedCredentials = JSON.parse(data.credentials);
  } catch (e) {
    return { message: 'Invalid JSON in credentials' };
  }

  const sourceID = formData.get('sourceID') as string
  const path = formData.get('path') as string
  const location = formData.get('location') as string

  const destinationData = {
    name: data.name,
    projectId: data.projectID,
    location: location ? location : '',
    datasetId: data.datasetID,
    tableId: data.tableID,
    credentials: parsedCredentials,
  };

  try {
    const supabase = createServiceClient()

    const { error } = await supabase
      .from('sources')
      .update({ destination: destinationData })
      .eq('id', sourceID)

    if (error) {
      return { message: 'Failed to connect to BigQuery.' }
    }

    revalidatePath(path)
    return { message: 'Connected to BigQuery!' }
  } catch (e) {
    return { message: 'Failed to connect to BigQuery.' }
  }
}