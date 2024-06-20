'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { RefreshIcon } from './Icons'

const UpdateButton = () => {
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [buttonText, setButtonText] = useState('Updated just now')
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 60000) // Update every 1 minute

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (timeElapsed === 0) {
      setButtonText('Updated just now')
      setIsDisabled(true)
    } else {
      setButtonText(`Updated ${timeElapsed} minute${timeElapsed > 1 ? 's' : ''} ago`)
      setIsDisabled(false)
    }
  }, [timeElapsed])

  return (
    <Button
      type="button"
      className="gap-2"
      variant="ghost"
      disabled={isDisabled}
      onClick={() => alert('Button clicked!')}
    >
      <RefreshIcon className="h-4 w-4" />
      {buttonText}
    </Button>
  )
}

export default UpdateButton
