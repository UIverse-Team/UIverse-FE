'use client'

import Pagination from '@/components/common/pagination/Pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/Select/Select'
import { Order } from '@/components/order/Order'
import { useState } from 'react'

export default function OrdersPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalpages = 10
  const limit = 5
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex w-full items-center bg-white rounded-t-lg p-6 justify-between">
        <div className="typo-h3">최근주문내역</div>
        <Select defaultValue="1month">
          <SelectTrigger className="w-20 pl-2.5 py-1.5 pr-2 mx-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">1개월</SelectItem>
            <SelectItem value="6months">6개월</SelectItem>
            <SelectItem value="all">전체</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Order />
      </div>
      <div className="w-full bg-white rounded-b-lg py-2">
        <Pagination
          currentPage={currentPage}
          totalPages={totalpages}
          onPageChange={setCurrentPage}
          limit={limit}
        />
      </div>
    </div>
  )
}
