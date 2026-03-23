import type { Metadata } from 'next'
import './globals.css'
import Cursor   from '@/components/Cursor'
import Loader   from '@/components/Loader'
import Nav      from '@/components/Nav'
import Terminal from '@/components/Terminal'

export const metadata: Metadata = {
  metadataBase: new URL('https://jaskaran-0.github.io'),
  title: 'Jaskaran Singh Malhotra — Portfolio',
  description: 'Backend and full-stack developer based in Hamilton, ON. ASP.NET Core, Python, PostgreSQL.',
  openGraph: {
    title: 'Jaskaran Singh Malhotra — Portfolio',
    description: 'Backend and full-stack developer based in Hamilton, ON. ASP.NET Core, Python, PostgreSQL.',
    url: 'https://jaskaran-0.github.io',
    siteName: 'Jaskaran Singh Malhotra',
    images: [{ url: '/og/og-image.png', width: 1200, height: 630 }],
    locale: 'en_CA',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Cursor />
        <Loader />
        <Nav />
        {children}
        <Terminal />
      </body>
    </html>
  )
}
