// src/components/LocaleProvider.tsx
'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useLocaleStore } from '@/lib/localeStore'
import { ENABLED_LANGUAGES, getLanguageConfig } from '@/lib/languages'
import LocaleSync from '@/components/LocaleSync' // default export
// import HtmlDirectionSync from '@/components/HtmlDirectionSync' // default export

export default function LocaleProvider({ children }: { children: ReactNode }) {
  const { isLoading, initializeLocale } = useLocaleStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    initializeLocale()
  }, [initializeLocale])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <>
      <LocaleSync />
     
      {children}
    </>
  )
}
