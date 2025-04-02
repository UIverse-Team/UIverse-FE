import { OrderProduct } from '@/types/orders/orderType'
import formatKoreanWon from '@/util/formatKoreanWon'
import Image from 'next/image'
import Button from '../common/Button/Button'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

interface OrderListCardProps {
  data: OrderProduct
  canReview?: boolean
}

export const OrderListCard = ({ data, canReview }: OrderListCardProps) => {
  const handleWriteReviewBtn = () => {
    console.log('리뷰작성')
  }
  return (
    <div className="flex items-center justify-between">
      <Link href={`${ROUTES.PRODUCT}/${data.saleProductId}`}>
        <div className="flex gap-4">
          <div className="w-[100px] h-[100px] overflow-hidden relative rounded-md">
            <Image
              src={data.mainImage}
              className="absolute inset-0 w-full h-full object-cover"
              width={100}
              height={100}
              alt={`${data.productName} 이미지`}
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-alternative typo-caption1">{data.brandName}</p>
              <p
                className={`typo-button1 truncate ${canReview !== undefined ? 'max-w-[260px]' : 'max-w-[700px]'}`}
              >
                {data.productName}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="typo-caption1 text-normal">{data.optionValue}</p>
              <div className="w-[1px] h-3 bg-disabled"></div>
              <p className="typo-caption1 text-normal">
                <span>{data.quantity}</span>개
              </p>
            </div>
            <p className="typo-h3">
              <span>{formatKoreanWon(data.totalPrice, false)}</span>원
            </p>
          </div>
        </div>
      </Link>
      {canReview === true ? (
        <div className="max-w-[83px] mr-4">
          <Button size="md" onClick={handleWriteReviewBtn}>
            리뷰작성
          </Button>
        </div>
      ) : canReview === false ? (
        <div className="max-w-[111px] mr-4">
          <Button size="md" disabled>
            리뷰작성완료
          </Button>
        </div>
      ) : null}
    </div>
  )
}
