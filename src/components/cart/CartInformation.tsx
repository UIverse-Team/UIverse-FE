'use client'

export const CartInformation = () => {
  return (
    <div className="flex p-4">
      <div className="flex gap-4">
        <div>
          <h3 className="typo-button2 text-alternative">유의 사항</h3>
        </div>
        <ol className="flex gap-2 flex-col mt-1">
          <li className="relative pl-2 before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-1 before:h-1 before:bg-alternative before:rounded-full typo-caption2 text-alternative">
            <span>
              장바구니에 담긴 상품은 30일간 보관됩니다. (장기간 보관을 원하실 경우 위시리스트 등록을
              이용하시기 바랍니다.)
            </span>
          </li>
          <li className="relative pl-2  before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-1 before:h-1 before:bg-alternative before:rounded-full typo-caption2 text-alternative">
            환율변경 시점에 따라 장바구니 결제 금액과 최종 결제 시 금액은 상이 할 수 있습니다.
          </li>
          <li className="relative pl-2 before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-1 before:h-1 before:bg-alternative before:rounded-full typo-caption2 text-alternative">
            일부 브랜드의 경우 브랜드 및 당사의 사정에 따라 혜택 적용이 불가하여 장바구니 및 결제
            페이지의 주문 금액과 혜택 적용 금액에 차이가 발생할 수 있습니다.
          </li>
          <li className="relative pl-2 before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-1 before:h-1 before:bg-alternative before:rounded-full typo-caption2 text-alternative">
            장바구니에 보관된 상품은 결제 완료된 상품이 아니므로 품절 및 할인율이 변경될 수
            있습니다.
          </li>
        </ol>
      </div>
    </div>
  )
}
