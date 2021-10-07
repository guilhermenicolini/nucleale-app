import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { DownloadFile } from '@/domain/usecases'
import { ClientError, ServerError, UnauthorizedError } from '@/presentation/errors'

export class RemoteDownloadFile implements DownloadFile {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteDownloadFile.Model>,
    private readonly mimeType: string
  ) {}

  async download (): Promise<RemoteDownloadFile.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get'
    })
    const file = httpResponse.body
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return { ...file, mimeType: this.mimeType }
      case HttpStatusCode.badRequest:
      case HttpStatusCode.notFound: throw new ClientError(httpResponse.error)
      case HttpStatusCode.unauthorized: throw new UnauthorizedError()
      default: throw new ServerError()
    }
  }
}

export namespace RemoteDownloadFile {
  export type Model = DownloadFile.Model
}
