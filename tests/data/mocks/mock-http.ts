import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols'
import faker from 'faker'

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
  body: faker.random.objectElement()
})

export class HttpClientSpy implements HttpClient {
  constructor (readonly status: HttpStatusCode = HttpStatusCode.ok) {}

  data: HttpRequest
  result: HttpResponse = ({
    statusCode: this.status
  })

  async request (data: HttpRequest): Promise<HttpResponse> {
    this.data = data
    return this.result
  }
}
