import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="w-full h-dvh flex flex-col gap-4 justify-center items-center">
      <h2 className="text-2xl font-bold">404 - Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/login" className="underline">
        Return Home
      </Link>
    </div>
  )
}
