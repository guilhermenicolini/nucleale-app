import { RemoteLoadMembers } from '@/data/usecases'
import { LoadMembers } from '@/domain/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'

export const makeRemoteLoadMembers = (): LoadMembers => {
  return new RemoteLoadMembers(makeApiUrl('/accounts'), makeAuthorizeHttpClientDecorator())
}
