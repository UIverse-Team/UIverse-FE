import { getTodayDate } from '@/util/getTodayDate'
import Image from 'next/image'
import Todayprice from 'public/icons/today-price.svg'

export default function Home() {
  // const {} = data
  return (
    <section>
      <div className="border py-20 flex justify-center items-center">
        <div className="flex flex-col gap-8 ">
          <div className="flex flex-col items-center gap-2 border">
            <Image src={Todayprice} width={36} height={36} alt="오늘의 특가 로고" />
            <h3 className="typo-h2">오늘의 특가</h3>
            <span className="typo-body3 text-assistive">{getTodayDate()}</span>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              <Image width={248} height={248} alt="상품 이미지" src="" />
            </div>
          </div>
        </div>
      </div>
      <div className="border py-20 flex justify-center items-center">
        <h3>2번째</h3>
      </div>
    </section>
  )
}
