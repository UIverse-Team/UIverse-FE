import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { addPageViewLog, updatePageViewLog } from '@/services/log/logService'

interface PageViewLog {
  pageUrl: string
  visitTime: string
}

interface PageLeaveLog {
  leaveTime: string
  durationSeconds: number
}

export const usePageViewLogger = () => {
  const pathname = usePathname()
  const visitLogIdRef = useRef<number | null>(null)
  const visitTimeRef = useRef<number | null>(null)
  const hasLoggedViewRef = useRef<boolean>(false) // 방문 로그 기록 여부
  const hasLoggedLeaveRef = useRef<boolean>(false) // 이탈 로그 기록 여부

  useEffect(() => {
    if (!pathname) return

    // 페이지 변경 시 플래그 초기화
    hasLoggedViewRef.current = false
    hasLoggedLeaveRef.current = false

    // 현재 시간 기록
    const visitTimestamp = Date.now()
    visitTimeRef.current = visitTimestamp

    // 페이지 방문 로그
    const logPageView = async () => {
      // 이미 방문 로그가 기록되었으면 건너뜀
      if (hasLoggedViewRef.current) return

      try {
        const logData: PageViewLog = {
          pageUrl: pathname,
          visitTime: new Date(visitTimestamp).toISOString(),
        }

        const { logId } = await addPageViewLog(logData)

        visitLogIdRef.current = logId
        hasLoggedViewRef.current = true
        console.log('페이지 방문 로그 기록 완료:', logId)
      } catch (error) {
        console.warn('페이지 방문 로그 기록 실패:', error)
        visitLogIdRef.current = null
      }
    }

    logPageView()

    // 페이지 이탈 로그
    const sendLeaveLog = () => {
      // 방문 로그가 없거나 이미 이탈 로그를 기록했으면 건너뜀
      if (!visitLogIdRef.current || !visitTimeRef.current || hasLoggedLeaveRef.current) {
        return
      }

      const leaveTime = Date.now()
      const durationSeconds = Math.round((leaveTime - visitTimeRef.current) / 1000)

      const leaveLogData: PageLeaveLog = {
        leaveTime: new Date(leaveTime).toISOString(),
        durationSeconds,
      }

      updatePageViewLog(visitLogIdRef.current, leaveLogData)

      hasLoggedLeaveRef.current = true
    }

    // visibilitychange 이벤트 핸들러
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !hasLoggedLeaveRef.current) {
        sendLeaveLog()
      }
    }

    // beforeunload 이벤트 핸들러
    const handleBeforeUnload = () => {
      if (!hasLoggedLeaveRef.current) {
        sendLeaveLog()
      }
    }

    // 이벤트 리스너 등록
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', handleBeforeUnload)

    // cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handleBeforeUnload)

      // 컴포넌트 언마운트 시 아직 이탈 로그가 없으면 기록
      if (!hasLoggedLeaveRef.current) {
        sendLeaveLog()
      }
    }
  }, [pathname])
}
