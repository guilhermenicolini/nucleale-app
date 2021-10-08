import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols'
import { AddressModel, ChildrenModel, MemberModel } from '@/domain/models'
import faker from 'faker'

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
  responseType: 'json',
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
  cityId: faker.random.arrayElement([6175, 6357, 6595, 6831, 7107, 7149, 7225, 7237]),
  state: 'SP',
  zip: faker.address.zipCode('#####-###'),
  country: faker.address.countryCode()
})

export const mockChildrenModel = (): ChildrenModel => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  birth: faker.date.past(5).valueOf(),
  gender: faker.name.gender()
})

export const mockMemberModel = (): MemberModel => ({
  id: faker.datatype.uuid(),
  accountId: faker.datatype.uuid(),
  taxId: faker.address.zipCode('###########'),
  name: faker.name.findName(),
  email: faker.internet.email(),
  mobilePhone: faker.phone.phoneNumber(),
  birth: faker.date.past(10).valueOf(),
  status: faker.random.word().toLowerCase(),
  role: faker.random.word().toLowerCase()
})

export const mockFileResponse = (mimeType: string = faker.system.mimeType()): any => ({
  name: faker.system.fileName(),
  mimeType
})

export const mockFileBuffer = (): Buffer => Buffer.from(faker.random.words(10))

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
