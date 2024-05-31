'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface Props {
  userSlug: string
  sourceSlug: string
}

export function Menu({ userSlug, sourceSlug }: Props) {
  const pathname = usePathname()

  const links = [
    { href: `/u/${userSlug}/sources/${sourceSlug}`, label: 'Overview' },
    {
      href: `/u/${userSlug}/sources/${sourceSlug}/debugger`,
      label: 'Debugger',
    },
    {
      href: `/u/${userSlug}/sources/${sourceSlug}/settings`,
      label: 'Settings',
    },
  ]

  return (
    <ul className="w-full flex px-6 border-b border-border">
      {links.map((link) => (
        <li key={link.href} className={`relative h-10 w-max px-4 py-2 ${pathname === link.href ? 'border-b-2 border-purple-700' : null}`}>
          <Link
            href={link.href}
            className={`text-muted-foreground hover:text-primary transition-colors ${pathname === link.href ? 'text-primary' : null}`}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
