import { redirect } from 'next/navigation'

export default async function User({ params }: { params: { user: string } }) {
  const { user } = params

  return redirect(`/u/${user}/home`)
}
