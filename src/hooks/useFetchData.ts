import { useQuery } from '@tanstack/react-query'

export default function useFetchData<T>(
  queryKey: string[],
  fetchFn: () => Promise<T>,
  options = {},
) {
  return useQuery<T>({
    queryKey,
    queryFn: fetchFn,
    ...options,
  })
}
