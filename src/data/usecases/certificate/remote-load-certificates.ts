import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { LoadCertificates } from '@/domain/usecases'
import { ServerError, UnauthorizedError } from '@/presentation/errors'

export class RemoteLoadCertificates implements LoadCertificates {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadCertificates.Model>
  ) {}

  async loadAll (): Promise<RemoteLoadCertificates.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get'
    })
    const remoteCertificates = httpResponse.body || []
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return remoteCertificates
      case HttpStatusCode.unauthorized: throw new UnauthorizedError()
      default: throw new ServerError()
    }
  }
}

export namespace RemoteLoadCertificates {
  export type Model = LoadCertificates.Model
}
