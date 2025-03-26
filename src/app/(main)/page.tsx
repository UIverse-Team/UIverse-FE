import Image from 'next/image'
import { getTodayDate } from '@/util/getTodayDate'
import Accordion from '@/components/common/Accordion/Accordion'
import { getProductsPopularity } from '@/services/productService'
import Todayprice from 'public/icons/today-price.svg'
import Signal from 'public/icons/signal.svg'
import PrefetchedQueryHydrationBoundary from '@/libs/tanstackQuery/PrefetchedQueryHydrationBoundary'
import { QUERY_KEYS } from '@/constants/queryKeys'
import AllProducts from '@/components/product/AllProducts'
import { Toaster } from '@/components/common/Toast/Toast'

export const dynamic = 'force-dynamic'

const accordionData = [
  {
    title: '1 복숭아',
    subTitle: '식료품/과일',
    content: '첫 번째 내용입니다.',
  },
  {
    title: '1 복숭아 식료품/과일',
    subTitle: '식료품/과일',
    content: '첫 번째 내용입니다.',
  },
]

const { year, month, day } = getTodayDate()

export default function HomePage() {
  return (
    <PrefetchedQueryHydrationBoundary
      queryList={[
        {
          queryKey: QUERY_KEYS.POPULARITY,
          queryFn: () => getProductsPopularity(),
        },
      ]}
    >
      <section>
        <div className="border py-20 flex justify-center items-center">
          <div className="flex flex-col gap-8 ">
            <div className="flex flex-col items-center gap-2 border">
              <Image src={Todayprice} width={36} height={36} alt="오늘의 특가 로고" />
              <h3 className="typo-h2">오늘의 특가</h3>
              <span className="typo-body3 text-assistive">
                {year}년 {month}월 {day}일, 지혜에서만 만나볼 수 있는 초특가 상품들
              </span>
            </div>
            <Toaster />

            <AllProducts />
          </div>
        </div>
        <div className="border py-20 flex justify-center items-center border-primary flex-col gap-8">
          <div className="py-4 flex flex-col gap-2 justify-center items-center">
            <Image src={Signal} width={36} height={36} alt="오늘의 특가 로고" />
            <h3 className="typo-h2 text-strong">현재 급상승 키워드</h3>
            <span className="text-assistive typo-body3">
              {year}년 {month}월 {day}일, 지혜 사용자들이 많이 검색한 키워드예요
            </span>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <Accordion
              items={accordionData}
              type="single"
              className="flex flex-col gap-10 w-full "
            />
          </div>
        </div>
      </section>
    </PrefetchedQueryHydrationBoundary>
  )
}
