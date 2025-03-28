// 예시
// 배열 형태의 키를 사용하여 네임스페이스를 만들면 더욱 직관적이고 관리하기 쉬움.
// ['users'] → 모든 유저 목록
// ['user', userId] → 특정 유저 정보
// ['posts', 'popular'] → 인기 게시글

export const QUERY_KEYS = {
  USERS: ['users'],
  USER_DETAIL: (userId: string) => ['user', userId],
  POSTS: ['posts'],
  POST_DETAIL: (postId: string) => ['post', postId],
  PRODCUTS: ['products'],
  PRODUCT_DETAIL: (productId: number) => ['PRODUCT_DETAIL', productId],
  POPULARITY: ['popularity'],
  MAIN_POPULARITY: ['main_popularity'],
}
