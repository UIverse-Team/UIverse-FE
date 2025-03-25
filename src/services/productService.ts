import { ProductDetail } from '@/types/Product/productType'

export async function getProductDetail(productId: number): Promise<ProductDetail> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_V1_BASE_URL}products/${productId}`,
    {
      next: {
        revalidate: 24 * 60 * 60, //24시간 마다 재 호출
      },
    },
  )

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.json()
}
