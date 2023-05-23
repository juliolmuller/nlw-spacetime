import path from 'node:path'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import assets from '@fastify/static'
import fastify from 'fastify'
import { internalIpV4Sync } from 'internal-ip'
import { authRoutes } from './routes/auth.routes'
import { memoriesRoutes } from './routes/memories.routes'
import { uploadRoutes } from './routes/upload.routes'

const port = Number(process.env.PORT) || 8080
const host = '0.0.0.0'
const app = fastify()

app.get('/', () => {
  return 'Hello, there!'
})

app.register(multipart)
app.register(cors, { origin: true })
app.register(jwt, { secret: process.env.JWT_SECRET! })
app.register(assets, {
  root: path.resolve(process.cwd(), 'tmp'),
  prefix: '/assets',
})

app.register(authRoutes)
app.register(memoriesRoutes)
app.register(uploadRoutes)

app.listen({ port, host }).then(() => {
  console.info(`
    🚀 Server is up!
       • Local machine URL: http://localhost:${port}
       • Local network URL: http://${internalIpV4Sync()}:${port}`)
})
