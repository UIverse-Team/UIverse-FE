import IconButton from '../common/Button/IconButton'
import KakaoIcon from '/public/icons/kakao.svg?svgr'
import NaverIcon from '/public/icons/naver.svg?svgr'
import GoogeIcon from '/public/icons/google.svg?svgr'

export const SocialLogin = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="typo-h3">간편로그인</div>
        <div className="flex gap-4">
          <IconButton>
            <KakaoIcon />
          </IconButton>
          <IconButton>
            <NaverIcon />
          </IconButton>
          <IconButton>
            <GoogeIcon />
          </IconButton>
        </div>
      </div>
    </>
  )
}
