'use client'

import React from 'react'
import Container from '@/components/layout/Container/Container'
import Link from 'next/link'
import Divider from '@/components/common/Divider/Divider'
import { ROUTES } from '@/constants/routes'
import { usePathname } from 'next/navigation'

export default function MypageMainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <Container>
      <div className="flex gap-4 items-start">
        {/* 왼쪽 메뉴 */}
        <div
          id="leftMenu"
          className="w-[200px] shrink-0 bg-white rounded-lg py-4 flex flex-col gap-2"
        >
          <div className="flex flex-col gap-2">
            <Link
              href={ROUTES.MYPAGE}
              className={`${
                pathname === ROUTES.MYPAGE ? 'text-primary' : ''
              } typo-button1 px-4 py-2`}
            >
              마이페이지 홈
            </Link>
            <div className="flex flex-col">
              <Link
                href={ROUTES.EDIT_PROFILE}
                className={`${
                  pathname === ROUTES.EDIT_PROFILE ? 'text-primary' : ''
                } typo-caption1 px-4 py-2`}
              >
                회원정보수정
              </Link>
              <Link
                href={ROUTES.CUSTOM}
                className={`${
                  pathname === ROUTES.CUSTOM ? 'text-primary' : ''
                } typo-caption1 px-4 py-2`}
              >
                맞춤정보설정
              </Link>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-2">
            <div className="typo-button1 px-4 py-2">내 주문</div>
            <div className="flex flex-col">
              <Link
                href={ROUTES.ORDERS}
                className={`${
                  pathname.startsWith(ROUTES.ORDERS) ? 'text-primary' : ''
                } typo-caption1 px-4 py-2`}
              >
                최근주문내역
              </Link>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-2">
            <div className="typo-button1 px-4 py-2">활동내역</div>
            <div className="flex flex-col">
              <Link
                href={ROUTES.RECENT}
                className={`${
                  pathname === ROUTES.RECENT ? 'text-primary' : ''
                } typo-caption1 px-4 py-2`}
              >
                최근 본 상품
              </Link>
              <Link
                href={ROUTES.WISHLIST}
                className={`${
                  pathname === ROUTES.WISHLIST ? 'text-primary' : ''
                } typo-caption1 px-4 py-2`}
              >
                찜한 상품/스토어
              </Link>
              <Link
                href={ROUTES.REVIEWS}
                className={`${
                  pathname === ROUTES.REVIEWS ? 'text-primary' : ''
                } typo-caption1 px-4 py-2`}
              >
                나의 리뷰
              </Link>
              <Link
                href={ROUTES.RESTOCK}
                className={`${
                  pathname === ROUTES.RESTOCK ? 'text-primary' : ''
                } typo-caption1 px-4 py-2`}
              >
                재입고 알림
              </Link>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-2">
            <div className="typo-button1 px-4 py-2">고객센터</div>
            <div className="flex flex-col">
              <Link
                href={ROUTES.NOTICE}
                className={`${
                  pathname === ROUTES.NOTICE ? 'text-primary' : ''
                } typo-caption1 px-4 py-2`}
              >
                공지사항
              </Link>
              <Link
                href={ROUTES.INQUIRY}
                className={`${
                  pathname === ROUTES.INQUIRY ? 'text-primary' : ''
                } typo-caption1 px-4 py-2`}
              >
                문의사항
              </Link>
              <Link
                href={ROUTES.FAQ}
                className={`${
                  pathname === ROUTES.FAQ ? 'text-primary' : ''
                } typo-caption1 px-4 py-2`}
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>
        <div id="contentWrap" className="grow">
          {children}
        </div>
      </div>
    </Container>
  )
}
