'use server'

import { createServerHttpClient } from '@/libs/axios/serverClient'

export const findUserIdByPhone = async (phoneNumber: string) => {
  try {
    // 서버 HTTP 클라이언트 생성
    const serverClient = await createServerHttpClient()
    const { data } = await serverClient.post('/user/recoveryid', { phone: phoneNumber })

    if (data.loginId) {
      return {
        success: true,
        loginId: data.loginId,
      }
    } else {
      return {
        success: false,
        message: '아이디를 찾을 수 없습니다.',
      }
    }
  } catch (error) {
    console.error('아이디 찾기 실패:', error)
    return {
      success: false,
      message: '아이디를 찾을 수 없습니다.',
    }
  }
}
