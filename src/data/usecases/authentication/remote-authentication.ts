import { HttpClient } from '@/data/protocols'
import { Authentication } from '@/domain/usecases'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<Authentication.Result>
  ) {}

  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params
    })
    return null
  }
}
