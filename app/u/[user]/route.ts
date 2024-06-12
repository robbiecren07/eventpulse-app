import { redirect } from 'next/navigation'

export async function GET(request: Request, { params }: { params: { user: string } }) {
  return redirect(`/u/${params.user}/home`)
}
