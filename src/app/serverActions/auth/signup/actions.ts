'use server'

import { SignupForm } from '@/app/(auth)/signup/page'
import httpClient from '@/util/httpClient'
import { AxiosError } from 'axios'

export const sendEmail = async (email: string) => {
  try {
    await httpClient.post(`/emailCertification/signup/send`, { email }, { withCredentials: true })

    return null
  } catch (error) {
    const axiosError = error as AxiosError

    console.log(axiosError)

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
    await httpClient.post(
      `/emailCertification/verify`,
      {
        code: code,
      },
      {
        withCredentials: true,
      },
    )
    return null
  } catch {
    return { error: '인증번호가 일치하지 않습니다.' }
  }
}

export const sendSignupForm = async (signupForm: SignupForm) => {
  try {
    await httpClient.post(
      `/signup`,
      {
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
      },
      {
        withCredentials: true,
      },
    )
    return null
  } catch {
    return { error: '회원가입에 실패했습니다.' }
  }
}
