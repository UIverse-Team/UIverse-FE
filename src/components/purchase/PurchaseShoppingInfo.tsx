'use client'
import { useAuthStore } from '@/stores/user'
import Button from '../common/Button/Button'
import Checkbox from '../common/Checkbox/Checkbox'
import Tag from '../common/Tag/Tag'
import { Input } from '../common/Input/Input'
import React, { useCallback, useEffect } from 'react'
import { Address } from '../address/Address'
import { formatPhoneNumber } from '@/util/formatPhoneNumber'
import { sendPhoneAuthCode, verifyPhoneAuthCode } from '@/serverActions/auth/phoneVerify/actions'
import { toast } from '../common/Toast/Toast'
import { PurchasePageData } from '@/types/purchase/purchaseType'

export interface PurchaseShoppingInfoProps {
  purchasepageData: PurchasePageData
  setPurchasepageData: React.Dispatch<React.SetStateAction<PurchasePageData>>
}

function GuestPurchaseShoppingInfo({
  purchasepageData,
  setPurchasepageData,
}: PurchaseShoppingInfoProps) {
  const { handleClick, userFullAddress, userZoneCode } = Address()

  const handleUerDetailAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPurchasepageData((prev) => ({
      ...prev,
      userDetailAddress: e.target.value,
    }))
  }

  useEffect(() => {
    if (userFullAddress || userZoneCode) {
      setPurchasepageData((prev) => ({
        ...prev,
        address: userFullAddress,
        code: userZoneCode || prev.userZoneCode,
      }))
    }
  }, [userFullAddress, userZoneCode, setPurchasepageData])

  const handleUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setPurchasepageData((prev) => ({
      ...prev,
      [name]: name === 'phone' ? formatPhoneNumber(value) : value, // 전화번호만 포맷 적용
    }))
  }

  // 휴대폰 인증번호 요청
  const handleClickSendCodeBtn = useCallback(async () => {
    const isValid = purchasepageData.phone

    if (isValid) {
      const cleanedPhone = purchasepageData.phone.replace(/[^0-9]/g, '')
      const response = await sendPhoneAuthCode(cleanedPhone)
      if (response.success) {
        setPurchasepageData((prev) => ({
          ...prev,
          isTimerOn: true,
          buttonMessage: '인증번호 재전송',
        }))
      } else {
        toast({
          type: 'error',
          content: response.message ? response.message : '에러가 발생했습니다.',
        })
      }
    }
  }, [purchasepageData.phone, setPurchasepageData])

  // 인증 시간 만료 핸들러
  const handleTimerExpired = () => {
    setPurchasepageData((prev) => ({
      ...prev,
      isTimerOn: false,
    }))
    toast({
      type: 'error',
      content: '입력 시간이 지났어요. 재전송 버튼을 눌러주세요.',
    })
  }

  // 제한시간 내 인증번호 6자리 입력마다 확인
  useEffect(() => {
    const verifyCodeAutomatically = async () => {
      if (purchasepageData.code.length === 6 && purchasepageData.isTimerOn) {
        const response = await verifyPhoneAuthCode(purchasepageData.code)
        if (response.success) {
          setPurchasepageData((prev) => ({
            ...prev,
            isTimerOn: false,
          }))
          toast({
            type: 'success',
            content: '인증이 성공 했습니다.',
          })
        } else {
          toast({
            type: 'error',
            content: response.message ? response.message : '에러가 발생했습니다.',
          })
        }
      }
    }

    verifyCodeAutomatically()
  }, [
    purchasepageData.code,
    purchasepageData.isTimerOn,
    purchasepageData.phone,
    setPurchasepageData,
  ])

  const handleUserInfoSave = () => {
    setPurchasepageData((prev) => ({
      ...prev,
      checked: !prev.checked,
      deliveryName: prev.name,
      deliveryPhone: prev.phone,
    }))
  }

  const handleDeliveryData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setPurchasepageData((prev) => ({
      ...prev,
      [name]: name === 'deliveryPhone' ? formatPhoneNumber(value) : value,
    }))
  }

  return (
    <>
      <div className="bg-white flex flex-col rounded-2xl basis-full ">
        <div className="flex flex-col">
          <div className="p-6 border-b-[1px] border-alter-line">주문자 정보</div>
          <div className=" flex flex-col gap-4 p-6 ">
            <div className="flex items-center gap-4 ">
              <span className="w-[80px]">성함</span>
              <Input
                placeholder="주문하는 사람의 이름을 적어주세요"
                className="flex-1"
                name="name"
                onChange={handleUserData}
                defaultValue={purchasepageData.name}
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="w-[80px]">휴대폰번호</span>
              <Input
                placeholder="010-0000-0000"
                className="flex-1"
                name="phone"
                onChange={handleUserData}
                value={purchasepageData.phone}
                maxLength={13}
              />
              <Button
                variant={'secondary'}
                size={'sm'}
                className="w-fit px-4 h-full"
                disabled={purchasepageData.phone.length == 13 ? false : true}
                onClick={handleClickSendCodeBtn}
              >
                {purchasepageData.buttonMessage}
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-[80px]"> 인증 코드</span>
              <Input
                placeholder="인증 코드 6자리를 만들어 주세요."
                className="flex-1"
                disabled={purchasepageData.phone.length == 13 ? false : true}
                onTimerExpired={handleTimerExpired}
                defaultValue={purchasepageData.code}
                showTimer={purchasepageData.isTimerOn}
                onChange={handleUserData}
                name="code"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white flex flex-col rounded-2xl basis-full ">
        <div className="flex flex-col">
          <div className="p-6 border-b-[1px] border-alter-line">배송지</div>
          <div className=" flex flex-col gap-4 p-6 ">
            <div className="flex items-center gap-4 ">
              <span className="w-[80px]">배송지</span>
              <Checkbox
                size={'lg'}
                onClick={handleUserInfoSave}
                checked={purchasepageData.checked}
              />
              <span>주문자와 동일</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-[80px]">수령인</span>
              <Input
                placeholder="받는 사람의 이름을 적어주세요."
                className="flex-1"
                value={
                  purchasepageData.checked ? purchasepageData.name : purchasepageData.deliveryName
                }
                onChange={handleDeliveryData}
                name="deliveryName"
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="w-[80px]">휴대폰 번호</span>
              <Input
                placeholder="010-0000-0000"
                className="flex-1"
                name="deliveryPhone"
                value={
                  purchasepageData.checked ? purchasepageData.phone : purchasepageData.deliveryPhone
                }
                onChange={handleDeliveryData}
              />
            </div>
            <div className="flex gap-4 flex-col">
              <div className="flex justify-between items-center gap-4">
                <span className="w-[80px]">배송지</span>
                <Input
                  placeholder="우편번호"
                  className="flex-1"
                  defaultValue={userZoneCode}
                  disabled
                />
                <Button
                  variant={'tertiary'}
                  size={'sm'}
                  className="w-fit px-4 h-full"
                  onClick={handleClick}
                >
                  우편번호 검색
                </Button>
              </div>
              <div className="flex justify-between  items-center gap-4">
                <span className="w-[80px]"></span>
                <Input
                  placeholder="주소를 검색하세요"
                  className="flex-1"
                  defaultValue={userFullAddress}
                />
              </div>
              <div className="flex justify-between  items-center gap-4">
                <span className="w-[80px]"></span>
                <Input
                  placeholder="상세주소를 입력해주세요."
                  className="flex-1"
                  defaultValue={purchasepageData.userDetailAddress}
                  onChange={handleUerDetailAddress}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function UserPurchaseShoppingInfo() {
  return (
    <div className="bg-white flex flex-col rounded-2xl basis-full ">
      <div className="flex flex-col">
        <div className="p-6 border-b-[1px] border-alter-line">배송지</div>
        <div className="p-6 flex-col flex gap-4">
          <div className="flex  gap-6 justify-between">
            <div className="flex flex-col flex-1">
              <div className=" flex gap-2.5 items-center">
                <span>한은서</span>
                <Tag variant={'tertiary'} size={'md'}>
                  기본배송지
                </Tag>
              </div>
              <div className="flex flex-col">
                <span>010-2323-4545</span>
                <span>[58332] 서울시 강남구 강남대로 13길 2 (소나빌딩) 403호</span>
              </div>
            </div>
            <div>
              <Button variant={'outline'} size={'md'}>
                변경
              </Button>
            </div>
          </div>
          <div className="px-6">
            <select></select>
          </div>
          <div className="flex gap-2">
            <Checkbox size={'lg'} />
            <div>다음에도 사용할게요</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const PurchaseShoppingInfo = ({
  purchasepageData,
  setPurchasepageData,
}: PurchaseShoppingInfoProps) => {
  const { isLoggedIn } = useAuthStore()
  return isLoggedIn ? (
    <UserPurchaseShoppingInfo />
  ) : (
    <GuestPurchaseShoppingInfo
      purchasepageData={purchasepageData}
      setPurchasepageData={setPurchasepageData}
    />
  )
}
