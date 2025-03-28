export function getTodayDate() {
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
