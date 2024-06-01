'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { syncData } from './action'
import { useEffect } from 'react'
import { RefreshIcon } from '@/components/Icons'

interface Props {
  sourceSlug: string
}

const initialState = {
  message: '',
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="gap-2" disabled={pending}>
      <RefreshIcon className="w-4 h-4" />
      {pending ? 'Syncing...' : 'Sync Data'}
    </Button>
  )
}

export function SyncDataForm({ sourceSlug }: Props) {
  const [state, formAction] = useFormState(syncData, initialState)
  const pathname = usePathname()
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
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="source_slug" value={sourceSlug} />
      <input type="hidden" name="path" value={pathname} />
      <SubmitButton />
    </form>
  )
}
