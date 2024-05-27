import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { PlusIcon } from '@/components/Icons'
import { LinkButton } from '@/components/ui/link-button'

export default async function Sources() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/')
  }

  const { data: sources } = await supabase
    .from('sources')
    .select('*')
    .eq('user_id', data.user.id)

  return (
    <div className="w-full max-w-6xl h-full flex flex-1 flex-col gap-4 lg:gap-8 p-4 lg:p-12">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">My Sources</h1>
        <LinkButton
          href="/dashboard/sources/setup/javascript"
          className="gap-1"
        >
          <PlusIcon className="w-3 h-3" />
          Add Source
        </LinkButton>
      </div>

      <div className="flex flex-col">
        <div className="flex h-14 bg-muted/50 border-b border-border">
          <div className="flex-1 shrink-0 flex items-center px-3">
            <span className="text-xs font-medium text-muted-foreground uppercase">
              Name
            </span>
          </div>
          <div className="basis-48 flex items-center px-3">
            <span className="text-xs font-medium text-muted-foreground uppercase">
              Status
            </span>
          </div>
          <div className="basis-48 flex items-center px-3">
            <span className="text-xs font-medium text-muted-foreground uppercase">
              Connection Type
            </span>
          </div>
          <div className="basis-48 flex items-center px-3">
            <span className="text-xs font-medium text-muted-foreground uppercase">
              Category
            </span>
          </div>
          <div className="basis-48 flex items-center px-3">
            <span className="text-xs font-medium text-muted-foreground uppercase">
              Destinations
            </span>
          </div>
        </div>

        {sources && sources.length > 0 ? (
          sources.map((key) => {
            return (
              <a
                key={key.api_key}
                href={`/dashboard/sources/${key.source_slug}`}
                className="flex h-14 border-b border-l border-r border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 shrink-0 flex items-center px-3">
                  <span className="text-sm capitalize">{key.source_name}</span>
                </div>
                <div className="basis-48 flex items-center px-3">
                  <span className="text-sm">Status</span>
                </div>
                <div className="basis-48 flex items-center px-3">
                  <span className="text-sm">{key.connection_type}</span>
                </div>
                <div className="basis-48 flex items-center px-3">
                  <span className="text-sm">{key.category}</span>
                </div>
                <div className="basis-48 flex items-center px-3">
                  <span className="text-sm">
                    {key.destination || 'No destination'}
                  </span>
                </div>
              </a>
            )
          })
        ) : (
          <div className="w-full h-14 flex justify-center items-center">
            No sources added yet
          </div>
        )}
      </div>
    </div>
  )
}
