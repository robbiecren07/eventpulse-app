'use client'

import { useRef } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createJavaScriptSource } from './actions'

export default function Form() {
  const formRef = useRef<HTMLFormElement>(null)
  return (
    <form
      ref={formRef}
      action={async (data) => {
        await createJavaScriptSource(data)
        formRef.current?.reset()
      }}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name *</Label>
          <p className="text-xs text-muted-foreground">
            Identifies this source within your workspace, and typically includes the product area and environment. E.g. Website Prod or App
            Dev.
          </p>
          <Input id="name" type="text" name="name" placeholder="JavaScript" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="website">Website URL</Label>
          <p className="text-xs text-muted-foreground">The full URL where you will install eventPulse.js.</p>
          <Input id="website" type="text" name="website" placeholder="https://example.com" />
        </div>
        <Button type="submit">Add Source</Button>
      </div>
    </form>
  )
}
