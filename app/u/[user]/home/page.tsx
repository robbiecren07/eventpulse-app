import { createClient } from '@/utils/supabase/server'
import UpdateButton from '@/components/UpdateButton'
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from '@/components/ui/card'
import { PlusIcon } from '@/components/Icons'
import { LinkButton } from '@/components/ui/link-button'

export default async function Home({ params }: { params: { user: string } }) {
  const supabase = createClient()

  const { data: sources } = await supabase.from('sources').select('*')

  const { data: users } = await supabase.from('users').select('full_name, email').single()

  return (
    <div className="w-full max-w-6xl h-full flex flex-1 flex-col gap-4 lg:gap-8 p-4 lg:p-12">
      <div className="flex gap-3 justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold">{users && users.full_name ? users.full_name : users?.email}</h1>
          {sources && sources.length > 0 ? (
            <p>It&lsquo;s a great day-ta send data 📨</p>
          ) : (
            <p>Life is about the journey and the Destination 🗺</p>
          )}
        </div>
        <div className="flex gap-3">
          <UpdateButton />
        </div>
      </div>

      {sources && sources.length > 0 ? (
        <div></div>
      ) : (
        <div className="flex-1 flex gap-4 lg:gap-8">
          <Card className="flex-1 items-center">
            <CardHeader className="items-center">
              <CardTitle className="text-lg">Add sources</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <CardDescription className="text-center">
                Sources collect data from your website or app. Add a source to start tracking your data with EventPluse.
              </CardDescription>
              <LinkButton href={`/u/${params.user}/sources/setup/javascript`} className="gap-1">
                <PlusIcon className="w-3 h-3" />
                Add sources
              </LinkButton>
            </CardContent>
          </Card>
          <Card className="flex-1 items-cente">
            <CardHeader className="items-center">
              <CardTitle className="text-lg">Add destinations</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <CardDescription className="text-center">
                Destinations are where you want to send your data to. Connect apps to help you perform various use cases..
              </CardDescription>
              <LinkButton href={`/u/${params.user}/destinations`} className="gap-1">
                <PlusIcon className="w-3 h-3" />
                Add destinations
              </LinkButton>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
