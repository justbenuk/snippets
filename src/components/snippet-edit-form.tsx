'use client'
import { useState } from "react"
import type { Snippet } from "@prisma/client"
import { Editor } from "@monaco-editor/react"
import * as actions from "@/actions"


type SnippetEditFormProps = {
  snippet: Snippet
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {

  const [code, setCode] = useState(snippet.code)
  function handleChange(value: string = "") {
    setCode(value)
  }

  const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code)

  return (
    <div>
      <Editor
        height='40vh'
        theme='vs-dark'
        language='javascript'
        defaultValue={code}
        options={
          { minimap: { enabled: false } }
        }
        onChange={handleChange} />

      <form action={editSnippetAction}>
        <button className="p-2 border rounded bg-blue-200" type='submit'>Save</button>
      </form>
    </div>
  )
}
