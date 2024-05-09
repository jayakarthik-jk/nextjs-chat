import React, { useContext } from 'react'
import { stringMap } from '../strings'
import { Strings } from '../types'
import { useSelectedLanguage } from './useLanguage'

const stringsContext = React.createContext<Strings>(stringMap.English)

export const useStrings = () => useContext(stringsContext)

export function StringsProvider({ children }: { children: React.ReactNode }) {
  const { selectedLanguage } = useSelectedLanguage()
  return (
    <stringsContext.Provider value={stringMap[selectedLanguage]}>
      {children}
    </stringsContext.Provider>
  )
}
