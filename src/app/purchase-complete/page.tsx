'use client'
import LoadingSpinner from '@/components/common/Loading/LoadingSpinner'
import { Suspense } from 'react'
import OrderComplete from './OrderComplete'

export default function PurchaseCompletePage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <OrderComplete />
    </Suspense>
  )
}
