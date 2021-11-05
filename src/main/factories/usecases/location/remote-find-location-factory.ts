import { RemoteFindLocation } from '@/data/usecases'
import { FindLocation } from '@/domain/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'

export const makeRemoteFindLocation = (): FindLocation => {
  return new RemoteFindLocation(makeApiUrl('/locations/:zip'), makeAuthorizeHttpClientDecorator())
}
