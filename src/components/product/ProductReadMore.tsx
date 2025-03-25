'use client'
import Image from 'next/image'
import { useState } from 'react'
import Button from '../common/Button/Button'
export const ProductReadMore = ({ img }: { img: string }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      <div className="w-full bg-white flex flex-col justify-center items-center " id="description">
        <div
          className={`flex flex-col gap-4 transition-all duration-75 ${expanded ? 'h-5000px' : 'max-h-[800px] overflow-hidden'}`}
        >
          <Image width={420} height={420} src={img} alt="상푸 메인 이미지" />
        </div>
        <Button
          className="rounded-none"
          size="md"
          variant={'outline'}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? '상세설명 접기' : '상세설명 더보기'}
        </Button>
      </div>
    </div>
  )
}
