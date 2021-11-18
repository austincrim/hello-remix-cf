import {
  Link,
  LoaderFunction,
  useLoaderData,
  Outlet,
  Form,
  ActionFunction,
  json,
  MetaFunction
} from 'remix'

export let meta: MetaFunction = () => {
  return {
    title: "Notin' - Notes",
    description: 'Note-taking powered by Remix'
  }
}

export let action: ActionFunction = async ({ request }) => {
  let title = new URLSearchParams(await request.text()).get('title')

  if (!title) {
    return json(null, { status: 400 })
  }

  await NOTES.delete(title)

  return title
}

export let loader: LoaderFunction = async () => {
  let notes = await NOTES.list()
  return notes.keys
}

export default function Notes() {
  let titles = useLoaderData<{ name: string }[]>()

  return (
    <>
      <main>
        <ul className="flex flex-col gap-4">
          {titles.map(({ name }) => (
            <li className="flex items-center justify-between" key={name}>
              <Link className="text-xl font-bold" to={`/notes/${name}`}>
                {name}
              </Link>
              <Form method="delete">
                <input type="hidden" name="title" value={name} />
                <button type="submit" className="text-red-600">
                  Delete
                </button>
              </Form>
            </li>
          ))}
        </ul>
        <Outlet />
      </main>
    </>
  )
}
