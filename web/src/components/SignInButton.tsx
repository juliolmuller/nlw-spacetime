import { UserIcon } from 'lucide-react'

export function SignInButton() {
  return (
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
  )
}
