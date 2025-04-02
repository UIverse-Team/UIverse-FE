'use client'

import { useEffect } from 'react'
import { initMSW } from '@/mocks/index'

export default function MSWInitializer() {
  useEffect(() => {
    initMSW()
  }, [])

  return null
}
