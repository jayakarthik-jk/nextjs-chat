import { StringOutputParser } from '@langchain/core/output_parsers'
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents'
import { createRetrievalChain } from 'langchain/chains/retrieval'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { llm } from '../ollama/llm'
import { retriever } from '../redis'
import { answerPrompt, titlePrompt } from './prompts'

export const outputParser = new StringOutputParser()
export const splitter = new RecursiveCharacterTextSplitter()

export function getTitleChain() {
  const titleChain = titlePrompt.pipe(llm).pipe(outputParser)

  return titleChain
}

export async function getQueryChain() {
  const combineDocsChain = await createStuffDocumentsChain({
    llm: llm,
    prompt: answerPrompt
  })

  const chain = await createRetrievalChain({
    retriever,
    combineDocsChain
  })

  return chain
}
