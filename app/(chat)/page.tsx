import { auth } from '@/auth'
import { Chat } from '@/components/chat'
import { nanoid } from '@/lib/utils'

import { ChatProvider } from '@/lib/hooks/useChat'
import { Session } from 'next-auth'

export const metadata = {
  title: 'Legal AI Chatbot'
}

export default async function IndexPage() {
  const id = nanoid()
  const session = (await auth()) as Session

  return (
    <ChatProvider id={id}>
      <Chat id={id} session={session} />
    </ChatProvider>
  )
}
