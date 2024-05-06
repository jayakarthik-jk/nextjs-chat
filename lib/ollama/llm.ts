import { ChatOllama } from '@langchain/community/chat_models/ollama'

// export const model = new ChatOllama({ model: 'mistral' })

export const model = 'legal-ai' as const
export const llm = new ChatOllama({ model })
