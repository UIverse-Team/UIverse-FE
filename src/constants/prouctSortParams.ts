const PRODUCT_SORT_OPTIONS = {
  wish: '추천순',
  latest: '최신순',
  priceAsc: '낮은가격순',
  priceDesc: '높은가격순',
  discount: '할인율순',
} as const

type ProductSortParamsKey = keyof typeof PRODUCT_SORT_OPTIONS
type ProductSortParamsName = (typeof PRODUCT_SORT_OPTIONS)[ProductSortParamsKey]

type ProductSortParams = {
  key: ProductSortParamsKey
  name: ProductSortParamsName
}

export const PRD_SORT_PARAMS: ProductSortParams[] = Object.entries(PRODUCT_SORT_OPTIONS).map(
  ([key, name]) => ({
    key: key as ProductSortParamsKey,
    name: name as ProductSortParamsName,
  }),
)
