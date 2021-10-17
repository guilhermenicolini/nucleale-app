import { makeApiUrl } from '@/main/factories/http'
import { RemoteInviteMember } from '@/data/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { InviteMember } from '@/domain/usecases'

export const makeRemoteInviteMember = (): InviteMember => {
  return new RemoteInviteMember(makeApiUrl('/accounts/invite'), makeAuthorizeHttpClientDecorator())
}
