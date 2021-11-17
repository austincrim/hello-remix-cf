import { Note } from '@prisma/client'
import { json, LoaderFunction, useLoaderData } from 'remix'
import prisma from '~/lib/prisma'

export let loader: LoaderFunction = async ({ params }) => {
  let note = await prisma.note.findUnique({
    where: {
      id: Number(params.note)
    }
  })

  return json(note)
}

export default function Note() {
  let note = useLoaderData<Note>()
  return (
    <article className="p-2 mt-10 prose border rounded">
      <h2>{note.title}</h2>
      <div>{note.content}</div>
    </article>
  )
}
