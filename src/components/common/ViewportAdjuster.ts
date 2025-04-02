'use client'

import { useEffect } from 'react'
import { VIEWPORT_MIN_WIDTH } from '@/constants/viewport'

export default function ViewportAdjuster() {
  useEffect(() => {
    const width = window.innerWidth
    const meta = document.querySelector('meta[name=viewport]')
    if (!meta) return

    // VIEWPORT_MIN_WIDTH 보다 작은 너비일 때 비율 조절
    if (width < VIEWPORT_MIN_WIDTH) {
      const scale = width / VIEWPORT_MIN_WIDTH
      meta.setAttribute(
        'content',
        `width=${VIEWPORT_MIN_WIDTH}, initial-scale=${scale}, maximum-scale=1, user-scalable=no`,
      )
    } else {
      meta.setAttribute(
        'content',
        'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      )
    }
  }, [])

  return null
}
