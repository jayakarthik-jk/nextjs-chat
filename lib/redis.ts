import { OllamaEmbeddings } from '@langchain/community/embeddings/ollama'
import { Document } from '@langchain/core/documents'
import { RedisVectorStore } from '@langchain/redis'
import { createClient } from 'redis'
import { model } from './ollama/llm'

export const redisClient = createClient({
  url: process.env.REDIS_URL ?? 'redis://localhost:6379'
})

redisClient.connect()

const embeddings = new OllamaEmbeddings({ model })
export const store = new RedisVectorStore(embeddings, {
  indexName: 'docs',
  redisClient
})
export const retriever = store.asRetriever()

export async function uploadDocs(docs: Document[]) {
  await store.addDocuments(docs)
}
