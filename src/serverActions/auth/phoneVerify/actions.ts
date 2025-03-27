'use server'

import { cookies } from 'next/headers'
import httpClient from '@/util/httpClient'

export const sendPhoneAuthCode = async (phoneNumber: string) => {
  try {
    const response = await httpClient.post('/numberCertification/send', { phoneNumber })

    // 쿠키 추출 및 저장
    const certificationTokenCookie = response.headers['set-cookie']?.[0]
    if (certificationTokenCookie) {
      ;(await cookies()).set({
        name: 'certificationToken',
        value: certificationTokenCookie.split(';')[0].split('=')[1],
        path: '/',
        httpOnly: true,
        maxAge: 180, // 3분 (API와 동일한 만료 시간)
      })
    }

    return { success: true, message: '인증번호가 전송되었습니다.' }
  } catch (error) {
    console.error('인증번호 요청 실패:', error)

    return {
      success: false,
      message: '인증번호 요청에 실패했습니다.',
    }
  }
}

export const verifyPhoneAuthCode = async (code: string) => {
  try {
    const certificationToken = (await cookies()).get('certificationToken')?.value

    if (!certificationToken) {
      throw new Error('인증 토큰이 만료되었습니다.')
    }

    await httpClient.post(
      '/numberCertification/verify',
      { code },
      {
        // 인증토큰 쿠키 헤더에 포함
        headers: {
          Cookie: `certificationToken=${certificationToken}`,
        },
      },
    )

    return { success: true, message: '인증에 성공하였습니다.' }
  } catch (error) {
    console.error('휴대폰 인증 실패:', error)
    return {
      success: false,
      message: '인증번호가 일치하지 않습니다.',
    }
  }
}

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
