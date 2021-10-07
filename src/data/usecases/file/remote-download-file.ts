import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { DownloadFile } from '@/domain/usecases'
import { ClientError, ServerError, UnauthorizedError } from '@/presentation/errors'

export class RemoteDownloadFile implements DownloadFile {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<Buffer>
  ) {}

  async download (id: string): Promise<RemoteDownloadFile.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url.replace(':id', id),
      method: 'get',
      responseType: 'arraybuffer'
    })

    const result = {
      fileName: httpResponse.file?.name,
      mimeType: httpResponse.file?.mimeType,
      data: httpResponse.body
    }
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return result
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
