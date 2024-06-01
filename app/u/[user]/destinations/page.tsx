import { createClient } from '@/utils/supabase/server'
import { PlusIcon } from '@/components/Icons'
import { LinkButton } from '@/components/ui/link-button'
import { Destination } from '@/types/custom'

async function getSourceData() {
  const supabase = createClient()

  const { data: sources } = await supabase.from('sources').select('*')

  return { sources }
}

export default async function Destinations({ params }: { params: { user: string } }) {
  const { sources } = await getSourceData()

  return (
    <div className="w-full max-w-6xl h-full flex flex-1 flex-col gap-4 lg:gap-8 p-4 lg:p-12">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">My Destinations</h1>
        <LinkButton href={`/u/${params.user}/destinations/setup/bigquery`} className="gap-1">
          <PlusIcon className="w-3 h-3" />
          Add Destination
        </LinkButton>
      </div>

      <div className="flex flex-col">
        <div className="flex h-14 bg-muted/50 border-b border-border">
          <div className="flex-1 shrink-0 flex items-center px-3">
            <span className="text-xs font-medium text-muted-foreground uppercase">Name</span>
          </div>
          <div className="basis-48 flex items-center px-3">
            <span className="text-xs font-medium text-muted-foreground uppercase">Type</span>
          </div>
          <div className="basis-48 flex items-center px-3">
            <span className="text-xs font-medium text-muted-foreground uppercase">Source</span>
          </div>
          <div className="basis-48 flex items-center px-3">
            <span className="text-xs font-medium text-muted-foreground uppercase">Project ID</span>
          </div>
          <div className="basis-48 flex items-center px-3">
            <span className="text-xs font-medium text-muted-foreground uppercase">Dataset ID</span>
          </div>
        </div>

        {sources && sources.length > 0 ? (
          sources.map((source) => {
            if (!source.destination) return null
            const destination = source.destination as unknown as Destination
            return (
              <a
                key={source.id}
                href={`/u/${params.user}/destinations/${source.source_slug}`}
                className="flex h-14 border-b border-l border-r border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 shrink-0 flex items-center gap-3 px-3">
                  <span className="text-sm capitalize">{destination.name}</span>
                </div>
                <div className="basis-48 flex items-center px-3">
                  <span className="text-sm">BigQuery</span>
                </div>
                <div className="basis-48 flex items-center px-3">
                  <span className="text-sm">{source.source_name}</span>
                </div>
                <div className="basis-48 flex items-center px-3">
                  <span className="text-sm">{destination.projectId}</span>
                </div>
                <div className="basis-48 flex items-center px-3">
                  <span className="text-sm">{destination.datasetId}</span>
                </div>
              </a>
            )
          })
        ) : (
          <div className="w-full h-14 flex justify-center items-center">No destinations added yet</div>
        )}
      </div>
    </div>
  )
}
