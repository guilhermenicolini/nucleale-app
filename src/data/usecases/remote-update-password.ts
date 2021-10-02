import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { UpdatePassword } from '@/domain/usecases'
import { ClientError, ServerError } from '@/presentation/errors'

export class RemoteUpdatePassword implements UpdatePassword {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<void>
  ) {}

  async update (params: UpdatePassword.Params): Promise<void> {
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
