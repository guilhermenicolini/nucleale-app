import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { SaveChildren } from '@/domain/usecases'
import { ClientError, ServerError, UnauthorizedError } from '@/presentation/errors'

export class RemoteAddChildren implements SaveChildren {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<{ id: string }>
  ) {}

  async save (data: RemoteAddChildren.Data): Promise<RemoteAddChildren.Result> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: data
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.created: return httpResponse.body?.id
      case HttpStatusCode.badRequest: throw new ClientError(httpResponse.error)
      case HttpStatusCode.unauthorized: throw new UnauthorizedError()
      default: throw new ServerError()
    }
  }
}

export namespace RemoteAddChildren {
  export type Data = SaveChildren.Data
  export type Result = SaveChildren.Result
}
