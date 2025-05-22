import { User } from './user'

export type EditProfileForm = Pick<
  User,
  'name' | 'phone' | 'email' | 'adAgreement' | 'adSMSAgree' | 'adEmailAgree'
>
