import KakaoIcon from '/public/icons/kakao.svg?svgr'
import NaverIcon from '/public/icons/naver.svg?svgr'
import GoogeIcon from '/public/icons/google.svg?svgr'
import { socialLogin } from '@/app/serverActions/auth/login/actions'
import IconButton from '@/components/common/Button/IconButton'

export const SocialLogin = () => {
  const handleSocialLogin = async (provider: string) => {
    try {
      const result = await socialLogin(provider)
      console.log(result)
      window.location.href = result
    } catch (error) {
      console.error('OAuth 로그인 오류:', error)
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
