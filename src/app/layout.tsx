import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// import components
import Header from "../app/Headter/page"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '宇宙語り美少女AI',
  description: 'どんな質問にも美少女AIが宇宙知識を添えて答えてくれます。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="jp" className='bg-wisteria font-DotGothic16'>
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
