import Cart from '/public/Cart.svg'
import Card from '/public/Card.svg'
import CartCheck from '/public/CartCheck.svg'
import Checkbox from '@/components/common/Checkbox/Checkbox'
import Image from 'next/image'
import { NumbericFiled } from '@/components/common/numbericFiled/NumbericFiled'
import Close from '/public/close.svg'
import Button from '@/components/common/Button/Button'
export default function CartPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-6 bg-white h-[219px] w-full rounded-2xl items-center">
        <h1 className="typo-h2 border-b-[1px] border-alter-line w-full text-center py-6 ">
          장바구니
        </h1>
        <div className="flex gap-15 justify-center relative">
          <div className="flex flex-col gap-2 items-center after:content-[''] after:border-[1px] after:inline-flex after:w-15 after:absolute after:top-8 after:left-16 after:border-[#E5E5E5]">
            <div className="w-[64px] h-[64px] flex items-center justify-center bg-gray-950 flex-col rounded-md ">
              <Cart />
            </div>
            <span className="typo-button2">장바구니</span>
          </div>
          <div className="flex flex-col gap-2 items-center after:content-[''] after:border-[1px] after:inline-flex after:w-15 after:absolute after:top-8 after:right-16 after:border-[#E5E5E5]">
            <div className="w-[64px] h-[64px] flex items-center justify-center bg-gray-50 rounded-md">
              <Card />
            </div>
            <span className="typo-button2 text-alternative">주문결제</span>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="w-[64px] h-[64px] flex items-center justify-center bg-gray-50 rounded-md">
              <CartCheck />
            </div>
            <span className="typo-button2 text-alternative">결제 완료</span>
          </div>
        </div>
      </div>
      {/* 장바구니 리스트 아이템 */}
      <main className="flex flex-row w-full gap-6 items-center">
        <section className="flex-1 p-4 bg-white flex flex-col gap-4 rounded-2xl">
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
                  <NumbericFiled />
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
        </section>
        <section className="w-full md:w-1/5 p-4 bg-white flex rounded-2xl">
          <h2 className="text-xl font-bold mb-4">사이드 영역 (20%)</h2>
          <div className="flex flex-col gap-4">
            <div className="bg-white p-4 rounded shadow">사이드 콘텐츠 1</div>
            <div className="bg-white p-4 rounded shadow">사이드 콘텐츠 2</div>
          </div>
        </section>
      </main>
    </div>
  )
}
