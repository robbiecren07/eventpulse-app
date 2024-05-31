import { Inter as FontSans } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={fontSans.variable}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
