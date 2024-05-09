'use client'

import { useStrings } from '@/lib/hooks/useStrings'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { IconPlus } from './ui/icons'

export default function NewChatBtn() {
  const strings = useStrings()
  return (
    <Link
      href="/"
      className={cn(
        buttonVariants({ variant: 'outline' }),
        'h-10 w-full justify-start bg-zinc-50 px-4 shadow-none transition-colors hover:bg-zinc-200/40 dark:bg-zinc-900 dark:hover:bg-zinc-300/10'
      )}
    >
      <IconPlus className="-translate-x-2 stroke-2" />
      {strings.new_chat}
    </Link>
  )
}
