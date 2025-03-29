import logHttpClient from '@/util/logHttpClient'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ logId: string }> },
): Promise<NextResponse | undefined> {
  try {
    const reqParams = await request.json()
    console.log('reqParams :', reqParams)

    const { logId } = await params

    if (!logId) {
      return NextResponse.json({ error: 'logId is required' }, { status: 400 })
    }

    console.log(33333)

    await logHttpClient.patch(`/page/${logId}/end`, reqParams)

    console.log(44444)

    return NextResponse.json({ logId: reqParams.logId, success: true })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to process the logId' }, { status: 500 })
  }
}
