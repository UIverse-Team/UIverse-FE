import { StarRating } from '@/components/common/rating/StarRating'
import { AllProductsType } from '@/types/Product/productsType'
import formatKoreanWon from '@/util/formatKoreanWon'
import { getTodayDate } from '@/util/getTodayDate'
import Image from 'next/image'
import Todayprice from 'public/icons/today-price.svg'
import Signal from 'public/icons/signal.svg'
import Accordion from '@/components/common/Accordion/Accordion'

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

async function AllProducts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_V1_BASE_URL}/api/products`, {
    cache: 'force-cache',
  })

  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>
  }

  const allProducts: AllProductsType = await response.json()

  return (
    <div className="flex gap-4">
      {allProducts.map((product) =>
        product.content
          ?.filter((item) => item.isDiscount)
          .map((item) => (
            <div className="flex flex-col gap-2 w-[248px]" key={item.id}>
              <Image
                width={248}
                height={248}
                alt="상품 이미지"
                src={item.mainImage}
                className="rounded-md"
              />
              <div>
                <span className="typo-caption1">{item.brand}</span>
              </div>
              <div>
                <span className="typo-body2 w-full line-clamp-2 overflow-hidden text-ellipsis h-[44px]">
                  {item.name}
                </span>
              </div>
              <div className="flex gap-1 items-center">
                <span className="typo-body3 text-sale">49%</span>
                <span className="typo-h3 text-strong">
                  {formatKoreanWon(item.discountPrice, false)}원
                </span>
                <span className="text-assistive typo-body3 line-through">
                  {formatKoreanWon(item.originPrice, false)}원
                </span>
              </div>
              <div className="flex items-center">
                <div className="flex gap-0.5">
                  <span className="text-alternative typo-body3">판매량</span>
                  <span className="text-alternative typo-body3">15,342</span>
                </div>
                <div className="px-1">
                  <span className="w-[1.5px] h-[1.5px] rounded-full block bg-alternative"></span>
                </div>
                <div className="flex gap-0.5 items-center">
                  <span>
                    <StarRating
                      size="sm"
                      rating={1}
                      filedColor="fill-warning"
                      textColor="text-warning"
                      showRatingValue={false}
                      length={1}
                    />
                  </span>
                  <span className="text-alternative typo-body3">4.5</span>
                </div>
              </div>
              <div className="flex gap-1">
                {item.labels !== 'NONE' && (
                  <div
                    className={`${
                      item.labels === 'PROMOTION'
                        ? 'text-primary bg-primary-a8 px-1.5 py-1 typo-body3'
                        : 'text-white  bg-sale typo-body3 px-1.5 py-1'
                    }`}
                  >
                    {item.labels === 'PROMOTION' ? '프로모션' : '특가'}
                  </div>
                )}
              </div>
            </div>
          )),
      )}
    </div>
  )
}

export default function Home() {
  return (
    <section>
      <div className="border py-20 flex justify-center items-center">
        <div className="flex flex-col gap-8 ">
          <div className="flex flex-col items-center gap-2 border">
            <Image src={Todayprice} width={36} height={36} alt="오늘의 특가 로고" />
            <h3 className="typo-h2">오늘의 특가</h3>
            <span className="typo-body3 text-assistive">{getTodayDate()}</span>
          </div>
          <AllProducts />
        </div>
      </div>
      <div className="border py-20 flex justify-center items-center border-primary flex-col gap-8">
        <div className="py-4 flex flex-col gap-2 justify-center items-center">
          <Image src={Signal} width={36} height={36} alt="오늘의 특가 로고" />
          <h3 className="typo-h2 text-strong">현재 급상승 키워드</h3>
          <span className="text-assistive typo-body3">
            {getTodayDate()}, 지혜 사용자들이 많이 검색한 키워드예요
          </span>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Accordion items={accordionData} type="single" className="flex flex-col gap-10 w-full " />
        </div>
      </div>
    </section>
  )
}
