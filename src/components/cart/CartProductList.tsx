import Image from 'next/image'

export const CartProductList = () => {
  return (
    <div className="flex rounded-2xl p-6 bg-white flex-col gap-2">
      <h1 className="typo-3">맞춤 상품 추천</h1>
      <div className="flex gap-4 ">
        <div className="flex flex-col gap-2 w-[180px]">
          <div className="border-[1px] rounded-2xl  w-[180px] h-[180px] border-alter-line">
            <Image
              src={'https://shopping-phinf.pstatic.net/main_8611157/86111572769.2.jpg'}
              alt="상품 메인 이미지"
              style={{ objectFit: 'cover' }}
              className="rounded-xl"
              width={180}
              height={180}
            />
          </div>
          <div>
            <h3 className="typo-caption1">조르지오아르마니</h3>
          </div>
          <div>
            <span className="typo-button2 overflow-hidden text-ellipsis w-full line-clamp-2">
              조르지오아르마니 아이섀도우 아이 틴트 롱래스팅 리퀴드 아이새도 아르마니 뷰티 색조
              메이크업 화장품 6종
            </span>
          </div>
          <div className="flex gap-2">
            <h3 className="typo-h3 text-sale">49%</h3>
            <h3 className="typo-h3">13,560원</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
