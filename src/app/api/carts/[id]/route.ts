import { NextResponse } from 'next/server'

export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const ids = body.cartIdList

    return NextResponse.json(
      {
        message: `Cart items ${ids.join(', ')} deleted successfully`,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Failed to delete cart items:', error)
    return NextResponse.json(
      {
        error: 'Failed to delete cart items',
      },
      { status: 500 },
    )
  }
}
