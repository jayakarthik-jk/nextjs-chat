import { uploadMessage } from '@/app/actions'
import { auth } from '@/auth'
import { db } from '@/db'
import { getQueryChain } from '@/lib/langchain'
import { translate } from '@/lib/translation'
import { LanguageCode, languageCodes } from '@/lib/types'
import { sleep } from '@/lib/utils'
import { z } from 'zod'

const encoder = new TextEncoder()

const requestSchema = z.object({
  query: z.string().trim().min(1, 'Query should not be empty.'),
  chatId: z.string().trim().min(1),
  language: z.enum(languageCodes as [LanguageCode, ...LanguageCode[]])
})

async function getChats(chatId: string) {
  const messages = await db.message.findMany({
    where: { chatId },
    take: 5,
    orderBy: [{ createdAt: 'desc' }]
  })

  return messages
}

export async function POST(request: Request): Promise<Response> {
  const session = await auth()
  if (!session) {
    return new Response('UnAuthorized', { status: 401 })
  }
  const body = await request.json()

  const validationResult = requestSchema.safeParse(body)
  if (!validationResult.success) {
    return new Response(validationResult.error.message, { status: 400 })
  }
  let { query, language, chatId } = validationResult.data

  const translatedQuery = (await translate(query, language)) ?? query

  const chats = await getChats(chatId)

  const history = chats
    .map(chat => `USER: ${chat.query}\nAI: ${chat.response}`)
    .join('\n')
  const chain = await getQueryChain()
  const response = await chain.invoke({
    input: translatedQuery,
    history
  })
  const responseTxt =
    (await translate(response.answer, 'en', language)) ?? response.answer
  void uploadMessage(query, responseTxt, session.user.id, chatId, language)
  // tiny little Scam
  const responseStream = new ReadableStream<Uint8Array>({
    async start(controller) {
      for (const chunk of responseTxt.split(' ')) {
        const bytes = encoder.encode(chunk + ' ')
        controller.enqueue(bytes)
        await sleep(100)
      }
      controller.close()
    }
  })
  return new Response(responseStream, { status: 200 })
}
