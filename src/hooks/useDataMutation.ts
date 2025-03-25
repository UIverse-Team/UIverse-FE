import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useDataMutation<T, V>(
  mutationFn: (data: V) => Promise<T>,
  onSuccessCallback?: (data: T) => void,
  invalidateKeys = [],
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      // 특정 queryKey만 무효화
      if (invalidateKeys.length > 0) {
        invalidateKeys.forEach((key) => queryClient.invalidateQueries({ queryKey: key }))
      }

      onSuccessCallback?.(data)
    },
    onError: (error) => {
      console.error('Mutation error:', error)
    },
  })
}
