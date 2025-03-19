'use client'
import Image from 'next/image'
// import react from 'React'
import { useState } from 'react'
import Button from '../common/Button/Button'
export const ProductReadMore = ({ img }: { img: string }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      <div
        className="w-full bg-white flex flex-col mt-4 justify-center items-center"
        id="description"
      >
        <div
          className={`flex flex-col gap-4 transition-all duration-75 mt-4 ${expanded ? 'h-5000px' : 'max-h-[800px] overflow-hidden'}`}
        >
          <Image width={420} height={420} src={img} alt="상푸 메인 이미지" />
          <Image width={420} height={420} src={img} alt="상푸 메인 이미지" />
          <Image width={420} height={420} src={img} alt="상푸 메인 이미지" />
        </div>
        <Button
          className="bg-white text-stong border-strong border-[1px] rounded-none typo-button1"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? '상세설명 접기' : '상세설명 더보기'}
        </Button>
      </div>
    </div>
  )
}
