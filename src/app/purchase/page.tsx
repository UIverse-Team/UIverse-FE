import { CartHeader } from '@/components/cart/CartHeader'
import { CartPayForm } from '@/components/cart/CartPayForm'
import { PurchaseProductsList } from '@/components/purchase/PurchaseProductsList'

import { PurchaseShoppingInfo } from '@/components/purchase/PurchaseShoppingInfo'

const cartItems = {
  cartDetailResponseList: [
    {
      cartId: 5,
      saleProductId: 1,
      productName:
        '당도최고! 귀여운 복숭아 한박스 16입 | 저세상 당도농축 인기만점 복숭아 당도최고! 귀여운 복숭아 한박스 16입 | 저세상 당도농축 인기만점 복숭아',
      optionName: 'Red Shirt',
      paymentPrice: 15000,
      orderPrice: 20000,
      discountPrice: 5000,
      quantity: 13,
      totalPrice: 195000,
      image: 'https://shopping-phinf.pstatic.net/main_8207483/82074834562.1.jpg',
      brandName: 'Brand A',
    },
    {
      cartId: 6,
      saleProductId: 1,
      productName:
        '당도최고! 귀여운 복숭아 한박스 16입 | 저세상 당도농축 인기만점 복숭아 당도최고! 귀여운 복숭아 한박스 16입 | 저세상 당도농축 인기만점 복숭아',
      optionName: 'Red Shirt',
      paymentPrice: 15000,
      orderPrice: 20000,
      discountPrice: 5000,
      quantity: 13,
      totalPrice: 195000,
      image: 'https://shopping-phinf.pstatic.net/main_8207483/82074834562.1.jpg',
      brandName: 'Brand A',
    },
  ],
  totalItems: 2,
  totalOrderPrice: 260000,
  totalDiscountPrice: 65000,
  totalPaymentPrice: 195000,
}

const purchasepage = () => {
  return (
    <div className="py-8 gap-4 flex flex-col">
      <CartHeader />
      <div className="flex w-full gap-4">
        <div className="flex gap-4 w-full flex-col">
          <PurchaseShoppingInfo />
          <PurchaseProductsList cartItems={cartItems} />
        </div>
        <CartPayForm cartListItems={cartItems} />
      </div>
    </div>
  )
}

export default purchasepage
