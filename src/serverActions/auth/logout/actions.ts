'use server'

import { ROUTES } from '@/constants/routes'
import { cookies } from 'next/headers'
import { createServerHttpClient } from '@/libs/axios/serverClient'
import { SESSION_COOKIE_NAME } from '@/constants/auth'

/**
 * 로그아웃 처리를 위한 Server Action
 * 쿠키에서 accessToken을 가져와 로그아웃 API를 호출하고, 쿠키를 삭제합니다.
 */
export async function logout() {
  try {
    // 쿠키 스토어 가져오기
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value

    if (!sessionToken) {
      throw new Error('인증 토큰이 만료되었습니다.')
    }

    // 서버 HTTP 클라이언트 생성 (쿠키가 자동으로 포함됨)
    const serverClient = await createServerHttpClient()

    // 로그아웃 API 호출
    await serverClient.get('/auth/logout')

    // 쿠키 만료 처리
    cookieStore.set(SESSION_COOKIE_NAME, '', {
      path: ROUTES.HOME,
      httpOnly: true,
      maxAge: 0,
      expires: new Date(0),
    })

    return { user: null, redirectTo: '/' }
  } catch (error) {
    console.error('로그아웃 실패:', error instanceof Error ? error.message : '알 수 없는 오류')
    return { error: '로그아웃에 실패했습니다. 다시 시도해주세요.' }
  }
}
