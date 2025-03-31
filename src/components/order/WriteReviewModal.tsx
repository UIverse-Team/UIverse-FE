import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../common/Dialog/Dialog'
import { OrderProduct } from '@/types/orders/orderType'
import { OrderListCard } from './OrderListCard'

interface WriteReviewModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  data: OrderProduct[]
}

export default function WriteReviewModal({ isOpen, onOpenChange, data }: WriteReviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent needClose className="max-h-[600px] overflow-hidden">
        <DialogHeader className="border-b border-gray-75 text-center pb-6 mb-8">
          <DialogTitle>어떤 상품의 리뷰를 작성하시나요?</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col gap-4">
          <p className="typo-button2 text-alternative">
            작성기한 <span>2025.03.26.</span>까지
          </p>
          {data.map((item: OrderProduct) => (
            <OrderListCard key={item.id} data={item} canReview={item.canReview} />
          ))}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
