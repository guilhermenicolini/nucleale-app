import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { LoadChildrens } from '@/domain/usecases'
import { ServerError, UnauthorizedError } from '@/presentation/errors'

export class RemoteLoadChildrens implements LoadChildrens {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadChildrens.Model>
  ) {}

  async loadAll (): Promise<RemoteLoadChildrens.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get'
    })
    const childrens = httpResponse.body || []
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return childrens
      case HttpStatusCode.unauthorized: throw new UnauthorizedError()
      default: throw new ServerError()
    }
  }
}

export namespace RemoteLoadChildrens {
  export type Model = LoadChildrens.Model
}
