import { RemoteAddChildren } from '@/data/usecases'
import { SaveChildren } from '@/domain/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'

export const makeRemoteAddChildren = (): SaveChildren => {
  return new RemoteAddChildren(makeApiUrl('/me/childrens'), makeAuthorizeHttpClientDecorator())
}
