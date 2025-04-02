import { QueryClient, isServer } from '@tanstack/react-query'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 클라이언트의 즉시 다시 요청에 대응하도록, 기본 캐싱 시간(min)을 지정.
        staleTime: 5 * 60 * 1000, // 5분
        gcTime: 30 * 60 * 1000, // 30분
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
  if (isServer) {
    // 서버에서는 항상 새로운 queryClient 생성
    return makeQueryClient()
  } else {
    // 브라우저에서는 queryClient가 없으면 새로운 queryClient 생성
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}
