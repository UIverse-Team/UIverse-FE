import Button from '../common/Button/Button'
import Checkbox from '../common/Checkbox/Checkbox'
import Tag from '../common/Tag/Tag'

export const PurchaseShoppingInfo = () => {
  return (
    <div className="bg-white flex flex-col rounded-2xl basis-full ">
      <div className="flex flex-col">
        <div className="p-6 border-b-[1px] border-alter-line">배송지</div>
        <div className="p-6 flex-col flex gap-4">
          <div className="flex  gap-6 justify-between">
            <div className="flex flex-col flex-1">
              <div className=" flex gap-2.5 items-center">
                <span>한은서</span>
                <Tag variant={'tertiary'} size={'md'}>
                  기본배송지
                </Tag>
              </div>
              <div className="flex flex-col">
                <span>010-2323-4545</span>
                <span>[58332] 서울시 강남구 강남대로 13길 2 (소나빌딩) 403호</span>
              </div>
            </div>
            <div>
              <Button variant={'outline'} size={'md'}>
                변경
              </Button>
            </div>
          </div>
          <div className="px-6">
            <select></select>
          </div>
          <div className="flex gap-2">
            <Checkbox size={'lg'} />
            <div>다음에도 사용할게요</div>
          </div>
        </div>
      </div>
    </div>
  )
}
