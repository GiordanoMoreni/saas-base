import type { Metadata } from 'next'
import './globals.css'
import { ToastProvider } from '@/lib/toast'

export const metadata: Metadata = {
  title: 'SaaS Base',
  description: 'SaaS starter kit',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  )
}

