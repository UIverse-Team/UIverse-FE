import React from 'react'
import Container from '@/components/layout/Container/Container'
import Divider from '@/components/common/Divider/Divider'
import Checkbox from '@/components/common/Checkbox/Checkbox'
import { Label } from '@/components/common/Label/Label'

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <div className="flex gap-4 items-start">
        {/* 왼쪽 메뉴 */}
        <div
          id="leftMenu"
          className="w-[200px] shrink-0 bg-white rounded-lg pt-2 pb-4 flex flex-col gap-2"
        >
          <div className="flex flex-col gap-2">
            <p className="typo-button1 p-4">필터검색</p>

            <div className="flex flex-col gap-4 px-4 pt-4 pb-2">
              <div className="flex items-center gap-2">
                <Checkbox id="isFreeDelivery" />
                <Label htmlFor="isFreeDelivery" className="typo-caption1 text-alternative">
                  무료배송
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="isSpecialPrice" />
                <Label htmlFor="isSpecialPrice" className="typo-caption1 text-alternative">
                  특가상품
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="isHighRatings" />
                <Label htmlFor="isHighRatings" className="typo-caption1 text-alternative">
                  평점 4.8 이상
                </Label>
              </div>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between p-4">
              <span className="typo-button1">카테고리</span>
            </div>

            <div className="flex flex-col">
              <p className="typo-button1 px-4 py-2">최근주문내역</p>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-2">
            <div className="typo-button1 px-4 py-2">활동내역</div>
            <div className="flex flex-col">
              <p className="typo-button1 px-4 py-2">최근 본 상품</p>
              <p className="typo-button1 px-4 py-2">찜한 상품/스토어</p>
              <p className="typo-button1 px-4 py-2">나의 리뷰</p>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-2">
            <div className="typo-button1 px-4 py-2">고객센터</div>
            <div className="flex flex-col">
              <p className="typo-button1 px-4 py-2">공지사항</p>
              <p className="typo-button1 px-4 py-2">문의사항</p>
            </div>
          </div>
        </div>
        <div id="contentWrap" className="grow">
          <Container type="mypage">{children}</Container>
        </div>
      </div>
    </Container>
  )
}
