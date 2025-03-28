'use server'

import httpClient from '@/util/httpClient'
import { getLocalStorageItemWithExpiry, removeLocalStorageItem } from '@/util/localstorageUtil'

export async function logout() {
  try {
    const accessToken = getLocalStorageItemWithExpiry('accessToken')

    if (!accessToken) {
      throw new Error('인증 토큰이 만료되었습니다.')
    }

    await httpClient.get(`/auth/logout`, {
      // 인증토큰 쿠키 헤더에 포함
      headers: {
        Cookie: `certificationToken=${accessToken}`,
      },
    })

    removeLocalStorageItem('accessToken')

    return {
      user: null,
      redirectTo: '/',
      removeToken: true,
    }
  } catch {
    return { error: '로그아웃에 실패했습니다. 다시 시도해주세요.' }
  }
}
