'use server'

import httpClient from '@/util/httpClient'

export const findUserIdByPhone = async (phoneNumber: string) => {
  try {
    const { data } = await httpClient.post('/user/recoveryid', { phone: phoneNumber })

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
