import { createClient } from '@/utils/supabase/server'
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'
import { Form } from './Form'

export default async function BigQuery() {
  const supabase = createClient()

  const { data: sources } = await supabase.from('sources').select('*')

  return (
    <div className="w-full h-full flex flex-col gap-6 p-4 lg:p-12 overflow-x-hidden overflow-y-auto">
      <h1>Destinations</h1>

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Connect BigQuery Data Warehouse</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form sources={sources || []} />
        </CardContent>
      </Card>
    </div>
  )
}
