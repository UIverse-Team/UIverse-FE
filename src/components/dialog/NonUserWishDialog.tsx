import { Dialog, DialogContent, DialogFooter, DialogHeader } from '../common/Dialog/Dialog'
import { DialogProps } from '@/types/dialog/dialogTypes'
import Button from '../common/Button/Button'
import { ROUTES } from '@/constants/routes'
import { useRouter } from 'next/navigation'

const NonUserWishDialog = ({ isOpen, onOpenChange }: DialogProps) => {
  const router = useRouter()
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex flex-col justify-center items-center w-[380px]"
        aria-describedby={undefined}
        needClose
      >
        <DialogHeader>
          <div className="flex flex-col mt-2">
            <span className="typo-body3 pt-6 line-clamp-2 text-center">
              이 서비스는 로그인이 필요해요.
            </span>
            <span className="typo-body3 text-center">로그인 페이지로 이동할까요?</span>
          </div>
        </DialogHeader>
        <DialogFooter className="w-full flex gap-2.5">
          <Button variant={'outline'} size={'lg'} onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button
            variant={'secondary'}
            size={'lg'}
            onClick={() => {
              router.push(ROUTES.LOGIN)
            }}
          >
            로그인 하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default NonUserWishDialog
