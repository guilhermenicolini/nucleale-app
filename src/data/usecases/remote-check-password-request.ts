import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { CheckPasswordRequest } from '@/domain/usecases'
import { ServerError } from '@/presentation/errors'

export class RemoteCheckPasswordRequest implements CheckPasswordRequest {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<void>
  ) {}

  async check (token: string): Promise<boolean> {
    const response = await this.httpClient.request({
      url: `${this.url}/${token}`,
      method: 'get'
    })
    switch (response.statusCode) {
      case HttpStatusCode.ok: return true
      case HttpStatusCode.badRequest:
      case HttpStatusCode.notFound: return false
      default: throw new ServerError()
    }
  }
}
