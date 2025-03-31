import Button from '../common/Button/Button'
import TextButton from '../common/Button/TextButton'
import Divider from '../common/Divider/Divider'
import { OrderListCard } from './OrderListCard'

export const Order = () => {
  return (
    <div className="w-full bg-white pt-6">
      <div className="flex justify-between px-6 mb-4 items-center">
        <span className="typo-button1">2025.03.31</span>
        <TextButton size="sm" iconPosition="right">
          상세보기
        </TextButton>
      </div>
      <Divider />
      <div className="flex flex-col gap-4 p-6">
        <span>결제완료</span>
        <div className="flex flex-col gap-6">
          <OrderListCard />
          <OrderListCard />
        </div>
        <Button size="sm" variant="tertiary">
          주문취소
        </Button>
      </div>
    </div>
  )
}
