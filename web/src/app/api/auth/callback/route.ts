import { NextRequest, NextResponse } from 'next/server'
import { api } from '~/lib/api'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const response = await api.post('/auth', { code })
  const { token } = response.data
  const redirectUrl =
    request.cookies.get('redirect-url')?.value || new URL('/', request.url)
  const cookieMaxAge = 60 * 60 * 24 * 30 // 30 days

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Set-Cookie': `token=${token}; max-age=${cookieMaxAge}; path=/;`,
    },
  })
}
