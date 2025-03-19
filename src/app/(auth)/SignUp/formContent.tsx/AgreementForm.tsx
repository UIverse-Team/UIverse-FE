import { SignUpFormProps } from '../page'
import { useState } from 'react'
import Checkbox from '@/components/common/Checkbox/Checkbox'
import { Label } from '@/components/common/Label/Label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/common/Dialog/Dialog'
import TextButton from '@/components/common/Button/TextButton'
import Button from '@/components/common/Button/Button'

export const AgreementForm = ({ next }: SignUpFormProps) => {
  const [isCurrentStepValid] = useState(true)
  const [isAgeChecked, setIsAgeChecked] = useState(false)
  const [isUseChecked, setIsUseChecked] = useState(false)
  const [isPicDialogOpen, setIsPicDialogOpen] = useState(false)
  const [isPicChecked, setIsPicChecked] = useState(false)
  const [isAdDialogOpen, setIsAdDialogOpen] = useState(false)
  const [isAdChecked, setIsAdChecked] = useState(false)

  const handleAllCheckboxChange = (checked: boolean | 'indeterminate') => {
    setIsAgeChecked(checked === true)
    setIsUseChecked(checked === true)
    setIsPicChecked(checked === true)
    setIsAdChecked(checked === true)
  }

  const handleAgeCheckboxChange = (checked: boolean | 'indeterminate') => {
    setIsAgeChecked(checked === true)
  }

  const handleUseCheckboxChange = (checked: boolean | 'indeterminate') => {
    setIsUseChecked(checked === true)
  }

  const handlePicDialogClose = () => {
    setIsPicChecked(true)
    setIsPicDialogOpen(false)
  }

  const handlePicCheckboxChange = (checked: boolean | 'indeterminate') => {
    setIsPicChecked(checked === true)
  }

  const handleAdDialogClose = () => {
    setIsAdChecked(true)
    setIsAdDialogOpen(false)
  }

  const handleAdCheckboxChange = (checked: boolean | 'indeterminate') => {
    setIsAdChecked(checked === true)
  }

  return (
    <>
      <div className="pb-6">
        <div className="flex gap-2 border-b border-line pb-4 mb-4 items-start">
          <Checkbox
            checked={isAgeChecked && isUseChecked && isPicChecked && isAdChecked}
            onCheckedChange={handleAllCheckboxChange}
            size={'lg'}
            id="agreeAll"
            className="mr-2"
          />
          <div className="flex flex-col">
            <Label className="typo-h3" htmlFor="agreeAll">
              전체 동의합니다. (선택 정보 포함)
            </Label>
            <div className="mt-2 typo-caption1">
              선택 항목에 대한 동의를 거부하는 경우에도 회원가입 서비스는 <br /> 이용 가능합니다.
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center py-2">
            <Checkbox
              checked={isAgeChecked}
              onCheckedChange={handleAgeCheckboxChange}
              id="agreeAge"
              className="mr-2"
              label="[필수] 만 14세 이상입니다."
            />
          </div>
          <div className="flex items-center mt-0.5 py-2">
            <Checkbox
              checked={isUseChecked}
              onCheckedChange={handleUseCheckboxChange}
              id="agreeUse"
              className="mr-2"
              label="[필수] 이용약관 동의"
            />
          </div>
          <div className="flex items-center justify-between py-2">
            <Checkbox
              checked={isPicChecked}
              onCheckedChange={handlePicCheckboxChange}
              id="agreePic"
              className="mr-2"
              label="[필수] 개인정보 수집 및 이용에 대한 동의"
            />
            <div>
              <Dialog open={isPicDialogOpen} onOpenChange={setIsPicDialogOpen}>
                <DialogTrigger>
                  <TextButton size={'sm'} className="border-b border-alter-line text-alternative">
                    자세히
                  </TextButton>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="pb-6 border-b border-line">
                    <DialogTitle>[필수] 개인정보 수집 및 이용에 대한 동의</DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="typo-caption1 text-left pt-8 pb-6">
                    제 1장 총 칙<br />
                    제 1조 (목적)
                    <br />
                    본 이용약관은 주식회사 Ora(이하 “회사”)에서 제공하는 모든 서비스(이하
                    “서비스”)를 이용함에 있어 회사와 이용자의 권리·의무 및 책임사항을 규정함을
                    목적으로 합니다.
                    <br />
                    PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 이
                    약관을 준용합니다.
                    <br />
                    제 2조 (정의)
                    <br />
                    <div className="flex gap-1 pl-1">
                      1.
                      <div>
                        “사이버몰”이란 회사가 재화 또는 용역(이하 “재화 등”)을 이용자에게 제공하기
                        위하여 컴퓨터 등 정보통신 설비를 이용하여 재화 등을 거래할 수 있도록 설정한
                        가상의 영업장을 말하며, 아울러 사이버 몰을 운영하는 사업자의 의미로도
                        사용합니다.
                      </div>
                      <br />
                    </div>
                    <div className="flex gap-1 pl-1">
                      2.
                      <div>
                        “이용자”란 사이버몰에 접속하여 이 약관에 따라 회사가 제공하는 서비스를 받는
                        회원 및 비회원을 말합니다.
                      </div>
                      <br />
                    </div>
                    <div className="flex gap-1 pl-1">
                      3.{' '}
                      <div>
                        “회원”이라 함은 회사에 개인정보를 제공하여 회원 등록을 한 자로서, 회사의
                        정보를 지속적으로 제공 받으며, 회사가 제공하는 서비스를 계속적으로 이용할 수
                        있는 자를 말합니다.
                      </div>
                      <br />
                    </div>
                  </DialogDescription>
                  <DialogFooter>
                    <Button type="button" onClick={handlePicDialogClose}>
                      확인
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="flex gap-2 items-center justify-between py-2">
            <Checkbox
              checked={isAdChecked}
              onCheckedChange={handleAdCheckboxChange}
              id="agreeAd"
              className="mr-2"
              label="[선택] 광고성 정보 수신 동의"
            />
            <div>
              <Dialog open={isAdDialogOpen} onOpenChange={setIsAdDialogOpen}>
                <DialogTrigger>
                  <TextButton size={'sm'} className="border-b border-alter-line text-alternative">
                    자세히
                  </TextButton>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="pb-6 border-b border-line">
                    <DialogTitle>[선택] 광고성 정보 수신 동의</DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="typo-caption1 text-left pt-8 pb-6">
                    정보주체가 마케팅 목적의 개인정보 수집 및 이용에 동의한 개인정보를 이용하여
                    (주)Ora*에서 전자적 전송 매체를 통해 개인 맞춤형 광고 및 정보를 전송합니다.
                    <br />
                    ㈜Ora가 제공하는 다양한 서비스(자세히)가 포함되며, 특정 서비스 관련 정보를
                    제공받고 싶지 않으시다면 언제든지 [MY &gt; 회원 정보 수정 페이지에서 미동의의
                    선택]으로 동의 철회가 가능합니다.
                    <br />
                    회원은 본 동의 사항에 동의하지 않을 권리가 있으며 동의하지 않아도 서비스 이용이
                    가능합니다. 다만, 동의하지 않을 경우 관련 할인 정보, 이벤트 등의 혜택 정보
                    제공이 제한됩니다.
                  </DialogDescription>
                  <DialogFooter>
                    <Button type="button" onClick={handleAdDialogClose}>
                      확인
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
      <Button className="mt-2" onClick={next} disabled={!isCurrentStepValid}>
        {'다음'}
      </Button>
    </>
  )
}
