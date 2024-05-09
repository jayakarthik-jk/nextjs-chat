'use client'

import { Button } from '@/components/ui/button'
import { IconSpinner } from '@/components/ui/icons'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import { toast } from 'sonner'

export default function DataDirectory() {
  const [loading, setLoading] = React.useState(false)
  const [content, setContent] = React.useState('')

  async function handleUpload() {
    setLoading(true)
    try {
      const response = await fetch('/api/data-directory', {
        method: 'POST',
        body: JSON.stringify({ content })
      })
      if (!response.ok) {
        return toast.error('Something went wrong!')
      }
      toast.success('Uploaded Successfully')
    } catch (error) {
      toast.error('Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center flex-col px-40 py-20 gap-8">
      <Textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        className="h-80"
        placeholder="Place your data here"
      />

      {loading ? (
        <IconSpinner className="mr-2" />
      ) : (
        <Button onClick={handleUpload} disabled={loading}>
          Upload
        </Button>
      )}
    </div>
  )
}
