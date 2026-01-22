'use client'

import { useEffect } from 'react'
import { useLocaleStore } from '@/lib/localeStore'

// ✅ تأكد من export default
export default function LocaleSync() {
  const { initializeLocale } = useLocaleStore()

  useEffect(() => {
    initializeLocale()
  }, [initializeLocale])

  return null
}
