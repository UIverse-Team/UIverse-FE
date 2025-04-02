'use client'
import Breadcrumb from '../common/Breadcrumb/Breadcrumb'

export const ProductBreadCrumbContainer = ({ productId }: { productId: number }) => {
  return (
    <div className="mb-8">
      <Breadcrumb items={[{ label: '상품상세', href: `/product/${productId}` }]} />
    </div>
  )
}
