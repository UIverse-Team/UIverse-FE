import { CustomToastOptions } from '@/types/toast/toastTypes'
import { toast as sonnerToast } from 'sonner'
import TextButton from '../Button/TextButton'

interface SnackBarProps extends CustomToastOptions {
  onClickActionBtn?: () => void
}

const SnackBar = ({
  content,
  duration = 3000,
  position = 'top-center',
  onClickActionBtn,
}: SnackBarProps) => {
  const onClickButton = () => {
    sonnerToast.dismiss()
    onClickActionBtn?.()
  }
  sonnerToast.custom(
    () => (
      <div className="flex flex-col w-full justify-center items-center gap-4">
        <div className="typo-button2 text-white text-center">{content}</div>
        {onClickActionBtn && (
          <TextButton size="sm" iconPosition="right" className="text-white" onClick={onClickButton}>
            바로가기
          </TextButton>
        )}
      </div>
    ),
    {
      duration,
      className: 'w-[280px] py-3.5 px-4 bg-secondary rounded-md',
      position,
    },
  )
}

export default SnackBar
