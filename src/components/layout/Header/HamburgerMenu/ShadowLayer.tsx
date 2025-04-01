import { MENU_DEFAULT_HEIGHT, SOFT_BOTTOM_SHADOW } from '@/constants/hamburgerMenu'

// 통합된 그림자 레이어 컴포넌트
type ShadowLayerProps = {
  activeRootId: number | null
  activeSecondLevelId: number | null
}

const ShadowLayer = ({ activeRootId, activeSecondLevelId }: ShadowLayerProps) => {
  // border-radius 결정
  const borderRadiusClass = () => {
    if (!activeRootId) {
      // 1뎁스만 활성화
      return 'rounded-b-lg'
    } else if (activeRootId && !activeSecondLevelId) {
      // 1뎁스와 2뎁스만 활성화
      return 'rounded-bl-lg rounded-br-lg'
    } else {
      // 모든 뎁스 활성화
      return 'rounded-bl-lg rounded-br-lg'
    }
  }

  // 그림자 레이어 너비 계산
  const getLayerWidth = () => {
    const defaultDepthWidth = 224
    if (!activeRootId) {
      // 1뎁스만 표시
      return `${defaultDepthWidth}px`
    } else if (activeRootId && !activeSecondLevelId) {
      // 1뎁스와 2뎁스만 표시
      return `${defaultDepthWidth * 2}px`
    } else {
      // 모든 뎁스 표시
      return `${defaultDepthWidth * 3}px`
    }
  }

  return (
    <div
      className={`absolute pointer-events-none ${SOFT_BOTTOM_SHADOW} ${borderRadiusClass()}`}
      style={{
        left: 0,
        width: getLayerWidth(),
        height: MENU_DEFAULT_HEIGHT,
        top: 0,
        zIndex: 1,
      }}
    />
  )
}

export default ShadowLayer
