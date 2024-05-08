import React, { useContext } from 'react'
import englishStrings from '../strings/english'
import hindiStrings from '../strings/hindi'
import tamilStrings from '../strings/tamil'
import { Strings } from '../types'
import { useSelectedLanguage } from './useLanguage'

const stringMap = {
  English: englishStrings,
  தமிழ்: tamilStrings,
  हिंदी: hindiStrings
}
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
