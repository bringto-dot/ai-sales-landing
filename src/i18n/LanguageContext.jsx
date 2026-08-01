import { createContext, useContext, useMemo, useState } from 'react'
import { translations } from './translations'

const LanguageContext = createContext(null)

function getInitialLang() {
  const stored = localStorage.getItem('lang')
  if (stored === 'ru' || stored === 'en') return stored
  return navigator.language?.toLowerCase().startsWith('ru') ? 'ru' : 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)

  const value = useMemo(() => {
    const toggle = () => {
      setLang((prev) => {
        const next = prev === 'ru' ? 'en' : 'ru'
        localStorage.setItem('lang', next)
        return next
      })
    }
    return { lang, toggle, t: translations[lang] }
  }, [lang])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
