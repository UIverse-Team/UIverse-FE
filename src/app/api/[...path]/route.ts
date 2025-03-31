import { NextRequest, NextResponse } from 'next/server'
import { createCustomHttpClient } from '@/libs/axios'

// 외부 API 서버 URL
const API_SERVER_URL = process.env.SERVER_API_V1_BASE_URL || ''

// GET 요청 처리
export async function GET(request: NextRequest, context: { params: { path: string[] } }) {
  const params = await context.params
  return handleApiRequest('get', request, params)
}

// POST 요청 처리
export async function POST(request: NextRequest, context: { params: { path: string[] } }) {
  const params = await context.params
  return handleApiRequest('post', request, params)
}

// PUT 요청 처리
export async function PUT(request: NextRequest, context: { params: { path: string[] } }) {
  const params = await context.params
  return handleApiRequest('put', request, params)
}

// PATCH 요청 처리
export async function PATCH(request: NextRequest, context: { params: { path: string[] } }) {
  const params = await context.params
  return handleApiRequest('patch', request, params)
}

// DELETE 요청 처리
export async function DELETE(request: NextRequest, context: { params: { path: string[] } }) {
  const params = await context.params
  return handleApiRequest('delete', request, params)
}

// API 응답 인터페이스
interface ApiResponseData<T = unknown> {
  data: T
  [key: string]: unknown
}

// API 에러 인터페이스
interface ApiErrorResponse {
  error: string
  status?: number
  details?: unknown
}

// API 요청 처리 공통 함수
async function handleApiRequest(
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  request: NextRequest,
  params: { path: string[] },
): Promise<NextResponse<ApiResponseData<unknown> | ApiErrorResponse>> {
  console.log('--------------------------------')

  try {
    // API 엔드포인트 경로 생성
    const path = params.path.join('/')

    // 요청 쿠키 헤더 가져오기
    const cookieHeader = request.headers.get('cookie') || ''

    // URL 검색 파라미터 처리
    const searchParams = new URL(request.url).searchParams.toString()
    const endpoint = searchParams ? `${path}?${searchParams}` : path

    // API 클라이언트 생성
    const apiClient = createCustomHttpClient(API_SERVER_URL, {
      headers: {
        Cookie: cookieHeader,
      },
    })

    // 요청 데이터 및 설정 준비
    const response = await (async () => {
      // HTTP 메소드별 요청 처리
      if (method === 'get' || method === 'delete') {
        return await apiClient[method]<ApiResponseData<unknown>>(endpoint)
      } else {
        // POST, PUT, PATCH 요청은 본문 데이터가 필요함
        const body = await request.json().catch(() => ({}))
        return await apiClient[method]<ApiResponseData<unknown>>(endpoint, body)
      }
    })()

    // 성공 응답 반환
    return NextResponse.json(response.data)
  } catch (error) {
    // 에러 타입 안전하게 처리
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다'
    const statusCode =
      error &&
      typeof error === 'object' &&
      'response' in error &&
      error.response &&
      typeof error.response === 'object' &&
      'status' in error.response
        ? Number(error.response.status)
        : 500

    // 에러 로그
    console.error(`API 라우트 에러 (${method} ${params.path.join('/')}):`, errorMessage)

    // 에러 응답 반환
    return NextResponse.json({ error: errorMessage }, { status: statusCode })
  }
}
