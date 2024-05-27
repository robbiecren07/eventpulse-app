import { Menu } from '../Menu'
import Debugger from './Debugger'

export default function DebuggerPage({ params }: { params: { slug: string } }) {
  return (
    <div className="w-full h-full flex flex-1 flex-col gap-4 lg:gap-8">
      <Menu sourceSlug={params.slug} />
      <Debugger sourceSlug={params.slug} />
    </div>
  )
}
