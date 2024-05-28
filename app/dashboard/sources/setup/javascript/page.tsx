import Form from './Form'

export default async function Page() {
  return (
    <div className="w-full max-w-3xl h-full flex flex-1 flex-col gap-4 lg:gap-8 p-4 lg:p-12">
      <h1 className="text-xl font-semibold">Source setup</h1>
      <Form />
    </div>
  )
}
