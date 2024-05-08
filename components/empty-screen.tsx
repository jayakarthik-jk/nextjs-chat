import { useStrings } from '@/lib/hooks/useStrings'

export function EmptyScreen() {
  const strings = useStrings()
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold">{strings.welcome_message}</h1>
        <p className="leading-normal text-muted-foreground">
          {strings.application_short_description}
        </p>
        <p className="leading-normal text-muted-foreground">
          {strings.application_long_description}
        </p>
      </div>
    </div>
  )
}
