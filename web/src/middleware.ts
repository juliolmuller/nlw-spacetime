import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const redirectUrl =
    process.env.NEXT_PUBLIC_GITHUB_AUTH_URL || new URL('/', request.url)
  const token = request.cookies.get('token')?.value

  if (token) {
    return NextResponse.next()
  }

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Set-Cookie': `redirect-url=${request.url}; Path=/; Max-Age=15; HttpOnly;`,
    },
  })
}

export const config = {
  matcher: '/memories/:path*',
}
