import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { FindLocation } from '@/domain/usecases'
import { ClientError, ServerError, UnauthorizedError } from '@/presentation/errors'

export class RemoteFindLocation implements FindLocation {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteFindLocation.Model>
  ) {}

  async find (zip: string): Promise<RemoteFindLocation.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url.replace(':zip', zip),
      method: 'get'
    })
    const address = httpResponse.body
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return address
      case HttpStatusCode.badRequest: throw new ClientError(httpResponse.error)
      case HttpStatusCode.unauthorized: throw new UnauthorizedError()
      default: throw new ServerError()
    }
  }
}

export namespace RemoteFindLocation {
  export type Model = FindLocation.Model
}
