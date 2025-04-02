'use client'
import Image from 'next/image'
import Todayprice from 'public/icons/today-price.svg'
import AllProducts from '@/components/product/AllProducts'

export const SpecialPrice = () => {
  return (
    <div className="py-20 flex justify-center items-center">
      <div className="flex flex-col gap-8 ">
        <div className="flex flex-col items-center gap-2">
          <Image src={Todayprice} width={36} height={36} alt="오늘의 특가 로고" />
          <h3 className="typo-h2">오늘의 특가</h3>
          <span className="typo-body3 text-assistive">지혜에서만 만나볼 수 있는 초특가 상품들</span>
        </div>
        <AllProducts />
      </div>
    </div>
  )
}
