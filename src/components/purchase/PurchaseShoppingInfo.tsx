'use client'
import { useAuthStore } from '@/stores/user'
import Button from '../common/Button/Button'
import Checkbox from '../common/Checkbox/Checkbox'
import Tag from '../common/Tag/Tag'
import { Input } from '../common/Input/Input'
import React, { useCallback, useEffect, useState } from 'react'
import { Address } from '../address/Address'
import { formatPhoneNumber } from '@/util/formatPhoneNumber'
import { sendPhoneAuthCode, verifyPhoneAuthCode } from '@/serverActions/auth/phoneVerify/actions'
import { toast } from '../common/Toast/Toast'
import { PurchasePageData, purchaseType } from '@/types/purchase/purchaseType'
import { addAddress, defaultUserAddress } from '@/services/purchaseService'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/Select/Select'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../common/Dialog/Dialog'
import Divider from '../common/Divider/Divider'

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
        code: userZoneCode || prev.code,
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
  const [userAddress, setUserAddress] = useState<purchaseType>({
    recipient: '',
    phone: '',
    address: '',
    detailAddress: '',
    zonecode: '',
    defaultYN: false,
  })
  const [isOpen, setIsOpen] = useState(false)

  const { handleClick, userFullAddress, userZoneCode } = Address()

  const getAddress = async () => {
    const response = await defaultUserAddress()
    if (response) setUserAddress(response)
  }

  useEffect(() => {
    if (userFullAddress || userZoneCode) {
      setUserAddress((prev) => ({
        ...prev,
        address: userFullAddress,
        zonecode: userZoneCode || prev.zonecode,
      }))
    }
  }, [userFullAddress, userZoneCode, setUserAddress])

  const handleUerDetailAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAddress((prev) => ({
      ...prev,
      userDetailAddress: e.target.value,
    }))
  }

  const handleUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setUserAddress((prev) => ({
      ...prev,
      [name]: name === 'phone' ? formatPhoneNumber(value) : value, // 전화번호만 포맷 적용
    }))
  }

  const handleAddAddress = async () => {
    const reseponse = await addAddress(userAddress)
    if (reseponse) {
      toast({
        type: 'success',
        content: '주소 등록 완료!',
      })
    }
  }

  const handleDefaultAddress = () => {
    setUserAddress((prev) => ({
      ...prev,
      defaultYN: true,
    }))
  }

  useEffect(() => {
    getAddress()
  }, [])

  return (
    <div className="bg-white flex flex-col rounded-2xl basis-full ">
      <div className="flex flex-col">
        <div className="p-6 border-b-[1px] border-alter-line typo-h3">배송지</div>
        {userAddress.recipient !== '' ? (
          <div className="p-6 flex-col flex gap-4">
            <div className="flex  gap-6 justify-between">
              <div className="flex flex-col flex-1">
                <div className=" flex gap-2.5 items-center">
                  <span>{userAddress.recipient}</span>
                  <Tag variant={'tertiary'} size={'md'}>
                    기본배송지
                  </Tag>
                </div>
                <div className="flex">
                  <span>[{userAddress.zonecode}]&nbsp;</span>
                  <span>{userAddress.address}</span>
                  <span>&nbsp;{userAddress.detailAddress}</span>
                </div>
              </div>
              <div>
                <Button variant={'outline'} size={'md'}>
                  변경
                </Button>
              </div>
            </div>
            <Select defaultValue="all">
              <SelectTrigger size="lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">배송 요청사항을 선택해주세요</SelectItem>
                <SelectItem value="open">문 앞에 놔둬주세요</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Checkbox size={'lg'} />
              <div>다음에도 사용할게요</div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center flex-col py-12 px-6 items-center gap-4 ">
            <div className="typo-h3">배송지를 등록해주세요.</div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  variant={'secondary'}
                  size={'md'}
                  className="w-[103px]"
                  onClick={() => setIsOpen(true)}
                >
                  등록하기
                </Button>
              </DialogTrigger>
              <DialogContent className="flex flex-col w-[616px]">
                <DialogHeader className="flex justify-center flex-col gap-6 items-center ">
                  <DialogTitle className="typo-h2">배송지 등록</DialogTitle>
                  <Divider />
                </DialogHeader>
                <div className=" pt-8 flex flex-col gap-4">
                  <div className="flex items-center gap-4 ">
                    <span className="w-[80px]">수령인</span>
                    <Input
                      placeholder="받는 사람의 이름을 적어주세요."
                      className="flex-1"
                      name="deliveryName"
                      onChange={handleUserData}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-[80px]">휴대폰 번호</span>
                    <Input
                      placeholder="010-0000-0000"
                      className="flex-1"
                      name="deliveryPhone"
                      onChange={handleUserData}
                    />
                  </div>
                  <div className="flex gap-4 flex-col">
                    <div className="flex justify-between items-center gap-4">
                      <span className="w-[80px]">배송지</span>
                      <Input
                        placeholder="우편번호"
                        className="flex-1"
                        disabled
                        defaultValue={userZoneCode}
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
                      <Input placeholder="주소를 검색하세요" className="flex-1" disabled />
                    </div>
                    <div className="flex justify-between  items-center gap-4">
                      <span className="w-[80px]"></span>
                      <Input
                        placeholder="상세주소를 입력해주세요."
                        className="flex-1"
                        onChange={handleUerDetailAddress}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Checkbox size={'lg'} onClick={handleDefaultAddress} />
                    기본 배송지로 설정
                  </div>
                </div>
                <DialogFooter className="flex ">
                  <Button variant={'secondary'} size={'lg'} onClick={handleAddAddress}>
                    확인
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
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
