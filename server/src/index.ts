import cors from '@fastify/cors'
import fastify from 'fastify'
import { usersRoutes } from './routes/users.routes'
import { memoriesRoutes } from './routes/memories.routes'

const port = Number(process.env.PORT) || 8080
const app = fastify()

app.get('/', () => {
  return 'Hello, there!'
})

app.register(cors, { origin: true })
app.register(usersRoutes)
app.register(memoriesRoutes)

app.listen({ port }).then(() => {
  console.info(`🚀 Server running at http://localhost:${port}`)
})
