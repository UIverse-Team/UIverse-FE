import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const loginedRestrictedPaths = ['/login', '/signup', '/find-id', '/find-pw']
  const notLoginedRestrictedPaths = ['/mypage']

  // 인증 토큰 확인
  const accessToken = request.cookies.get('accessToken')

  const isLogin = Boolean(accessToken)

  // 로그인 상태에서 로그인 페이지 접근 차단
  if (isLogin && loginedRestrictedPaths.includes(path)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 비로그인 상태에서 보호된 페이지 접근 차단
  if (!isLogin && notLoginedRestrictedPaths.includes(path)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}
