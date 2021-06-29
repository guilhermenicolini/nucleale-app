import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols'

export class HttpClientSpy implements HttpClient {
  data: HttpRequest
  result: HttpResponse = ({
    statusCode: HttpStatusCode.ok
  })

  async request (data: HttpRequest): Promise<HttpResponse> {
    this.data = data
    return this.result
  }
}
