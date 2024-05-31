import Debugger from './Debugger'

export default function DebuggerPage({ params }: { params: { slug: string } }) {
  return <Debugger sourceSlug={params.slug} />
}
