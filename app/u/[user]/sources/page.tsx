import { createClient } from '@/utils/supabase/server'
import { PlusIcon } from '@/components/Icons'
import { LinkButton } from '@/components/ui/link-button'
import Image from 'next/image'
import jsImage from '@/public/javascript.png'
import { DotIcon } from '@/components/Icons'
import { isEventWithin24Hours } from '@/lib/utils'

async function getSourceData() {
  const supabase = createClient()

  const { data: sources } = await supabase.from('sources').select('*')

  if (!sources || sources.length === 0) {
    return { sources, events: [] }
  }

  const eventPromises = sources.map(async (source) => {
    const { data: event } = await supabase
      .from('javascript_events')
      .select('created_at')
      .eq('user_id', source.user_id)
      .order('created_at', { ascending: false })
      .limit(1)
    return event && event.length > 0 ? event[0] : null
  })

  const events = await Promise.all(eventPromises)

  return { sources, events: events.filter((event) => event !== null) }
}

export default async function Sources({ params }: { params: { user: string } }) {
  const { sources, events } = await getSourceData()

  return (
    <div className="w-full max-w-6xl h-full flex flex-1 flex-col gap-4 lg:gap-8 p-4 lg:p-12">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">My Sources</h1>
        <LinkButton href={`/u/${params.user}/sources/setup/javascript`} className="gap-1">
          <PlusIcon className="w-3 h-3" />
          Add Source
        </LinkButton>
      </div>

      <div className="flex flex-col">
        <div className="flex h-14 bg-muted/50 border-b border-border">
          <div className="flex-1 shrink-0 flex items-center px-3">
            <span className="text-xs font-medium text-muted-foreground uppercase">Name</span>
          </div>
          <div className="basis-48 flex items-center px-3">
            <span className="text-xs font-medium text-muted-foreground uppercase">Status</span>
          </div>
          <div className="basis-48 flex items-center px-3">
            <span className="text-xs font-medium text-muted-foreground uppercase">Connection Type</span>
          </div>
          <div className="basis-48 flex items-center px-3">
            <span className="text-xs font-medium text-muted-foreground uppercase">Category</span>
          </div>
          <div className="basis-48 flex items-center px-3">
            <span className="text-xs font-medium text-muted-foreground uppercase">Destinations</span>
          </div>
        </div>

        {sources && sources.length > 0 ? (
          sources.map((key, i) => {
            let isWithin24Hours = false
            if (events && events.length > 0) {
              isWithin24Hours = isEventWithin24Hours(events[i].created_at)
            }
            return (
              <a
                key={key.api_key}
                href={`/u/${params.user}/sources/${key.source_slug}`}
                className="flex h-14 border-b border-l border-r border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 shrink-0 flex items-center gap-3 px-3">
                  <Image className="w-6 h-6" src={jsImage} alt="JavaScript logo" />
                  <span className="text-sm capitalize">{key.source_name}</span>
                </div>
                <div className="basis-48 flex items-center gap-3 px-3">
                  <span
                    style={{
                      color: isWithin24Hours ? 'rgb(22, 163, 74)' : 'rgb(185, 28, 28)',
                    }}
                    className="w-2 h-2"
                  >
                    <DotIcon className="w-2 h-2" />
                  </span>
                  <span className="text-sm">{isWithin24Hours ? 'Receiving data' : 'No recent data'}</span>
                </div>
                <div className="basis-48 flex items-center px-3">
                  <span className="text-sm">{key.connection_type}</span>
                </div>
                <div className="basis-48 flex items-center px-3">
                  <span className="text-sm">{key.category}</span>
                </div>
                <div className="basis-48 flex items-center px-3">
                  <span className="text-sm">{key.destination || 'No destination'}</span>
                </div>
              </a>
            )
          })
        ) : (
          <div className="w-full h-14 flex justify-center items-center">No sources added yet</div>
        )}
      </div>
    </div>
  )
}
