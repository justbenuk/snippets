import { db } from "@/db"
import { notFound } from "next/navigation"
import Link from "next/link"
import { deleteSnippet } from "@/actions"

type SnippetProps = {
  params: {
    id: string
  }
}
export default async function SingleSnippet(props: SnippetProps) {
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(props.params.id) }
  })

  if (!snippet) {
    return notFound()
  }

  const deleteSnippetAction = deleteSnippet.bind(null, snippet.id)
  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link href={`/snippets/${props.params.id}/edit`} className="p-2 border rounded bg-yellow-200">Edit</Link>
          <form action={deleteSnippetAction}>
          <button type='submit' className="p-2 border rounded bg-red-200">Delete</button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  )
}
