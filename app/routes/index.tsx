import { Link, MetaFunction, useLoaderData } from 'remix'

export let meta: MetaFunction = () => {
  return {
    title: "Notin'",
    description: 'Note-taking powered by Remix'
  }
}

export let loader = async () => {
  let notes = await NOTES.list()
  return notes.keys.length
}

export default function Index() {
  let count = useLoaderData<number>()
  return (
    <main>
      <h1 className="mt-10 text-5xl font-semibold">
        Hey! You've written {count} notes. Nice work.
      </h1>
      <p className="mt-10">
        Want to <Link to="/compose">keep going</Link> or{' '}
        <Link to="/notes">do some review?</Link>
      </p>
    </main>
  )
}
