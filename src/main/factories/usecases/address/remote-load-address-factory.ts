import { RemoteLoadAddress } from '@/data/usecases'
import { LoadAddress } from '@/domain/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'

export const makeRemoteLoadAddress = (): LoadAddress => {
  return new RemoteLoadAddress(makeApiUrl('/address'), makeAuthorizeHttpClientDecorator())
}
