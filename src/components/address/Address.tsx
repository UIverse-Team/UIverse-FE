import { useState } from 'react'
import { useDaumPostcodePopup } from 'react-daum-postcode'

interface AddressData {
  address: string
  addressType: 'R' | 'J'
  bname: string
  buildingName: string
  zonecode: string
}

export const Address = () => {
  const [userFullAddress, setFullAddress] = useState('') //유저 주소
  const [userZoneCode, setUserZoneCode] = useState('') //유저 우편번호

  const DAUM_SCRIPT_URL = process.env.NEXT_PUBLIC_DAUM_URL_SCRIPT
  const open = useDaumPostcodePopup(DAUM_SCRIPT_URL)

  const handleComplete = (data: AddressData) => {
    let fullAddress = data.address
    let extraAddress = ''
    const zonecode = data.zonecode

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : ''
    }

    setFullAddress(fullAddress) // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setUserZoneCode(zonecode)
  }

  const handleClick = () => {
    open({ onComplete: handleComplete })
  }

  return { handleClick, userFullAddress, userZoneCode }
}
