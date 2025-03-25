'use server'

import httpClient from '@/util/httpClient'

export async function logout() {
  try {
    await httpClient.get(`/auth/logout`)

    return { user: null, redirectTo: '/' }
  } catch {
    return { error: '로그아웃에 실패했습니다. 다시 시도해주세요.' }
  }
}
