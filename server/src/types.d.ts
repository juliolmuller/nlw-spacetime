import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
      name: string
      avatarUrl: string
    }
  }
}

// index.ts
fastify.get('/', async (request, reply) => {
  request.user.name // string

  const token = await reply.jwtSign({
    id: '123',
    // ^ Type 'string' is not assignable to type 'number'.
  })
})
