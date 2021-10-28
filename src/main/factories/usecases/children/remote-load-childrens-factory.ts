import { RemoteLoadChildrens } from '@/data/usecases'
import { LoadChildrens } from '@/domain/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'

export const makeRemoteLoadChildrens = (): LoadChildrens => {
  return new RemoteLoadChildrens(makeApiUrl('/me/childrens'), makeAuthorizeHttpClientDecorator())
}
