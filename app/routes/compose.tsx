import React from 'react'
import { ActionFunction, Form, MetaFunction, useTransition, redirect } from 'remix'

export let meta: MetaFunction = () => {
  return {
    title: "Notin' - Send Me A Note",
    description: 'Send me a note | powered by Remix'
  }
}

export let action: ActionFunction = async ({ request }) => {
  let fields = Object.fromEntries(new URLSearchParams(await request.text()))

  if (!fields.title || !fields.message) {
    return new Response(null, { status: 400 })
  }

  await NOTES.put(fields.title, fields.message, { metadata: { composed: Date.now() } })
  return redirect('/compose')
}

export default function Compose() {
  let transition = useTransition()
  let formRef = React.useRef(null)

  React.useEffect(() => {
    if (transition.state === 'idle') {
      formRef.current.reset()
    }
  }, [transition.state])

  return (
    <main className="max-w-screen-md p-10 mx-auto">
      <Form ref={formRef} className="flex flex-col gap-4" method="post">
        <label htmlFor="title">Title</label>
        <input required className="p-2 bg-gray-100 rounded-md" name="title" id="title" />
        <label htmlFor="message">Message</label>
        <textarea
          className="bg-gray-100 border-none rounded-md"
          name="message"
          id="message"
          required
        ></textarea>
        <button className="border border-black rounded-md" type="submit">
          {transition.state === 'idle' ? 'Create' : 'Submitting...'}
        </button>
      </Form>
    </main>
  )
}
