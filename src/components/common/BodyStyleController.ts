'use client'

import { useEffect } from 'react'

/**
 * body 요소의 스타일을 제어하는 클라이언트 컴포넌트
 */
export default function BodyStyleController() {
  useEffect(() => {
    // body에 overflow: hidden 적용
    document.body.style.overflow = 'hidden'

    // 컴포넌트 언마운트 시 스타일 복원
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // 아무 것도 렌더링하지 않음 (null 반환)
  return null
}
