import React from 'react'
import { Stream } from '../types'

const decoder = new TextDecoder()

export const useStreamableText = (
  stream: Stream,
  onSuccess?: (content: string) => void
) => {
  const [rawContent, setRawContent] = React.useState(
    typeof stream === 'string' ? stream : ''
  )

  const initialize = React.useCallback(async () => {
    if (typeof stream === 'string') return
    if (stream.locked) return
    let localContent = ''
    for await (const delta of stream as any) {
      setRawContent(value => {
        const data = decoder.decode(delta)
        localContent += data
        return value + data
      })
    }
    onSuccess?.(localContent)
  }, [stream, onSuccess])

  React.useEffect(() => void initialize(), [initialize])

  return rawContent
}
