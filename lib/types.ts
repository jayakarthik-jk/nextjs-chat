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
