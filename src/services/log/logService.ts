import logHttpClient from '@/util/logHttpClient'
import type { PageLeaveLog, PageViewLog } from '@/types/log/logTypes'

// 페이지 방문 로그
export const addPageViewLog = async (addPageViewParams: PageViewLog) => {
  try {
    const response = await logHttpClient.post(`/page`, addPageViewParams)

    return response.data
  } catch (error) {
    console.warn('Failed to add page view logs:', error)
  }
}

// 페이지 이탈 로그
export const updatePageViewLog = (logId: number, updatePageViewParams: PageLeaveLog) => {
  // navigator.sendBeacon을 사용하여 비동기 요청이 취소되지 않도록 함
  const blob = new Blob([JSON.stringify(updatePageViewParams)], { type: 'application/json' })
  const success = navigator.sendBeacon(`/api/logs/page/${logId}/end`, blob)

  return success
}
