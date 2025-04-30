import { useState, useRef, ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { uploadFiles } from '@/services/fileService'
import { addReview } from '@/services/reviewService'
import { ROUTES } from '@/constants/routes'
import type { ReviewFormData, ReviewFormValues } from '@/types/review/reviewType'

/**
 * 리뷰 폼 관련 상태와 함수를 관리하는 커스텀 훅
 */
const useReviewForm = (
  orderDetailId: number,
  onSubmitCallback?: (data: ReviewFormData) => void,
) => {
  // 상수 정의
  const MAX_CONTENT_LENGTH = 500
  const MAX_IMAGES = 5
  const MAX_FILE_SIZE_MB = 5
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024 // 5MB in bytes

  // 이미지 상태 관리
  const [images, setImages] = useState<File[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 모달 상태 관리 (이미지 최대 개수 초과와 기타 오류에만 사용)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState({
    title: '',
    content: '',
  })

  const router = useRouter()

  // React Hook Form 설정
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ReviewFormValues>({
    defaultValues: {
      orderDetailId,
      content: '',
      tag: '',
      rating: 0,
    },
    mode: 'onChange', // 값이 변경될 때마다 유효성 검사
  })

  // 현재 값 관찰
  const rating = watch('rating')
  const content = watch('content')
  const tag = watch('tag')

  // 폼 유효성 상태 계산
  const isFormValid = rating > 0 && !!content?.trim() && tag

  /**
   * 이미지 추가 처리
   */
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    // 최대 이미지 수 확인
    const remainingSlots = MAX_IMAGES - images.length
    if (remainingSlots <= 0) {
      showErrorModal(
        '최대 첨부 개수를 초과했어요',
        `사진은 최대 ${MAX_IMAGES}장까지만 첨부할 수 있어요`,
      )
      return
    }

    // 이미지 파일 처리
    addNewImages(files, remainingSlots)

    // 파일 입력 초기화
    resetFileInput()
  }

  /**
   * 새 이미지 파일 추가
   */
  const addNewImages = (files: FileList, maxCount: number) => {
    const newFiles: File[] = []
    const newUrls: string[] = []
    for (let i = 0; i < Math.min(files.length, maxCount); i++) {
      const file = files[i]
      if (!file.type.startsWith('image/')) continue

      // 파일 크기 체크 추가
      if (!checkFileMaxSize(file)) continue

      newFiles.push(file)
      newUrls.push(URL.createObjectURL(file))
    }
    setImages([...images, ...newFiles])
    setImageUrls([...imageUrls, ...newUrls])
  }

  /**
   * 파일 용량 제한 체크
   */
  const checkFileMaxSize = (file: File) => {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      // 파일 크기 초과 모달 표시
      showErrorModal(
        '파일 크기 제한 초과',
        `'${file.name}' 파일이 ${MAX_FILE_SIZE_MB}MB를 초과합니다. ${MAX_FILE_SIZE_MB}MB 이하의 파일만 업로드 가능합니다.`,
      )
      return false
    }
    return true
  }

  /**
   * 파일 입력 초기화
   */
  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  /**
   * 이미지 삭제 처리
   */
  const handleRemoveImage = (index: number) => {
    const newImages = [...images]
    const newImageUrls = [...imageUrls]

    // URL 객체 해제 (메모리 누수 방지)
    URL.revokeObjectURL(newImageUrls[index])

    newImages.splice(index, 1)
    newImageUrls.splice(index, 1)

    setImages(newImages)
    setImageUrls(newImageUrls)
  }

  /**
   * 에러 모달 표시
   */
  const showErrorModal = (title: string, content: string) => {
    setModalContent({ title, content })
    setIsModalOpen(true)
  }

  /**
   * 필수 입력 항목 유효성 검사
   */
  const validateRequiredReview = () => {
    const requiredTitle = '필수 입력 내용을 입력해주세요 🙌'
    if (rating === 0) {
      showErrorModal(requiredTitle, `별점을 남겨주시면 도움이 돼요.`)
      return false
    }

    if (tag === '') {
      showErrorModal(requiredTitle, `추천여부를 선택해주시면 도움이 돼요.`)
      return false
    }

    if (errors.content?.type === 'required' || (content && content?.trim() === '')) {
      showErrorModal(requiredTitle, `짧은 한줄이라도 내용을 남겨주시면 도움이 돼요.`)
      return false
    }

    return true
  }

  /**
   * 폼 제출 처리
   */
  const onSubmit = async (data: ReviewFormValues) => {
    try {
      if (!validateRequiredReview()) return

      let submitData = { ...data }

      // 커스텀 콜백이 있는 경우 실행
      if (onSubmitCallback) {
        onSubmitCallback({ ...submitData, images })
        return
      }

      console.log('리뷰 제출 시작:', data)

      // 이미지가 있는 경우 이미지 업로드 먼저 수행
      if (images.length > 0) {
        // 이미지 업로드 수행
        const uploadImgUrls = await uploadFiles(images, 'image', 'review')

        // 이미지 업로드 실패 확인
        if (uploadImgUrls.includes(null)) {
          showErrorModal(
            '이미지 업로드 실패',
            '일부 이미지 업로드에 실패했습니다. 다시 시도해주세요.',
          )
          return
        }

        // 성공적으로 업로드된 이미지 URL을 submitData에 추가
        submitData = {
          ...data,
          images: uploadImgUrls,
        } as ReviewFormData
      }

      // 리뷰 등록 API 호출
      const reviewId = await addReview(submitData)

      // console.log('리뷰 등록 완료:', reviewId)
      // 성공 처리 로직 (예: 성공 메시지 표시, 페이지 이동 등)
      router.push(`${ROUTES.REVIEW_COMPLETE}?reviewId=${reviewId}&orderDetailId=${orderDetailId}`)
    } catch (error) {
      console.error('리뷰 등록 오류: ', error)
      showErrorModal('오류가 발생했습니다', '잠시 후 다시 시도해주세요.')
    }
  }

  return {
    control,
    errors,
    handleSubmit: handleSubmit(onSubmit),
    setValue,
    watch,
    images,
    imageUrls,
    fileInputRef,
    handleImageChange,
    handleRemoveImage,
    MAX_CONTENT_LENGTH,
    MAX_IMAGES,
    isModalOpen,
    setIsModalOpen,
    modalContent,
    isFormValid,
    rating,
    content,
    tag,
  }
}

export default useReviewForm
