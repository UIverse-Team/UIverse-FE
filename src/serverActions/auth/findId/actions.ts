'use server'

import httpClient from '@/util/httpClient'

export async function sendPhoneAuthCode(phoneNumber: string) {
  try {
    await httpClient.post('/numberCertification/send', { phoneNumber })
    return { success: true, message: '인증번호가 전송되었습니다.' }
  } catch (error) {
    console.error('휴대폰 인증 요청 실패:', error)
    return { success: false, message: '인증번호 요청에 실패했습니다.' }
  }
}

export async function verifyPhoneAuthCode(code: string) {
  try {
    await httpClient.post('/numberCertification/verify', { code })
    return { success: true, message: '인증에 성공하였습니다.' }
  } catch (error) {
    console.error('휴대폰 인증 실패:', error)
    return { success: false, message: '인증번호가 일치하지 않습니다.' }
  }
}
