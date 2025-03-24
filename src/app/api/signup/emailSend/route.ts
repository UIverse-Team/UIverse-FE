import HttpClient from '@/util/httpClient'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const data = await HttpClient.post(`/emailCertification/signup/send`, {
    request,
  })

  return NextResponse.json({
    data,
  })
}
