'use client'

import Divider from '@/components/common/Divider/Divider'
import Link from 'next/link'

export default function Mypage() {
  return (
    <>
      <div className="flex gap-4 items-start">
        <div id="leftMenu" className="w-[200px] bg-white rounded-lg py-4 flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <Link href={`#`} className="text-primary typo-button1 px-4 py-2">
              마이페이지 홈
            </Link>
            <div className="flex flex-col">
              <Link href={`#`} className="typo-caption1 px-4 py-2">
                회원정보수정
              </Link>
              <Link href={`#`} className="typo-caption1 px-4 py-2">
                맞춤정보설정
              </Link>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-2">
            <div className="typo-button1 px-4 py-2">내 주문</div>
            <div className="flex flex-col">
              <Link href={`#`} className="typo-caption1 px-4 py-2">
                최근주문내역
              </Link>
              <Link href={`#`} className="typo-caption1 px-4 py-2">
                취소/교환/반품내역
              </Link>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-2">
            <div className="typo-button1 px-4 py-2">활동내역</div>
            <div className="flex flex-col">
              <Link href={`#`} className="typo-caption1 px-4 py-2">
                최근 본 상품
              </Link>
              <Link href={`#`} className="typo-caption1 px-4 py-2">
                찜한 상품/스토어
              </Link>
              <Link href={`#`} className="typo-caption1 px-4 py-2">
                나의 리뷰
              </Link>
              <Link href={`#`} className="typo-caption1 px-4 py-2">
                재입고 알림
              </Link>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-2">
            <div className="typo-button1 px-4 py-2">고객센터</div>
            <div className="flex flex-col">
              <Link href={`#`} className="typo-caption1 px-4 py-2">
                공지사항
              </Link>
              <Link href={`#`} className="typo-caption1 px-4 py-2">
                문의사항
              </Link>
              <Link href={`#`} className="typo-caption1 px-4 py-2">
                상품 Q&A 내역
              </Link>
              <Link href={`#`} className="typo-caption1 px-4 py-2">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
