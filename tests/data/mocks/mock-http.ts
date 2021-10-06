import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols'
import { AddressModel, ChildrenModel } from '@/domain/models'
import faker from 'faker'

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
  body: faker.random.objectElement(),
  headers: faker.random.objectElement()
})

export const mockInvoiceItem = (): any => ({
  id: faker.datatype.uuid(),
  invoiceNo: faker.datatype.number(),
  invoiceDate: faker.date.recent().valueOf(),
  description: faker.random.words()
})

export const mockAddressModel = (): AddressModel => ({
  address: faker.address.streetAddress(true),
  number: faker.datatype.number().toString(),
  complement: faker.address.secondaryAddress(),
  district: faker.address.secondaryAddress(),
  city: faker.address.cityName(),
  cityId: faker.datatype.number(),
  state: faker.address.stateAbbr(),
  zip: faker.address.zipCode(),
  country: faker.address.countryCode()
})

export const mockChildrenModel = (): ChildrenModel => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  birth: faker.date.past(5).valueOf(),
  gender: faker.name.gender()
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
