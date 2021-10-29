import { RemoteLoadCertificates } from '@/data/usecases'
import { LoadCertificates } from '@/domain/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'

export const makeRemoteLoadCertificates = (): LoadCertificates => {
  return new RemoteLoadCertificates(makeApiUrl('/me/certificates'), makeAuthorizeHttpClientDecorator())
}
