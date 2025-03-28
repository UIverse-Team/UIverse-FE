import Button from '@/components/common/Button/Button'
import TextButton from '@/components/common/Button/TextButton'
import Checkbox from '@/components/common/Checkbox/Checkbox'
import { Input } from '@/components/common/Input/Input'
import { toast } from '@/components/common/Toast/Toast'
import { ROUTES } from '@/constants/routes'
import { submitLogin } from '@/serverActions/auth/login/actions'
import { useAuthStore } from '@/store/user'
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from '@/util/localstorageUtil'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export const MemberLogin = () => {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)

  // 이메일 입력 상태 관리
  const [email, setEmail] = useState('')
  const [rememberId, setRememberId] = useState(false) // 체크박스 상태 관리

  const [state, formAction] = React.useActionState(submitLogin, null)

  // localStorage에서 저장된 이메일 불러오기
  useEffect(() => {
    const savedEmail = getLocalStorageItem<string>('savedEmail')
    if (savedEmail) {
      setEmail(savedEmail)
      setRememberId(true) // 체크박스 자동 체크
    }
  }, [])

  useEffect(() => {
    if (state?.error) {
      toast({
        type: 'error',
        content: state?.error,
        position: 'top-center',
      })
    }

    if (state?.redirectTo) {
      router.push(state.redirectTo)
    }

    if (state?.user) {
      login(state.user)

      // 아이디 저장 체크 여부에 따라 localStorage 처리
      if (rememberId) {
        setLocalStorageItem('savedEmail', email)
      } else {
        removeLocalStorageItem('savedEmail')
      }
    }
  }, [state, login, router, email, rememberId])

  return (
    <>
      <form className="pt-4 pb-2" action={formAction}>
        <div className="h-[75px]">
          <Input
            variant="auth"
            name="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Input variant="auth" name="password" type="password" placeholder="비밀번호" />
        <div className="mt-10 p-2 pr-0 flex justify-between">
          <Checkbox
            id="saveId"
            size="lg"
            label="아이디 저장"
            checked={rememberId}
            onClick={() => setRememberId(!rememberId)}
          />
          <div className="flex items-center gap-2">
            <TextButton size="sm" className="text-alternative">
              <Link href={ROUTES.FIND.PW}>비밀번호 찾기</Link>
            </TextButton>
            <div className="w-[1px] h-[14px] bg-disabled"></div>
            <TextButton size="sm" className="text-alternative">
              <Link href={ROUTES.FIND.ID}>아이디 찾기</Link>
            </TextButton>
          </div>
        </div>
        <Button type="submit" className="mt-6">
          로그인
        </Button>
      </form>
      <Button onClick={() => router.push(ROUTES.SIGNUP)} variant="outline">
        회원가입
      </Button>
    </>
  )
}
