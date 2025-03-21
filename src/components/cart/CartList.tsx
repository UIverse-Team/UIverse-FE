'use client'
import { NumbericField } from '@/components/common/NumbericField/NumbericField'
import Checkbox from '@/components/common/Checkbox/Checkbox'
import Image from 'next/image'
import Button from '@/components/common/Button/Button'
import Close from '/public/icons/close.svg?svgr'

export const CartList = () => {
  return (
    <section className="flex-1  flex flex-col gap-4 rounded-2xl">
      <div className="flex flex-col gap-6 p-4 bg-white rounded-2xl">
        <div className="border-b-[2px] border-alter-line h-[73px] items-center flex justify-around">
          <div>
            <Checkbox />
          </div>
          <div className="flex gap-2">상품정보</div>
          <div className="flex gap-2">수량</div>
          <div className="flex gap-2">주문 금액</div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <div>
              <Checkbox />
            </div>
            <div className="flex items-center w-full justify-around">
              <div className="flex gap-4 ">
                <div>
                  <Image
                    src={'https://shopping-phinf.pstatic.net/main_8611157/86111572769.2.jpg'}
                    width={138}
                    height={138}
                    alt="상품 이미지"
                    style={{ objectFit: 'cover' }}
                    className="rounded-xl"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="typo-caption1 text-alternative">영애네 옷장</h3>
                  <div>
                    <h1 className="line-clamp-2 overflow-hidden text-ellipsis typo-button1 w-60">
                      조르지오아르마니 아이섀도우 아이 틴트 롱래스팅 리퀴드 아이새도 아르마니 뷰티
                      색조 메이크업 화장품 6종
                    </h1>
                  </div>
                  <span className="typo-caption1 text-gray-800">05코랄 핑크 / 수량 1개</span>
                  <span className="typo-caption1">
                    무료배송{' '}
                    <span className="text-positive typo-caption1">03/18(화) 출발 예정</span>
                  </span>
                </div>
              </div>
              <div>
                <NumbericField />
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex flex-col items-end">
                  <span className="line-through typo-caption1 text-alternative">43,560원</span>
                  <h3 className="typo-h3">53,560원</h3>
                </div>
                <Button>바로구매</Button>
              </div>
            </div>
            <div className="flex">
              <Close />
            </div>
          </div>
        </div>
        <div className="flex w-[14%] gap-2  ">
          <Button className="typo-button1 bg-white border-[1px] border-gray-200 text-strong rounded-sm">
            선택상품삭제
          </Button>
          <Button className="typo-button1 bg-white border-[1px] border-gray-200 text-strong rounded-sm">
            품절상품삭제
          </Button>
        </div>
      </div>
      <div className="flex rounded-2xl p-6 bg-white flex-col gap-2">
        <h1 className="typo-3">맞춤 상품 추천</h1>
        <div className="flex gap-4 ">
          <div className="flex flex-col gap-2 w-[180px]">
            <div className="border-[1px] rounded-2xl  w-[180px] h-[180px] border-alter-line">
              <Image
                src={'https://shopping-phinf.pstatic.net/main_8611157/86111572769.2.jpg'}
                alt="상품 메인 이미지"
                style={{ objectFit: 'cover' }}
                className="rounded-xl"
                width={180}
                height={180}
              />
            </div>
            <div>
              <h3 className="typo-caption1">조르지오아르마니</h3>
            </div>
            <div>
              <span className="typo-button2 overflow-hidden text-ellipsis w-full line-clamp-2">
                조르지오아르마니 아이섀도우 아이 틴트 롱래스팅 리퀴드 아이새도 아르마니 뷰티 색조
                메이크업 화장품 6종
              </span>
            </div>
            <div className="flex gap-2">
              <h3 className="typo-h3 text-sale">49%</h3>
              <h3 className="typo-h3">13,560원</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
