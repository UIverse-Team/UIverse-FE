import HttpClient from '@/util/httpClient'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const data = await HttpClient.post(`/numberCertification/send`, {
    request,
  })

  return NextResponse.json({
    data,
  })
}
