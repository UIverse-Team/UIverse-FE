import logHttpClient from '@/util/logHttpClient'

// 페이지 방문 로그
export const addPageViewLog = async (addPageViewParams: { pageUrl: string; visitTime: string }) => {
  try {
    const response = await logHttpClient.post(`/page`, addPageViewParams)

    return response.data
  } catch (error) {
    console.warn('Failed to add page view logs:', error)
  }
}

export const updatePageViewLog = async (
  logId: number,
  updatePageViewParams: {
    leaveTime: string
    durationSeconds: number
  },
) => {
  try {
    console.log(5555)

    const response = await logHttpClient.patch(`/page/${logId}/end`, updatePageViewParams)
    console.log('66666', response)
    return response.data
  } catch (error) {
    console.warn('Failed to update page view logs:', error)
  }
}
