import { z } from 'zod'
import { LanguageCode } from './types'

const transationResponseSchema = z.object({
  responseData: z.object({
    translatedText: z.string()
  })
})

export async function translate(
  query: string,
  from: LanguageCode,
  to: LanguageCode = 'en'
) {
  if (from === to) {
    return query
  }
  const url = `https://api.mymemory.translated.net/get?q=${query}&langpair=${from}|${to}`
  const response = await fetch(url)
  if (!response.ok) {
    return query
  }
  const body = await response.json()
  const result = await transationResponseSchema.safeParseAsync(body)
  if (!result.success) {
    return query
  }
  return result.data.responseData.translatedText
}
