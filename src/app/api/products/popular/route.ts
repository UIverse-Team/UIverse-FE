import httpClient from '@/util/httpClient'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await httpClient.get(`/products/popular`)
    console.log('api router 호출 ')
    return NextResponse.json(response.data)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to fetch product ID' }, { status: 500 })
  }
}
