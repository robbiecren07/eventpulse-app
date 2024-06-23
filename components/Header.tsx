import Link from 'next/link'
import { Button } from './ui/button'
import { signOut } from '@/app/login/actions'
import Image from 'next/image'
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/ui/dropdown-menu'
import { Package2Icon, SearchIcon } from './Icons'
import { Input } from './ui/input'

export default async function Header() {
  return (
    <header className="sticky top-0 flex h-14 lg:h-[60px] items-center gap-4 border-b px-6 bg-transparent">
      <Link className="lg:hidden" href="/">
        <Package2Icon className="h-6 w-6" />
        <span className="sr-only">EventPulse</span>
      </Link>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-200" />
            <Input className="w-full md:w-2/3 lg:w-1/3 appearance-none pl-8" placeholder="Search..." type="search" />
          </div>
        </form>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full border border-black w-8 h-8" size="icon" variant="ghost">
            <Image
              alt="Avatar"
              className="rounded-full"
              width="32"
              height="32"
              src="/placeholder.svg"
              style={{
                aspectRatio: '32/32',
                objectFit: 'cover',
              }}
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <form>
              <button type="submit" formAction={signOut}>
                Sign Out
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
