export interface PageViewLog {
  pageUrl: string
  visitTime: string
}

export interface PageLeaveLog {
  exitTime: string
  durationSeconds: number
}
