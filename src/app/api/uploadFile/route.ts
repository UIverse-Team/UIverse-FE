import { NextRequest, NextResponse } from 'next/server'
import { createServerHttpClient } from '@/libs/axios/serverClient'

/**
 * 파일 업로드 API 핸들러 - 백엔드 서버로 요청 전달
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // 서버 HTTP 클라이언트 생성
    const serverClient = await createServerHttpClient()

    const response = await serverClient.post(`/file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return NextResponse.json(response.data, { status: response.status })
  } catch (error) {
    console.error('파일 업로드 중 오류 발생:', error)

    // 네트워크 오류 등 기타 오류
    return NextResponse.json({ error: '파일 업로드 처리 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
