import { apiPost } from '@/libs/axios/apiMethods'
import { createEndpoint } from '@/libs/axios/endPoints'

/**
 * 서버에 여러 파일을 병렬로 업로드
 * @param files 업로드할 파일 정보 배열 (파일, 타입, 용도)
 * @returns 업로드된 파일 URL 배열 (업로드 실패 시 null 포함)
 */
export const uploadFiles = async (
  files: File[],
  type: string = 'image',
  usage: string,
): Promise<(string | null)[]> => {
  const endpoint = createEndpoint('/uploadFile')

  try {
    // 각 파일마다 Promise를 생성하여 병렬 처리
    const uploadPromises = files.map(async (file) => {
      try {
        // FormData 생성
        const formData = new FormData()
        formData.append('file', file)
        formData.append('type', type)
        formData.append('usage', usage)

        // API 요청 시 FormData 사용
        const response = await apiPost<string, FormData>(endpoint, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        return response.data
      } catch (error) {
        console.error(
          `파일 '${file.name}' 업로드 실패:`,
          error instanceof Error ? error.message : '알 수 없는 오류',
        )
        return null // 개별 파일 업로드 실패 시 null 반환
      }
    })

    // 모든 Promise가 완료될 때까지 기다림
    const results = await Promise.all(uploadPromises)
    return results
  } catch (error) {
    console.error(
      '파일 업로드 처리 중 오류 발생:',
      error instanceof Error ? error.message : '알 수 없는 오류',
    )
    return Array(files.length).fill(null) // 전체 실패 시 null 배열 반환
  }
}

/**
 * 단일 파일 업로드 (기존 함수 - 하위 호환성 유지)
 * @param file 업로드할 파일
 * @param type 미디어 타입 (기본값: 'image')
 * @param usage 사용 용도
 * @returns 업로드된 파일 URL (실패 시 null)
 */
export const uploadFile = async (
  file: File,
  type: string = 'image',
  usage: string,
): Promise<string | null> => {
  const results = await uploadFiles([file], type, usage)
  return results[0] // 첫 번째 결과 반환 (성공 시 string, 실패 시 null)
}
