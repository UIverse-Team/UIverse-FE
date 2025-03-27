import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AllProduct } from '@/types/Product/productsType'
import formatKoreanWon from '@/util/formatKoreanWon'

const CardProduct = ({ item }: { item: AllProduct }) => {
  return (
    <Link href={`product/${item.id}`}>
      <div className="flex flex-col gap-2 w-[180px]">
        <div className="rounded-md w-[180px] h-[180px]">
          <Image
            src={item.mainImage}
            alt="상품 메인 이미지"
            style={{ objectFit: 'cover' }}
            className="rounded-md"
            width={180}
            height={180}
          />
        </div>
        <div>
          <h3 className="typo-caption2">{item.brand}</h3>
          <span className="typo-button2 overflow-hidden text-ellipsis w-full line-clamp-2">
            {item.name}
          </span>
          <div className="flex gap-1">
            <h3 className="typo-h3 text-sale">{item.discountRate}%</h3>
            <h3 className="typo-h3">{formatKoreanWon(item.discountPrice, false)}원</h3>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CardProduct
