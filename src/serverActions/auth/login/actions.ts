'use server'

import httpClient from '@/util/httpClient'
import { cookies } from 'next/headers'

export const submitLogin = async (
  state: { error?: string; redirectTo?: string } | null,
  formData: FormData,
) => {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  try {
    const response = await httpClient.post(`/auth/signin`, {
      loginId: email,
      password: password,
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
    return { user: response.data, redirectTo: '/' }
  } catch {
    return { error: '로그인에 실패했습니다.\n다시 시도해주세요.' }
  }
}

export const socialLogin = async (provider: string) => {
  try {
    const { data } = await httpClient.get(`/oauth/${provider}`)
    return data
  } catch {
    return { error: '소셜 로그인에 실패했습니다. 다시 시도해주세요.' }
  }
}

export const socialCertification = async (provider: string) => {
  try {
    const searchParams = new URLSearchParams(window.location.search)
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    console.log(`[Server Action] Code: ${code}, State: ${state}`)

    const { data } = await httpClient.get(`/oauth/callback/${provider}`, {
      withCredentials: true,
    })

    return data
  } catch {
    return { error: '소셜 인증에 실패했습니다. 다시 시도해주세요.' }
  }
}
