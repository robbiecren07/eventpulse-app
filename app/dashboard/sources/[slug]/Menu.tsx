'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface Props {
  sourceSlug: string
}

export function Menu({ sourceSlug }: Props) {
  const pathname = usePathname()

  return (
    <ul className="w-full flex px-6 border-b border-border">
      <li
        className={`relative h-10 w-max px-4 py-2 ${
          pathname === `/dashboard/sources/${sourceSlug}`
            ? 'border-b-2 border-purple-700'
            : null
        }`}
      >
        <Link
          href={`/dashboard/sources/${sourceSlug}`}
          className={`text-muted-foreground hover:text-primary transition-colors ${
            pathname === `/dashboard/sources/${sourceSlug}`
              ? 'text-primary'
              : null
          }`}
        >
          Overview
        </Link>
      </li>
      <li
        className={`relative h-10 w-max px-4 py-2 ${
          pathname === `/dashboard/sources/${sourceSlug}/debugger`
            ? 'border-b-2 border-purple-700'
            : null
        }`}
      >
        <Link
          href={`/dashboard/sources/${sourceSlug}/debugger`}
          className={`text-muted-foreground hover:text-primary transition-colors ${
            pathname === `/dashboard/sources/${sourceSlug}/debugger`
              ? 'text-primary'
              : null
          }`}
        >
          Debugger
        </Link>
      </li>
    </ul>
  )
}
