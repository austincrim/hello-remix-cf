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

  let message = (function () {
    if (count === 0) {
      return "You haven't written any notes yet, what's stopping you?"
    } else if (count === 1) {
      return "You've only written 1 note, but that's ok"
    } else {
      return `You've written ${count} notes. Nice work.`
    }
  })()

  let cta = (function () {
    if (count === 0) {
      return (
        <p className="mt-10">
          <Link to="/compose">Let's get started</Link>
        </p>
      )
    } else {
      return (
        <p className="mt-10">
          Want to <Link to="/compose">keep going</Link> or{' '}
          <Link to="/notes">do some review?</Link>
        </p>
      )
    }
  })()
  return (
    <main>
      <h1 className="mt-10 text-5xl font-semibold">Hey! {message}</h1>
      {cta}
    </main>
  )
}
