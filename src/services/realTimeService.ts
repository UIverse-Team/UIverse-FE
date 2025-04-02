import { apiGet } from '@/libs/axios/apiMethods'
import { createEndpoint } from '@/libs/axios/endPoints'
import { RealTimeData } from '@/types/realTimeKeyword/realTimeKeywordType'

const ENDPOINTS = {
  POPULAR: '/popular',
}

export async function getReaitimeService(): Promise<RealTimeData> {
  try {
    const endpoint = createEndpoint(ENDPOINTS.POPULAR)
    const response = await apiGet<RealTimeData>(endpoint)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
