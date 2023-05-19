import { Copyright } from '~/components/Copyright'
import { EmptyMemories } from '~/components/EmptyMemories'
import { Hero } from '~/components/Hero'
import { SignInButton } from '~/components/SignInButton'

export default function HomePage() {
  return (
    <div className="grid min-h-screen grid-cols-2 bg-[url(../assets/stars-1.svg)] bg-cover">
      <header className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 px-28 py-16">
        {/* blur background */}
        <div className="absolute right-0 top-1/2 h-[17.5rem] w-[32rem] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-[200px]" />

        {/* stripes */}
        <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />

        {/* Content */}
        <SignInButton />
        <Hero />
        <Copyright />
      </header>

      <main className="flex flex-col bg-[url(../assets/stars-2.svg)] bg-cover p-16">
        <EmptyMemories />
      </main>
    </div>
  )
}
