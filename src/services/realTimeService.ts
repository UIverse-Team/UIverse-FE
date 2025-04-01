import { KeywordType } from '@/hooks/useSearch'
import { apiGet } from '@/libs/axios/apiMethods'
import { createEndpoint } from '@/libs/axios/endPoints'

const ENDPOINTS = {
  POPULAR: '/popular',
}

export async function getReaitimeService(): Promise<KeywordType> {
  try {
    const endpoint = createEndpoint(ENDPOINTS.POPULAR)
    const response = await apiGet<KeywordType>(endpoint)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
