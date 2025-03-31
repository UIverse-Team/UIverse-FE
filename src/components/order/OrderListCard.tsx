import Image from 'next/image'

export const OrderListCard = () => {
  return (
    <div className="flex gap-4">
      <Image
        src={'https://shopping-phinf.pstatic.net/main_8885553/88855530085.jpg'}
        className="rounded-md shrink-0"
        width={100}
        height={100}
        alt="오늘의 특가 로고"
      />
      <div className="flex flex-col justify-between">
        <div>
          <p className="text-alternative typo-caption1">명규네과일</p>
          <p className="typo-button1 truncate max-w-[700px]">
            당도최고! 귀여운 복숭아 한박스 16입 | 저세상 당도농축 인기만점 복숭아
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="typo-caption1 text-normal">05 명규네말랑이복숭아 / 2kg</p>
          <div className="w-[1px] h-3 bg-disabled"></div>
          <p className="typo-caption1 text-normal">
            <span>1</span>개
          </p>
        </div>
        <p className="typo-h3">20,980원</p>
      </div>
    </div>
  )
}
