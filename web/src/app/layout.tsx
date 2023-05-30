import { ReactNode } from 'react'
import './globals.css'
import { Copyright } from '~/components/Copyright'
import { Hero } from '~/components/Hero'
import { Profile } from '~/components/Profile'
import { SignInButton } from '~/components/SignInButton'
import { checkAuth } from '~/lib/auth'
import { baiJamjureeFont, robotoFont } from '~/utils/styles'

type RootLayoutProps = {
  children: ReactNode
}

export const metadata = {
  title: 'NLW Spacetime',
  description:
    'Uma cápsula do tempo desenvolvida com React, Next, TailWindCSS e TypeScript',
}

export default function RootLayout({ children }: RootLayoutProps) {
  const isAuthenticated = checkAuth()

  return (
    <html lang="en">
      <body
        className={`${baiJamjureeFont.variable} ${robotoFont.variable} font-sans`}
      >
        <div className="grid min-h-screen grid-cols-2 bg-[url(../assets/stars-1.svg)] bg-cover">
          <header className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 px-28 py-16">
            {/* blur background */}
            <div className="absolute right-0 top-1/2 h-[17.5rem] w-[32rem] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-[200px]" />

            {/* stripes */}
            <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />

            {/* Content */}
            {isAuthenticated ? <Profile /> : <SignInButton />}
            <Hero />
            <Copyright />
          </header>

          <main className="flex max-h-screen flex-col overflow-y-scroll bg-[url(../assets/stars-2.svg)] bg-cover">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
