// 휴대폰번호 포맷팅 함수, 자동으로 - 붙여줌
export const formatPhoneNumber = (value: string) => {
  const cleaned = value.replace(/[^0-9]/g, '')

  if (cleaned.length <= 3) {
    return cleaned
  } else if (cleaned.length <= 7) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`
  } else {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`
  }
}
