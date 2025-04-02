'use server'

import { cookies } from 'next/headers'
import { AxiosError } from 'axios'
import { ServerActionResponse } from '@/types/serverAction/serverActionType'
import { createServerHttpClient } from '@/libs/axios/serverClient'

const EMAIL_API_PATH = '/emailCertification'

/**
 * 이메일 인증 코드 발송 Server Action
 * @param email 이메일 주소
 * @param usage 사용 용도 (signup: 회원가입, findpw: 비밀번호 찾기)
 */
export const sendEmailAuthCode = async (
  email: string,
  usage: 'signup' | 'findpw',
): Promise<ServerActionResponse> => {
  const apiPath =
    usage === 'signup' ? `${EMAIL_API_PATH}/signup/send` : `${EMAIL_API_PATH}/passwordReset/send`

  try {
    // 서버 HTTP 클라이언트 생성
    const serverClient = await createServerHttpClient()

    // 이메일 인증 코드 발송 API 호출
    const response = await serverClient.post(apiPath, { email })

    // 인증 토큰 쿠키 추출 및 설정
    const certificationTokenCookie = response.headers['set-cookie']?.[0]
    if (certificationTokenCookie) {
      const cookieStore = await cookies()
      cookieStore.set({
        name: 'certificationToken',
        value: certificationTokenCookie.split(';')[0].split('=')[1],
        path: '/',
        httpOnly: true,
        maxAge: 300, // 5분 (API와 동일한 만료 시간)
      })
    }

    return { success: true, message: '인증번호가 전송되었습니다.' }
  } catch (error) {
    // 에러 타입 처리
    const axiosError = error as AxiosError
    let errorObj: {
      status?: number
      message: string
    } = { message: '네트워크 오류 또는 예기치 않은 에러' }

    if (axiosError.response?.status === 409) {
      // 중복 이메일
      errorObj = {
        status: axiosError.response.status,
        message: '사용할 수 없는 이메일입니다.',
      }
    } else if (axiosError.response?.status === 500) {
      // 전송 실패
      errorObj = {
        status: axiosError.response.status,
        message: '이메일 전송 실패',
      }
    }

    console.error(
      '이메일 인증 코드 발송 실패:',
      error instanceof Error ? error.message : '알 수 없는 오류',
    )
    return { success: false, ...errorObj }
  }
}

/**
 * 이메일 인증 코드 검증 Server Action
 * @param code 인증 코드
 */
export const verifyEmailAuthCode = async (code: string): Promise<ServerActionResponse> => {
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
      `${EMAIL_API_PATH}/verify`,
      { code },
      {
        headers: {
          Cookie: `certificationToken=${certificationToken}`,
        },
      },
    )

    return { success: true, message: '인증에 성공하였습니다.' }
  } catch (error) {
    console.error(
      '이메일 인증 코드 검증 실패:',
      error instanceof Error ? error.message : '알 수 없는 오류',
    )
    return {
      success: false,
      message: '인증번호가 일치하지 않습니다.',
    }
  }
}
