import Button from '@/components/common/Button/Button'

export const CartPayForm = () => {
  return (
    <section className="w-1/5  bg-white flex rounded-2xl flex-col gap-4 p-4 h-[350px]">
      <h2 className="typo-h3 flex w-full border-b-[1px] border-gray-75 pb-4">주문금액</h2>
      <div className="flex flex-col">
        <div className="flex justify-between border-b-[1px] py-2 px-2 border-gray-75 typo-body3">
          <h3 className="typo-body3">총 주문 금액</h3>
          <span className="typo-button1">0원</span>
        </div>
        <div className="flex justify-between border-b-[1px] py-2 px-2 border-gray-75">
          <h3 className="typo-body3">배송비</h3>
          <span className="typo-button1">0원</span>
        </div>
        <div className="flex justify-between border-b-[1px] py-2 px-2 border-gray-75">
          <h3 className="typo-body3">할인금액</h3>
          <span className="typo-button1">0원</span>
        </div>
        <div className="flex flex-col gap-2 px-2 pt-2">
          <div>
            <h3>총 결제 금액</h3>
          </div>
          <div className="flex justify-end">
            <span className="typo-h2 text-orange-500">0원</span>
          </div>
          <Button>구매하기</Button>
        </div>
      </div>
    </section>
  )
}
