import { makeApiUrl, makeAxiosHttpAdapter } from '@/main/factories/http'
import { RemoteCheckPasswordRequest } from '@/data/usecases'
import { CheckPasswordRequest } from '@/domain/usecases'

export const makeRemoteCheckPasswordRequest = (token: string): CheckPasswordRequest => {
  return new RemoteCheckPasswordRequest(makeApiUrl(`/change-password/${token}`), makeAxiosHttpAdapter())
}
