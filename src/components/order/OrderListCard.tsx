import { OrderProduct } from '@/types/orders/orderType'
import formatKoreanWon from '@/util/formatKoreanWon'
import Image from 'next/image'
import Button from '../common/Button/Button'

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
      <div className="flex gap-4">
        <Image
          src={'https://shopping-phinf.pstatic.net/main_8885553/88855530085.jpg'}
          className="rounded-md shrink-0"
          width={100}
          height={100}
          alt={`${data.productName} 이미지`}
        />
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
