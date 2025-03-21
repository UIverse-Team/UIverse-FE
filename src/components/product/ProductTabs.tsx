'use client'
import { useEffect, useState } from 'react'
import Button from '../common/Button/Button'

export const ProductTabs = () => {
  const [selectedTab, setSelectedTab] = useState('description')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setSelectedTab(id)
    }
  }

  return (
    <>
      <div className="h-[58px] flex-1">
        <Button
          className={`typo-body3 rounded-br-none rounded-tr-none ${
            selectedTab === 'description' ? 'bg-secondary text-white' : 'bg-white text-alternative'
          }`}
          onClick={() => scrollToSection('description')}
        >
          상품설명
        </Button>
      </div>
      <div className="h-[58px] flex-1">
        <Button
          className={`typo-body3 rounded-none ${
            selectedTab === 'review' ? 'bg-secondary text-white' : 'bg-white text-alternative'
          }`}
          onClick={() => scrollToSection('review')}
        >
          리뷰
        </Button>
      </div>
      <div className="h-[58px]  flex-1">
        <Button
          className={`typo-body3 rounded-tl-none rounded-bl-none ${
            selectedTab === 'chat' ? 'bg-secondary text-white' : 'bg-white text-alternative'
          }`}
          onClick={() => scrollToSection('chat')}
        >
          챗봇 문의하기
        </Button>
      </div>
    </>
  )
}
