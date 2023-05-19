import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/memories', async () => {
    const EXCERPT_LENGTH = 110
    const memories = await prisma.memory.findMany({
      include: { user: true },
      orderBy: { createdAt: 'asc' },
    })

    return memories.map((memory) => ({
      id: memory.id,
      user: memory.user,
      isPublic: memory.isPublic,
      createdAt: memory.createdAt,
      updatedAt: memory.updatedAt,
      coverUrl: memory.coverUrl,
      excerpt:
        memory.content.length > EXCERPT_LENGTH
          ? memory.content.slice(0, EXCERPT_LENGTH).concat('...')
          : memory.content,
    }))
  })

  app.get('/memories/:id', async (request, response) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.params)
    const memory = await prisma.memory.findUniqueOrThrow({
      include: { user: true },
      where: { id },
    })

    return memory
  })

  app.post('/memories', async (request, response) => {
    const bodySchema = z.object({
      userId: z.string().uuid(),
      createdAt: z.coerce.date().default(new Date()),
      isPublic: z.coerce.boolean().optional(),
      coverUrl: z.string().url(),
      content: z.string(),
    })
    const { content, coverUrl, createdAt, isPublic, userId } = bodySchema.parse(
      request.body,
    )
    const newMemory = await prisma.memory.create({
      data: { createdAt, content, coverUrl, isPublic, userId },
    })

    response.code(201)
    return newMemory
  })

  app.put('/memories/:id', async (request, response) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const bodySchema = z.object({
      userId: z.string().uuid(),
      createdAt: z.coerce.date(),
      isPublic: z.coerce.boolean().optional(),
      coverUrl: z.string().url(),
      content: z.string(),
    })
    const { id } = paramsSchema.parse(request.params)
    const { content, coverUrl, createdAt, isPublic, userId } = bodySchema.parse(
      request.body,
    )
    const newMemory = await prisma.memory.update({
      data: { createdAt, content, coverUrl, isPublic, userId },
      where: { id },
    })

    return newMemory
  })

  app.delete('/memories/:id', async (request, response) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.params)
    const memory = await prisma.memory.delete({
      include: { user: true },
      where: { id },
    })

    return memory
  })
}
