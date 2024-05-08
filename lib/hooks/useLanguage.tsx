import React, { useContext } from 'react'
import { Language, LanguageCode, languageMap, languages } from '../types'

type LanguageContext = {
  selectedLanguage: Language
  languages: Language[]
  selectedLanguageCode: LanguageCode
  setSelectedLanguage: (newLanguage: Language) => void
}

const selectedLanguageContext = React.createContext<LanguageContext>({
  languages,
  selectedLanguage: 'English',
  selectedLanguageCode: 'en',
  setSelectedLanguage: () => {}
})

export const useSelectedLanguage = () => useContext(selectedLanguageContext)

export function SelectedLanguageProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [selectedLanguage, setSelectedLanguage] =
    React.useState<Language>('English')
  return (
    <selectedLanguageContext.Provider
      value={{
        selectedLanguage: selectedLanguage,
        setSelectedLanguage: setSelectedLanguage,
        languages,
        selectedLanguageCode: languageMap[selectedLanguage]
      }}
    >
      {children}
    </selectedLanguageContext.Provider>
  )
}
