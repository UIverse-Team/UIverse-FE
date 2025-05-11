import logHttpClient from '@/util/logHttpClient'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ logId: string }> },
) {
  try {
    const { logId } = await params

    if (!logId) {
      return NextResponse.json({ error: 'logId is required' }, { status: 400 })
    }

    const reqParams = await request.json()

    await logHttpClient.patch(`/page/${logId}/end`, reqParams)

    return NextResponse.json({ logId: logId, success: true })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to process the logId' }, { status: 500 })
  }
}
