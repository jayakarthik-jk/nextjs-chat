import { z } from 'zod'
import { db } from '@/db'
import { LanguageCode, languageCodes } from '@/lib/types'
import { sleep } from '@/lib/utils'
import { chain } from '@/lib/langchain'
import { translate } from '@/lib/translation'

const encoder = new TextEncoder()

const requestSchema = z.object({
  query: z.string().trim().min(1, 'Query should not be empty.'),
  chatId: z.string().trim().min(1),
  language: z.enum(languageCodes as [LanguageCode, ...LanguageCode[]])
})

async function getChatHistory(chatId: string) {
  const messages = await db.message.findMany({
    where: { chatId },
    take: 5,
    orderBy: [{ createdAt: 'desc' }]
  })

  return messages
    .map(message => `USER: ${message.query}\nAI: ${message.response}`)
    .join('\n')
}

export async function POST(request: Request): Promise<Response> {
  const body = await request.json()
  const validationResult = requestSchema.safeParse(body)
  if (!validationResult.success) {
    return new Response(validationResult.error.message, { status: 400 })
  }
  let { query, language, chatId } = validationResult.data

  query = await translate(query, language)

  const history = await getChatHistory(chatId)
  let response = await chain.invoke({ query, history })
  response = await translate(response, 'en', language)

  // tiny little Scam
  const responseStream = new ReadableStream<Uint8Array>({
    async start(controller) {
      for (const chunk of response.split(' ')) {
        const bytes = encoder.encode(chunk + ' ')
        controller.enqueue(bytes)
        await sleep(100)
      }
      controller.close()
    }
  })
  return new Response(responseStream, { status: 200 })
}
