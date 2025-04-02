import { ROUTES } from '@/constants/routes'

type ExtractRoutePaths<T> = T extends string
  ? T
  : T extends Record<string, infer U>
    ? ExtractRoutePaths<U>
    : never

export type RoutePaths = ExtractRoutePaths<typeof ROUTES>
