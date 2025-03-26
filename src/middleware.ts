import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const loginedRestrictedPaths = ['/login', '/signup', '/find-id', '/find-pw']
  const notLoginedRestrictedPaths = ['/mypage']

  let isLogin = false

  try {
    const authResponse = await fetch(`${process.env.SERVER_API_V1_BASE_URL}/auth`, {
      method: 'GET',
      credentials: 'include',
    })
    console.log('=======')
    console.log(authResponse.status)

    // isLogin = authResponse.ok;
  } catch {
    isLogin = false
  }

  if (isLogin && loginedRestrictedPaths.includes(path)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!isLogin && notLoginedRestrictedPaths.includes(path)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}
