import { ChatOllama } from '@langchain/community/chat_models/ollama'

// export const model = 'legal-ai' as const
export const model = 'mistral' as const
export const llm = new ChatOllama({ model })
