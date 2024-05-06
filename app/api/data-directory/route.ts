import { splitter } from '@/lib/langchain'
import { uploadDocs } from '@/lib/redis'
import { ZodError, z } from 'zod'

const bodySchema = z.object({ content: z.string().trim().min(1) })

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { content } = bodySchema.parse(body)
    const docs = await splitter.createDocuments([content])
    await uploadDocs(docs)
    return new Response('Uploaded Successfully!', { status: 200 })
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response(error.message, { status: 400 })
    }
    console.error(error)
    return new Response('Something went wrong', { status: 500 })
  }
}
