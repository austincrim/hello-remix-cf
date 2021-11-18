import { Link, MetaFunction, useLoaderData } from 'remix'

export let meta: MetaFunction = () => {
  return {
    title: "Notin'",
    description: 'Send me a note | powered by Remix'
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
      return 'No one has sent me a note yet. Want to be the first?'
    } else if (count === 1) {
      return "I've got one note! Who wants to be number two?"
    } else {
      return `I've got ${count} notes. Thanks everyone.`
    }
  })()

  let cta = (function () {
    if (count === 0) {
      return (
        <p className="mt-10">
          <Link to="/compose">Drop me a note.</Link>
        </p>
      )
    } else {
      return (
        <>
          <p className="mt-10">
            <Link to="/compose">Drop me a note.</Link>
          </p>
          <p className="mt-10">
            <Link to="/notes">Read what others have said.</Link>
          </p>
        </>
      )
    }
  })()
  return (
    <main>
      <h1 className="mt-10 text-5xl font-semibold leading-snug">Hey! {message}</h1>
      {cta}
    </main>
  )
}
