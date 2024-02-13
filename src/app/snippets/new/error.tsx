'use client'

type ErrorProps = {
  error: Error,
  reset: () => void
}
export default function ErrorPage({ error, reset }: ErrorProps) {
  return (
    <div>{error.message}</div>
  )
}
