import { Note } from '@prisma/client'
import { Link, LoaderFunction, useLoaderData, Outlet, Form, ActionFunction, json, MetaFunction } from 'remix'
import prisma from '~/lib/prisma'


export let meta: MetaFunction = () => {
  return {
    title: 'Notin\' - Notes',
    description: 'Note-taking powered by Remix'
  }
}

export let action: ActionFunction = async ({ request }) => {
  let id = new URLSearchParams(await request.text()).get('id')

  if (!id) {
    return json(null, { status: 400 })
  }

  await prisma.note.delete({
    where: {
      id: Number(id)
    }
  })

  return id
}

export let loader: LoaderFunction = async () => {
  let notes = await prisma.note.findMany()
  return notes
}

export default function Notes() {
  let notes = useLoaderData<Note[]>()

  return (
    <>
      <main>
        <ul className="flex flex-col gap-3 mt-10">
          {notes.map((note) => (
            <div className="flex items-center justify-between">
              <li className="text-xl font-bold" key={note.id}>
                <Link to={`/notes/${note.id}`}>{note.title}</Link>
              </li>
              <Form method="delete">
                <input type="hidden" name="id" value={note.id} />
                <button type="submit" className="text-red-600">
                  Delete
                </button>
              </Form>
            </div>
          ))}
        </ul>
        <div>
          <Outlet />
        </div>
      </main>
    </>
  )
}
