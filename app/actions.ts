'use server'

import { auth } from '@/auth'
import { db } from '@/db'
import { getTitleChain } from '@/lib/langchain'
import { translate } from '@/lib/translation'
import { LanguageCode, type Chat } from '@/lib/types'
import { revalidatePath } from 'next/cache'

export async function getChats(userId?: string | null): Promise<Chat[]> {
  if (!userId) {
    return []
  }
  return await db.chat.findMany({
    where: { userId },
    include: { messages: true },
    orderBy: [
      {
        createdAt: 'desc'
      }
    ]
  })
}

export async function getChat(id: string): Promise<Chat | null> {
  return db.chat.findUnique({
    where: { id },
    include: { messages: true }
  })
}

export async function removeChat({
  id
}: {
  id: string
}): Promise<string | undefined> {
  const session = await auth()

  if (!session) {
    return 'Unauthorized'
  }

  await db.chat.delete({
    where: { id }
  })

  revalidatePath('/')
}

export async function clearChats(): Promise<string | undefined> {
  const session = await auth()

  if (!session?.user?.id) {
    return 'Unauthorized'
  }

  await db.chat.deleteMany({
    where: { userId: session.user.id }
  })

  revalidatePath('/')
}

export async function generateTitle(query: string, response: string) {
  const titleChain = getTitleChain()
  return titleChain.invoke({ query, response })
}

export async function uploadMessage(
  query: string,
  response: string,
  userId: string,
  chatId: string,
  language: LanguageCode
) {
  db.$transaction(
    async db => {
      const chat = await db.chat.findUnique({ where: { id: chatId } })
      if (!chat) {
        const title = await generateTitle(query, response)
        const translatedTitle = await translate(title, 'en', language)
        await db.chat.create({
          data: {
            id: chatId,
            title: translatedTitle ?? title,
            userId,
            messages: { create: { query, response } }
          }
        })
      } else {
        await db.chat.update({
          where: { id: chatId },
          data: { messages: { create: { query, response } } }
        })
      }
    },
    { timeout: 1000 * 60 }
  )

  revalidatePath('/')
}
