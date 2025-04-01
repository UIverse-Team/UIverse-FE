'use client'
import { QUERY_KEYS } from '@/constants/queryKeys'
import useFetchData from '@/hooks/useFetchData'
import { getProductsPopularity } from '@/services/productService'
import { PopularityType } from '@/types/Product/productsType'
import CardProduct from '../common/CardProduct/CardProduct'
import { CartProductListSkeleton } from './CartProductListSkeleton'

export const CartProductList = () => {
  const size = 4
  const { data, isLoading, isError } = useFetchData<PopularityType[]>(
    QUERY_KEYS.POPULARITY(size),
    () => getProductsPopularity(size),
  )

  if (isLoading) return <CartProductListSkeleton />

  if (isError) return <div>에러가 발생</div>

  return (
    <div className="flex rounded-2xl p-6 bg-white flex-col gap-2">
      <h1 className="typo-3">인기 상품 추천</h1>
      <div className="flex gap-4 ">
        {data?.map((product) => <CardProduct key={product.id} item={product} />)}
      </div>
    </div>
  )
}
