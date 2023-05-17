import { UserIcon } from 'lucide-react'
import Image from 'next/image'
import nlwSpacetimeLogo from '~/assets/nlw-spacetime-v-logo.svg'

export default function HomePage() {
  return (
    <main className="grid min-h-screen grid-cols-2 bg-[url(../assets/stars-1.svg)] bg-cover">
      <header className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 px-28 py-16">
        {/* blur */}
        <div className="absolute right-0 top-1/2 h-[17.5rem] w-[32rem] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-[200px]" />

        {/* stripes */}
        <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />

        {/* sign up link */}
        <a
          className="flex items-center gap-3 text-left transition-colors hover:text-gray-50"
          href="#"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
            <UserIcon className="h-5 w-5 text-gray-500" />
          </div>

          <p className="text-sm leading-snug">
            <span className="underline">Crie sua conta</span> e salve <br />
            suas memórias!
          </p>
        </a>

        {/* hero */}
        <div className="flex flex-col items-start gap-5">
          <Image src={nlwSpacetimeLogo} alt="NLW Spacetime logotype" />

          <div className="max-w-[26.5rem] space-y-1">
            <h1 className="text-5xl font-bold leading-tight text-gray-50">
              Sua cápsula do tempo
            </h1>
            <p className="text-lg leading-relaxed">
              Colecione momentos marcantes da sua jornada e compartilhe (se
              quiser) com o mundo!
            </p>
          </div>

          <a
            className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600"
            href="#"
          >
            Cadastrar Lembrança
          </a>
        </div>

        {/* copyright */}
        <div className="inline text-sm leading-relaxed text-gray-200">
          Feito com 💜 no NLW da{' '}
          <a
            className="underline transition-colors hover:text-gray-100"
            href="https://rocketseat.com.br"
            target="_blank"
            rel="noreferrer"
          >
            Rocketseat
          </a>
        </div>
      </header>

      <div className="flex flex-col bg-[url(../assets/stars-2.svg)] bg-cover p-16">
        <div className="flex flex-1 items-center justify-center">
          <p className="w-[22.5rem] text-center leading-relaxed">
            Você ainda não registrou nenhuma lembrança, comece a{' '}
            <a
              className="underline transition-colors hover:text-gray-50"
              href="#"
            >
              criar agora
            </a>
            !
          </p>
        </div>
      </div>
    </main>
  )
}
