import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { RecoverAccount } from '@/domain/usecases'
import { ClientError, ServerError } from '@/presentation/errors'

export class RemoteRecoverAccount implements RecoverAccount {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<void>
  ) {}

  async recover (email: string): Promise<void> {
    const response = await this.httpClient.request({
      url: `${this.url}/${email}`,
      method: 'post'
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
