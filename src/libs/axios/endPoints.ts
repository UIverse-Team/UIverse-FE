// 쿼리 파라미터 타입 - 모든 값은 문자열, 숫자, 불리언, 또는 undefined/null
type QueryParamValue = string | number | boolean | undefined | null

// API 엔드포인트 생성 함수
export const createEndpoint = (path: string): string => {
  return path.startsWith('/') ? path : `/${path}`
}

// 쿼리 파라미터 추가 함수
export const addQueryParams = (
  endpoint: string,
  params: Record<string, QueryParamValue>,
): string => {
  const url = new URL(endpoint, process.env.NEXT_PUBLIC_SITE_URL)

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value))
    }
  })

  return `${url.pathname}${url.search}`
}

// 경로 파라미터 추가 함수
export const createPathWithParams = (
  basePath: string,
  params: Record<string, string | number>,
): string => {
  let result = basePath

  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`:${key}`, String(value))
  })

  return result
}
