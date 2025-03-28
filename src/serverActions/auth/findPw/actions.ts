'use server'

import { AxiosError } from 'axios'
import httpClient from '@/util/httpClient'

export const checkExistingPassword = async (email: string, newPassword: string) => {
  try {
    const { data: isUsable } = await httpClient.post('/user/checkpw', {
      email,
      password: newPassword,
    })

    if (isUsable) {
      // 비밀번호 사용 가능
      return { success: true }
    } else {
      // 비밀번호 사용 불가능
      return { success: false, message: '새로운 비밀번호를 입력해주세요.' }
    }
  } catch (error) {
    const axiosError = error as AxiosError
    let errorObj = {}
    // 400 이면 비밀번호 형식이 맞지 않는 경우임. 비밀번호 중복은 아님
    if (axiosError.response?.status !== 400) {
      console.error('기존 비밀번호 체크 실패:', error)
      errorObj = { message: '네트워크 오류 또는 예기치 않은 에러' }
    }

    return { success: true, ...errorObj }
  }
}

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
