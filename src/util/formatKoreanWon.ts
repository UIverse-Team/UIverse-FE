const formatKoreanWon = (
  amount: number | null | undefined,
  includeSymbol = true,
  removeDecimal = true,
): string => {
  if (amount === null || amount === undefined || isNaN(Number(amount))) {
    return includeSymbol ? '₩0' : '0'
  }

  // 소수점 이하 처리
  const numberAmount = removeDecimal ? Math.floor(Number(amount)) : Number(amount)

  // 천 단위 콤마 추가
  const formattedAmount = numberAmount.toLocaleString('ko-KR')

  // 원화 기호 추가 여부
  return includeSymbol ? `₩${formattedAmount}` : formattedAmount
}

export default formatKoreanWon
