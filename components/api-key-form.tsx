'use client'

import { useRef } from 'react'
import { generateApiKey } from '@/app/dashboard/actions'
import { ApiKeys } from '@/types/custom'
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface Props {
  apiKeys: ApiKeys[] | null
}

export default function ApiKeyForm({ apiKeys }: Props) {
  const formRef = useRef<HTMLFormElement>(null)
  const apiKey =
    apiKeys && apiKeys.length > 0 ? apiKeys[0].api_key : 'No API key generated'

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>API Key</CardTitle>
        <CardDescription>Generate and manage your API key.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form
          ref={formRef}
          action={async (data) => {
            await generateApiKey(data)
            formRef.current?.reset()
          }}
        >
          <div className="grid gap-2">
            <Label htmlFor="api-key">Your API Key</Label>
            <Input
              className="cursor-text"
              id="api-key"
              readOnly
              type="text"
              value={apiKey}
            />
            <Button
              type="submit"
              disabled={apiKeys && apiKeys.length > 0 ? true : false}
            >
              Generate API Key
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
