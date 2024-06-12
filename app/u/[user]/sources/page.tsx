import { createClient } from '@/utils/supabase/server'
import { PlusIcon } from '@/components/Icons'
import { LinkButton } from '@/components/ui/link-button'
import Image from 'next/image'
import jsImage from '@/public/javascript.png'
import { DotIcon } from '@/components/Icons'
import { isEventWithin24Hours } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { LockIcon } from 'lucide-react'

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

  let upgradeAccount = false
  if (sources && sources.length >= 2) {
    upgradeAccount = true
  }

  return (
    <div className="w-full h-full flex flex-1 flex-col gap-4 lg:gap-8 p-4 lg:p-12">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">My Sources</h1>
        {upgradeAccount ? (
          <Button className="gap-1" disabled>
            <LockIcon className="w-4 h-4" />
            Add Source
          </Button>
        ) : (
          <LinkButton href={`/u/${params.user}/sources/setup/javascript`} className="gap-1">
            <PlusIcon className="w-3 h-3" />
            Add Source
          </LinkButton>
        )}
      </div>

      <div className="flex flex-col border rounded-sm">
        <div className="flex h-14 bg-secondary">
          <div className="flex-1 shrink-0 flex items-center px-3">
            <span className="text-xs font-medium uppercase">Name</span>
          </div>
          <div className="basis-48 flex items-center px-3">
            <span className="text-xs font-medium uppercase">Status</span>
          </div>
          <div className="basis-48 flex items-center px-3">
            <span className="text-xs font-medium uppercase">Connection Type</span>
          </div>
          <div className="basis-48 flex items-center px-3">
            <span className="text-xs font-medium uppercase">Category</span>
          </div>
          <div className="basis-48 flex items-center px-3">
            <span className="text-xs font-medium uppercase">Destinations</span>
          </div>
        </div>

        {sources && sources.length > 0 ? (
          sources.map((source, i) => {
            let isWithin24Hours = false
            if (events && events.length > 0) {
              isWithin24Hours = isEventWithin24Hours(events[i]?.created_at ?? '')
            }
            return (
              <a
                key={source.id}
                href={`/u/${params.user}/sources/${source.source_slug}`}
                className="flex h-14 border-t text-accent-foreground hover:bg-secondary transition-colors"
              >
                <div className="flex-1 shrink-0 flex items-center gap-3 px-3">
                  <Image className="w-6 h-6" src={jsImage} alt="JavaScript logo" />
                  <span className="text-sm capitalize">{source.source_name}</span>
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
                  <span className="text-sm">{source.connection_type}</span>
                </div>
                <div className="basis-48 flex items-center px-3">
                  <span className="text-sm">{source.category}</span>
                </div>
                <div className="basis-48 flex items-center px-3">
                  <span className="text-sm">{source.destination ? 'BigQuery' : 'No destination'}</span>
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
