'use client'
import Image from 'next/image'
import { useState } from 'react'

export const ProductMainImage = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState(images[0])

  const handleThumbnailClick = (img: string) => {
    setSelectedImage(img)
  }

  return (
    <div className="flex flex-col gap-2 w-[42%]">
      <div className="border-[1px] rounded-2xl  relative overflow-hidden  h-[400px] w-full border-assistive">
        <Image
          src={selectedImage}
          alt="상품 메인 이미지"
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-xl"
        />
      </div>

      <div className="flex flex-row gap-2 overflow-x-auto py-2">
        {images.map((img, index) => (
          <div
            className={`border w-[80px] h-[80px] border-assistive rounded-[8px] relative overflow-hidden cursor-pointer ${
              selectedImage === img ? 'border-2 border-blue-500' : ''
            }`}
            key={img + index}
            onClick={() => handleThumbnailClick(img)}
          >
            <Image
              src={img}
              alt={`상품 이미지 ${index + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-[8px]"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
