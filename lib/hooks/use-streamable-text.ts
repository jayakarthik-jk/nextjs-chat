import React from 'react'
import { Stream } from '../types'

const decoder = new TextDecoder()

export const useStreamableText = (stream: Stream) => {
  const [rawContent, setRawContent] = React.useState(
    typeof stream === 'string' ? stream : ''
  )

  const initialize = React.useCallback(async () => {
    if (typeof stream === 'string') return
    if (stream.locked) return
    for await (const delta of stream as any) {
      setRawContent(value => {
        const data = decoder.decode(delta)
        return value + data
      })
    }
  }, [stream])

  React.useEffect(() => void initialize(), [initialize])

  return rawContent
}
