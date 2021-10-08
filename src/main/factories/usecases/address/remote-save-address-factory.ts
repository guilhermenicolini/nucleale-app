import { RemoteSaveAddress } from '@/data/usecases'
import { SaveAddress } from '@/domain/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'

export const makeRemoteSaveAddress = (): SaveAddress => {
  return new RemoteSaveAddress(makeApiUrl('/address'), makeAuthorizeHttpClientDecorator())
}
