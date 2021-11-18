import { json, LoaderFunction, useLoaderData } from 'remix'

export let loader: LoaderFunction = async ({ params }) => {
  let content = await NOTES.get(params.note)
  return json({ title: params.note, content })
}

export default function Note() {
  let { title, content } = useLoaderData()
  return (
    <article className="p-4 mt-20 border rounded">
      <h2 className="mb-4 text-3xl font-semibold text-center">{title}</h2>
      <div>{content}</div>
    </article>
  )
}
