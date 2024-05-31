'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { CheckMarkIcon } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import Editor from '@monaco-editor/react'

interface Props {
  sourceSlug: string
}

interface Event {
  id: string
  event_name: string
  event_data: Record<string, any>
  raw_data: Record<string, any>
  created_at: string
}

export default function Debugger({ sourceSlug }: Props) {
  const supabase = createClient()

  const [events, setEvents] = useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [formattedPrettyCode, setFormattedPrettyCode] = useState<string | null>(null)

  useEffect(() => {
    const fetchInitialEvents = async () => {
      const { data, error } = await supabase
        .from('javascript_events')
        .select('*')
        .eq('source_slug', sourceSlug)
        .order('created_at', { ascending: false })
        .limit(10)

      if (error) {
        console.error('Error fetching events:', error)
      } else if (data) {
        setEvents(data as Event[])
      }
    }

    fetchInitialEvents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const channel = supabase
      .channel('realtime events')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'javascript_events',
          filter: `source_slug=eq.${sourceSlug}`,
        },
        (payload) => {
          setEvents((prevEvents) => [payload.new as Event, ...prevEvents])
        }
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, sourceSlug])

  const [toggled, setToggled] = useState<'pretty' | 'raw' | null>('pretty')

  const handleToggle = (type: 'pretty' | 'raw') => {
    setToggled(type)
  }

  useEffect(() => {
    if (selectedEvent) {
      if (selectedEvent.event_data.type === 'page') {
        setFormattedPrettyCode(`eventPulse.page({ 
  ${Object.entries(selectedEvent.event_data.context.page)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join(',\n  ')} 
})`)
      } else {
        setFormattedPrettyCode(`eventPulse.track('${selectedEvent.event_name}', {
  ${Object.entries(selectedEvent.event_data.properties)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join(',\n  ')}
})`)
      }
    }
  }, [selectedEvent])

  return (
    <div className="h-full flex overflow-x-hidden overflow-y-auto">
      {events.length === 0 ? (
        <div className="w-full flex justify-center items-center mt-14">
          <p className="text-center">
            No Data Flowing.
            <br />
            Make sure your source is configured correctly.
          </p>
        </div>
      ) : (
        <>
          <div className="flex-1 shrink-0 basis-1/2 border-r">
            <div className="w-full h-16 border-b"></div>
            <ul>
              {events.map((event) => {
                const timestamp = new Date(event.event_data.timestamp)
                const options: Intl.DateTimeFormatOptions = {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: 'numeric',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true,
                }
                const formattedDate = timestamp
                  .toLocaleString('en-US', options)
                  .replace(',', '')
                  .replace(/ AM| PM/, '')

                return (
                  <li
                    key={event.id}
                    className={`cursor-pointer py-4 px-6 text-sm border-b hover:bg-muted transition-colors ${
                      selectedEvent?.id === event.id ? 'bg-muted' : ''
                    }`}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="flex items-center">
                      <div className="basis-28 flex gap-3 items-center">
                        <CheckMarkIcon className="w-4 h-4 text-green-600" />
                        <span className="uppercase">{event.event_data.type}</span>
                      </div>
                      <span className="flex-1 shrink-0 flex items-center font-semibold">
                        {event.event_data.type === 'page' ? event.event_data.context.page.path : event.event_name}
                      </span>
                      <span className="basis-36 flex items-center justify-end">{formattedDate}</span>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="flex-1 shrink-0 basis-1/2 flex flex-col">
            {selectedEvent ? (
              <>
                <div className="w-full h-16 flex gap-3 items-center px-6 text-sm border-b">
                  <CheckMarkIcon className="w-4 h-4 text-green-600" />
                  <div className="flex flex-col">
                    <span className="font-semibold">
                      {selectedEvent.event_data.type === 'page' ? selectedEvent.event_data.context.page.path : selectedEvent.event_name}
                    </span>
                    <span>Allowed</span>
                  </div>
                </div>
                <div className="w-full flex flex-col">
                  <div className="w-full flex gap-1 items-center px-6 py-2 border-b">
                    <Button
                      variant="ghost"
                      className={toggled === 'pretty' ? 'bg-accent text-accent-foreground' : ''}
                      size="sm"
                      onClick={() => handleToggle('pretty')}
                    >
                      Pretty
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={toggled === 'raw' ? 'bg-accent text-accent-foreground' : ''}
                      onClick={() => handleToggle('raw')}
                    >
                      Raw
                    </Button>
                  </div>
                  <div className="w-full py-1 text-xs">
                    {toggled === 'pretty' && formattedPrettyCode && (
                      <Editor
                        height="70vh"
                        theme="vs-dark"
                        defaultLanguage="javascript"
                        value={formattedPrettyCode}
                        options={{
                          readOnly: true,
                          minimap: { enabled: false },
                        }}
                      />
                    )}
                    {toggled === 'raw' && (
                      <Editor
                        height="70vh"
                        theme="vs-dark"
                        defaultLanguage="javascript"
                        value={JSON.stringify(selectedEvent.event_data, null, 2)}
                        options={{
                          readOnly: true,
                          minimap: { enabled: false },
                        }}
                      />
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full h-14 border-b ">
                <p>Select an event to view its details.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
