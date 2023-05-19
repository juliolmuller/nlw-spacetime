import Image from 'next/image'
import nlwSpacetimeLogo from '~/assets/nlw-spacetime-v-logo.svg'

export function Hero() {
  return (
    <div className="flex flex-col items-start gap-5">
      <Image src={nlwSpacetimeLogo} alt="NLW Spacetime logotype" />

      <div className="max-w-[26.5rem] space-y-1">
        <h1 className="text-5xl font-bold leading-tight text-gray-50">
          Sua cápsula do tempo
        </h1>
        <p className="text-lg leading-relaxed">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
      </div>

      <a
        className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600"
        href="#"
      >
        Cadastrar Lembrança
      </a>
    </div>
  )
}
