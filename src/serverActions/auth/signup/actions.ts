'use server'

import { SignupForm } from '@/types/signup/signupType'
import httpClient from '@/util/httpClient'
import { AxiosError } from 'axios'
import { cookies } from 'next/headers'

export const sendEmail = async (email: string) => {
  try {
    const response = await httpClient.post(`/emailCertification/signup/send`, { email })

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

    return null
  } catch (error) {
    const axiosError = error as AxiosError

    if (axiosError.response?.status === 409) {
      return { error: '중복 이메일' }
    } else if (axiosError.response?.status === 500) {
      return { error: '전송 실패' }
    } else {
      return { error: '알 수 없는 오류' }
    }
  }
}

export const verifyEmail = async (code: string) => {
  try {
    const certificationToken = (await cookies()).get('certificationToken')?.value

    if (!certificationToken) {
      throw new Error('인증 토큰이 만료되었습니다.')
    }

    await httpClient.post(
      `/emailCertification/verify`,
      { code },
      {
        // 인증토큰 쿠키 헤더에 포함
        headers: {
          Cookie: `certificationToken=${certificationToken}`,
        },
      },
    )
    return null
  } catch {
    return { error: '인증번호가 일치하지 않습니다.' }
  }
}

export const sendSignupForm = async (signupForm: SignupForm) => {
  try {
    await httpClient.post(`/signup`, {
      ageAgreement: signupForm.ageAgreement,
      useAgreement: signupForm.useAgreement,
      picAgreement: signupForm.picAgreement,
      adAgreement: signupForm.adAgreement,
      loginId: signupForm.loginId,
      password: signupForm.password,
      name: signupForm.name,
      birthDate: signupForm.birthDate,
      gender: signupForm.gender,
      phone: signupForm.phone,
    })
    return null
  } catch {
    return { error: '회원가입에 실패했습니다.' }
  }
}
