import { useRouter } from 'next/navigation'
import Button from '../common/Button/Button'
import TextButton from '../common/Button/TextButton'
import Checkbox from '../common/Checkbox/Checkbox'
import { Input } from '../common/Input/Input'

export const MemberLogin = () => {
  const router = useRouter()

  return (
    <>
      <div className="pt-4 pb-2">
        <div className="h-[75px]">
          <Input variant="auth" placeholder="이메일" />
        </div>
        <Input variant="auth" type="password" placeholder="비밀번호" />
        <div className="mt-10 p-2 pr-0 flex justify-between">
          <Checkbox id="saveId" size="lg" label="아이디저장" />
          <div className="flex gap-2 items-center">
            <TextButton size="sm" className="text-alternative">
              비밀번호 찾기
            </TextButton>
            <div className="w-[1px] h-[14px] bg-disabled-fill"></div>
            <TextButton size="sm" className="text-alternative">
              아이디 찾기
            </TextButton>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Button className="mb-2">로그인</Button>
        <Button onClick={() => router.push('/signup')} variant="outline">
          회원가입
        </Button>
      </div>
    </>
  )
}
