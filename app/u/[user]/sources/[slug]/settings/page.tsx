import { createClient } from '@/utils/supabase/server'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default async function Settings({
  params,
}: {
  params: {
    user: string
    slug: string
  }
}) {
  const supabase = createClient()

  const { data: source } = await supabase.from('sources').select('*').eq('source_slug', params.slug).single()

  return (
    <div className="w-full h-full flex flex-col gap-6 p-4 lg:p-12 overflow-x-hidden overflow-y-auto">
      <h1>Settings</h1>

      {source && (
        <form className="w-full max-w-4xl space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="sourceID">Source ID</Label>
            <p className="text-sm text-primary/80">For webhooks and S3 integrations, you can differentiate sources by the source id.</p>
            <Input id="sourceID" readOnly type="text" value={source.id} className="cursor-text" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="apiKey">API Key</Label>
            <p className="text-sm text-primary/80">
              Use this key to send data to this source from our partners, plugins, libraries or REST API.
            </p>
            <Input id="apiKey" readOnly type="text" value={source.api_key} className="cursor-text" />
          </div>
          <Button disabled>Generate New Key</Button>
        </form>
      )}
    </div>
  )
}
