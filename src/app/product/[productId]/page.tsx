import Like from '/public/icons/like.svg?svgr'
import Button from '@/components/common/Button/Button'
import formatKoreanWon from '@/util/formatKoreanWon'
import { ProductReadMore } from '@/components/product/ProductReadMore'
import { ProductMainImage } from '@/components/product/ProductMainImage'
import { ProductTabs } from '@/components/product/ProductTabs'
import { ProductInfo } from '@/components/product/ProductInfo'
import { QuantitySelector } from '@/components/product/QuantitySelector'
import { StarRating } from '@/components/common/rating/StarRating'
import { CartWishlistButtons } from '@/components/product/CartWishlistButtons'
import { getProductDetail } from '@/services/productService'
import PrefetchedQueryHydrationBoundary from '@/libs/tanstackQuery/PrefetchedQueryHydrationBoundary'
import { QUERY_KEYS } from '@/constants/queryKeys'
import { ProductBreadCrumbContainer } from '@/components/product/ProductBreadCrumbConainer'

// export function generateStaticParams() {
//   return [{ id: '1' }]
// }

const ProductDetailPage = async ({ params }: { params: Promise<{ productId: number }> }) => {
  const productId = (await params).productId
  const productData = await getProductDetail(productId)

  const {
    id,
    name,
    originPrice,
    discountPrice,
    brand,
    images,
    detailImage,
    reviewRate,
    reviewCount,
    discountRate,
  } = productData

  const originConvertPrice = formatKoreanWon(originPrice, false)
  const discountConvertPrice = formatKoreanWon(discountPrice, false)

  return (
    <PrefetchedQueryHydrationBoundary
      queryList={[
        {
          queryKey: QUERY_KEYS.PRODUCT_DETAIL(productId),
          queryFn: () => getProductDetail(productId),
          staleTime: 24 * 60 * 60 * 1000, // 24시간
        },
      ]}
    >
      <ProductBreadCrumbContainer productId={productId} />
      <div className="flex flex-col gap-4">
        <div className=" flex flex-col p-8 gap-8 bg-white rounded-2xl mb-4">
          <div className="flex gap-8">
            <ProductMainImage images={images} />
            <div className="flex flex-1 flex-col gap-6">
              <ProductInfo
                brand={brand}
                discountRate={discountRate}
                name={name}
                discountConvertPrice={discountConvertPrice}
                originConvertPrice={originConvertPrice}
                reviewCount={reviewCount}
              />
              <QuantitySelector productId={id} discountPrice={discountPrice} />
              <CartWishlistButtons productId={id} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex w-full ">
            <ProductTabs reviewCount={reviewCount} />
          </div>
          <ProductReadMore img={detailImage} />
        </div>
        <div className="flex flex-col gap-4 p-4 bg-white rounded-2xl" id="review">
          <div className="flex justify-between w-full ">
            <div className="flex items-center gap-2">
              <h2 className="typo-h2 text-strong">리뷰</h2>
              <span className="typo-body2 text-strong">(2,813건)</span>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="typo-h3">최고예요!</h3>
              <h3 className="typo-h3">4.0</h3>
              <h3>평점</h3>
            </div>
          </div>
          <div className="flex gap-4 w-full flex-col ">
            <div className="flex flex-col border-b-[1px] border-alter-line pb-4 gap-4">
              <div className="w-[138px] h-[138px] bg-gray-50 rounded-[8px] object-fill">이미지</div>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <span className="typo-button1 text-alternative">추천키워드</span>
                  <ul className="flex gap-2 items-center">
                    <li className="border-[1px] border-alter-line rounded-[50px] px-4 py-2 typo-body3 text-assistive cursor-pointer ">
                      커버력
                    </li>
                    <li className="border-[1px] border-alter-line rounded-[50px] px-4 py-2 typo-body3 text-assistive ">
                      건성
                    </li>
                    <li className="border-[1px] border-alter-line rounded-[50px] px-4 py-2 typo-body3 text-assistive ">
                      지속력
                    </li>
                  </ul>
                </div>
                <div className="flex gap-2 items-center ">
                  <span className="text-strong typo-button1 cursor-pointer">유용한순</span>
                  <span className="text-alternative typo-body3 cursor-pointer">최신순</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="border-b-[1px] pb-4 flex flex-col gap-2 border-alter-line ">
                <div className="flex items-center gap-2">
                  <h3>
                    <StarRating
                      rating={reviewRate}
                      size="sm"
                      showRatingValue={true}
                      filedColor="fill-warning"
                      textColor="text-warning"
                      length={5}
                    />
                  </h3>
                  <h3 className="typo-button1 text-strong">정말좋아요</h3>
                </div>
                <div className="text-assistive typo-caption1">
                  <span>han****</span> | <span>2025.02.24</span>
                </div>
                <div className="text-assistive typo-caption1">
                  <span>옵션: lg</span>
                </div>
                <div className="typo-body text-alternative">
                  <p>
                    항상 쓰고 있는 제품입니다 ! 커버력도 좋고 상아빛 피부 표현에 저격이에요 진짜
                    추천임
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="w-[48px] h-[36px]  border-[1px]"
                    variant={'outline'}
                    size={'md'}
                  >
                    <Like fill="blue" />
                    <span className="text-alternative typo-button2">11</span>
                  </Button>
                </div>
              </div>
              <div>
                <div>페이지네이션</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-4 bg-white rounded-2xl w-full" id="chat">
          <div className="flex gap-2">
            <h3 className="typo-h2 text-strong">챗봇 문의하기</h3>
            <span className="px-2 text-white bg-primary rounded-[2px] typo-caption2 flex items-center">
              AI 추천
            </span>
          </div>
          <div className="w-full">
            <iframe
              src={`${process.env.NEXT_PUBLIC_CHATBOT_API}`}
              title="챗봇 문의하기"
              width="100%"
              height="500px"
            ></iframe>
          </div>
        </div>
      </div>
    </PrefetchedQueryHydrationBoundary>
  )
}

export default ProductDetailPage
