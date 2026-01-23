// src/app/layout.tsx
import type { Metadata } from 'next'
import Navbar from "@/components/Navbar"
// import LocaleProvider from '@/components/LocaleProvider'  // ✅ استيراد صحيح
import './globals.css'

export const metadata: Metadata = {
  title: 'Week1 Learning',
  description: '"منصة تعليمية متكاملة لتعليم تطوير الويب',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-sans bg-slate-900 text-white">
          <Navbar />
          {children}
      </body>
    </html>
  )
}
