import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { EmptyMemories } from '~/components/EmptyMemories'
import { api } from '~/lib/api'
import { checkAuth, getToken } from '~/lib/auth'

type Memory = {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

export default async function HomePage() {
  const isAuthenticated = checkAuth()

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const response = await api.get<Memory[]>('/memories', {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
  const memories = response.data

  if (!memories.length) {
    return <EmptyMemories />
  }

  return (
    <ul className="flex flex-col gap-10 p-8">
      {memories.map(({ coverUrl, createdAt, excerpt, id }) => (
        <li key={`memory-${id}`} className="space-y-4">
          <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
            {new Date(createdAt).toLocaleString('pt-BR', { dateStyle: 'long' })}
          </time>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="aspect-video w-full rounded-lg object-cover"
            src={coverUrl}
            alt="capa da memória"
          />

          <p className="text-lg leading-relaxed text-gray-100">{excerpt}</p>

          <Link
            className="flex items-center gap-2 text-sm text-gray-200 transition-colors hover:text-gray-100"
            href={`/memories/${id}`}
          >
            Ler Mais
            <ArrowRight className="h-4 w-4" />
          </Link>
        </li>
      ))}
    </ul>
  )
}
