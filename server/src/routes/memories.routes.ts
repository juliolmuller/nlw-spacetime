import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/memories', async () => {
    const memories = await prisma.memory.findMany()

    return memories
  })

  app.get('/memories/:id', async (request) => {
    const { id } = request.params as any
    const memory = await prisma.memory.findFirst({
      where: { id },
    })

    return memory
  })

  app.post('/memories', async (request) => {
    const { content, coverUrl, isPublic } = request.body as any
    const newMemory = await prisma.memory.create({
      data: { content, coverUrl, isPublic, userId: 'foo' },
    })

    return newMemory
  })
}
