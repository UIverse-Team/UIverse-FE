export interface VerifySmsProps {
  rawPhone: string
  setRawPhone: (raw: string) => void
  setIsCodeVerified: (verified: boolean) => void
}

export type VerifySmsSectionProps = {
  phone: string
  rawPhone: string
  setPhone: React.Dispatch<React.SetStateAction<string>>
  setRawPhone: React.Dispatch<React.SetStateAction<string>>
}
