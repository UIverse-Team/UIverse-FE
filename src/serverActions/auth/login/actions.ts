'use server'

import { socialCertificationData, socialUrlData } from '@/types/login/loginType'
import { v4 as uuidv4 } from 'uuid'
import httpClient from '@/util/httpClient'
import { cookies } from 'next/headers'

export const submitLogin = async (
  state: { error?: string; redirectTo?: string } | null,
  formData: FormData,
) => {
  console.log(123)
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()
  console.log(123)
  try {
    const response = await httpClient.post(`/auth/signin`, {
      loginId: email,
      password: password,
    })
    console.log(response)
    const accessToken = response.headers['set-cookie']?.[0]
    if (accessToken) {
      ;(await cookies()).set({
        name: 'accessToken',
        value: accessToken.split(';')[0].split('=')[1],
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

export const socialLogin = async (provider: string) => {
  try {
    const { data } = await httpClient.get(`/oauth/${provider}`)
    const certificationUrl = setCertificationUrl(data, provider)

    return certificationUrl
  } catch {
    throw new Error('소셜 인증에 실패했습니다.')
  }
}

export const socialCertification = async (data: socialCertificationData) => {
  try {
    const response = await httpClient.post(`/oauth/login`, {
      provider: data.provider,
      code: data.code,
      state: data.state,
    })

    const accessToken = response.headers['set-cookie']?.[0]
    if (accessToken) {
      ;(await cookies()).set({
        name: 'accessToken',
        value: accessToken.split(';')[0].split('=')[1],
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
