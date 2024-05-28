import { Menu } from '../Menu'
import Debugger from './Debugger'

export default function DebuggerPage({ params }: { params: { slug: string } }) {
  return (
    <div className="flex-1 flex flex-col h-full">
      <Menu sourceSlug={params.slug} />
      <Debugger sourceSlug={params.slug} />
    </div>
  )
}
