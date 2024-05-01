// @ts-nocheck
'use server'

import { auth } from '@/auth'
import { type Chat } from '@/lib/types'
import { db } from '@/db'

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

export async function uploadMessage(
  query: string,
  response: string,
  userId: string,
  chatId: string
) {
  const title = 'Sample title'
  await db.chat.upsert({
    where: { id: chatId },
    create: {
      id: chatId,
      title,
      userId,
      messages: { create: { query, response } }
    },
    update: { messages: { create: { query, response } } }
  })
}
