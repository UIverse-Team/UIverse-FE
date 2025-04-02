'use client'

import Image from 'next/image'
import AllProducts from '../product/AllProducts'
import Binocular from 'public/icons/binocular.svg'

export const WishProduct = () => {
  return (
    <div className="py-20 flex justify-center items-center">
      <div className="flex flex-col gap-8 ">
        <div className="flex flex-col items-center gap-2">
          <Image src={Binocular} width={36} height={36} alt="오늘의 특가 로고" />
          <h3 className="typo-h2">요즘 하트 제일 많은 받은 상품</h3>
          <span className="typo-body3 text-assistive">
            다들 이거 찜하고 있길래, 우리도 보여드려요.
          </span>
        </div>
        <AllProducts />
      </div>
    </div>
  )
}
