'use server'

import httpClient from '@/util/httpClient'

export const changePassword = async (email: string, password: string) => {
  try {
    await httpClient.patch('/user/recoverypw', { email, password })

    return {
      success: true,
      message: '비밀번호 변경이 완료되었습니다.',
    }
  } catch (error) {
    console.error('비밀번호 변경 실패:', error)
    return {
      success: false,
      message: '비밀번호 변경 중 오류가 발생했습니다. 다시 시도해주세요.',
    }
  }
}
