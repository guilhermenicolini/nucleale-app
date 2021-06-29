import { HttpClient } from '@/data/protocols'
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
    if (response.statusCode >= 200 && response.statusCode <= 299) {
      return response.body
    } else if (response.statusCode >= 400 && response.statusCode <= 499) {
      throw new ClientError(response.error)
    } else {
      throw new ServerError()
    }
  }
}
