import fastify from 'fastify'
import { makeUsersRoutes } from './routes/users.routes'

const port = Number(process.env.PORT) || 8080
const app = fastify()

app.get('/', () => {
  return 'Hello, there!'
})

makeUsersRoutes(app)

app.listen({ port }).then(() => {
  console.info(`🚀 Server running at http://localhost:${port}`)
})
