'use server'

import { SignupForm } from '@/types/signup/signupType'
import httpClient from '@/util/httpClient'

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
