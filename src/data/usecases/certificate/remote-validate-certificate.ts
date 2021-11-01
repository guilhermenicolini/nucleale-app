import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { ValidateCertificate } from '@/domain/usecases'
import { ServerError } from '@/presentation/errors'

export class RemoteValidateCertificate implements ValidateCertificate {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteValidateCertificate.Model>
  ) {}

  async validate (): Promise<RemoteValidateCertificate.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get'
    })
    const certificate = httpResponse.body
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return certificate
      case HttpStatusCode.notFound: return null
      default: throw new ServerError()
    }
  }
}

export namespace RemoteValidateCertificate {
  export type Model = ValidateCertificate.Model
}
