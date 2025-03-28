'use server'

import { ROUTES } from '@/constants/routes'
import httpClient from '@/util/httpClient'
import { cookies } from 'next/headers'

export async function logout() {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    if (!accessToken) {
      throw new Error('인증 토큰이 만료되었습니다.')
    }

    await httpClient.get(`/auth/logout`, {
      // 인증토큰 쿠키 헤더에 포함
      headers: {
        Cookie: `certificationToken=${accessToken}`,
      },
    })

    cookieStore.set('accessToken', '', { path: ROUTES.HOME, httpOnly: true, maxAge: 0 })

    return { user: null, redirectTo: '/' }
  } catch {
    return { error: '로그아웃에 실패했습니다. 다시 시도해주세요.' }
  }
}
