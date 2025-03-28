'use server'

import { cookies } from 'next/headers'
import { AxiosError } from 'axios'
import httpClient from '@/util/httpClient'
import { ServerActionResponse } from '@/types/serverAction/serverActionType'

const EMAIL_API_PATH = '/emailCertification'

export const sendEmailAuthCode = async (
  email: string,
  usage: 'signup' | 'findpw',
): Promise<ServerActionResponse> => {
  const apiPath =
    usage === 'signup' ? `${EMAIL_API_PATH}/signup/send` : `${EMAIL_API_PATH}/passwordReset/send`

  try {
    const response = await httpClient.post(apiPath, { email })

    const certificationTokenCookie = response.headers['set-cookie']?.[0]
    if (certificationTokenCookie) {
      ;(await cookies()).set({
        name: 'certificationToken',
        value: certificationTokenCookie.split(';')[0].split('=')[1],
        path: '/',
        httpOnly: true,
        maxAge: 300, // 5분 (API와 동일한 만료 시간)
      })
    }

    return { success: true, message: '인증번호가 전송되었습니다.' }
  } catch (error) {
    const axiosError = error as AxiosError
    let errorObj = {}

    if (axiosError.response?.status === 409) {
      // 중복 이메일
      errorObj = {
        status: axiosError.response?.status,
        message: '사용할 수 없는 이메일입니다.',
      }
    } else if (axiosError.response?.status === 500) {
      // 전송 실패
      errorObj = { status: axiosError.response?.status, message: '이메일 전송 실패' }
    } else {
      errorObj = { message: '네트워크 오류 또는 예기치 않은 에러' }
    }

    return { success: false, ...errorObj }
  }
}

export const verifyEmailAuthCode = async (code: string): Promise<ServerActionResponse> => {
  try {
    const certificationToken = (await cookies()).get('certificationToken')?.value

    if (!certificationToken) {
      throw new Error('인증 토큰이 만료되었습니다.')
    }

    await httpClient.post(
      `${EMAIL_API_PATH}/verify`,
      { code },
      {
        // 인증토큰 쿠키 헤더에 포함
        headers: {
          Cookie: `certificationToken=${certificationToken}`,
        },
      },
    )

    return { success: true, message: '인증에 성공하였습니다.' }
  } catch {
    return {
      success: false,
      message: '인증번호가 일치하지 않습니다.',
    }
  }
}
