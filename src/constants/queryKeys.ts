// 예시
// 배열 형태의 키를 사용하여 네임스페이스를 만들면 더욱 직관적이고 관리하기 쉬움.
// ['users'] → 모든 유저 목록
// ['user', userId] → 특정 유저 정보
// ['posts', 'popular'] → 인기 게시글

export const QUERY_KEYS = {
  PRODUCT_DETAIL: (productId: number) => ['PRODUCT_DETAIL', productId],
  POPULAR: ['popular'],
  POPULARITY: (size: number) => ['popularity', size.toString()],
  PRODUCTS_SPECIALPRICES: (size: number) => ['products_specialprices', size.toString()],
  ORDERS_LIST: (period: string, currentPage: number, size: number) => [
    'orders',
    period,
    currentPage.toString(),
    size.toString(),
  ],
  ORDERS_DETAIL: (orderId: string) => ['orders', orderId],
  ORDER_PRODUCT: (orderDetailId: string) => ['order_product', orderDetailId],
  SEARCH: (
    keyword: string,
    sort: string,
    size: number,
    page: number,
    categoryId: number,
    priceRanges: number,
    // ratings: number,
  ) => [
    'search',
    keyword,
    sort,
    size.toString(),
    page.toString(),
    categoryId,
    priceRanges,
    // ratings,
  ],
  ROOT_CATEGORIES: ['rootCategories'],
  SUB_CATEGORIES: (categoryId: number) => ['subCategories', categoryId.toString()],
  REALITEM_SEARCH: (keyword: string) => [keyword],
}
