import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/common/Dialog/Dialog'
import Button from '@/components/common/Button/Button'

interface CustomModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title: string
  content: string
}

const CustomModal = ({ isOpen, onOpenChange, title, content }: CustomModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent needClose className="max-h-[600px] overflow-hidden">
        <DialogHeader className="border-b border-gray-75 text-center pb-6 mb-8">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col gap-4 max-h-[448px]">
          <div className="flex flex-col items-center text-center">
            <p className="font-medium text-lg">{content}</p>
          </div>
          <Button onClick={() => onOpenChange(false)} className="mt-4">
            알겠어요
          </Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default CustomModal
