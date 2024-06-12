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
        <li
          key={link.href}
          className={`relative h-10 w-max p-2 ${pathname === link.href ? 'border-b-2 border-brand' : null}`}
        >
          <Link
            href={link.href}
            className={`text-sm text-accent-foreground hover:text-foreground transition-colors ${
              pathname === link.href ? 'text-foreground' : null
            }`}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
