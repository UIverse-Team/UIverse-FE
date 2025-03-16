import React from 'react'
import Wishlist from '../../../../public/Wishlist.svg'
import Add from '../../../../public/Add.svg'
import Minus from '../../../../public/Minus.svg'
import Share from '../../../../public/share.svg'
import Like from '../../../../public/Like.svg'
import Button from '@/components/common/Button/Button'
// import Pagination from '@/components/common/pagination/Pagination'

const page = () => {
  return (
    <div>
      <div className=" flex flex-col h-[744px] p-8 gap-10">
        <div className="flex">
          <div className="w-[420px] flex h-[420px] ml-4 ">
            <div className="border-2 rounded-2xl w-[93%]">img</div>
          </div>
          <div className="flex flex-1 flex-col gap-8">
            <div className="flex flex-col gap-[15px] border-b-2 pb-4">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="typo-body2">조르지오아르마니 뷰티</h3>
                  <h1 className="typo-h3 ">
                    아이섀도우 아이 틴트 롱래스팅 리퀴드 아이새도 아르마니 뷰티 색조 메이크업 화장
                    6종
                  </h1>
                </div>
                <div className="w-[54px] h-[54px] border-2 rounded-full  items-center justify-center border-gray-100 flex ">
                  <Share />
                </div>
              </div>

              <div className="flex gap-2">
                <div>평점</div>
                <span className="typo-body2">2.183건</span>
              </div>
            </div>
            <div className="border-b-2 pb-4">
              <div className="flex gap-4 items-center">
                <span className="text-alternative text-body2 decoration-1 decoration-solid decoration-alter-line">
                  판매가
                </span>
                <span className="text-alternative text-body1">46,241원</span>
              </div>
              <div className="flex gap-4 items-center">
                <span className="text-alternative text-body2">할인가</span>
                <div>
                  <span className="text-sale typo-h1">49%</span>
                  <span className="typo-h1">13,560원</span>
                </div>
              </div>
            </div>
            <div className="border-b-2 pb-4">
              <div className="flex gap-4">
                <span className="text-alternative typo-body2">배송비</span>
                <div className="flex flex-col gap-2">
                  <span className="typo-body1">무료배송</span>
                  <span className="text-strong typo-caption1">
                    평균 배송기간 <span className="typo-caption1 text-positive">2일 이내</span>{' '}
                    (영업일 기준)
                  </span>
                </div>
              </div>
            </div>
            <div className="border-b-2 pb-4">
              <div className="flex gap-4 items-center">
                <span className="typo-caption1 text-alternative">수량</span>

                <div className="flex items-center border-assistive bg-white border-2 rounded-[4px]">
                  {' '}
                  <Button className="bg-white  h-[38px]">
                    <Minus />
                  </Button>
                  <span>1</span>
                  <Button className="bg-white  h-[38px]">
                    <Add />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 ">
              <div className="flex w-full justify-between">
                <span className="typo-h3">총 금액</span>
                <div className="flex gap-2">
                  <span className="typo-body3 text-alternative">총 수량 1개</span>|
                  <span className="text-sale typo-h1">13,560원</span>
                </div>
              </div>
              <div className="flex gap-2 w-full ">
                <div className="w-[54px] h-[54px] border-2 rounded-xl flex items-center justify-center border-gray-100">
                  <Wishlist />
                </div>
                <Button className="bg-white typo-h3 text-strong border-[1px] border-secondary max-w-[240px]">
                  장바구니
                </Button>
                <Button className="typo-h3 max-w-[240px]">바로구매</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full ">
        <div className="h-[58px] flex-1">
          <Button className="bg-white text-alternative typo-body3 rounded-br-none rounded-tr-none">
            상품설명
          </Button>
        </div>
        <div className="h-[58px] flex-1">
          <Button className="bg-white text-alternative typo-body3 rounded-none">리뷰</Button>
        </div>
        <div className="h-[58px]  flex-1">
          <Button className="bg-white text-alternative typo-body3 rounded-tl-none rounded-bl-none">
            챗봇 문의하기
          </Button>
        </div>
      </div>
      <div className="w-full h-[800px] bg-assist-line flex flex-col justify-end mt-4">
        img
        <Button className="bg-white text-stong border-strong border-[1px] rounded-none typo-button1">
          상세설명 더보기
        </Button>
      </div>
      <div className="flex flex-col gap-4   p-8">
        <div className="flex justify-between w-full ">
          <div className="flex items-center gap-2">
            <h2 className="typo-h2 text-strong">리뷰</h2>
            <span className="typo-body2 text-strong">(2,813건)</span>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="typo-h3">최고예요!</h3>
            <h3 className="typo-h3">4.0</h3>
            <h3>평점</h3>
          </div>
        </div>
        <div className="flex gap-4 w-full flex-col ">
          <div className="flex flex-col border-b-[1px] border-alter-line pb-4 gap-4">
            <div className="w-[138px] h-[138px] bg-gray-50 rounded-[8px] object-fill">이미지</div>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="typo-button1 text-alternative">추천키워드</span>
                <ul className="flex gap-2 items-center">
                  <li className="border-[1px] border-alter-line rounded-[50px] px-4 py-2 typo-body3 text-assistive cursor-pointer ">
                    커버력
                  </li>
                  <li className="border-[1px] border-alter-line rounded-[50px] px-4 py-2 typo-body3 text-assistive ">
                    건성
                  </li>
                  <li className="border-[1px] border-alter-line rounded-[50px] px-4 py-2 typo-body3 text-assistive ">
                    지속력
                  </li>
                </ul>
              </div>
              <div className="flex gap-2 items-center ">
                <span className="text-strong typo-button1 cursor-pointer">유용한순</span>
                <span className="text-alternative typo-body3 cursor-pointer">최신순</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="border-b-[1px] pb-4 flex flex-col gap-2 border-alter-line">
              <div className="flex items-center gap-2">
                <h3>평점</h3>
                <h3 className="typo-button1 text-strong">정말좋아요</h3>
              </div>
              <div className="text-assistive typo-caption1">
                <span>han****</span> | <span>2025.02.24</span>
              </div>
              <div className="text-assistive typo-caption1">
                <span>옵션: lg</span>
              </div>
              <div className="typo-body text-alternative">
                <p>
                  항상 쓰고 있는 제품입니다 ! 커버력도 좋고 상아빛 피부 표현에 저격이에요 진짜
                  추천임
                </p>
              </div>
              <div>
                <Button className="w-[48px] h-[36px] bg-white border-[1px] border-alter-line flex gap-2 items-center">
                  <Like fill="blue" />
                  <span className="text-alternative typo-button2">11</span>
                </Button>
              </div>
            </div>
            <div>
              <div>페이지네이션</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex gap-2">
            <h3 className="typo-h2 text-strong">챗복 문의하기</h3>
            <span className="px-2 text-white bg-primary rounded-[2px] typo-caption2 flex items-center">
              AI 추천
            </span>
          </div>
          <div>챗봇</div>
        </div>
      </div>
    </div>
  )
}

export default page
