'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from '@/components/ui/card'
import { HomeIcon, Package2Icon, BellIcon, LineChartIcon, PackageIcon, SettingsIcon, UsersIcon } from './Icons'

const links = [
  { href: '/home', label: 'Home', icon: HomeIcon },
  { href: '/overview', label: 'Connections', icon: UsersIcon },
  { href: '/sources', label: 'Sources', icon: PackageIcon },
  { href: '/destinations', label: 'Destinations', icon: LineChartIcon },
  // { href: '/settings', label: 'Settings', icon: SettingsIcon },
]

interface SideBarProps {
  userSlug: string
}

export default function SideBar({ userSlug }: SideBarProps) {
  const pathname = usePathname()

  return (
    <div className="hidden border-r lg:block bg-transparent border-white/20">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <Package2Icon className="h-6 w-6" />
            <span className="">EventPulse</span>
          </Link>
          <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
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
                className={`flex items-center gap-4 px-4 py-2 transition-all text-primary/90 hover:bg-primary/20 ${
                  pathname.includes(link.href) ? 'bg-primary/20 border-l-4 border-purple-700 pl-3' : null
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>Unlock all features and get unlimited access to our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="sm">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
