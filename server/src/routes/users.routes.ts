import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/users', async () => {
    const users = await prisma.user.findMany()

    return users
  })

  app.get('/users/:id', async (request, response) => {
    const { id } = request.params as any
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
    const { avatarUrl, githubId, login, name } = request.body as any
    const newUser = await prisma.user.create({
      data: { avatarUrl, githubId, login, name },
    })

    response.code(201)
    return newUser
  })
}
