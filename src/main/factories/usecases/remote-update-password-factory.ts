import { makeApiUrl, makeAxiosHttpAdapter } from '@/main/factories/http'
import { RemoteUpdatePassword } from '@/data/usecases'
import { UpdatePassword } from '@/domain/usecases'

export const makeRemoteUpdatePassword = (token: string): UpdatePassword => {
  return new RemoteUpdatePassword(makeApiUrl(`/change-password/${token}`), makeAxiosHttpAdapter())
}
