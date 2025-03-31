export interface purchaseType {
  recipient: string
  phone: string
  address: string
  detailAddress: string
  zonecode: string
  defaultYN: boolean
}

export interface PurchasePageData {
  name: string // 주문자 정보 이름
  phone: string // 휴대폰 번호
  code: string // 우편번호 (인증코드)
  deliveryName: string // 배송지 이름
  deliveryPhone: string // 배송지 휴대폰번호
  checked: boolean // 주문자 체크
  isTimerOn: boolean // 유효시간
  buttonMessage: string // 인증번호 버튼 메시지
  userDetailAddress: string // 상세 주소
  address: string
}
