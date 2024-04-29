import React from 'react'
import { Stream } from '../types'

const decoder = new TextDecoder()

export const useStreamableText = (content: Stream) => {
  const [rawContent, setRawContent] = React.useState(
    typeof content === 'string' ? content : ''
  )

  React.useEffect(() => {
    if (content.locked) return
    ;(async () => {
      let value = ''
      for await (const delta of content as any) {
        setRawContent(value => value + decoder.decode(delta))
      }
    })()
  }, [content])

  return rawContent
}
