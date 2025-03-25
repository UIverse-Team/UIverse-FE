'use server'

import httpClient from '@/util/httpClient'

export async function submitLogin(
  state: { error?: string; redirectTo?: string } | null,
  formData: FormData,
) {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  try {
    const { data } = await httpClient.post(`/auth/signin`, {
      loginId: email,
      password: password,
    })

    return { user: data, redirectTo: '/' }
  } catch {
    return { error: '로그인에 실패했습니다. 다시 시도해주세요.' }
  }
}
