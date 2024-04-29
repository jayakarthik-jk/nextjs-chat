import { Message } from '@/database/schema'

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

export type Stream = ReadableStream<Uint8Array>
