'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

interface Event {
  id: string
  event_name: string
  event_data: Record<string, any>
  raw_data: Record<string, any>
  created_at: string
}

export default function Debugger() {
  const supabase = createClient()

  const [events, setEvents] = useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  // useEffect(() => {
  //   const fetchInitialEvents = async () => {
  //     const { data, error } = await supabase
  //       .from('events')
  //       .select('*')
  //       .order('created_at', { ascending: false })
  //       .limit(10)

  //     if (error) {
  //       console.error('Error fetching events:', error)
  //     } else if (data) {
  //       setEvents(data as Event[])
  //     }
  //   }

  //   fetchInitialEvents()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // useEffect(() => {
  //   const channel = supabase
  //     .channel('realtime events')
  //     .on(
  //       'postgres_changes',
  //       {
  //         event: 'INSERT',
  //         schema: 'public',
  //         table: 'events',
  //       },
  //       (payload) => {
  //         setEvents((prevEvents) => [payload.new as Event, ...prevEvents])
  //       }
  //     )
  //     .subscribe()
  //   return () => {
  //     supabase.removeChannel(channel)
  //   }
  // }, [supabase])

  return (
    <div className="w-full h-full flex overflow-y-auto">
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
          <div className="w-1/2 p-4 border-r">
            <ul>
              {events.map((event) => (
                <li
                  key={event.id}
                  className={`cursor-pointer p-2 border-b ${
                    selectedEvent?.id === event.id ? 'bg-gray-200' : ''
                  }`}
                  onClick={() => setSelectedEvent(event)}
                >
                  {event.event_name}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-1/2 p-4">
            {selectedEvent ? (
              <div>
                <h2 className="text-xl font-semibold">
                  {selectedEvent.event_name}
                </h2>
                <pre className="mt-4 p-4 rounded">
                  {JSON.stringify(selectedEvent.event_data, null, 2)}
                </pre>
              </div>
            ) : (
              <div>Select an event to view its details.</div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
