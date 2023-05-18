import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/users', async () => {
    const users = await prisma.user.findMany()

    return users
  })

  app.get('/users/:id', async (request) => {
    const { id } = request.params as any
    const user = await prisma.user.findFirst({
      where: { id },
    })

    return user
  })

  app.post('/users', async (request) => {
    const { avatarUrl, githubId, login, name } = request.body as any
    const newUser = await prisma.user.create({
      data: { avatarUrl, githubId, login, name },
    })

    return newUser
  })
}
