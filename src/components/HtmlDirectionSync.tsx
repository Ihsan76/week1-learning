// src/components/HtmlDirectionSync.tsx

'use client'

import { useEffect } from 'react'
import { useLocaleStore } from '@/lib/localeStore'

export default function HtmlDirectionSync() {
  const { locale } = useLocaleStore()

  useEffect(() => {
    const htmlElement = document.documentElement
    const direction = locale === 'ar' ? 'rtl' : 'ltr'
    
    htmlElement.setAttribute('dir', direction)
    htmlElement.setAttribute('lang', locale)
    
    // تحديث CSS classes أيضاً (اختياري)
    htmlElement.classList.toggle('rtl', locale === 'ar')
    htmlElement.classList.toggle('ltr', locale === 'en')
  }, [locale])

  return null
}
