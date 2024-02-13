import { notFound } from "next/navigation"
import { db } from "@/db"
import { redirect } from 'next/navigation'
import SnippetEditForm from "@/components/snippet-edit-form"

type EditProps = {
  params: {
    id: string
  }
}
export default async function EditSnippt(props: EditProps) {

  //get the id as a number
  const id = parseInt(props.params.id)

  //we fetch the snippet to edit
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(props.params.id) }
  })

  if(!snippet){
    return notFound()
  }

  return (
      <SnippetEditForm snippet={snippet}/>
      )
}
