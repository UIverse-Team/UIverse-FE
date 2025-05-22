'use server'

import { SESSION_COOKIE_NAME } from '@/constants/auth'
import { createServerHttpClient } from '@/libs/axios/serverClient'
import { cookies } from 'next/headers'

/**
 * 회원 정보를 받아오기 위한 Server Action
 * 쿠키에서 accessToken을 가져와 회원정보 API를 호출하고, 데이터를 받아옵니다.
 */
export async function getUserData() {
  try {
    // 쿠키 스토어 가져오기
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value

    if (!sessionToken) {
      throw new Error('인증 토큰이 만료되었습니다.')
    }

    // 서버 HTTP 클라이언트 생성 (쿠키가 자동으로 포함됨)
    const serverClient = await createServerHttpClient()

    // 회원정보 GET API 호출
    const response = await serverClient.get('/user')

    return response.data
  } catch (error) {
    console.error('회원정보 GET 실패:', error instanceof Error ? error.message : '알 수 없는 오류')
    return { error: '회원정보를 받아오는 데 실패했습니다. 다시 시도해주세요.' }
  }
}
