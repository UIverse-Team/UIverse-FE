import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogHeader,
} from '../common/Dialog/Dialog'
import { DialogProps } from '@/types/dialog/dialogTypes'
import Divider from '../common/Divider/Divider'
import Button from '../common/Button/Button'
import { ROUTES } from '@/constants/routes'
import { useRouter } from 'next/navigation'

const NonUserWishDialog = ({ isOpen, onOpenChange }: DialogProps) => {
  const router = useRouter()
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex flex-col justify-center items-center w-full"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle className="typo-h3 pb-6 text-center">
            찜한 상품, 로그인하면 언제든 다시 확인할 수 있어요!
          </DialogTitle>
          <Divider />
          <span className="typo-body2 pt-6 line-clamp-2 text-center">
            내가 방금 찜한 상품, 다시 보고 싶다면? ❤️
            <br />
            로그인하면 내가 찜한 상품을 한눈에 보고, 관리할 수 있어요
          </span>
        </DialogHeader>
        <DialogFooter className="w-full flex gap-2.5">
          <Button variant={'outline'} size={'lg'} onClick={() => onOpenChange(false)}>
            그냥 볼래요
          </Button>
          <Button
            variant={'secondary'}
            size={'lg'}
            onClick={() => {
              router.push(ROUTES.LOGIN)
            }}
          >
            로그인하러가기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default NonUserWishDialog
