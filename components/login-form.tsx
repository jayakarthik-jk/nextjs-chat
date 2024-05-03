'use client'

import React from 'react'
import { IconSpinner } from './ui/icons'
import { signIn } from 'next-auth/react'

export default function LoginForm() {
  return (
    <div className="flex flex-col items-center gap-4 space-y-3">
      <div className="w-full flex-1 rounded-lg border bg-white px-6 pb-4 pt-8 shadow-md  md:w-96 dark:bg-zinc-950">
        <h1 className="mb-3 text-2xl font-bold">Please log in to continue.</h1>
        <LoginButton />
      </div>
    </div>
  )
}

function LoginButton() {
  const [loading, setLoading] = React.useState(false)
  return (
    <button
      className="my-4 flex h-10 w-full flex-row items-center justify-center rounded-md bg-zinc-900 p-2 text-sm font-semibold text-zinc-100 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      aria-disabled={loading}
      onClick={() => {
        setLoading(true)
        signIn('google').finally()
      }}
    >
      {loading ? <IconSpinner /> : 'Continue with Google'}
    </button>
  )
}
