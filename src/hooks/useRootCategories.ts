import { useSuspenseQuery } from '@tanstack/react-query'
import { fetchRootCategories } from '@/services/categoryService'
import { QUERY_KEYS } from '@/constants/queryKeys'

export function useRootCategories() {
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.ROOT_CATEGORIES,
    queryFn: () => fetchRootCategories(),
  })
}
