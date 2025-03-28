import { useRouter } from 'next/navigation'
import Button from '../common/Button/Button'

export const SignUpComplete = () => {
  const router = useRouter()
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="text-center">
          Ora의 회원이 되신 것을 환영합니다!
          <br />
          이제 다양한 상품을 특별한 혜택과 함께 만나보세요.
        </div>
        <div className="w-[380px] mt-8">
          <Button className="mb-4" size={'lg'} onClick={() => router.push('/login')}>
            로그인하기
          </Button>
          <Button size={'lg'} variant={'outline'} onClick={() => router.push('/')}>
            홈으로 이동
          </Button>
        </div>
      </div>
    </>
  )
}
