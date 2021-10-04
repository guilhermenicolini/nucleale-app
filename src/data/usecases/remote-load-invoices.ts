import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { LoadInvoices } from '@/domain/usecases'
import { ServerError, UnauthorizedError } from '@/presentation/errors'

export class RemoteLoadInvoices implements LoadInvoices {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadInvoices.Model[]>
  ) {}

  async loadAll (): Promise<RemoteLoadInvoices.Model[]> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get'
    })
    const remoteInvoices = httpResponse.body || []
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return remoteInvoices
      case HttpStatusCode.unauthorized: throw new UnauthorizedError()
      default: throw new ServerError()
    }
  }
}

export namespace RemoteLoadInvoices {
  export type Model = {
    id: string
    invoiceNo: number
    invoiceDate: number
    description: string
  }
}
