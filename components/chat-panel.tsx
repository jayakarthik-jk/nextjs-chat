import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { PromptForm } from '@/components/prompt-form'
import { useChat } from '@/lib/hooks/useChat'
import { useStrings } from '@/lib/hooks/useStrings'
import { nanoid } from 'nanoid'
import { UserMessage } from './message'

export interface ChatPanelProps {
  id?: string
  title?: string
  input: string
  setInput: (value: string) => void
  isAtBottom: boolean
  scrollToBottom: () => void
}

export function ChatPanel({
  input,
  setInput,
  isAtBottom,
  scrollToBottom
}: ChatPanelProps) {
  const { messages, setMessages, submitUserMessage } = useChat()
  const strings = useStrings()
  const exampleMessages = [
    {
      heading: strings.example_prompt_heading_1,
      subheading: strings.example_prompt_subheading_1,
      message:
        strings.example_prompt_heading_1 +
        ' ' +
        strings.example_prompt_subheading_1
    },
    {
      heading: strings.example_prompt_heading_2,
      subheading: strings.example_prompt_subheading_2,
      message:
        strings.example_prompt_heading_2 +
        ' ' +
        strings.example_prompt_subheading_2
    },
    {
      heading: strings.example_prompt_heading_3,
      subheading: strings.example_prompt_subheading_3,
      message:
        strings.example_prompt_heading_3 +
        ' ' +
        strings.example_prompt_subheading_3
    },
    {
      heading: strings.example_prompt_heading_4,
      subheading: strings.example_prompt_subheading_4,
      message:
        strings.example_prompt_heading_4 +
        ' ' +
        strings.example_prompt_subheading_4
    }
  ]

  return (
    <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />

      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="mb-4 grid grid-cols-2 gap-2 px-4 sm:px-0">
          {messages.length === 0 &&
            exampleMessages.map((example, index) => (
              <div
                key={example.heading}
                className={`cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
                  index > 1 && 'hidden md:block'
                }`}
                onClick={async () => {
                  setMessages(currentMessages => [
                    ...currentMessages,
                    {
                      id: nanoid(),
                      display: <UserMessage>{example.message}</UserMessage>
                    }
                  ])
                  const responseMessage = await submitUserMessage(
                    example.message
                  )
                  if (responseMessage) {
                    setMessages(currentMessages => [
                      ...currentMessages,
                      responseMessage
                    ])
                  }
                }}
              >
                <div className="text-sm font-semibold">{example.heading}</div>
                <div className="text-sm text-zinc-600">
                  {example.subheading}
                </div>
              </div>
            ))}
        </div>

        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm input={input} setInput={setInput} />
        </div>
      </div>
    </div>
  )
}
