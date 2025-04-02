export interface socialUrlData {
  authorizationUri: string
  clientId: string
  redirectUri: string
}

export interface socialCertificationData {
  provider: string
  code: string | null
  state: string | null
}

export type socialLoginResult = socialCertificationData | { error: string }
