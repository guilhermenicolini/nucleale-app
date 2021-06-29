import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { Authentication } from '@/domain/usecases'
import { ClientError, ServerError } from '@/presentation/errors'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<Authentication.Result>
  ) {}

  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    const response = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params
    })
    switch (response.statusCode) {
      case HttpStatusCode.ok: return response.body
      case HttpStatusCode.badRequest: throw new ClientError(response.error)
      default: throw new ServerError()
    }
  }
}
