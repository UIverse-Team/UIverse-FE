export type Params = Promise<{ slug: string }>
export type SearchParams = { [key: string]: string | undefined }

export interface PageParams {
  params?: Params
  searchParams?: SearchParams
}
