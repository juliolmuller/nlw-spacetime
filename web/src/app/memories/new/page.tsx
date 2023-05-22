import { CameraIcon, ChevronLeftIcon } from 'lucide-react'
import Link from 'next/link'

export default function NewMemoryPage() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <Link
        className="flex items-center gap-1 self-start text-sm text-gray-200 transition-colors hover:text-gray-100"
        href="/"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Voltar à timeline
      </Link>

      <form className="flex flex-1 flex-col gap-4">
        <div className="flex items-center gap-4">
          <label
            className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 transition-colors hover:text-gray-100"
            htmlFor="media"
            tabIndex={0}
          >
            <input
              className="invisible absolute"
              type="file"
              id="media"
              name="cover"
            />
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

        <textarea
          className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:bg-gray-300 focus:bg-opacity-5 focus:ring-8 focus:ring-gray-300 focus:ring-opacity-5"
          autoFocus
          name="content"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
          spellCheck={false}
        />
      </form>
    </div>
  )
}
