import { RemoteDownloadFile } from '@/data/usecases'
import { DownloadFile } from '@/domain/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'

export const makeRemoteDownloadFile = (url: string): DownloadFile => {
  return new RemoteDownloadFile(makeApiUrl(url), makeAuthorizeHttpClientDecorator())
}
