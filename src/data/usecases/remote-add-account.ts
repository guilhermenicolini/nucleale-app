import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AddAccount } from '@/domain/usecases'
import { ClientError, ServerError } from '@/presentation/errors'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<AddAccount.Result>
  ) {}

  async add (params: AddAccount.Params): Promise<AddAccount.Result> {
    const response = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params
    })
    switch (response.statusCode) {
      case HttpStatusCode.created: return response.body
      case HttpStatusCode.badRequest:
      case HttpStatusCode.conflict: {
        throw new ClientError(response.error)
      }
      default: throw new ServerError()
    }
  }
}
