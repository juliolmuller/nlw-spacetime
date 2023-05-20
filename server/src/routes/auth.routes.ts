import axios from 'axios'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function authRoutes(app: FastifyInstance) {
  app.post('/auth', async (request) => {
    const bodySchema = z.object({
      code: z.string(),
    })
    const accessTokenSchema = z.object({
      access_token: z.string(),
    })
    const gitHubUserSchema = z.object({
      id: z.number(),
      name: z.string(),
      login: z.string(),
      avatar_url: z.string().url(),
    })

    const { code } = bodySchema.parse(request.body)
    const accessTokenResponse = await axios({
      method: 'POST',
      url: process.env.GITHUB_ACCESS_TOKEN_URL,
      params: {
        code,
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
      },
      headers: {
        Accept: 'application/json',
      },
    })
    const { access_token: accessToken } = accessTokenSchema.parse(
      accessTokenResponse.data,
    )
    const userDataResponse = await axios({
      url: process.env.GITHUB_USER_URL!,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const {
      name,
      login,
      id: githubId,
      avatar_url: avatarUrl,
    } = gitHubUserSchema.parse(userDataResponse.data)

    let user = await prisma.user.findUnique({
      where: { githubId },
    })

    if (!user) {
      user = await prisma.user.create({
        data: { avatarUrl, githubId, login, name },
      })
    }

    const token = app.jwt.sign(
      {
        avatarUrl: user.avatarUrl,
        name: user.name,
      },
      {
        sub: user.id,
        expiresIn: '30d',
      },
    )

    return { token }
  })
}
