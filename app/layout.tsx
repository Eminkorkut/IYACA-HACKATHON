import type { Metadata } from 'next'
import './globals.css'
import { Outfit } from 'next/font/google'
import { AuthProvider } from '@/contexts/AuthContext'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata: Metadata = {
  title: 'Ümit Köprüsü - Her Çocuk Bir Umut, Her Gönüllü Bir Köprü',
  description: 'Anonim mentörlük platformu - Güvenli alan, yapay zeka kalkanı',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={outfit.variable}>
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
