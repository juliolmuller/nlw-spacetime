import crypto from 'node:crypto'
import { createWriteStream } from 'node:fs'
import path from 'node:path'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'
import { FastifyInstance } from 'fastify'

export async function uploadRoutes(app: FastifyInstance) {
  const IMAGE_OR_VIDEO_MIMETYPE = /^(image|video)\/[a-z]+$/
  const pump = promisify(pipeline)

  app.post('/files', async (request, response) => {
    const upload = await request.file({
      limits: {
        fileSize: 5 * 1024 * 1024, // 5mb
      },
    })

    if (!upload) {
      return response.code(400).send({
        message: 'No file uploaded',
      })
    }

    if (!IMAGE_OR_VIDEO_MIMETYPE.test(upload.mimetype)) {
      return response.code(400).send({
        message: 'Not a video or an image',
      })
    }

    const fileId = crypto.randomUUID()
    const fileExt = path.extname(upload.filename)
    const fileName = fileId + fileExt
    const writeStream = createWriteStream(
      path.resolve(process.cwd(), 'tmp', fileName),
    )
    const fileUrl = request.protocol
      .concat('://')
      .concat(request.hostname)
      .concat('/assets/')
      .concat(fileName)

    await pump(upload.file, writeStream)

    return { url: fileUrl }
  })
}
