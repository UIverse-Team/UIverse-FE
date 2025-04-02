import Button from '../common/Button/Button'

export const EmptyCartMessage = () => {
  return (
    <div className="flex flex-col py-20 px-6 bg-white rounded-2xl items-center justify-center basis-full ">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 ">
          <h1 className="typo-h3 text-strong">장바구니가 비었어요.</h1>
          <span className="typo-caption1 text-alternative">찜한 상품을 다시 확인해보세요</span>
        </div>
        <Button size={'md'} variant={'tertiary'}>
          찜한상품 바로가기
        </Button>
      </div>
    </div>
  )
}
