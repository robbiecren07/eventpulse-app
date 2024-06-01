'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { addDestination } from './actions'

interface Props {
  sources: any[]
}

const initialState = {
  message: '',
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Connecting...' : 'Connect'}
    </Button>
  )
}

export function Form({ sources }: Props) {
  const [state, formAction] = useFormState(addDestination, initialState)
  const pathname = usePathname()

  return (
    <div>
      <form action={formAction} className="space-y-6">
        <div className="flex flex-col gap-1">
          <Label htmlFor="sourceID" className="text-base font-medium">
            Select source *
          </Label>
          <p className="text-sm">Select the EventPulse source you would like to connect to your BigQuery.</p>
          {sources && sources.length > 0 && (
            <Select name="sourceID" required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                {sources.map((source) => (
                  <SelectItem key={source.id} value={source.id}>
                    {source.source_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="name" className="text-base font-medium">
            Name your destination *
          </Label>
          <p className="text-sm">Pick a name to help you identify this warehouse</p>
          <Input id="name" name="name" type="text" defaultValue="BigQuery Instance" required />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="projectID" className="text-base font-medium">
            Project ID *
          </Label>
          <p className="text-sm">The Google Cloud project where your BigQuery database resides.</p>
          <Input id="projectID" name="projectID" type="text" required />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="location" className="text-base font-medium">
            Location
          </Label>
          <p className="text-sm">Enter the region where your BigQuery datasets reside</p>
          <Input id="location" name="location" type="text" />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="datasetID" className="text-base font-medium">
            Dataset ID*
          </Label>
          <p className="text-sm">Enter your dataset ID for BigQuery</p>
          <Input id="datasetID" name="datasetID" type="text" required />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="tableID" className="text-base font-medium">
            Table ID*
          </Label>
          <p className="text-sm">Enter your dataset ID for BigQuery</p>
          <Input id="tableID" name="tableID" type="text" required />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="credentials" className="text-base font-medium">
            Credentials *
          </Label>
          <p className="text-sm">Paste your BigQuery credentials JSON here</p>
          <Textarea id="credentials" name="credentials" required />
        </div>
        <input type="hidden" name="path" value={pathname} />
        <SubmitButton />
        {state && state.message ? (
          <p aria-live="polite" className="text-sm" role="status">
            {state.message}
          </p>
        ) : null}
      </form>
    </div>
  )
}
