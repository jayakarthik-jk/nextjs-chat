'use client'
import { BotMessage } from '@/components/stocks/message'
import React, { useContext } from 'react'
import { toast } from 'sonner'
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
  submitUserMessage: (message: string) => Promise<Message>
}

const chatContext = React.createContext<UIState>({} as any)

export const useChat = () => useContext(chatContext)

export function ChatProvider({
  id,
  children
}: {
  id: string
  children: React.ReactNode
}) {
  const [messages, setMessages] = React.useState<Message[]>([])
  async function handleUserMessageSubmit(query: string): Promise<Message> {
    const response = await fetch('http://localhost:3000')

    if (response.ok && response.body) {
      return {
        id: 'id',
        display: <BotMessage content={response.body} />
      }
    }
    toast.error('something went wrong.')
    return undefined as any
  }
  return (
    <chatContext.Provider
      value={{
        chatId: id,
        messages,
        setMessages,
        submitUserMessage: handleUserMessageSubmit
      }}
    >
      {children}
    </chatContext.Provider>
  )
}
