export const getTodayDate = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  let hours = today.getHours()

  const period = hours >= 12 ? '오후' : '오전'
  hours = hours % 12 || 12 // 12시간 형식으로 변환 (0시는 12로 변경)

  return {
    year,
    month,
    day,
    hours: String(hours).padStart(2, '0'),
    period,
  }
}

export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}.${month}.${day}. ${hours}:${minutes}:${seconds}`
}

/**
 * 타임스탬프를 한국 시간(KST) ISO 문자열로 변환
 * @param timestamp 밀리초 단위의 타임스탬프
 * @returns ISO 8601 형식의 한국 시간 문자열 (yyyy-MM-dd'T'HH:mm:ss)
 */
export const convertTimestampToKST = (timestamp: number): string => {
  const date = new Date(timestamp)

  // 한국 시간으로 변환 (UTC+9)
  const koreaTime = new Date(date.getTime() + 9 * 60 * 60 * 1000)

  // ISO 포맷으로 변환 후 초까지만 표시 (milliseconds 제외)
  return koreaTime.toISOString().slice(0, 19)
}
