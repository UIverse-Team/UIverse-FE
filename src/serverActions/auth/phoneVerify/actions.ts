'use server'

import { cookies } from 'next/headers'
import type { ServerActionResponse } from '@/types/serverAction/serverActionType'
import { createServerHttpClient } from '@/libs/axios/serverClient'

/**
 * 휴대폰 인증번호 발송 Server Action
 * @param phoneNumber 휴대폰 번호
 */
export const sendPhoneAuthCode = async (phoneNumber: string): Promise<ServerActionResponse> => {
  try {
    // 서버 HTTP 클라이언트 생성
    const serverClient = await createServerHttpClient()

    // 휴대폰 인증번호 발송 API 호출
    const response = await serverClient.post('/numberCertification/send', { phoneNumber })

    // 쿠키 추출 및 저장
    const certificationTokenCookie = response.headers['set-cookie']?.[0]
    if (certificationTokenCookie) {
      const cookieStore = await cookies()
      cookieStore.set({
        name: 'certificationToken',
        value: certificationTokenCookie.split(';')[0].split('=')[1],
        path: '/',
        httpOnly: true,
        maxAge: 180, // 3분 (API와 동일한 만료 시간)
      })
    }

    return { success: true, message: '인증번호가 전송되었습니다.' }
  } catch (error) {
    console.error('인증번호 요청 실패:', error instanceof Error ? error.message : '알 수 없는 오류')

    return {
      success: false,
      message: '인증번호 요청에 실패했습니다.',
    }
  }
}

/**
 * 휴대폰 인증번호 검증 Server Action
 * @param code 인증 코드
 */
export const verifyPhoneAuthCode = async (code: string): Promise<ServerActionResponse> => {
  try {
    // 쿠키에서 인증 토큰 가져오기
    const cookieStore = await cookies()
    const certificationToken = cookieStore.get('certificationToken')?.value

    if (!certificationToken) {
      throw new Error('인증 토큰이 만료되었습니다.')
    }

    // 서버 HTTP 클라이언트 생성
    // 주의: createServerHttpClient는 현재 쿠키를 자동으로 포함하지만,
    // 특정 쿠키만 전송하기 위해 명시적으로 헤더 설정
    const serverClient = await createServerHttpClient()

    // 인증 코드 검증 API 호출
    await serverClient.post(
      '/numberCertification/verify',
      { code },
      {
        headers: {
          Cookie: `certificationToken=${certificationToken}`,
        },
      },
    )

    return { success: true, message: '인증에 성공하였습니다.' }
  } catch (error) {
    console.error('휴대폰 인증 실패:', error instanceof Error ? error.message : '알 수 없는 오류')
    return {
      success: false,
      message: '인증번호가 일치하지 않습니다.',
    }
  }
}
