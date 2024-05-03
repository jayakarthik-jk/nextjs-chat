import { Message } from '@prisma/client'

export interface Chat {
  id: string
  title: string
  userId: string
  messages: Message[]
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string
    }
>

export type Stream = ReadableStream<Uint8Array> | string

export const languageMap = { English: 'en', தமிழ்: 'ta', हिंदी: 'hi' } as const
export type Language = keyof typeof languageMap
export const languages = Object.keys(languageMap) as Language[]
export type LanguageCode = (typeof languageMap)[Language]
export const languageCodes = Object.values(languageMap) as LanguageCode[]
