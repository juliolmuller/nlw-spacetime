import { ReactNode } from 'react'
import { baiJamjureeFont, robotoFont } from '~/utils/styles'
import './globals.css'

type RootLayoutProps = {
  children: ReactNode
}

export const metadata = {
  title: 'Cápsula do Tempo',
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${baiJamjureeFont.variable} ${robotoFont.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  )
}
