import { AxiosInstance } from 'axios'
import { cookies } from 'next/headers'
import { createHttpClient } from './index'

// 서버 여부 판단
const isServer = typeof window === 'undefined'

// 서버 컴포넌트용 HTTP 클라이언트 생성 함수
export const createServerHttpClient = async (): Promise<AxiosInstance> => {
  try {
    // Next.js 서버 컴포넌트에서만 동작
    if (!isServer) {
      throw new Error('이 함수는 서버 컴포넌트에서만 사용할 수 있습니다.')
    }

    // 쿠키 추출
    const cookieStore = await cookies()
    const cookieString = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join('; ')

    // 서버 사이드용 HTTP 클라이언트 생성
    return createHttpClient({
      headers: {
        Cookie: cookieString,
      },
    })
  } catch (error) {
    console.error(
      '서버 HTTP 클라이언트 생성 실패:',
      error instanceof Error ? error.message : '알 수 없는 오류',
    )
    // 기본 클라이언트 반환
    return createHttpClient()
  }
}

// 헤더에서 쿠키 추출 유틸리티 함수
export const extractCookiesFromHeaders = (cookieHeader: string | null): string => {
  return cookieHeader || ''
}
