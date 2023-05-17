import { ReactNode } from 'react'
import { baiJamjureeFont, robotoFont } from '~/utils/styles'
import './globals.css'

type RootLayoutProps = {
  children: ReactNode
}

export const metadata = {
  title: 'NLW Spacetime',
  description:
    'Uma cápsula do tempo desenvolvida com React, Next, TailWindCSS e TypeScript',
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${baiJamjureeFont.variable} ${robotoFont.variable} bg-gray-900 font-sans text-gray-100`}
      >
        {children}
      </body>
    </html>
  )
}
