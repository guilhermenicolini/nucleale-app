import { makeApiUrl, makeAxiosHttpAdapter } from '@/main/factories/http'
import { RemoteRecoverAccount } from '@/data/usecases'
import { RecoverAccount } from '@/domain/usecases'

export const makeRemoteRecoverAccount = (): RecoverAccount => {
  return new RemoteRecoverAccount(makeApiUrl('/password-recovery'), makeAxiosHttpAdapter())
}
