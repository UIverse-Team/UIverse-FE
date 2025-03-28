import KakaoIcon from '/public/icons/kakao.svg?svgr'
import NaverIcon from '/public/icons/naver.svg?svgr'
import GoogeIcon from '/public/icons/google.svg?svgr'
import IconButton from '@/components/common/Button/IconButton'
import { socialCertification, socialLogin } from '@/serverActions/auth/login/actions'
import { toast } from '@/components/common/Toast/Toast'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { userStore } from '@/store/user'
import { ROUTES } from '@/constants/routes'

export const SocialLogin = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const updateUser = userStore((state) => state.setUser)

  const handleSocialLogin = async (provider: string) => {
    if (isLoading) return

    try {
      setIsLoading(true)
      const certificationUrl = await socialLogin(provider)
      const popup = window.open(certificationUrl, 'Social Login', 'width=600,height=800')

      return new Promise((resolve, reject) => {
        const checkPopup = setInterval(async () => {
          try {
            const currentUrl = popup?.location.href

            if (currentUrl) {
              const urlParams = new URL(currentUrl)
              const code = urlParams.searchParams.get('code')
              const state = urlParams.searchParams.get('state')

              if (code && state) {
                clearInterval(checkPopup)
                popup?.close()

                const certificationResult = await socialCertification({
                  code,
                  state,
                  provider,
                })

                if (certificationResult.redirectTo) {
                  if (certificationResult.user) {
                    updateUser(certificationResult.user.name)
                  }

                  router.push(ROUTES.HOME)
                } else {
                  toast({
                    type: 'error',
                    content: '로그인에 실패했습니다.',
                    position: 'top-center',
                  })
                }

                resolve(certificationResult)
              }
            }
          } catch {
            console.log('Waiting for redirect...')
          }
        }, 500)

        setTimeout(
          () => {
            clearInterval(checkPopup)
            popup?.close()
            setIsLoading(false)
            reject(new Error('소셜 로그인 시간이 만료되었습니다.'))
            toast({
              type: 'error',
              content: '로그인 시간이 만료되었습니다.',
              position: 'top-center',
            })
          },
          5 * 60 * 1000,
        )
      })
    } catch (error) {
      console.error('OAuth 로그인 오류:', error)
      toast({
        type: 'error',
        content: '로그인 중 오류가 발생했습니다.',
        position: 'top-center',
      })
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="typo-h3">간편로그인</div>
        <div className="flex gap-4">
          <IconButton onClick={() => handleSocialLogin('kakao')}>
            <KakaoIcon />
          </IconButton>
          <IconButton onClick={() => handleSocialLogin('naver')}>
            <NaverIcon />
          </IconButton>
          <IconButton onClick={() => handleSocialLogin('google')}>
            <GoogeIcon />
          </IconButton>
        </div>
      </div>
    </>
  )
}
