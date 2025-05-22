// 휴대폰번호 포맷팅 함수, 자동으로 - 붙여줌
export const formatPhoneNumber = (value: string, mask: boolean = false): string => {
  const cleaned = value.replace(/[^0-9]/g, '')

  if (cleaned.length <= 3) {
    return cleaned
  } else if (cleaned.length <= 7) {
    const front = cleaned.slice(0, 3)
    const back = cleaned.slice(3)
    if (mask) {
      return `${front}-${'*'.repeat(back.length)}`
    }
    return `${front}-${back}`
  } else {
    const front = cleaned.slice(0, 3)
    const middle = cleaned.slice(3, cleaned.length - 4)
    const back = cleaned.slice(-4)
    if (mask) {
      return `${front}-${'*'.repeat(middle.length)}-${back}`
    }
    return `${front}-${middle}-${back}`
  }
}

export const removePhoneNumberFormat = (value: string) => {
  return value.replace(/-/g, '')
}
