import { AxiosHttpAdapter } from '@/infra/http'

export const makeAxiosHttpAdapter = (): AxiosHttpAdapter => {
  return new AxiosHttpAdapter()
}
