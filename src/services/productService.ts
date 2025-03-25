import { ProductDetail } from '@/types/Product/productType'
import httpClient from '@/util/httpClient'

export async function getProductDetail(productId: number): Promise<ProductDetail | null> {
  try {
    const response = await httpClient.get(`products/${productId}`)
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}
