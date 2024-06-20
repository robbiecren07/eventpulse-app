'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HomeIcon, Package2Icon, BellIcon, LineChartIcon, PackageIcon, UsersIcon } from './Icons'

const links = [
  { href: '/home', label: 'Home', icon: HomeIcon },
  { href: '/overview', label: 'Connections', icon: UsersIcon },
  { href: '/sources', label: 'Sources', icon: PackageIcon },
  { href: '/destinations', label: 'Destinations', icon: LineChartIcon },
]

interface SideBarProps {
  userSlug: string
}

export default function SideBar({ userSlug }: SideBarProps) {
  const pathname = usePathname()

  return (
    <div className="hidden border-r lg:block bg-accent">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center px-6">
          <Link className="flex items-center gap-2 text-white font-semibold" href="#">
            <Package2Icon className="h-6 w-6 text-brand" />
            <span className="">EventPulse</span>
          </Link>
          <Button className="ml-auto h-8 w-8 text-white" size="icon" variant="outline">
            <BellIcon className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start text-sm font-medium">
            {links.map((link) => (
              <Link
                key={link.href}
                href={`/u/${userSlug}${link.href}`}
                className={`flex items-center gap-4 px-4 py-2 transition-all text-accent-foreground hover:bg-quinary hover:text-white ${
                  pathname.includes(link.href) ? 'text-white bg-quinary border-l-4 border-brand pl-3' : null
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
