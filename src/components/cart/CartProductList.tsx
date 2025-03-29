'use client'
import { QUERY_KEYS } from '@/constants/queryKeys'
import useFetchData from '@/hooks/useFetchData'
import { getProductsPopularity } from '@/services/productService'
import { AllProduct } from '@/types/Product/productsType'
import LoadingSpinner from '../common/Loading/LoadingSipnner'
import CardProduct from '../common/CardProduct/CardProduct'

export const CartProductList = () => {
  const { data, isLoading, isError } = useFetchData<AllProduct[]>(
    QUERY_KEYS.POPULARITY,
    () => getProductsPopularity(),
    {
      gcTime: 5 * 60 * 1000, // 5분
      staleTime: 1 * 60 * 1000, // 1분
    },
  )
  if (isLoading) return <LoadingSpinner />

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
