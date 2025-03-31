'use server'

import { socialCertificationData, socialUrlData } from '@/types/login/loginType'
import { v4 as uuidv4 } from 'uuid'
import { cookies } from 'next/headers'
import { createServerHttpClient } from '@/libs/axios/serverClient'
import { SESSION_COOKIE_NAME } from '@/constants/auth'

/**
 * 이메일/비밀번호 로그인 처리 Server Action
 * @param state 이전 상태
 * @param formData 폼 데이터
 */
export const submitLogin = async (
  state: { error?: string; redirectTo?: string } | null,
  formData: FormData,
) => {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  try {
    // 서버 HTTP 클라이언트 생성
    const serverClient = await createServerHttpClient()

    // 로그인 API 호출
    const response = await serverClient.post(`/auth/signin`, {
      loginId: email,
      password: password,
    })

    // 응답 헤더에서 세션 토큰 추출
    const sessionToken = response.headers['set-cookie']?.[0]

    if (sessionToken) {
      const cookieStore = await cookies()
      const cookieValue = sessionToken.split(';')[0].split('=')[1]

      cookieStore.set({
        name: SESSION_COOKIE_NAME,
        value: cookieValue,
        path: '/',
        httpOnly: true,
        maxAge: 3600,
      })
    }

    return { user: response.data, redirectTo: '/' }
  } catch {
    return { error: '로그인에 실패했습니다.\n다시 시도해주세요.' }
  }
}

/**
 * 소셜 로그인 인증 URL 생성 Server Action
 * @param provider 소셜 로그인 제공자 (kakao, google, naver)
 */
export const socialLogin = async (provider: string) => {
  try {
    // 서버 HTTP 클라이언트 생성
    const serverClient = await createServerHttpClient()

    const { data } = await serverClient.get(`/oauth/${provider}`)
    const certificationUrl = setCertificationUrl(data, provider)

    return certificationUrl
  } catch {
    throw new Error('소셜 인증에 실패했습니다.')
  }
}

export const socialCertification = async (data: socialCertificationData) => {
  try {
    // 서버 HTTP 클라이언트 생성
    const serverClient = await createServerHttpClient()

    const response = await serverClient.post(`/oauth/login`, {
      provider: data.provider,
      code: data.code,
      state: data.state,
    })

    // 응답 헤더에서 세션 토큰 추출
    const sessionToken = response.headers['set-cookie']?.[0]

    if (sessionToken) {
      const cookieStore = await cookies()
      const [cookieName, cookieValue] = sessionToken.split(';')[0].split('=')

      cookieStore.set({
        name: cookieName,
        value: cookieValue,
        path: '/',
        httpOnly: true,
        maxAge: 3600,
      })
    }

    return {
      user: response.data,
      redirectTo: '/',
    }
  } catch {
    return { error: '소셜 인증에 실패했습니다. 다시 시도해주세요.' }
  }
}

const setCertificationUrl = (data: socialUrlData, provider: string) => {
  let certificationUrl = ''
  switch (provider) {
    case 'kakao':
      certificationUrl =
        data.authorizationUri +
        '?client_id=' +
        data.clientId +
        '&redirect_uri=' +
        data.redirectUri +
        '&response_type=code&scope=profile_nickname&state=' +
        uuidv4()
      break
    case 'google':
      certificationUrl =
        data.authorizationUri +
        '?client_id=' +
        data.clientId +
        '&redirect_uri=' +
        data.redirectUri +
        '&response_type=code&scope=email profile&state=' +
        uuidv4()
      break
    case 'naver':
      certificationUrl =
        data.authorizationUri +
        '?client_id=' +
        data.clientId +
        '&redirect_uri=' +
        data.redirectUri +
        '&response_type=code&state=' +
        uuidv4()
      break
  }

  return certificationUrl
}
