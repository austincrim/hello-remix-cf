import { Link, LoaderFunction, useLoaderData, Outlet, MetaFunction } from 'remix'

export let meta: MetaFunction = () => {
  return {
    title: "Notin' - Notes",
    description: 'Send me a note | powered by Remix'
  }
}

export let loader: LoaderFunction = async () => {
  let notes = await NOTES.list()
  return notes.keys
}

export default function Notes() {
  let titles = useLoaderData<{ name: string; metadata: { composed: number } }[]>()

  return (
    <>
      <main>
        <ul className="flex flex-col gap-4">
          {titles.map(({ name, metadata }) => (
            <li className="flex items-center justify-between" key={name}>
              <Link className="text-xl font-bold" to={`/notes/${name}`}>
                {name}
              </Link>
              <time>
                {new Intl.DateTimeFormat('en-US', {
                  month: 'short',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                }).format(new Date(metadata.composed))}
              </time>
            </li>
          ))}
        </ul>
        <Outlet />
      </main>
    </>
  )
}
