import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../common/Dialog/Dialog'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import Button from '../common/Button/Button'

interface ExchangeReturnModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export default function ExchangeReturnModal({ isOpen, onOpenChange }: ExchangeReturnModalProps) {
  const router = useRouter()

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="border-b border-gray-75 text-center pb-6 mb-6">
          <DialogTitle>교환·반품이 어려운 상태예요</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center typo-body2">
          지금은 교환·반품 신청이 불가능한 상품입니다.
          <br />더 궁금한 점이 있으시면 고객센터로 문의해 주세요!
        </DialogDescription>
        <DialogFooter className="flex gap-2.5">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(ROUTES.INQUIRY)}
            className="flex-1"
          >
            고객센터
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            알겠어요
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
