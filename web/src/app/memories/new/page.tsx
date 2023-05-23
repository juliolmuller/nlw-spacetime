import { ChevronLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { MemoryForm } from '~/components/MemoryForm'

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

      <MemoryForm />
    </div>
  )
}
