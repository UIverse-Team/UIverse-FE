import { apiGet } from '@/libs/axios/apiMethods'
import { createEndpoint } from '@/libs/axios/endPoints'

const ENDPOINTS = {
  POPULAR: '/popular',
}

export async function getReaitimeService() {
  try {
    const endpoint = createEndpoint(ENDPOINTS.POPULAR)
    const response = await apiGet(endpoint)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}
