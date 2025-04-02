import React from 'react'

export interface SignupForm {
  ageAgreement: boolean
  useAgreement: boolean
  picAgreement: boolean
  adAgreement: boolean
  loginId: string
  password: string
  name: string
  birthDate: string
  gender: string
  phone: string
}
export interface SignUpFormProps {
  next: () => void
  signupForm: SignupForm
  setSignupForm: React.Dispatch<React.SetStateAction<SignupForm>>
}
