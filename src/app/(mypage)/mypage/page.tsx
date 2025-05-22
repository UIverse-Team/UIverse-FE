'use client'
import Button from '@/components/common/Button/Button'
import Divider from '@/components/common/Divider/Divider'
import ClockIcon from '/public/icons/clock-fill.svg?svgr'
import SendingIcon from '/public/icons/sending.svg?svgr'
import ReviewIcon from '/public/icons/review.svg?svgr'
import HeartIcon from '/public/icons/heart.svg?svgr'
import CartIcon from '/public/icons/cart.svg?svgr'
import Chip from '@/components/common/Chip/Chip'
import CardProduct from '@/components/common/CardProduct/CardProduct'
import { AllProduct } from '@/types/Product/productsType'
import TextButton from '@/components/common/Button/TextButton'
import BrandProfile from '@/components/common/BrandProfile/BrandProfile'
import UserName from '@/components/mypage/UserName'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import { useRouter } from 'next/navigation'

const testProduct: AllProduct[] = [
  {
    id: 1,
    name: '여성용 캐주얼 스포츠 신발',
    labels: 'NONE',
    originPrice: 124000,
    discountPrice: 80000,
    isDiscount: true,
    brand: '나이키',
    mainImage: 'https://i.pinimg.com/474x/6b/ae/55/6bae55e0b2b667a2f5b72a4f3d57f335.jpg',
    discountRate: 15,
  },
  {
    id: 2,
    name: '통기성 메쉬 다드 슈즈',
    labels: 'NONE',
    originPrice: 100000,
    discountPrice: 85000,
    isDiscount: true,
    brand: '아디다스',
    mainImage: 'https://i.pinimg.com/736x/91/d7/c9/91d7c9cff8fb6cc731901ec1d5892f63.jpg',
    discountRate: 15,
  },
  {
    id: 3,
    name: '트렌디 레이스업 플랫폼 스니커즈',
    labels: 'NONE',
    originPrice: 24000,
    discountPrice: 21000,
    isDiscount: true,
    brand: '아디다스',
    mainImage: 'https://i.pinimg.com/736x/d7/95/1c/d7951c13a52d22b9986cb531fece7509.jpg',
    discountRate: 15,
  },
  {
    id: 4,
    name: '다용도 캐주얼 스포츠 러닝 슈즈',
    labels: 'NONE',
    originPrice: 84000,
    discountPrice: 70000,
    isDiscount: true,
    brand: '나이키',
    mainImage: 'https://i.pinimg.com/474x/36/ad/0f/36ad0f19b3b9f26c77b68fe3f7f72c96.jpg',
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
  const router = useRouter()
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* 퀵메뉴 */}
      <div className="w-full bg-white rounded-lg">
        <div className="flex p-6 justify-between items-center">
          <div className="typo-h3">
            안녕하세요, <UserName />님
          </div>
          <div className="flex gap-2">
            <Button variant={'outline'} size={'md'}>
              맞춤정보설정
            </Button>
            <Button
              variant={'outline'}
              size={'md'}
              onClick={() => router.push(ROUTES.EDIT_PROFILE)}
            >
              회원정보 수정
            </Button>
          </div>
        </div>
        <Divider />
        <div className="py-6 px-18 h-[132px] flex justify-between items-center">
          <Link href={ROUTES.RECENT}>
            <div className="flex flex-col items-center">
              <div className="p-2.5">
                <div className="w-11 h-11 flex justify-center items-center">
                  <ClockIcon className="text-alternative w-8 h-8" />
                </div>
              </div>
              <p className="typo-button2">최근 본 상품</p>
            </div>
          </Link>
          <Link href={ROUTES.ORDERS}>
            <div className="flex flex-col items-center">
              <div className="p-2.5">
                <div className="w-11 h-11 flex justify-center items-center">
                  <SendingIcon className="text-alternative w-8 h-8" />
                </div>
              </div>
              <p className="typo-button2">주문 내역</p>
            </div>
          </Link>
          <Link href={ROUTES.REVIEWS}>
            <div className="flex flex-col items-center">
              <div className="p-2.5">
                <div className="w-11 h-11 flex justify-center items-center">
                  <ReviewIcon className="text-alternative w-8 h-8" />
                </div>
              </div>
              <p className="typo-button2">나의리뷰</p>
            </div>
          </Link>
          <Link href={ROUTES.WISHLIST}>
            <div className="flex flex-col items-center">
              <div className="p-2.5">
                <div className="w-11 h-11 flex justify-center items-center">
                  <HeartIcon className="text-alternative w-8 h-8" />
                </div>
              </div>
              <p className="typo-button2">
                찜한상품<span className="text-primary"> 5</span>
              </p>
            </div>
          </Link>
          <Link href={ROUTES.CART}>
            <div className="flex flex-col items-center">
              <div className="p-2.5">
                <div className="w-11 h-11 flex justify-center items-center">
                  <CartIcon className="text-alternative w-8 h-8" />
                </div>
              </div>
              <p className="typo-button2">
                장바구니<span className="text-primary"> 4</span>
              </p>
            </div>
          </Link>
        </div>
      </div>
      {/* 최근 검색어 */}
      <div className="w-full bg-white rounded-lg">
        <div className="flex p-6 justify-between items-center">
          <div className="typo-h3">
            이런 상품, <UserName />
            님이 좋아할 것 같아요!
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
  )
}
