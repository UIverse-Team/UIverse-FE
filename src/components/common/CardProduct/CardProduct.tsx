import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ProductClickLogger from '@/components/log/ProductClickLogger'
import type { AllProduct } from '@/types/Product/productsType'
import formatKoreanWon from '@/util/formatKoreanWon'

const CardProduct = ({ item }: { item: AllProduct }) => {
  return (
    <ProductClickLogger key={item.id} params={{ productId: item.id, productName: item.name }}>
      <Link href={`product/${item.id}`}>
        <div className="flex flex-col gap-2 w-[180px]">
          <div className="rounded-md size-[180px]">
            <Image
              src={item.mainImage}
              alt={item.name}
              className="size-45 rounded-md object-cover"
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
    </ProductClickLogger>
  )
}

export default CardProduct
