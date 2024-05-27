'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function Menu() {
  const pathname = usePathname()

  return (
    <ul className="w-full flex px-6 border-b border-border">
      <li
        className={`relative h-10 w-max px-4 py-2 ${
          pathname === '/dashboard/sources/javascript'
            ? 'border-b-2 border-purple-700'
            : null
        }`}
      >
        <Link
          href="/dashboard/sources/javascript"
          className={`text-muted-foreground hover:text-primary transition-colors ${
            pathname === '/dashboard/sources/javascript' ? 'text-primary' : null
          }`}
        >
          Overview
        </Link>
      </li>
      <li
        className={`relative h-10 w-max px-4 py-2 ${
          pathname === '/dashboard/sources/javascript/debugger'
            ? 'border-b-2 border-purple-700'
            : null
        }`}
      >
        <Link
          href="/dashboard/sources/javascript/debugger"
          className={`text-muted-foreground hover:text-primary transition-colors ${
            pathname === '/dashboard/sources/javascript/debugger'
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
