'use server'

import { createServerHttpClient } from '@/libs/axios/serverClient'
import { SignupForm } from '@/types/signup/signupType'

export const sendSignupForm = async (signupForm: SignupForm) => {
  try {
    // 서버 HTTP 클라이언트 생성
    const serverClient = await createServerHttpClient()

    await serverClient.post(`/signup`, {
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
