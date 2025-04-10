// 페이지 방문 로그 타입
export interface PageViewLog {
  pageUrl: string
  visitTime: string
}

// 페이지 이탈 로그 타입
export interface PageLeaveLog {
  exitTime: string
  durationSeconds: number
}

// 상품 클릭 로그 타입
export interface ProductClickLog {
  productId: number
  productName: string
  clickTime?: string
}
