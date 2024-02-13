'use server'
import { db } from "@/db"
import { redirect } from 'next/navigation'
import { revalidatePath } from "next/cache"


export async function createSnippet(formState: { message: string }, formData: FormData) {

  try {
    //validate the user input
    const title = formData.get('title')
    const code = formData.get('code')

    // validation
    if (typeof title !== 'string' || title.length < 3) {
      return {
        message: 'Title Must Be Longer'
      }
    }
    if (typeof code !== 'string' || code.length < 10) {
      return {
        message: 'Your code Snippet needs to be longer'
      }
    }

    await db.snippet.create({
      data: {
        title: title,
        code: code,
      }
    })

  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: err.message
      }
    } else {
      return {
        message: 'Something Went Wrong'
      }
    }
  }
  revalidatePath('/')
  redirect('/')
}

//update a snippet
export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code }
  })

  redirect(`/snippets/${id}`)
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id }
  })
  revalidatePath('/')
  redirect('/')
}
