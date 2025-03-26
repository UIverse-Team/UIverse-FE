'use client'
import { productScrollLocationStore } from '@/stores/productScrollLocationStrore'
import { useEffect } from 'react'

export const ProductTabs = ({ reviewCount }: { reviewCount: number }) => {
  const { scroll, setScroll } = productScrollLocationStore()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const scrollToSection = (id: 'description' | 'review' | 'chat') => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setScroll(id)
    }
  }

  return (
    <>
      <div className="h-[58px] flex-1">
        <div
          className={`typo-body3 p-4 flex items-center justify-center rounded-tl-md rounded-bl-md cursor-pointer ${
            scroll === 'description' ? 'bg-secondary text-white' : 'bg-white text-alternative'
          }`}
          onClick={() => scrollToSection('description')}
        >
          상품설명
        </div>
      </div>
      <div className="h-[58px] flex-1">
        <div
          className={`typo-body3 p-4 flex items-center justify-center cursor-pointer ${
            scroll === 'review' ? 'bg-secondary text-white' : 'bg-white text-alternative gap-1'
          }`}
          onClick={() => scrollToSection('review')}
        >
          리뷰
          <span className="">{reviewCount}</span>
        </div>
      </div>
      <div className="h-[58px]  flex-1">
        <div
          className={`typo-body3 p-4 flex items-center justify-center rounded-tr-md rounded-br-md cursor-pointer ${
            scroll === 'chat' ? 'bg-secondary text-white' : 'bg-white text-alternative'
          }`}
          onClick={() => scrollToSection('chat')}
        >
          챗봇 문의하기
        </div>
      </div>
    </>
  )
}
