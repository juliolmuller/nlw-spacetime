import Link from 'next/link'

export default function NewMemoryPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <p className="text-4xl">👋 Hello, there!</p>
      <Link className="underline transition-colors hover:text-gray-50" href="/">
        &lt; Back
      </Link>
    </div>
  )
}
