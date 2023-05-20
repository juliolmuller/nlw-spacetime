import Image from 'next/image'
import { getUser } from '~/lib/auth'

export function Profile() {
  const user = getUser()

  return (
    <div className="flex items-center gap-3 text-left">
      <Image
        className="h-10 w-10 rounded-full"
        src={user.avatarUrl}
        alt={`avatar de ${user.name}`}
        height={40}
        width={40}
      />

      <p className="text-sm leading-snug">
        {user.name}
        <a
          className="block text-red-400 transition-colors hover:text-red-300"
          href="#"
        >
          Sair
        </a>
      </p>
    </div>
  )
}
