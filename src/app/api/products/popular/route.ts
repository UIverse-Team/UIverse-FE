import httpClient from '@/util/httpClient'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await httpClient.get(`${process.env.SERVER_API_V1_BASE_URL}/products/popular`)
    return NextResponse.json(response.data)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to fetch product ID' }, { status: 500 })
  }
}
