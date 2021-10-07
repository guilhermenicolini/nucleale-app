import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { LoadAddress } from '@/domain/usecases'
import { ServerError, UnauthorizedError } from '@/presentation/errors'

export class RemoteLoadAddress implements LoadAddress {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadAddress.Model>
  ) {}

  async load (): Promise<RemoteLoadAddress.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get'
    })
    const remoteAddress = httpResponse.body
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return remoteAddress
      case HttpStatusCode.unauthorized: throw new UnauthorizedError()
      default: throw new ServerError()
    }
  }
}

export namespace RemoteLoadAddress {
  export type Model = LoadAddress.Model
}
