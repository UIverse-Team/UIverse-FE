import Image from 'next/image'
import { type ChangeEvent, type RefObject } from 'react'
import { Label } from '@/components/common/Label/Label'
import AddImageIcon from '/public/icons/plus-circle.svg?svgr'
import DeleteImageIcon from '/public/icons/delete-circle.svg?svgr'

interface ReviewImageProps {
  images: File[]
  imageUrls: string[]
  fileInputRef: RefObject<HTMLInputElement>
  onChangeImage: (e: ChangeEvent<HTMLInputElement>) => void
  onRemoveImage: (index: number) => void
  maxLength: number
}

const ReviewImage = ({
  images,
  imageUrls,
  fileInputRef,
  onChangeImage,
  onRemoveImage,
  maxLength,
}: ReviewImageProps) => {
  return (
    <div className="p-6 flex flex-col gap-4">
      <Label className="typo-button1 flex items-center" htmlFor="reviewImages">
        사진첨부
        <span className="typo-caption1 text-assistive ml-0.5">(최대 {maxLength}장)</span>
      </Label>
      <div className="flex flex-wrap items-end gap-2">
        {/* 이미지 프리뷰 */}
        {imageUrls.map((url, index) => (
          <div key={index} className="relative size-22.5 flex items-end">
            <Image
              src={url}
              alt={`리뷰 이미지 ${index + 1}`}
              className="size-20 object-cover rounded-md border border-line"
              width={80}
              height={80}
            />
            <button
              type="button"
              onClick={() => onRemoveImage(index)}
              className="absolute top-0 right-0"
            >
              <DeleteImageIcon className="size-7" />
            </button>
          </div>
        ))}

        {/* 이미지 추가 버튼 */}
        {images.length < maxLength && (
          <Label
            htmlFor="reviewImages"
            className="flex size-20 items-center justify-center rounded-md bg-neutral border-2 border-line border-dashed cursor-pointer"
          >
            <AddImageIcon className="w-7.5 h-7.5 text-assistive" />
          </Label>
        )}

        <input
          type="file"
          id="reviewImages"
          name="images"
          accept="image/*"
          multiple
          className="hidden"
          onChange={onChangeImage}
          ref={fileInputRef}
        />
      </div>
    </div>
  )
}

export default ReviewImage
