import { ActionFunction, Form, json, MetaFunction, useTransition } from 'remix'
import prisma from '~/lib/prisma'

export let meta: MetaFunction = () => {
  return {
    title: "Notin' - Compose",
    description: 'Note-taking powered by Remix'
  }
}

export let action: ActionFunction = async ({ request }) => {
  let fields = Object.fromEntries(new URLSearchParams(await request.text()))

  if (!fields.title || !fields.content) {
    return json(null, { status: 400 })
  }

  let created = await prisma.note.create({
    data: {
      title: fields.title,
      content: fields.content
    }
  })

  return json(created)
}

export default function Compose() {
  let transition = useTransition()

  return (
    <main className="max-w-screen-md p-10 mx-auto">
      <Form className="flex flex-col gap-4" method="post">
        <label htmlFor="title">Title</label>
        <input required className="p-2 bg-gray-100 rounded-md" name="title" id="title" />
        <label htmlFor="content">Content</label>
        <textarea
          className="bg-gray-100 border-none rounded-md"
          name="content"
          id="content"
          required
        ></textarea>
        <button className="border border-black rounded-md" type="submit">
          {transition.state === 'idle' ? 'Create' : 'Submitting...'}
        </button>
      </Form>
    </main>
  )
}
