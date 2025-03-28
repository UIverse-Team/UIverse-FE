import Image from 'next/image'
import { getTodayDate } from '@/util/getTodayDate'
import Accordion from '@/components/common/Accordion/Accordion'
import Todayprice from 'public/icons/today-price.svg'
import Binocular from 'public/icons/binocular.svg'
import Signal from 'public/icons/signal.svg'
import Chat from 'public/icons/chat.svg'
import PrefetchedQueryHydrationBoundary from '@/libs/tanstackQuery/PrefetchedQueryHydrationBoundary'
import AllProducts from '@/components/product/AllProducts'
import { QUERY_KEYS } from '@/constants/queryKeys'
import { getProductsPopularity } from '@/services/productService'
import { ReviewMainComponent } from '@/components/review/ReviewMainComponent'

export const dynamic = 'force-dynamic'

const accordionData = [
  {
    date: '2025-03-22',
    time: '10:00',
    keywords: [
      {
        rank: 1,
        keyword: '복숭아',
        category: '식품/과일',
        products: [
          {
            productId: 1001,
            productImageUrl: 'https://shopping-phinf.pstatic.net/main_8207483/82074834562.1.jpg',
            brand: '영규네 과일',
            name: '달콤한 과일로 복숭아 한박스 1kg',
            originPrice: 26500,
            discountPrice: 13560,
            discountRate: 49, // 세일 값
            salesVolume: 15324, //판매량 개수
            reviewRating: 4.7, //평점 값
          },
          {
            productId: 1002,
            productImageUrl: 'https://shopping-phinf.pstatic.net/main_8207483/82074834562.1.jpg',
            brand: '영규네 과일',
            name: '달콤한 과일로 복숭아 한박스 1kg',
            originPrice: 26500,
            discountPrice: 13560,
            discountRate: 49,
            salesVolume: 15324,
            reviewRating: 4.7,
          },
          {
            productId: 1001,
            productImageUrl: 'https://shopping-phinf.pstatic.net/main_8207483/82074834562.1.jpg',
            brand: '영규네 과일',
            name: '달콤한 과일로 복숭아 한박스 1kg',
            originPrice: 26500,
            discountPrice: 13560,
            discountRate: 49, // 세일 값
            salesVolume: 15324, //판매량 개수
            reviewRating: 4.7, //평점 값
          },
          {
            productId: 1002,
            productImageUrl: 'https://shopping-phinf.pstatic.net/main_8207483/82074834562.1.jpg',
            brand: '영규네 과일',
            name: '달콤한 과일로 복숭아 한박스 1kg',
            originPrice: 26500,
            discountPrice: 13560,
            discountRate: 49,
            salesVolume: 15324,
            reviewRating: 4.7,
          },
        ],
      },
      {
        rank: 2,
        keyword: '크리드',
        category: '화장품/향수',
        products: [
          {
            productId: 1001,
            productImageUrl: 'https://shopping-phinf.pstatic.net/main_8207483/82074834562.1.jpg',
            brand: '영규네 과일',
            name: '달콤한 과일로 복숭아 한박스 1kg',
            originPrice: 26500,
            discountPrice: 13560,
            discountRate: 49, // 세일 값
            salesVolume: 15324, //판매량 개수
            reviewRating: 4.7, //평점 값
          },
          {
            productId: 1002,
            productImageUrl: 'https://shopping-phinf.pstatic.net/main_8207483/82074834562.1.jpg',
            brand: '영규네 과일',
            name: '달콤한 과일로 복숭아 한박스 1kg',
            originPrice: 26500,
            discountPrice: 13560,
            discountRate: 49,
            salesVolume: 15324,
            reviewRating: 4.7,
          },
        ],
      },
      {
        rank: 3,
        keyword: '무지개떡',
        category: '화장품/향수',
        products: [
          {
            productId: 1001,
            productImageUrl: 'https://shopping-phinf.pstatic.net/main_8207483/82074834562.1.jpg',
            brand: '영규네 과일',
            name: '달콤한 과일로 복숭아 한박스 1kg',
            originPrice: 26500,
            discountPrice: 13560,
            discountRate: 49, // 세일 값
            salesVolume: 15324, //판매량 개수
            reviewRating: 4.7, //평점 값
          },
          {
            productId: 1002,
            productImageUrl: 'https://shopping-phinf.pstatic.net/main_8207483/82074834562.1.jpg',
            brand: '영규네 과일',
            name: '달콤한 과일로 복숭아 한박스 1kg',
            originPrice: 26500,
            discountPrice: 13560,
            discountRate: 49,
            salesVolume: 15324,
            reviewRating: 4.7,
          },
        ],
      },
      {
        rank: 4,
        keyword: '아디다스',
        category: '화장품/향수',
        products: [
          {
            productId: 1001,
            productImageUrl: 'https://shopping-phinf.pstatic.net/main_8207483/82074834562.1.jpg',
            brand: '영규네 과일',
            name: '달콤한 과일로 복숭아 한박스 1kg',
            originPrice: 26500,
            discountPrice: 13560,
            discountRate: 49, // 세일 값
            salesVolume: 15324, //판매량 개수
            reviewRating: 4.7, //평점 값
          },
          {
            productId: 1002,
            productImageUrl: 'https://shopping-phinf.pstatic.net/main_8207483/82074834562.1.jpg',
            brand: '영규네 과일',
            name: '달콤한 과일로 복숭아 한박스 1kg',
            originPrice: 26500,
            discountPrice: 13560,
            discountRate: 49,
            salesVolume: 15324,
            reviewRating: 4.7,
          },
        ],
      },
      {
        rank: 5,
        keyword: '노트북거치대',
        category: '화장품/향수',
        products: [
          {
            productId: 1001,
            productImageUrl: 'https://shopping-phinf.pstatic.net/main_8207483/82074834562.1.jpg',
            brand: '영규네 과일',
            name: '달콤한 과일로 복숭아 한박스 1kg',
            originPrice: 26500,
            discountPrice: 13560,
            discountRate: 49, // 세일 값
            salesVolume: 15324, //판매량 개수
            reviewRating: 4.7, //평점 값
          },
          {
            productId: 1002,
            productImageUrl: 'https://shopping-phinf.pstatic.net/main_8207483/82074834562.1.jpg',
            brand: '영규네 과일',
            name: '달콤한 과일로 복숭아 한박스 1kg',
            originPrice: 26500,
            discountPrice: 13560,
            discountRate: 49,
            salesVolume: 15324,
            reviewRating: 4.7,
          },
        ],
      },
    ],
  },
]

const review = [
  {
    category: '바지',
    content: [
      {
        tag: 'RECOMMENDED',
        rating: 5,
        content: '허리가 편하고 핏이 좋아요.',
        likeCount: 12,
        reviewCount: 2222,
        product: {
          id: 251,
          name: '남자면 바지 남성 바지 스판 밴딩 빅사이즈 치노 와이드 팬츠 허벅돼 고무줄 편한 바지',
          labels: 'PROMOTION',
          originPrice: 25000,
          discountPrice: 16800,
          discountRate: 30,
          isDiscount: false,
          brand: '감미로운',
          mainImage: 'https://shopping-phinf.pstatic.net/main_8270774/82707740040.3.jpg',
        },
        createAt: '2025-03-25',
        option: '블랙 / XL',
      },
      {
        tag: 'RECOMMENDED',
        rating: 5,
        content: '허리가 편하고 핏이 좋아요.',
        likeCount: 12,
        reviewCount: 2222,
        product: {
          id: 251,
          name: '남자면 바지 남성 바지 스판 밴딩 빅사이즈 치노 와이드 팬츠 허벅돼 고무줄 편한 바지',
          labels: 'PROMOTION',
          originPrice: 25000,
          discountPrice: 16800,
          discountRate: 30,
          isDiscount: false,
          brand: '감미로운',
          mainImage: 'https://shopping-phinf.pstatic.net/main_8270774/82707740040.3.jpg',
        },
        createAt: '2025-03-25',
        option: '블랙 / XL',
      },
      {
        tag: 'RECOMMENDED',
        rating: 5,
        content: '허리가 편하고 핏이 좋아요.',
        likeCount: 12,
        reviewCount: 2222,
        product: {
          id: 251,
          name: '남자면 바지 남성 바지 스판 밴딩 빅사이즈 치노 와이드 팬츠 허벅돼 고무줄 편한 바지',
          labels: 'PROMOTION',
          originPrice: 25000,
          discountPrice: 16800,
          discountRate: 30,
          isDiscount: false,
          brand: '감미로운',
          mainImage: 'https://shopping-phinf.pstatic.net/main_8270774/82707740040.3.jpg',
        },
        createAt: '2025-03-25',
        option: '블랙 / XL',
      },
      {
        tag: 'RECOMMENDED',
        rating: 5,
        content: '허리가 편하고 핏이 좋아요.',
        likeCount: 12,
        reviewCount: 2222,
        product: {
          id: 251,
          name: '남자면 바지 남성 바지 스판 밴딩 빅사이즈 치노 와이드 팬츠 허벅돼 고무줄 편한 바지',
          labels: 'PROMOTION',
          originPrice: 25000,
          discountPrice: 16800,
          discountRate: 30,
          isDiscount: false,
          brand: '감미로운',
          mainImage: 'https://shopping-phinf.pstatic.net/main_8270774/82707740040.3.jpg',
        },
        createAt: '2025-03-25',
        option: '블랙 / XL',
      },
    ],
  },
  {
    category: '신발',
    content: [
      {
        tag: 'RECOMMENDED',
        rating: 4,
        content: '가볍고 편안해요. 등산할 때 딱입니다.',
        likeCount: 8,
        reviewCount: 1987,
        product: {
          id: 301,
          name: '경량 남성 트레킹화 방수 등산화 운동화 아웃도어 워킹화',
          labels: 'BEST',
          originPrice: 46000,
          discountPrice: 32800,
          discountRate: 48,
          isDiscount: true,
          brand: '산을타다',
          mainImage: 'https://shopping-phinf.pstatic.net/main_3012341/30123410023.2.jpg',
        },
        createAt: '2025-03-26',
        option: '270mm / 블랙',
      },
    ],
  },
]

const { year, month, day } = getTodayDate()

export default async function HomePage() {
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
        <div className="py-20 flex justify-center items-center">
          <div className="flex flex-col gap-8 ">
            <div className="flex flex-col items-center gap-2">
              <Image src={Todayprice} width={36} height={36} alt="오늘의 특가 로고" />
              <h3 className="typo-h2">오늘의 특가</h3>
              <span className="typo-body3 text-assistive">
                지혜에서만 만나볼 수 있는 초특가 상품들
              </span>
            </div>

            <AllProducts />
          </div>
        </div>
        <div className="py-20 flex justify-center items-center">
          <div className="flex flex-col gap-8 ">
            <div className="flex flex-col items-center gap-2">
              <Image src={Binocular} width={36} height={36} alt="오늘의 특가 로고" />
              <h3 className="typo-h2">요즘 하트 제일 많은 받은 상품</h3>
              <span className="typo-body3 text-assistive">
                다들 이거 찜하고 있길래, 우리도 보여드려요.
              </span>
            </div>
            <AllProducts />
          </div>
        </div>
        <div className=" py-20 flex justify-center items-center  flex-col gap-8">
          <div className="py-4 flex flex-col gap-2 justify-center items-center">
            <Image src={Signal} width={36} height={36} alt="오늘의 특가 로고" />
            <h3 className="typo-h2 text-strong">현재 급상승 키워드</h3>
            <span className="text-assistive typo-body3">
              {year}년 {month}월 {day}일, 지혜 사용자들이 많이 검색한 키워드예요!
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
        <div className="py-20 flex justify-center items-center w-full">
          <div className="flex flex-col gap-4 border py-4 w-full">
            <div className="flex flex-col items-center gap-2">
              <Image src={Chat} width={36} height={36} alt="오늘의 특가 로고" />
              <h3 className="typo-h2">후기가 알려주는 진짜 인기템</h3>
              <span className="typo-body3 text-assistive">
                실제 후기를 보고 고른, 믿고 쓰는 베스트템이에요
              </span>
            </div>
            {/* <div className="flex gap-4 justify-center"> */}
            <ReviewMainComponent review={review} />

            {/* {review.map((category, index) => (
                <Chip
                  key={index}
                  // className="px-3.5 py-1.5 cursor-pointer bg-secondary typo-h3 text-white rounded-"
                  variant={'secondary'}
                  size={'md'}
                >
                  {category.category}
                </Chip>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 ">
              {review.map((categoryData, categoryIndex) => (
                <div key={categoryIndex}>
                  {categoryData.content.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex gap-4  p-4">
                      <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-2">
                          <div>{item.content}</div>
                          <div className="flex gap-2 ">
                            <span className="flex gap-1 items-center">
                              <StarRating
                                size="sm"
                                rating={1}
                                filedColor="fill-warning"
                                textColor="text-warning"
                                showRatingValue={false}
                                length={1}
                              />
                              <span className="typo-button1">
                                {item.rating}
                                <span className="text-assistive typo-button1">/5</span>
                              </span>
                              <span className="text-assistive">|</span>
                              <span className="flex gap-0.5 typo-caption1 text-assistive">
                                리뷰{' '}
                                <span className="typo-caption1 text-assistive">
                                  {item.reviewCount}
                                </span>
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="bg-neutral px-4 py-2 flex gap-1 items-center rounded-full w-[314px]">
                          <span className=" text-secondary whitespace-nowrap typo-caption1">
                            {item.product.brand}
                          </span>
                          <span className="truncate w-[129px] typo-caption1">
                            {item.product.name}
                          </span>
                          <div className="flex gap-1 whitespace-nowrap">
                            <span className="typo-button1 text-sale">
                              {item.product.discountRate}%
                            </span>
                            <span className="typo-button1">{item.product.discountPrice}원</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-1/3 aspect-square relative">
                        <Image
                          src={item.product.mainImage}
                          alt={item.product.name}
                          width={138}
                          height={138}
                          className="object-cover rounded-md"
                        />
                        {item.product.labels && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                            {item.product.labels}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}*/}
          </div>
        </div>
        {/* </div> */}
      </section>
    </PrefetchedQueryHydrationBoundary>
  )
}
