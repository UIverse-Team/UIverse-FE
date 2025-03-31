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

interface TrackingModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export default function TrackingModal({ isOpen, onOpenChange }: TrackingModalProps) {
  const router = useRouter()

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="border-b border-gray-75 text-center pb-6 mb-6">
          <DialogTitle>배송 정보를 불러올 수 없어요</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center typo-body2">
          일시적인 오류로 인해 배송 조회가 어렵습니다.
          <br />
          잠시 후 다시 시도해 주세요
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
