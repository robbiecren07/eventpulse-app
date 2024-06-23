'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { useEffect, useRef } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createJavaScriptSource } from './actions'
import { useToast } from '@/components/ui/use-toast'

interface Props {
  user: string
}

const initialState = {
  message: '',
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="gap-2" disabled={pending}>
      {pending ? 'Creating...' : 'Create Source'}
    </Button>
  )
}

export function Form({ user }: Props) {
  const [state, formAction] = useFormState(createJavaScriptSource, initialState)
  const { toast } = useToast()

  useEffect(() => {
    if (state && state.message) {
      toast({
        variant: state.message.includes('successfully') ? 'default' : 'destructive',
        title: state.message,
        duration: 5000,
      })
    }
  }, [state, toast])

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name *</Label>
          <p className="text-sm text-accent-foreground">
            Identifies this source within your workspace, and typically includes the product area and environment. E.g.
            Website Prod or App Dev.
          </p>
          <Input id="name" type="text" name="name" placeholder="JavaScript" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="website">Website URL</Label>
          <p className="text-sm text-accent-foreground">The full URL where you will install eventPulse.js.</p>
          <Input id="website" type="text" name="website" placeholder="https://example.com" />
        </div>
        <input type="hidden" name="user" value={user} />
        <SubmitButton />
      </div>
    </form>
  )
}
