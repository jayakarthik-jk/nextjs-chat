import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { auth } from '@/auth'

import { ChatProvider } from '@/lib/hooks/useChat'
import { Session } from 'next-auth'

export const metadata = {
  title: 'Next.js AI Chatbot'
}

// TODO: wrap the chat context here

export default async function IndexPage() {
  const id = nanoid()
  const session = (await auth()) as Session

  return (
    <ChatProvider id={id}>
      <Chat id={id} session={session} />
    </ChatProvider>
  )
}
