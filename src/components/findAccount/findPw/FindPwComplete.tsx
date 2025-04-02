import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import Button from '@/components/common/Button/Button'

const FindPwComplete = () => {
  return (
    <>
      <div className="mb-12">
        <p className="typo-h3 text-center">
          비밀번호가 성공적으로 변경되었습니다.
          <br />
          새로운 비밀번호로 로그인 해주세요.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Button asChild>
          <Link href={ROUTES.LOGIN}>로그인하기</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={ROUTES.HOME}>홈으로 이동</Link>
        </Button>
      </div>
    </>
  )
}

export default FindPwComplete
