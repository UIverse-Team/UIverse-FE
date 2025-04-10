import { Children, cloneElement, ReactElement, MouseEvent } from 'react'
import type { ProductClickLog } from '@/types/log/logTypes'
import { addProductClickLog } from '@/services/log/logService'
import { convertTimestampToKST } from '@/util/dateUtils'

interface ProductClickLoggerProps {
  children: ReactElement
  params: ProductClickLog
}

const ProductClickLogger = ({ children, params }: ProductClickLoggerProps) => {
  const child = Children.only(children)

  const clickTime = Date.now()

  const data = { ...params, clickTime: convertTimestampToKST(clickTime) }

  return cloneElement(child, {
    onClick: <E extends MouseEvent>(event: E, ...rest: unknown[]) => {
      // 로그 데이터 서버로 전송
      addProductClickLog(data)

      // 원래 onClick 핸들러가 있으면 실행
      if (child.props && typeof child.props['onClick'] === 'function') {
        return child.props['onClick'](event, ...rest)
      }
    },
  })
}

export default ProductClickLogger
