'use client'

import { TooltipProvider } from '@/components/ui/tooltip'
import { SidebarProvider } from '@/lib/hooks/use-sidebar'
import { SelectedLanguageProvider } from '@/lib/hooks/useLanguage'
import { StringsProvider } from '@/lib/hooks/useStrings'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <SidebarProvider>
        <TooltipProvider>
          <SessionProvider>
            <SelectedLanguageProvider>
              <StringsProvider>{children}</StringsProvider>
            </SelectedLanguageProvider>
          </SessionProvider>
        </TooltipProvider>
      </SidebarProvider>
    </NextThemesProvider>
  )
}
