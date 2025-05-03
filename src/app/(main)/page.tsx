import Image from 'next/image'
import Todayprice from 'public/icons/today-price.svg'
import PrefetchedQueryHydrationBoundary from '@/libs/tanstackQuery/PrefetchedQueryHydrationBoundary'
import AllProducts from '@/components/product/AllProducts'
import { QUERY_KEYS } from '@/constants/queryKeys'
import { getProductsPopularity } from '@/services/productService'
import { ReviewMainComponent } from '@/components/review/ReviewMainComponent'
import { review } from '@/mocks/reviewMain/reviewData'
import { RealTimeProductComponent } from '@/components/keyword/RealTimeProductComponent'
import { WishProduct } from '@/components/wish-products/WishProduct'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Ora',
  description: 'Ora에서 다양한 상품을 만나보세요',
  openGraph: {
    title: 'Ora',
    description: 'Ora에서 다양한 상품을 만나보세요',
    images: ['/home-banner.png'],
  },
}

export default async function HomePage() {
  const size = 8
  return (
    <PrefetchedQueryHydrationBoundary
      queryList={[
        {
          queryKey: QUERY_KEYS.POPULARITY(size),
          queryFn: () => getProductsPopularity(size),
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
        <WishProduct />
        <RealTimeProductComponent />
        <ReviewMainComponent review={review} />
      </section>
    </PrefetchedQueryHydrationBoundary>
  )
}
