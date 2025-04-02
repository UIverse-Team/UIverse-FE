'use client'

import { useRouter } from 'next/navigation'
import { useEffect, ReactNode } from 'react'
import { ToastPosition } from '@/types/toast/toastTypes'
import { toast } from '../Toast/Toast'

type RedirectAction = 'back' | 'home' | string
type ToastType = 'default' | 'success' | 'error' | 'info'

interface RedirectProps {
  // 리다이렉트 타입 (back: 뒤로가기, home: 홈으로, string: 특정 경로로)
  to: RedirectAction
  // 대체 경로 (뒤로갈 페이지가 없을 때 이동할 경로, 기본값은 홈)
  fallback?: string
  // 알림 메시지 (빈 문자열이면 알림 표시 안 함)
  message?: string
  // 알림 타입
  toastType?: ToastType
  // 토스트 지속 시간 (ms)
  toastDuration?: number
  // 토스트 위치
  toastPosition?: ToastPosition
  // 지연 시간 (ms)
  delay?: number
  // 로딩 화면 (제공되지 않으면 기본 로딩 화면 표시)
  loadingComponent?: ReactNode
}

const Redirect = ({
  to = 'back',
  fallback = '/',
  message = '',
  toastType = 'error',
  toastDuration = 3000,
  toastPosition = 'top-center',
  delay = 300,
  loadingComponent,
}: RedirectProps) => {
  const router = useRouter()

  useEffect(() => {
    // 알림 표시 (메시지가 있는 경우에만)
    if (message) {
      toast({
        type: toastType,
        content: message,
        duration: toastDuration,
        position: toastPosition,
      })
    }

    // 리다이렉트 처리를 위한 타임아웃 설정
    const redirectTimeout = setTimeout(() => {
      if (to === 'back') {
        router.back()

        // 뒤로갈 페이지가 없는 경우를 대비한 타임아웃
        const fallbackTimeout = setTimeout(() => {
          router.push(fallback)
        }, 300)

        return () => clearTimeout(fallbackTimeout)
      } else if (to === 'home') {
        router.push('/')
      } else {
        // 특정 경로로 이동
        router.push(to)
      }
    }, delay)

    return () => clearTimeout(redirectTimeout)
  }, [to, fallback, message, toastType, toastDuration, toastPosition, delay, router])

  // 사용자 지정 로딩 컴포넌트가 있으면 사용, 없으면 기본 로딩 UI 표시
  if (loadingComponent) {
    return <>{loadingComponent}</>
  }

  // 기본 로딩 UI
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-4">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mb-4"></div>
        <p className="text-gray-600">리다이렉트 중...</p>
      </div>
    </div>
  )
}

export default Redirect
