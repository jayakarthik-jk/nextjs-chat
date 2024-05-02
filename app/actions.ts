// @ts-nocheck
'use server'

import { auth } from '@/auth'
import { type Chat } from '@/lib/types'
import { db } from '@/db'
import { titleChain } from '@/lib/langchain'

export async function getChats(userId?: string | null): Promise<Chat[]> {
  if (!userId) {
    return []
  }
  return await db.chat.findMany({
    where: { userId },
    include: { messages: true }
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
}): Promise<void | { error: string }> {
  const session = await auth()

  if (!session) {
    return {
      error: 'Unauthorized'
    }
  }

  await db.chat.delete({
    where: { id }
  })
}

export async function clearChats(): Promise<{ error: string }> {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'Unauthorized'
    }
  }

  await db.chat.deleteMany({
    where: { userId: session.user.id }
  })
}

export async function generateTitle(query: string, response: string) {
  return titleChain.invoke({ query, response })
}

export async function uploadMessage(
  query: string,
  response: string,
  userId: string,
  chatId: string
) {
  const chat = await db.chat.findUnique({ where: { id: chatId } })
  if (!chat) {
    const title = await generateTitle(query, response)
    await db.chat.create({
      data: {
        id: chatId,
        title,
        userId,
        messages: { create: { query, response } }
      }
    })
  }
  db.chat.update({
    where: { id: chatId },
    data: { messages: { create: { query, response } } }
  })
}
