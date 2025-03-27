import Checkbox from '../common/Checkbox/Checkbox'

interface CartItemHeaderProps {
  onSelectAll: boolean
  onHandleSelectAll: () => void
}

export const CartItemHeader = ({ onSelectAll, onHandleSelectAll }: CartItemHeaderProps) => {
  return (
    <div className="border-b-[2px] border-alter-line h-[73px] items-center flex gap-4 p-6">
      <div>
        <Checkbox checked={onSelectAll} onClick={onHandleSelectAll} size="lg" />
      </div>
      <div className="flex gap-2">
        <h3 className="typo-h3">전체선택</h3>
      </div>
    </div>
  )
}
