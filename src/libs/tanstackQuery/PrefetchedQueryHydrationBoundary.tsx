import { ReactNode } from 'react'
import { dehydrate, HydrationBoundary, QueryFunction } from '@tanstack/react-query'
import { getQueryClient } from './queryClient'

type PrefetchedQueryHydrationBoundaryProps<T = unknown> = {
  children: ReactNode
  queryList: {
    queryKey: unknown[]
    queryFn: QueryFunction<T, unknown[]>
    staleTime?: number
  }[]
  staleTime?: number // 글로벌 staleTime 옵션
}

export default async function PrefetchedQueryHydrationBoundary<T = unknown>({
  children,
  queryList,
  staleTime = 5 * 60 * 1000, // 기본값 5분
}: PrefetchedQueryHydrationBoundaryProps<T>) {
  const queryClient = getQueryClient()

  try {
    // Promise.all을 사용한 병렬 프리페칭
    await Promise.all(
      queryList.map(({ queryKey, queryFn, staleTime: queryStaleTime }) =>
        queryClient.prefetchQuery({
          queryKey,
          queryFn,
          staleTime: queryStaleTime ?? staleTime, // 개별 쿼리 staleTime 우선
        }),
      ),
    )
  } catch (error) {
    console.error('Prefetching error:', error)
  }

  // 하이드레이션을 위해 쿼리 상태 직렬화
  const dehydratedState = dehydrate(queryClient)

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
}
