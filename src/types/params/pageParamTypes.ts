export type Params<T extends string = 'id'> = Promise<{ [key in T]: string }>

export type SearchParams = Promise<{ [key: string]: string | undefined }>

export interface PageParams<T extends string = 'id'> {
  params?: Params<T>
  searchParams?: SearchParams
}
