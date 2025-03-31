import Image from 'next/image'
import { CartDetailResponse } from '@/types/cart/cartType'
import formatKoreanWon from '@/util/formatKoreanWon'

interface CartItemListProps {
  item: CartDetailResponse
  isLastItem?: boolean
}

export const PurchaseProductsItemList = ({ item, isLastItem = false }: CartItemListProps) => {
  return (
    <div className={`flex gap-4 py-6 ${!isLastItem ? 'border-b-[1px] border-alter-line' : ''}`}>
      <div className="flex items-center w-full gap-12 ">
        <div className="flex gap-4 flex-1">
          <Image
            src={item.image}
            width={100}
            height={100}
            alt="상품 이미지"
            style={{ objectFit: 'cover' }}
            className="rounded-xl"
          />
          <div className="flex flex-col gap-2">
            <h3 className="typo-caption1 text-alternative">{item.brandName}</h3>
            <div>
              <h1 className="line-clamp-1 overflow-hidden text-ellipsis typo-button1">
                {item.productName}
              </h1>
            </div>
            <span className="typo-caption1 flex gap-2">
              {item.optionName} <span className="text-alter-line">|</span> 수량 {item.quantity}개
            </span>
            <span className="typo-caption1">
              무료배송 <span className="text-positive typo-caption1">03/18(화) 출발 예정</span>
            </span>
          </div>
        </div>
        <div className="flex flex-col text-right">
          <span className="line-through typo-caption1 text-alternative">
            {formatKoreanWon(item.orderPrice, false)}원
          </span>
          <span className="typo-h3">{formatKoreanWon(item.discountPrice, false)}원</span>
        </div>
      </div>
    </div>
  )
}
