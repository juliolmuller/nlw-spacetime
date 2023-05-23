'use client'

import { ChangeEvent, useState } from 'react'

export type MediaPickerProps = {
  id: string
  name: string
}

export function MediaPicker({ id, name }: MediaPickerProps) {
  const [previewUrl, setPreviewUrl] = useState<string>()

  function handlePickFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) return

    setPreviewUrl(URL.createObjectURL(file))
  }

  return (
    <>
      <input
        className="invisible absolute"
        accept="image/*, video/*"
        type="file"
        id={id}
        name={name}
        onChange={handlePickFile}
      />

      {previewUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="rounded-large aspect-video w-full object-cover"
          src={previewUrl}
          alt="capa da memória"
        />
      )}
    </>
  )
}
