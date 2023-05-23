'use client'

import cookies from 'js-cookie'
import { CameraIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { MediaPicker } from '~/components/MediaPicker'
import { api } from '~/lib/api'

export function MemoryForm() {
  const router = useRouter()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    if (!formData.get('cover')) {
      alert('Por favor, selecione uma imagem para capa.')
      return
    }
    if (!formData.get('content')) {
      alert('Por favor, informe uma descrição para a memória.')
      return
    }

    const fileFormData = new FormData()
    fileFormData.append('file', formData.get('cover')!)

    const uploadResponse = await api.post('/files', fileFormData)
    const coverUrl = uploadResponse.data.url

    await api.post(
      '/memories',
      {
        isPublic: formData.get('isPublic'),
        content: formData.get('content'),
        coverUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${cookies.get('token')}`,
        },
      },
    )
    router.replace('/')
  }

  return (
    <form
      className="flex flex-1 flex-col gap-4"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="flex items-center gap-4">
        <label
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 transition-colors hover:text-gray-100"
          htmlFor="media"
          tabIndex={0}
        >
          <CameraIcon className="h-4 w-4" />
          Anexar Mídia
        </label>

        <label
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 transition-colors hover:text-gray-100"
          htmlFor="isPublic"
          tabIndex={0}
        >
          <input
            className="h4- w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
            type="checkbox"
            id="isPublic"
            name="isPublic"
            tabIndex={-1}
          />
          Tornar memória públic
        </label>
      </div>

      <MediaPicker id="media" name="cover" />

      <textarea
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:bg-gray-300 focus:bg-opacity-5 focus:ring-8 focus:ring-gray-300 focus:ring-opacity-5"
        autoFocus
        name="content"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
        spellCheck={false}
      />

      <button
        className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600"
        type="submit"
      >
        Salvar
      </button>
    </form>
  )
}
