import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/users', async () => {
    const users = await prisma.user.findMany()

    return users
  })

  app.get('/users/:id', async (request, response) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.params)
    const user = await prisma.user.findFirst({
      where: { id },
    })

    if (!user) {
      response.code(404)
      return {
        message: 'User does not exist',
      }
    }

    return user
  })

  app.post('/users', async (request, response) => {
    const bodySchema = z.object({
      avatarUrl: z.string().url(),
      githubId: z.number().int().positive(),
      login: z.string(),
      name: z.string(),
    })
    const { avatarUrl, githubId, login, name } = bodySchema.parse(request.body)
    const newUser = await prisma.user.create({
      data: { avatarUrl, githubId, login, name },
    })

    response.code(201)
    return newUser
  })
}
