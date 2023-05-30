import jwtDecode from 'jwt-decode'
import { cookies } from 'next/headers'

export type JWTPayload = {
  sub: string
  name: string
  avatarUrl: string
}

export type User = {
  id: string
  name: string
  avatarUrl: string
}

export function getToken() {
  const token = cookies().get('token')?.value

  return token
}

export function getUser(): User {
  const token = getToken()

  if (!token) {
    throw new Error('Unauthenticated.')
  }

  const jwtPayload: JWTPayload = jwtDecode(token)

  return {
    id: jwtPayload.sub,
    name: jwtPayload.name,
    avatarUrl: jwtPayload.avatarUrl,
  }
}

export function checkAuth() {
  return cookies().has('token')
}
