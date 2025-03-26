import { useState } from 'react'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import { Label } from '@/components/common/Label/Label'
import { Input } from '@/components/common/Input/Input'
import Button from '@/components/common/Button/Button'
import CopyIcon from '/public/icons/clipboard.svg?svgr'
import { HelperLabel } from '@/components/common/HelperLabel/HelperLabel'

const FindIdComplete = () => {
  const email = 'ora@gmail.com'
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
    } catch (error) {
      console.error('클립보드 복사 실패:', error)
      setCopied(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="pb-6">
        <div className="w-full flex items-center justify-between">
          <Label htmlFor="email">이메일</Label>
          <Input id="email" variant="auth" value={'ora@gmail.com'} className="w-[338px]" readOnly>
            <button onClick={handleCopy}>
              <CopyIcon className="size-6" />
            </button>
          </Input>
        </div>

        <div className="w-full flex justify-end">
          <HelperLabel className="w-[338px] min-h-[29px] px-0.5 py-1.5 text-left" variant="success">
            {copied ? '복사되었습니다.' : '\u00A0'}
          </HelperLabel>
        </div>
      </div>

      <Button asChild>
        <Link href={ROUTES.LOGIN}>로그인하기</Link>
      </Button>
      <Button variant="outline" asChild>
        <Link href={ROUTES.HOME}>홈으로 이동</Link>
      </Button>
    </div>
  )
}

export default FindIdComplete
