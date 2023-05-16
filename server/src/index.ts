import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'

const port = Number(process.env.PORT) || 8080
const prisma = new PrismaClient()
const app = fastify()

app.get('/', () => {
  return 'Hello, there!'
})

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
  const { name } = request.body as any
  const newUser = await prisma.user.create({
    data: { name },
  })

  return newUser
})

app.listen({ port }).then(() => {
  console.info(`🚀 Server running at http://localhost:${port}`)
})
