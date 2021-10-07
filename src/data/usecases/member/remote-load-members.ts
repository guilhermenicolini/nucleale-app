import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { LoadMembers } from '@/domain/usecases'
import { ServerError, UnauthorizedError } from '@/presentation/errors'

export class RemoteLoadMembers implements LoadMembers {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<LoadMembers.Model>
  ) {}

  async loadAll (): Promise<LoadMembers.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get'
    })
    const members = httpResponse.body || []
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return members
      case HttpStatusCode.unauthorized: throw new UnauthorizedError()
      default: throw new ServerError()
    }
  }
}

export namespace RemoteLoadMembers {
  export type Model = LoadMembers.Model
}
