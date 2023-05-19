import { FastifyInstance } from 'fastify'
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
    try {
      const { id } = request.params as any
      const memory = await prisma.memory.findUniqueOrThrow({
        include: { user: true },
        where: { id },
      })

      return memory
    } catch (error: any) {
      if (error.code === 'P2025') {
        response.code(404)
        return {
          message: 'Memory does not exist',
        }
      }
      throw error
    }
  })

  app.post('/memories', async (request, response) => {
    const { content, coverUrl, isPublic, userId } = request.body as any
    const newMemory = await prisma.memory.create({
      data: {
        createdAt: new Date().toISOString(),
        content,
        coverUrl,
        isPublic,
        userId,
      },
    })

    response.code(201)
    return newMemory
  })

  app.put('/memories/:id', async (request, response) => {
    try {
      const { id } = request.params as any
      const { content, coverUrl, isPublic, userId } = request.body as any
      const newMemory = await prisma.memory.update({
        data: {
          createdAt: new Date().toISOString(),
          content,
          coverUrl,
          isPublic,
          userId,
        },
        where: { id },
      })

      return newMemory
    } catch (error: any) {
      if (error.code === 'P2025') {
        response.code(404)
        return {
          message: 'Memory does not exist',
        }
      }
      throw error
    }
  })

  app.delete('/memories/:id', async (request, response) => {
    try {
      const { id } = request.params as any
      const memory = await prisma.memory.delete({
        include: { user: true },
        where: { id },
      })

      if (!memory) {
        response.code(404)
        return {
          message: 'Memory does not exist',
        }
      }

      return memory
    } catch (error: any) {
      if (error.code === 'P2025') {
        response.code(404)
        return {
          message: 'Memory does not exist',
        }
      }
      throw error
    }
  })
}
