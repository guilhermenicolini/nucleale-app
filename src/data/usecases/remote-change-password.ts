import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { ChangePassword } from '@/domain/usecases'
import { ClientError, ServerError } from '@/presentation/errors'

export class RemoteChangePassword implements ChangePassword {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<void>
  ) {}

  async change (params: ChangePassword.Params): Promise<void> {
    const response = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params
    })
    switch (response.statusCode) {
      case HttpStatusCode.noContent: return
      case HttpStatusCode.badRequest:
      case HttpStatusCode.notFound: {
        throw new ClientError(response.error)
      }
      default: throw new ServerError()
    }
  }
}
