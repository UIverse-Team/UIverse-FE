import httpClient from '@/util/httpClient'

export const localLoginService = {
  localLogin: async (email: string, password: string) => {
    const response = await httpClient.post(`/auth/login/local`, {
      email: email,
      password: password,
    })
    return response
  },
}
