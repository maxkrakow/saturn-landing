import { type Metadata } from 'next'
import { DM_Sans, Inter } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'
import { CalendlyProvider } from '@/contexts/CalendlyContext'
import { CalendlyPopup } from '@/components/CalendlyPopup'
import { CalendlyWrapper } from '@/components/CalendlyWrapper'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: {
    template: '%s - Saturn',
    default: 'Saturn - Automate insurance compliance during loan servicing',
  },
  description:
    'Saturn automates insurance compliance during loan servicing: it tracks policy requirements per loan, ingests/reads certificates, validates them against rules, and runs AI-driven outreach to brokers and borrowers until compliant.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx(
        'h-full bg-white antialiased',
        inter.variable,
        dmSans.variable,
      )}
    >
      <body className="flex min-h-full">
        <CalendlyProvider>
          <div className="flex w-full flex-col">{children}</div>
          <CalendlyWrapper />
        </CalendlyProvider>
      </body>
    </html>
  )
}
