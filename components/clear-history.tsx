'use client'

import * as React from 'react'
import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { IconSpinner } from '@/components/ui/icons'
import { useStrings } from '@/lib/hooks/useStrings'
import { ServerActionResult } from '@/lib/types'

interface ClearHistoryProps {
  isEnabled: boolean
  clearChats: () => ServerActionResult<string>
}

export function ClearHistory({
  isEnabled = false,
  clearChats
}: ClearHistoryProps) {
  const [open, setOpen] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()
  const strings = useStrings()
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" disabled={!isEnabled || isPending}>
          {isPending && <IconSpinner className="mr-2" />}
          {strings.clear_history}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{strings.delete_confirmation}</AlertDialogTitle>
          <AlertDialogDescription>
            {strings.delete_confirmation_description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            {strings.cancel}
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={event => {
              event.preventDefault()
              startTransition(async () => {
                const result = await clearChats()
                if (result) {
                  toast.error(result)
                  return
                }

                setOpen(false)
              })
            }}
          >
            {isPending && <IconSpinner className="mr-2 animate-spin" />}
            {strings.delete}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
