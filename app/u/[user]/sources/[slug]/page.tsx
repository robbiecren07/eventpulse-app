import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import jsImage from '@/public/javascript.png'
import { DotIcon } from '@/components/Icons'
import { isEventWithin24Hours } from '@/lib/utils'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import CopyButton from '@/components/CopyButton'
import Link from 'next/link'

async function getFileData() {
  const supabase = createClient()
  const { data } = supabase.storage.from('sdk-files').getPublicUrl('eventpulse-browser.js')

  const fileUrl = data.publicUrl

  try {
    const response = await fetch(fileUrl)
    if (!response.ok) {
      throw new Error('Failed to fetch the file content')
    }
    const fileContent = await response.text()
    return fileContent
  } catch (error) {
    return null
  }
}

export default async function Slug({
  params,
}: {
  params: {
    user: string
    slug: string
  }
}) {
  const data = await getFileData()

  const supabase = createClient()

  const { data: source } = await supabase.from('sources').select('*').eq('source_slug', params.slug).single()

  if (!source) {
    return <h1>Source not found</h1>
  }

  const { data: event } = await supabase
    .from('javascript_events')
    .select('created_at')
    .eq('source_slug', params.slug)
    .order('created_at', { ascending: false })
    .limit(1)

  let isWithin24Hours = false
  if (event && event.length > 0) {
    isWithin24Hours = isEventWithin24Hours(event[0]?.created_at ?? '')
  }

  const codeString = `<script>\n  ${data}  eventPulse.load('${source.api_key}');\n  eventPulse.page();\n</script>`

  return (
    <div className="w-full h-full flex flex-col p-4 lg:p-12 overflow-x-hidden overflow-y-auto">
      <div className="flex flex-col gap-6 pb-5 border-b">
        <div className="flex items-center gap-5">
          <Image className="w-12 h-12" src={jsImage} alt="JavaScript logo" />
          <h1 className="text-2xl font-medium">{source.source_name}</h1>
          <div className="flex gap-3 items-center">
            <span
              style={{
                color: isWithin24Hours ? 'rgb(22, 163, 74)' : 'rgb(185, 28, 28)',
              }}
              className="w-2 h-2"
            >
              <DotIcon className="w-2 h-2" />
            </span>
            <span className="text-secondary-foreground">{isWithin24Hours ? 'Receiving data' : 'No recent data'}</span>
          </div>
        </div>

        <div className="w-full max-w-4xl">
          <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Add EventPulse to your site - required</AccordionTrigger>
              <AccordionContent className="space-y-3">
                <h3 className="text-secondary-foreground text-xl font-medium">
                  Install the EventPulse snippet on your website
                </h3>
                <p className="text-accent-foreground text-sm">
                  Copy the EventPulse snippet and paste it high in the &lt;head&gt; of your website.
                </p>
                {data && (
                  <div className="snippet">
                    <SyntaxHighlighter language="javascript" style={a11yDark}>
                      {codeString}
                    </SyntaxHighlighter>
                  </div>
                )}
                <CopyButton codeString={codeString} btnText="Copy Snippet" toastText="Snippet Copied!" />
                <p className="text-accent-foreground text-sm">
                  Don&lsquo;t want to insert a &lt;head&gt; script? Try our npm{' '}
                  <Link
                    className="text-link transition-colors hover:text-white"
                    href="https://www.npmjs.com/package/@robbiecren/eventpulse-sdk-js"
                  >
                    package
                  </Link>
                  !
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}
