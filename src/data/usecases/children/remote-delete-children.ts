import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { DeleteChildren } from '@/domain/usecases'
import { ClientError, ServerError, UnauthorizedError } from '@/presentation/errors'

export class RemoteDeleteChildren implements DeleteChildren {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<Buffer>
  ) {}

  async delete (id: string): Promise<void> {
    const httpResponse = await this.httpClient.request({
      url: this.url.replace(':id', id),
      method: 'delete'
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.noContent: return
      case HttpStatusCode.badRequest:
      case HttpStatusCode.notFound: throw new ClientError(httpResponse.error)
      case HttpStatusCode.unauthorized: throw new UnauthorizedError()
      default: throw new ServerError()
    }
  }
}
