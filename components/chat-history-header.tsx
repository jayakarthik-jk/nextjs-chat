'use client'
import { useStrings } from '@/lib/hooks/useStrings'

export default function ChatHistoryHeader() {
  const strings = useStrings()
  return <h4 className="text-sm font-medium">{strings.chat_history}</h4>
}
