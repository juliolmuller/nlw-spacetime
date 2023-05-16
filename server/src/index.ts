import fastify from 'fastify'

const port = Number(process.env.PORT) || 8080
const app = fastify()

app.get('/', () => {
  return 'Hello, there!'
})

app.listen({ port }).then(() => {
  console.info(`🚀 Server running at http://localhost:${port}`)
})
