'use client'

import { Button } from '@/components/ui/button'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useToast } from '@/components/ui/use-toast'
import { CopyIcon } from 'lucide-react'

interface CopyButtonProps {
  codeString: string
  btnText: string
  toastText: string
}

export default function CopyButton({ codeString, btnText, toastText }: CopyButtonProps) {
  const { toast } = useToast()
  return (
    <CopyToClipboard text={codeString}>
      <Button
        onClick={() => {
          toast({
            title: toastText,
          })
        }}
      >
        <CopyIcon className="w-4 h-4 mr-2" />
        {btnText}
      </Button>
    </CopyToClipboard>
  )
}
