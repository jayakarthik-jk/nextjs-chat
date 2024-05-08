'use client'
import { BotMessage, UserMessage } from '@/components/message'
import { Message as MessageType } from '@prisma/client'
import { nanoid } from 'nanoid'
import { useSession } from 'next-auth/react'
import React from 'react'
import { toast } from 'sonner'
import { useSelectedLanguage } from './useLanguage'
export type Message = {
  id: string
  display: React.ReactNode
}

export type UIState = {
  chatId: string
  messages: Message[]
  setMessages: (
    messages: Message[] | ((oldMessages: Message[]) => Message[])
  ) => void
  submitUserMessage: (message: string) => Promise<Message | undefined>
  loading: boolean
}

const chatContext = React.createContext<UIState>({} as any)

export const useChat = () => React.useContext(chatContext)

export function ChatProvider({
  id,
  children,
  defaultMessages = []
}: {
  id: string
  children: React.ReactNode
  defaultMessages?: MessageType[]
}) {
  const [messages, setMessages] = React.useState<Message[]>(
    defaultMessages.flatMap<Message>(message => [
      {
        id: message.id + 'query',
        display: <UserMessage>{message.query}</UserMessage>
      },
      {
        id: message.id + 'response',
        display: <BotMessage>{message.response}</BotMessage>
      }
    ])
  )
  const [loading, setLoading] = React.useState(false)
  const { selectedLanguageCode } = useSelectedLanguage()
  const session = useSession()

  async function handleUserMessageSubmit(
    query: string
  ): Promise<Message | undefined> {
    if (!session.data || query.trim().length === 0) {
      return
    }
    setLoading(true)
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        query,
        chatId: id,
        language: selectedLanguageCode
      })
    }).finally(() => setLoading(false))
    if (response.ok && response.body) {
      return {
        id: nanoid(),
        display: <BotMessage>{response.body}</BotMessage>
      }
    }
    toast.error('something went wrong.')
  }
  return (
    <chatContext.Provider
      value={{
        chatId: id,
        messages,
        setMessages,
        submitUserMessage: handleUserMessageSubmit,
        loading
      }}
    >
      {children}
    </chatContext.Provider>
  )
}
