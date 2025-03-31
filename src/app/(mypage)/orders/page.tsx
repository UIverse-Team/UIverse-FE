'use client'

import Pagination from '@/components/common/pagination/Pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/Select/Select'
import { OrderWrap } from '@/components/order/OrderWrap'
import { Order, OrderType } from '@/types/orders/orderType'
import { useState } from 'react'

const data = {
  content: [
    {
      id: 16,
      orderNumber: 'O250323MDPZG',
      orderProducts: [
        {
          id: 27,
          saleProductId: 3,
          productName: 'Leather Sofa - Brown',
          optionValue: 'Leather Jacket',
          paymentPrice: 120200,
          orderPrice: 150200,
          discountPrice: 30000,
          quantity: 5,
          totalPrice: 601000,
          canReview: false,
          brandName: 'Brand C',
        },
      ],
      orderStatus: 'PURCHASED_CONFIRMED' as OrderType,
      totalPrice: 601000,
      createdAt: '2025-03-23T16:44:39.573858',
      totalQuantity: 5,
    },
    {
      id: 8,
      orderNumber: 'O250322KW11C',
      orderProducts: [
        {
          id: 13,
          saleProductId: 1,
          productName: 'Red T-Shirt - Size M',
          optionValue: 'Red Shirt',
          paymentPrice: 15100,
          orderPrice: 20100,
          discountPrice: 5000,
          quantity: 1,
          totalPrice: 15100,
          canReview: false,
          brandName: 'Brand A',
        },
        {
          id: 14,
          saleProductId: 2,
          productName: 'Blue Jeans - Size L',
          optionValue: 'Blue Jeans',
          paymentPrice: 28150,
          orderPrice: 35150,
          discountPrice: 7000,
          quantity: 2,
          totalPrice: 56300,
          canReview: false,
          brandName: 'Brand B',
        },
      ],
      orderStatus: 'SHIPMENT_STARTED' as OrderType,
      totalPrice: 71400,
      createdAt: '2025-03-22T18:26:44.974305',
      totalQuantity: 3,
    },
  ],
  pageable: {
    pageNumber: 0,
    pageSize: 10,
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    offset: 0,
    paged: true,
    unpaged: false,
  },
  last: true,
  totalElements: 5,
  totalPages: 1,
  size: 10,
  number: 0,
  sort: {
    empty: false,
    sorted: true,
    unsorted: false,
  },
  first: true,
  numberOfElements: 5,
  empty: false,
}

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
        {data && data.content.map((item: Order) => <OrderWrap key={item.id} data={item} />)}
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
