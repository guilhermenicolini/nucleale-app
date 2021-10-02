import { makeApiUrl, makeAxiosHttpAdapter } from '@/main/factories/http'
import { RemoteChangePassword } from '@/data/usecases'
import { ChangePassword } from '@/domain/usecases'

export const makeRemoteChangePassword = (token: string): ChangePassword => {
  return new RemoteChangePassword(makeApiUrl(`/change-password/${token}`), makeAxiosHttpAdapter())
}
