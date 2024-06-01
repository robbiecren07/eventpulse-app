import { createClient } from '@/utils/supabase/server'
import { Destination } from '@/types/custom'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SyncDataForm } from './SyncDataForm'
import { DotIcon } from '@/components/Icons'

export default async function Slug({
  params,
}: {
  params: {
    user: string
    slug: string
  }
}) {
  const supabase = createClient()

  const { data: source } = await supabase.from('sources').select('*').eq('source_slug', params.slug).single()

  if (!source) {
    return <h1>Destination not found</h1>
  }

  const destination = source.destination as unknown as Destination

  return (
    <div className="w-full h-full flex flex-col p-4 lg:p-12 overflow-x-hidden overflow-y-auto">
      <div className="w-full max-w-2xl flex flex-col gap-6 pb-5 border-b">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-5">
            <h1 className="text-2xl font-medium">{destination.name}</h1>
            <div className="flex gap-3 items-center">
              <span className="w-2 h-2 text-green-600">
                <DotIcon className="w-2 h-2" />
              </span>
              <span className="text-primary/80">Connected</span>
            </div>
          </div>
          <SyncDataForm sourceSlug={params.slug} />
        </div>
        <form className="w-full space-y-6">
          <div className="flex flex-col gap-1">
            <Label htmlFor="name" className="text-base font-medium">
              Destination Name
            </Label>
            <Input id="name" name="name" type="text" value={destination.name} readOnly />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="sourceID" className="text-base font-medium">
              Source
            </Label>
            <Input id="sourceID" name="sourceID" type="text" value={source.source_name} readOnly />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="projectID" className="text-base font-medium">
              Project ID
            </Label>
            <Input id="projectID" name="projectID" type="text" value={destination.projectId} readOnly />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="location" className="text-base font-medium">
              Location
            </Label>
            <Input id="location" name="location" type="text" value={destination.location} readOnly />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="datasetID" className="text-base font-medium">
              Dataset ID
            </Label>
            <Input id="datasetID" name="datasetID" type="text" value={destination.datasetId} readOnly />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="tableID" className="text-base font-medium">
              Table ID
            </Label>
            <Input id="tableID" name="tableID" type="text" value={destination.tableId} readOnly />
          </div>
        </form>
      </div>
    </div>
  )
}
