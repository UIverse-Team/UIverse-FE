import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { addPageViewLog, updatePageViewLog } from '@/services/log/logService'

export const usePageViewLogger = () => {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return

    // 이전 페이지 로깅 정보가 있으면 처리
    const prevPageData = sessionStorage.getItem('pageViewData')
    if (prevPageData) {
      const { logId, visitTime } = JSON.parse(prevPageData)
      if (logId && visitTime) {
        const leaveTime = Date.now()
        const durationInSeconds = Math.round((leaveTime - visitTime) / 1000)

        updatePageViewLog(logId, {
          leaveTime: new Date(leaveTime).toISOString(),
          durationSeconds: durationInSeconds,
        })
          .then(() => console.log('이전 페이지 이탈 로그 업데이트 완료'))
          .catch((err) => console.error('이전 페이지 이탈 로그 업데이트 실패:', err))

        // 처리 후 삭제
        sessionStorage.removeItem('pageViewData')
      }
    }

    // 현재 페이지 로깅
    const visitTimestamp = Date.now()

    addPageViewLog({
      pageUrl: pathname,
      visitTime: new Date(visitTimestamp).toISOString(),
    })
      .then(({ logId }) => {
        console.log('로그 ID 생성:', logId)
        // 현재 페이지 정보 저장
        sessionStorage.setItem(
          'pageViewData',
          JSON.stringify({
            logId,
            visitTime: visitTimestamp,
            pathname,
          }),
        )
      })
      .catch((error) => console.warn('페이지 뷰 로깅 실패:', error))

    // 브라우저 창이 닫힐 때 처리
    const handleBeforeUnload = () => {
      const data = sessionStorage.getItem('pageViewData')
      if (data) {
        const { logId, visitTime } = JSON.parse(data)
        if (logId && visitTime) {
          const leaveTime = Date.now()
          const durationInSeconds = Math.round((leaveTime - visitTime) / 1000)

          // 비동기로 처리시 브라우저 종료로 완료되지 않을 수 있어 동기식 호출 사용
          const xhr = new XMLHttpRequest()
          xhr.open('POST', `/api/logs/page/${logId}/end`, false) // 동기식 호출
          xhr.setRequestHeader('Content-Type', 'application/json')
          xhr.send(
            JSON.stringify({
              logId,
              leaveTime: new Date(leaveTime).toISOString(),
              duration: durationInSeconds,
            }),
          )
        }
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [pathname])
}
