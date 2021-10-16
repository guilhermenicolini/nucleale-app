import { RemoteDeleteChildren } from '@/data/usecases'
import { DeleteChildren } from '@/domain/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'

export const makeRemoteDeleteChildren = (): DeleteChildren => {
  return new RemoteDeleteChildren(makeApiUrl('/childrens/:id'), makeAuthorizeHttpClientDecorator())
}
