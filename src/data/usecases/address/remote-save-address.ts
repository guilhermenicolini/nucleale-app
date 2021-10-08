import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { SaveAddress } from '@/domain/usecases'
import { ClientError, ServerError, UnauthorizedError } from '@/presentation/errors'

export class RemoteSaveAddress implements SaveAddress {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async save (params: SaveAddress.Params): Promise<void> {
    const response = await this.httpClient.request({
      url: this.url,
      method: 'put',
      body: params
    })
    switch (response.statusCode) {
      case HttpStatusCode.noContent: return
      case HttpStatusCode.badRequest: throw new ClientError(response.error)
      case HttpStatusCode.unauthorized: throw new UnauthorizedError()
      default: throw new ServerError()
    }
  }
}
