'use client'
import { useFormState } from "react-dom"
import * as actions from '@/actions'
export default function AddNew() {

  const [formState, action] = useFormState(actions.createSnippet, { message: '' })

  return (
    <form action={action}>
      <h3 className="font-bold m-3">Create A Snippet!</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor='title'>Title</label>
          <input name='title' className="border rounded p-2 w-full" id='title' />
        </div>
        <div className="flex gap-4">
          <label className="w-12" htmlFor='code'>Code</label>
          <textarea name='code' className="border rounded p-2 w-full" id='code' />
        </div>
        {formState.message &&
          <div className="bg-red-200 text-red-500 font-bold text-lg text-center p-4 rounded border border-red-500 my-2">{formState.message}</div>
        }
        <button type='submit' className="rounded p-2 bg-blue-300">Submit</button>
      </div>
    </form>
  )
}
