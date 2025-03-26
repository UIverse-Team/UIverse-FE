'use client'

import Button from '@/components/common/Button/Button'
import Divider from '@/components/common/Divider/Divider'
import Link from 'next/link'
import ClockIcon from '/public/icons/clock-fill.svg?svgr'
import SendingIcon from '/public/icons/sending.svg?svgr'
import ReviewIcon from '/public/icons/review.svg?svgr'
import HeartIcon from '/public/icons/heart.svg?svgr'
import CartIcon from '/public/icons/cart.svg?svgr'
import QnAIcon from '/public/icons/qna.svg?svgr'
import Chip from '@/components/common/Chip/Chip'
import CardProduct from '@/components/common/CardProduct/CardProduct'
import { AllProduct } from '@/types/Product/productsType'
import TextButton from '@/components/common/Button/TextButton'
import BrandProfile from '@/components/common/BrandProfile/BrandProfile'

const testProduct: AllProduct[] = [
  {
    id: 1,
    name: '테스트1',
    labels: 'NONE',
    originPrice: 124000,
    discountPrice: 100000,
    isDiscount: true,
    brand: 'TEST',
    mainImage: 'https://shopping-phinf.pstatic.net/main_8885553/88855530085.jpg',
    discountRate: 15,
  },
  {
    id: 2,
    name: '테스트2',
    labels: 'NONE',
    originPrice: 124000,
    discountPrice: 100000,
    isDiscount: true,
    brand: 'TEST',
    mainImage: 'https://shopping-phinf.pstatic.net/main_8885553/88855530085.jpg',
    discountRate: 15,
  },
  {
    id: 3,
    name: '테스트3',
    labels: 'NONE',
    originPrice: 124000,
    discountPrice: 100000,
    isDiscount: true,
    brand: 'TEST',
    mainImage: 'https://shopping-phinf.pstatic.net/main_8885553/88855530085.jpg',
    discountRate: 15,
  },
  {
    id: 4,
    name: '테스트4',
    labels: 'NONE',
    originPrice: 124000,
    discountPrice: 100000,
    isDiscount: true,
    brand: 'TEST',
    mainImage: 'https://shopping-phinf.pstatic.net/main_8885553/88855530085.jpg',
    discountRate: 15,
  },
]

const testBrand: BrandProfile[] = [
  {
    id: 1,
    name: '영애네 옷장',
    image: 'https://i.pinimg.com/236x/2d/d0/0e/2dd00e2ae7ad63231363084704ece5e1.jpg',
  },
  {
    id: 2,
    name: '명규네 과일',
    image: 'https://i.pinimg.com/474x/ab/1e/91/ab1e9110726f03d0652b25dab5262035.jpg',
  },
  {
    id: 3,
    name: '진현 낭만포차',
    image: 'https://i.pinimg.com/736x/b0/9a/f7/b09af7dceb4b2653c51787a4e9b7ce94.jpg',
  },
]

export default function Mypage() {
  return (
    <>
      <div className="flex gap-4 items-start">
        {/* 왼쪽 메뉴 */}
        <div id="leftMenu" className="w-[200px] bg-white rounded-lg py-4 flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <Link href={`#`} className="text-primary typo-button1 px-4 py-2">
              마이페이지 홈
            </Link>
            <div className="flex flex-col">
              <Link href={`#`} className="typo-caption1 px-4 py-2">
                회원정보수정
              </Link>
              <Link href={`#`} className="typo-caption1 px-4 py-2">
                맞춤정보설정
              </Link>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-2">
            <div className="typo-button1 px-4 py-2">내 주문</div>
            <div className="flex flex-col">
              <Link href={`#`} className="typo-caption1 px-4 py-2">
                최근주문내역
              </Link>
              <Link href={`#`} className="typo-caption1 px-4 py-2">
                취소/교환/반품내역
              </Link>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-2">
            <div className="typo-button1 px-4 py-2">활동내역</div>
            <div className="flex flex-col">
              <Link href={`#`} className="typo-caption1 px-4 py-2">
                최근 본 상품
              </Link>
              <Link href={`#`} className="typo-caption1 px-4 py-2">
                찜한 상품/스토어
              </Link>
              <Link href={`#`} className="typo-caption1 px-4 py-2">
                나의 리뷰
              </Link>
              <Link href={`#`} className="typo-caption1 px-4 py-2">
                재입고 알림
              </Link>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-2">
            <div className="typo-button1 px-4 py-2">고객센터</div>
            <div className="flex flex-col">
              <Link href={`#`} className="typo-caption1 px-4 py-2">
                공지사항
              </Link>
              <Link href={`#`} className="typo-caption1 px-4 py-2">
                문의사항
              </Link>
              <Link href={`#`} className="typo-caption1 px-4 py-2">
                FAQ
              </Link>
            </div>
          </div>
        </div>
        {/* 오른쪽 내용 */}
        <div id="contentWrap" className="flex flex-col gap-4 w-full">
          {/* 퀵메뉴 */}
          <div className="w-full bg-white rounded-lg">
            <div className="flex p-6 justify-between items-center">
              <div className="typo-h3">
                안녕하세요, <span>한은서</span>님
              </div>
              <div className="flex gap-2">
                <Button variant={'outline'} size={'md'}>
                  맞춤정보설정
                </Button>
                <Button variant={'outline'} size={'md'}>
                  회원정보 수정
                </Button>
              </div>
            </div>
            <Divider />
            <div className="py-6 px-18 h-[132px] flex justify-between items-center">
              <div className="flex flex-col items-center">
                <div className="p-2.5">
                  <div className="w-11 h-11 flex justify-center items-center">
                    <ClockIcon className="text-alternative w-8 h-8" />
                  </div>
                </div>
                <p className="typo-button2">
                  최근 본 상품 <span className="text-primary">5</span>
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="p-2.5">
                  <div className="w-11 h-11 flex justify-center items-center">
                    <SendingIcon className="text-alternative w-8 h-8" />
                  </div>
                </div>
                <p className="typo-button2">
                  주문 내역 <span className="text-primary">5</span>
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="p-2.5">
                  <div className="w-11 h-11 flex justify-center items-center">
                    <ReviewIcon className="text-alternative w-8 h-8" />
                  </div>
                </div>
                <p className="typo-button2">
                  나의리뷰 <span className="text-primary">5</span>
                </p>
              </div>
              <div className="w-[1px] h-16 bg-disabled"></div>
              <div className="flex flex-col items-center">
                <div className="p-2.5">
                  <div className="w-11 h-11 flex justify-center items-center">
                    <HeartIcon className="text-alternative w-8 h-8" />
                  </div>
                </div>
                <p className="typo-button2">
                  찜한상품 <span className="text-primary">5</span>
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="p-2.5">
                  <div className="w-11 h-11 flex justify-center items-center">
                    <CartIcon className="text-alternative w-8 h-8" />
                  </div>
                </div>
                <p className="typo-button2">
                  장바구니 <span className="text-primary">4</span>
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="p-2.5">
                  <div className="w-11 h-11 flex justify-center items-center">
                    <QnAIcon className="text-alternative w-8 h-8" />
                  </div>
                </div>
                <p className="typo-button2">
                  상품 Q&A <span className="text-primary">4</span>
                </p>
              </div>
            </div>
          </div>
          {/* 최근 검색어 */}
          <div className="w-full bg-white rounded-lg">
            <div className="flex p-6 justify-between items-center">
              <div className="typo-h3">
                이런 상품, <span>한은서</span>님이 좋아할 것 같아요!
              </div>
            </div>
            <Divider />
            <div className="flex flex-col p-6 gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <Chip variant="secondary" size="md" selected={true}>
                    트렌디한 운동화
                  </Chip>
                  <Chip variant="secondary" size="md" selected={false}>
                    프로틴 음료
                  </Chip>
                  <Chip variant="secondary" size="md" selected={false}>
                    미니멀한 가방
                  </Chip>
                </div>
                <div className="flex justify-between">
                  {testProduct.map((item: AllProduct) => (
                    <CardProduct key={item.id} item={item} />
                  ))}
                </div>
              </div>
              <Divider />
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <div className="typo-button1 text-normal">다른 상품을 찾으시나요?</div>
                  <div className="typo-caption1 text-alternative">
                    오라 통합 검색을 통해 내가 원하는 상품을 찾아보세요 🚀
                  </div>
                </div>
                <div>
                  <Button variant={'tertiary'} size={'md'}>
                    상품검색하러 가기
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* 구독한 쇼핑몰 */}
          <div className="w-full bg-white rounded-lg">
            <div className="flex p-6 justify-between items-center">
              <div className="typo-h3">구독한 쇼핑몰 💌</div>
              <TextButton size="sm" iconPosition="right">
                더보기
              </TextButton>
            </div>
            <Divider />
            <div className="flex flex-col p-6 gap-8">
              <div className="flex gap-4">
                {testBrand.map((brand: BrandProfile) => (
                  <BrandProfile key={brand.id} brand={brand} />
                ))}
              </div>
            </div>
          </div>
          {/* 찜한 상품 */}
          <div className="w-full bg-white rounded-lg">
            <div className="flex p-6 justify-between items-center">
              <div className="typo-h3">찜한 상품</div>
              <TextButton size="sm" iconPosition="right">
                더보기
              </TextButton>
            </div>
            <Divider />
            <div className="flex flex-col p-6 gap-8">
              <div className="flex justify-between">
                {testProduct.map((item: AllProduct) => (
                  <CardProduct key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
          {/* 최근 본 상품 */}
          <div className="w-full bg-white rounded-lg">
            <div className="flex p-6 justify-between items-center">
              <div className="typo-h3">최근 본 상품</div>
              <TextButton size="sm" iconPosition="right">
                더보기
              </TextButton>
            </div>
            <Divider />
            <div className="flex flex-col p-6 gap-8">
              <div className="flex justify-between">
                {testProduct.map((item: AllProduct) => (
                  <CardProduct key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
