'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../common/Select/Select'

const OrderListPeriodSelect = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updatePeriod = (period: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('period', String(period))
    params.set('page', String(0))
    router.push(`?${params.toString()}`)
  }

  return (
    <>
      <Select defaultValue={searchParams.get('period') ?? '1month'} onValueChange={updatePeriod}>
        <SelectTrigger className="w-20 pl-2.5 py-1.5 pr-2 mx-2">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1month">1개월</SelectItem>
          <SelectItem value="6months">6개월</SelectItem>
          <SelectItem value="all">전체</SelectItem>
        </SelectContent>
      </Select>
    </>
  )
}

export default OrderListPeriodSelect
