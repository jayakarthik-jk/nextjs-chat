import { Message } from '@prisma/client'

export interface Chat {
  id: string
  title: string
  userId: string
  messages: Message[]
}

export type ServerActionResult<Result> = Promise<Result | undefined>

export type Stream = ReadableStream<Uint8Array> | string

export const languageMap = { English: 'en', தமிழ்: 'ta', हिंदी: 'hi' } as const
export type Language = keyof typeof languageMap
export const languages = Object.keys(languageMap) as Language[]
export type LanguageCode = (typeof languageMap)[Language]
export const languageCodes = Object.values(languageMap) as LanguageCode[]

export type Strings = {
  delete_chat: string
  new_chat: string
  send_a_message: string
  delete: string
  cancel: string
  delete_confirmation_description: string
  delete_confirmation: string
  clear_history: string
  application_short_description: string
  application_long_description: string
  welcome_message: string
  example_prompt_heading_2: string
  example_prompt_subheading_2: string
  example_prompt_heading_3: string
  example_prompt_subheading_3: string
  example_prompt_heading_4: string
  example_prompt_subheading_4: string
  example_prompt_heading_1: string
  example_prompt_subheading_1: string
}
