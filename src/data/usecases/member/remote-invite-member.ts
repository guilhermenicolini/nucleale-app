import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { InviteMember } from '@/domain/usecases'
import { ClientError, ServerError, UnauthorizedError } from '@/presentation/errors'

export class RemoteInviteMember implements InviteMember {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<void>
  ) {}

  async invite (email: string): Promise<void> {
    const response = await this.httpClient.request({
      url: `${this.url}/${email}`,
      method: 'post'
    })
    switch (response.statusCode) {
      case HttpStatusCode.noContent: return
      case HttpStatusCode.badRequest: throw new ClientError(response.error)
      case HttpStatusCode.unauthorized: throw new UnauthorizedError()
      default: throw new ServerError()
    }
  }
}
